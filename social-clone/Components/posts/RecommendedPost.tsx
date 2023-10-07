"use client";

import { db } from "@/firebase-config";
import { userContext } from "@/hooks/UserContextProvider";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { months } from "@/Data";
import { redirect } from "next/navigation";

const RecommendedPost = () => {
  const { likedPost, user, setLikedPost } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const time = new Date();

  useEffect(() => {
    const postRef = collection(db, "posts");
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      const newPosts: object[] = [];
      snapshot.forEach((doc) => {
        newPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(newPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  async function likePost(id: string, likes: number) {
    setIsLoading(true);
    const likesRef = collection(db, "likes");
    const docRef = doc(db, "posts", id);
    try {
      if (!likedPost.some((liked: object) => liked.postID === id)) {
        await addDoc(likesRef, {
          postID: id,
          userID: user.id,
          likedAt: serverTimestamp(),
        });
        const updatedLike = [
          ...likedPost,
          {
            postID: id,
            userID: user.id,
            likedAt: serverTimestamp(),
          },
        ];
        setLikedPost(updatedLike);
        await updateDoc(docRef, {
          like: likes + 1,
        });
      }
      toast.info("Keep it up!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error in likePost:", error);
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

  async function unLikePost(id: string, likes: number) {
    setIsLoading(true);
    const likesRef = collection(db, "likes");
    const docRef = doc(db, "posts", id);
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
      await updateDoc(docRef, {
        like: likes - 1,
      });
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
    <div className="text-white flex-col flex z-0 w-full max-lg:w-full">
      <ToastContainer
        position="bottom-center"
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
      {posts.length !== 0 &&
        posts &&
        posts.map((post) => (
          <div
            key={uuid()}
            className="flex w-full border-white border-t border-b p-5 gap-5 cursor-pointer"
          >
            {post.userImage ? (
              <img
                src={post.userImage}
                alt="profile"
                className="rounded-full w-8 h-8"
              />
            ) : (
              <div className="w-6 h-6">
                <FaRegUserCircle size={30} color="white" />
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                <h2 className=" text-sm">{post.user}</h2>
                <h2 className="text-sm text-gray-400">@{post.userID}</h2>
                <h2 className="text-sm text-gray-400">
                  {post.createdAt.split(" ")[0] < time.getDate() ||
                  post.createdAt.split(" ")[2] < time.getMonth() ||
                  post.createdAt.split(" ")[3] < time.getFullYear()
                    ? `· ${months[post.createdAt.split(" ")[2]]} ${
                        post.createdAt.split(" ")[0]
                      }, ${post.createdAt.split(" ")[3]}`
                    : `· ${
                        post.createdAt.split(" ")[4] - time.getHours() === 0
                          ? time.getMinutes() - post.createdAt.split(" ")[5] ===
                            0
                            ? time.getSeconds() -
                              post.createdAt.split(" ")[6] +
                              "s"
                            : time.getMinutes() -
                              post.createdAt.split(" ")[5] +
                              "m"
                          : time.getHours() - post.createdAt.split(" ")[4] + "h"
                      }`}
                </h2>
              </div>
              <h2>{post.caption}</h2>
              <img
                src={post.image}
                alt="image"
                className={`${post.image ? "rounded-3xl mt-2" : "hidden"}`}
              />
              <div className="flex mt-5 gap-10">
                <div className="flex items-center gap-2">
                  <a href={`/post/${post.id}`}>
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
                  </a>
                  <h2>{post.comment}</h2>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    isLoading ? "pointer-events-none" : ""
                  }`}
                >
                  {likedPost.some((liked) => liked.postID === post.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-red-500"
                      onClick={() =>
                        user
                          ? unLikePost(post.id, post.like)
                          : redirect("signup")
                      }
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
                      onClick={() =>
                        user
                          ? likePost(post.id, post.like)
                          : redirect("/signup")
                      }
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
        ))}
    </div>
  );
};

export default RecommendedPost;
