"use client";

import { weekdays } from "@/Data";
import { db } from "@/firebase-config";
import { userContext } from "@/hooks/UserContextProvider";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const page = () => {
  const { setUser } = useContext(userContext);
  const [dataForm, setDatForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  const time = new Date();

  const cookies = new Cookies();

  useEffect(() => {
    genRandomToken();
  }, []);

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

  async function registerUser(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userRef = collection(db, "users");
      const queryUser = query(userRef, where("email", "==", dataForm.email));
      const querySnapShot = await getDocs(queryUser);

      if (querySnapShot.size > 0) {
        toast.error("This email has been used", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      } else {
        if (dataForm.password.length < 8 || dataForm.password.length > 26) {
          toast.error("Your password need to be between 8 to 26 charactors", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
          return "";
        }
        await addDoc(userRef, {
          email: dataForm.email,
          name: dataForm.name,
          password: dataForm.password,
          follower: 0,
          following: 0,
          token: token,
          createdAt: `${time.getDate()} ${
            weekdays[time.getDay()]
          } ${time.getMonth()} ${time.getFullYear()} ${time.getHours()} ${time.getMinutes()}`,
        });
        cookies.set("socialAppToken", token);
        const updatedUser = {
          email: dataForm.email,
          name: dataForm.name,
          password: dataForm.password,
          follower: 0,
          following: 0,
          token: token,
          createdAt: `${time.getDate()} ${
            weekdays[time.getDay()]
          } ${time.getMonth()} ${time.getFullYear()} ${time.getHours()} ${time.getMinutes()}`,
        };
        setUser(updatedUser);
        toast.success("Account created", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsLoading(false);
        router.push("/home");
      }
    } catch (error) {
      toast.error("Error please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={registerUser}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="email"
                required
                value={dataForm.name}
                onChange={(e) =>
                  setDatForm({ ...dataForm, name: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5"
              />
            </div>
          </div>

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
                value={dataForm.email}
                onChange={(e) =>
                  setDatForm({ ...dataForm, email: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5"
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
                  setDatForm({ ...dataForm, password: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login to your account now
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;
