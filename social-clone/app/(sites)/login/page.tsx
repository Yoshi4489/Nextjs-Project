"use client";

import { db } from "@/firebase-config";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Example() {
  const [dataForm, setDataForm] = useState({
    password: "",
    userData: [],
  });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();

  const cookies = new Cookies();

  useEffect(() => {
    genRandomToken()
  }, [])

  function genRandomToken() {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const special = "!#$%&";
    const all = [lower, upper, number, special];
    for (let index = 0; index < 256; index++) {
      const type = all[Math.floor(Math.random() * all.length)];
      const randomCharactorsIndex = Math.floor(Math.random() * type.length);
      const secretToken = type[randomCharactorsIndex];
      setToken((prev) => (prev += secretToken));
    }
  }

  function checkUser(email: string) {
    setIsLoading(true);
    const userRef = collection(db, "users");
    const queryUser = query(userRef, where("email", "==", email));
    const user: any[] = [];
    onSnapshot(queryUser, (snapshot) => {
      snapshot.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
    });
    setIsLoading(false);
    setDataForm({ ...dataForm, userData: user });
  }

  async function loginUser(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      setIsLoading(false);
      if (dataForm.userData.length > 0 && dataForm.userData.length < 2) {
        const filterAccount = dataForm.userData.filter(
          (user) => user.email === email && user.password === dataForm.password
        );
        if (filterAccount.length > 0) {
          const docRef = doc(db, "users", filterAccount[0].id);
          await updateDoc(docRef, {
            token: token,
          });
          cookies.set("socialAppToken", token);
          toast.success("Logged in successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          await new Promise((resolve) => setTimeout(resolve, 3000));
          router.push("/");
        } else {
          toast.error("Wrong password", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setIsLoading(false);
      } else {
        toast.error("This email is invalid", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    checkUser(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={dataForm.password}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, password: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create your account now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
