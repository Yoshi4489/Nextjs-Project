"use client";

import RecommendedBar from "@/Components/Layout/RecommendedBar";
import SideBar from "@/Components/Layout/SideBar";
import { db } from "@/firebase-config";
import { userContext } from "@/hooks/UserContextProvider";
import { months, weekdays } from "@/Data";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const { user, likedPost, setLikedPost } = useContext(userContext);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = location.href;
  const pathname = url.split("/");
  const id = pathname[pathname.length - 1];
  const [data, setData] = useState({
    isLoading: false,
    image: "",
    message: "",
    id: "",
  });

  const time = new Date();

  useEffect(() => {
    getPost(id);
    getComment();
  }, []);

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const postDoc = await getDoc(docRef);
    const updatedPost: object[] = [];
    updatedPost.push({ ...postDoc.data(), id: postDoc.id });
    setPost(updatedPost);
  };

  const getComment = async () => {
    setComments([]);
    const commentRef = collection(db, "comments");
    const queryComments = query(commentRef);
    const updatedComment: object[] = [];
    onSnapshot(queryComments, (snapshot) => {
      snapshot.forEach((doc) => {
        updatedComment.push({ ...doc.data(), id: doc.id });
      });
    });
    setComments(updatedComment);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setData({ ...data, isLoading: true });
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          setData({ ...data, image: reader.result as string });
        };
        reader.readAsDataURL(file);
        toast.success("Image uploaded", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error("Error can't get the image", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error(error);
      }
    }
    setData({ ...data, isLoading: false });
  };

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    setData({ ...data, isLoading: true });
    const commentRef = collection(db, "comments");
    const postRef = doc(db, "posts", id);
    const queryRef = query(commentRef, where("postID", "==", id));
    const commentLength = (await getDocs(queryRef)).size;

    try {
      const newComment = {
        postID: id,
        user: user.name,
        userID: user.id,
        userImage: user.image || "",
        message: data.message,
        replyImage: data.image,
        createdAt: `${time.getDate()} ${
          weekdays[time.getDay()]
        } ${time.getMonth()} ${time.getFullYear()} ${time.getHours()} ${time.getMinutes()} ${time.getSeconds()}`,
      };

      setComments((prev) => [...prev, newComment]);

      await addDoc(commentRef, newComment);
      await updateDoc(postRef, {
        comment: commentLength + 1,
      });

      toast.success("Your reply has been sent", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setData({
        isLoading: false,
        image: "",
        message: "",
        id: "",
      });
    } catch (error) {
      toast.error("Error please try again later", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setData({ ...data, isLoading: false });
    }
  };

  async function likePost(postID: string) {
    setIsLoading(true);
    const likesRef = collection(db, "likes");
    try {
      if (user && user.id && postID) {
        await addDoc(likesRef, {
          userID: user.id,
          postID: postID,
          createdAt: serverTimestamp(),
        });
        const updatedLikedPost = [
          ...likedPost,
          {
            userID: user.id,
            postID: postID,
            createdAt: serverTimestamp(),
          },
        ];
        setLikedPost(updatedLikedPost);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error please try again later", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setIsLoading(false);
  }

  async function unLikePost(id: string) {
    setIsLoading(true);
    const likesRef = collection(db, "likes");
    const queryLike = query(
      likesRef,
      where("postID", "==", id),
      where("userID", "==", user.id)
    );

    try {
      const snapshot = await getDocs(queryLike);
      const deletePromises: object[] = [];

      snapshot.forEach((docs: object) => {
        const docRef = doc(db, "likes", docs.id);
        deletePromises.push(deleteDoc(docRef));
      });

      await Promise.all(deletePromises);

      const updatedLikedPost = likedPost.filter((item) => item.postID !== id);
      setLikedPost(updatedLikedPost);
    } catch (error) {
      toast.error("Error please try again later", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setIsLoading(false);
  }

  return (
    <main className="flex">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <SideBar />
      <div className="text-white flex-col flex z-0 w-5/12 max-lg:w-full">
        <div className="flex gap-5 p-5 fixed z-50 bg-black w-full items-center">
          <a href="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <h2 className="text-2xl">Post</h2>
        </div>
        <div className="overflow-y-auto h-screen">
          {post &&
            post.map((item) => (
              <>
                <div
                  key={uuid()}
                  className="w-full border-white border-b p-5 gap-5 cursor-pointer pt-20 items-center"
                >
                  <div className="flex gap-2">
                    {item.userImage ? (
                      <img
                        src={item.userImage}
                        alt="profile"
                        className="rounded-full w-10 h-10"
                      />
                    ) : (
                      <div className="w-10 h-10">
                        <FaRegUserCircle size={40} color="white" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <h2 className=" text-sm">{item.user}</h2>
                      <h2 className="text-sm text-gray-400">@{item.userID}</h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-5">
                    <h2>{item.caption}</h2>
                    <img
                      src={item.image}
                      alt="image"
                      className={`${
                        item.image ? "rounded-3xl mt-2" : "hidden"
                      }`}
                    />
                    <h2 className="text-gray-500 text-sm my-3">
                      {item.createdAt.split(" ")[4] > 12
                        ? `${item.createdAt.split(" ")[4] - 12}:${
                            item.createdAt.split(" ")[5]
                          } PM `
                        : `${item.createdAt.split(" ")[4]}:${
                            item.createdAt.split(" ")[5]
                          } AM `}
                      ·
                      {` ${months[item.createdAt.split(" ")[2]]} ${
                        item.createdAt.split(" ")[0]
                      }, ${item.createdAt.split(" ")[3]}`}
                    </h2>
                    <div className="flex gap-10">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                          />
                        </svg>
                        <h2>{item.comment}</h2>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          isLoading ? "pointer-events-none" : ""
                        }`}
                      >
                        {likedPost.some((liked) => liked.postID === item.id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-red-500"
                            onClick={() => unLikePost(item.id)}
                          >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => likePost(item.id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        )}
                        <h2>{post.like === 0 ? null : post.like}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  className="flex flex-col bg-black px-5 py-5 w-full border-b"
                  onSubmit={addComment}
                >
                  <div className="flex gap-5">
                    {user.image ? (
                      <img src={user.image} alt="profile" sizes="50" />
                    ) : (
                      <FaRegUserCircle
                        size={30}
                        color="white"
                        className="max-xl:w-10 object-contain"
                      />
                    )}
                    <div className="flex flex-col w-full gap-2">
                      <textarea
                        placeholder="Post your reply"
                        className="w-full resize-none h-auto bg-black text-white outline-0 border-none"
                        maxLength={500}
                        onChange={(e) =>
                          setData({ ...data, message: e.target.value })
                        }
                        value={data.message}
                      />
                      {data.image ? (
                        <div className="relative w-full p-5">
                          <img
                            src={data.image}
                            alt="image"
                            className="w-full object-contain pb-5 rounded-3xl"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10 absolute right-5 top-5 cursor-pointer"
                            onClick={() => setData({ ...data, image: "" })}
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : null}
                      <div className="flex justify-between items-center">
                        <div>
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) => addImage(e)}
                              value={data.image}
                            />
                          </label>
                        </div>
                        <button
                          className={`text-white bg-sky-500 px-5 rounded-full py-1 ${
                            data.isLoading || (!data.message && !data.image)
                              ? "brightness-75"
                              : ""
                          }`}
                          type="submit"
                          disabled={
                            data.isLoading || (!data.message && !data.image)
                          }
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="p-5">
                  {comments.map((comment) => {
                    if (comment.postID === item.id) {
                      return (
                        <div key={comment.id} className="flex">
                          <div className="flex gap-5">
                            <a href={`/user/${comment.userID}`}>
                              {comment.userProfile ? (
                                <img
                                  src={comment.userProfile}
                                  alt="profile"
                                  className="w-6 h-6 rounded-full object-contain"
                                />
                              ) : (
                                <FaRegUserCircle
                                  size={30}
                                  color="white"
                                  className="max-xl:w-10 object-contain"
                                />
                              )}
                            </a>
                            <div className="flex flex-col">
                              <div className="flex gap-2 items-center">
                                <h2 className="text-white text-sm">
                                  {comment.user}
                                </h2>
                                <h2 className="text-gray-400 text-sm">
                                  @{comment.userID}
                                </h2>
                                <h2 className="text-sm text-gray-400">
                                  {item.createdAt.split(" ")[0] <
                                    time.getDate() ||
                                  item.createdAt.split(" ")[2] <
                                    time.getMonth() ||
                                  item.createdAt.split(" ")[3] <
                                    time.getFullYear()
                                    ? `· ${
                                        months[item.createdAt.split(" ")[2]]
                                      } ${item.createdAt.split(" ")[0]}, ${
                                        item.createdAt.split(" ")[3]
                                      }`
                                    : `· ${
                                        item.createdAt.split(" ")[4] -
                                          time.getHours() ===
                                        0
                                          ? time.getMinutes() -
                                              item.createdAt.split(" ")[5] ===
                                            0
                                            ? time.getSeconds() -
                                              item.createdAt.split(" ")[6] +
                                              "s"
                                            : time.getMinutes() -
                                              item.createdAt.split(" ")[5] +
                                              "m"
                                          : item.createdAt.split(" ")[4] -
                                            time.getHours() +
                                            "h"
                                      }`}
                                </h2>
                              </div>
                              <p className="text-white">{comment.message}</p>
                              {comment.replyImage ? (
                                <img
                                  src={comment.replyImage}
                                  alt="image"
                                  className="w-full rounded-3xl"
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </>
            ))}
        </div>
      </div>
      <div className="max-lg:hidden">
        <RecommendedBar />
      </div>
    </main>
  );
};

export default page;
