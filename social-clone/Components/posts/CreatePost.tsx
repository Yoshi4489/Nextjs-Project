"use client";

import React, { FormEvent, useContext, useState } from "react";
import { userContext } from "@/hooks/UserContextProvider";
import { FaRegUserCircle } from "react-icons/fa";
import RecommendedBar from "../Layout/RecommendedBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const { user } = useContext(userContext);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function addedImage(e: React.ChangeEvent<HTMLInputElement>) {
    let selectedFile = null;
    const file = e.target.files?.[0];
    if (file) {
      selectedFile = await new Promise((resolve, reject) => {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        } catch (error) {
          reject(error);
        }
      });
      setImage(selectedFile);
    }
  }

  async function addPost(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const time = new Date();
    try {
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        user: user.name,
        userID: user.id,
        userImage: user.image || '',
        caption: caption,
        image: image,
        createdAt: `${time.getDate()} ${weekdays[time.getDay()]} ${time.getMonth()} ${time.getFullYear()} ${time.getHours()} ${time.getMinutes()} ${time.getSeconds()}`,
        postTimestamp: serverTimestamp(),
        comment: '',
        like: ''
      });
      toast.success("Your post has been sent", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      router.push("/home");
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
      console.log(error)
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full flex">
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
      <form
        className="h-screen  flex flex-col bg-black px-10 py-5 overflow-y-scroll w-8/12"
        onSubmit={addPost}
      >
        <h2 className="text-white text-2xl">Home</h2>
        <div className="py-5">
          <div className="flex items-center gap-5 py-5">
            {user.image ? (
              <img src={user.image} alt="profile" sizes="50" />
            ) : (
              <FaRegUserCircle
                size={50}
                color="white"
                className="max-xl:w-10 object-contain"
              />
            )}
            <h2 className="text-white">{user.name}</h2>
          </div>
          <textarea
            placeholder="What is happening?"
            className="w-full resize-none h-auto bg-black text-white outline-0 border-none"
            maxLength={500}
            onChange={(e) => setCaption(e.target.value)}
          />
          {image ? (
            <div className="relative w-full m-5">
              <img
                src={image}
                alt="image"
                className="w-full object-contain pb-5 rounded-3xl"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 absolute right-5 top-5 cursor-pointer"
                onClick={() => setImage("")}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : null}
          <div className="flex justify-between py-3 items-center">
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
                  onChange={(e) => addedImage(e)}
                />
              </label>
            </div>
            <button
              className="text-white bg-sky-500 px-5 rounded-full py-1"
              type="submit"
              disabled={(!caption && !image) || isLoading}
            >
              Post
            </button>
          </div>
        </div>
      </form>
      <div className="max-lg:hidden">
        <RecommendedBar />
      </div>
    </div>
  );
};

export default CreatePost;
