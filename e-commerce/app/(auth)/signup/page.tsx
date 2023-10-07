"use client";

import { db } from "@/Auth/firebase-config";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [formData, setFormData] = useState({
    gmail: "",
    password: "",
    confirmPassword: "",
  });
  const [checkUserGmail, setCheckUserGmail] = useState(false);
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8
    )
      setIsPasswordOk(true);
    else setIsPasswordOk(false);
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    checkIsEmailUsed();
  }, [formData.gmail]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function checkUser(user: string) {
    const isEmail = user.endsWith("@gmail.com");
    if (!isEmail) setCheckUserGmail(false);
    else setCheckUserGmail(true);
    setFormData({
      ...formData,
      gmail: user,
    });
  }

  function checkIsEmailUsed() {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("user", "==", formData.gmail));
    let user: any = [];
    onSnapshot(userQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      setUsers(user);
    });
  }

  function addUserToData(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const userRef = collection(db, "users");
    const passwordLength =
      formData.password.length >= 8 && formData.password.length <= 26;
    if (users.length > 0) {
      toast.error('This email has been used', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else if (passwordLength && isPasswordOk && checkUserGmail) {
      try {
        addDoc(userRef, {
          user: formData.gmail,
          password: formData.password,
          cart: [],
          createdAt: new Date(),
        });
        toast.success('Account has been created', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        router.push("/signin");
      } catch (error) {
        toast.error('Failed to add user', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }
  }
  return (
    <main className="flex w-screen h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="w-6/12 h-full px-10 py-20">
        <div className="flex items-center mb-12 gap-3">
          <img
            src="http://clipart-library.com/images/kcMKg476i.png"
            alt="logo"
            className="w-10 h-10 object-cover"
          />
          <p className="text-lg font-bold">YoshiMart</p>
        </div>

        <h2 className="font-bold text-4xl capitalize mb-8">Sign Up</h2>
        <form className="flex flex-col gap-3" onSubmit={addUserToData}>
          <div className="flex flex-col relative w-9/12">
            <label className="text-gray-300 text-sm">Email address</label>
            <input
              type="email"
              placeholder="your@gmail.com"
              className="px-5 py-3 rounded-md w-full outline-0 shadow pr-16"
              onChange={(e) => checkUser(e.target.value)}
            />
            <div className="absolute right-5 top-1/2">
              {checkUserGmail ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-col relative w-9/12">
            <label className="text-gray-300 text-sm">Current Password</label>
            <input
              type="password"
              placeholder="password"
              className="px-5 py-3 rounded-md w-full outline-0 shadow pr-16"
              onChange={(e) => {
                handleChange(e);
              }}
              name="password"
            />
            <div className="absolute right-5 top-1/2">
              {formData.password.length > 8 &&
              formData.password.length <= 26 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-col relative w-9/12">
            <label className="text-gray-300 text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="confirm password"
              className="px-5 py-3 rounded-md w-full outline-0 shadow pr-16"
              onChange={(e) => handleChange(e)}
              name="confirmPassword"
            />
            <div className="absolute right-5 top-1/2">
              {isPasswordOk ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-9/12 bg-blue-500 my-5 py-3 rounded-md text-white font-bold text-xl"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center w-9/12">
          Already have an Account?{" "}
          <a href="/signin" className="underline text-blue-500">
            Sign In
          </a>
        </p>
      </div>
      <div className="w-6/12 h-full bg-black">
        <h2 className="absolute bottom-72 font-black text-8xl text-white px-16 py-5 w-3/12 tracking-wider">
          Welcome
        </h2>
        <h2 className="absolute bottom-44 font-black text-8xl text-white px-16 py-5 w-3/12 tracking-wider">
          Back<span className="text-6xl text-amber-400">.</span>
        </h2>
      </div>
    </main>
  );
};

export default page;
