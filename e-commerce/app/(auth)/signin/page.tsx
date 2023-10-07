"use client";

import { auth, db, provider } from "@/Auth/firebase-config";
import { userContext } from "@/Components/UserContextProvider";
import { signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
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

const page = () => {
  const { setUser } = useContext(userContext);

  const cookies = new Cookies();
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [randomToken, setRandomToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    findUser();
    generateRandomKey();
  }, [gmail]);

  function findUser() {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("user", "==", gmail));
    const user: any = [];
    onSnapshot(userQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      setUserData(user);
    });
  }

  async function checkUserData(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const checkedData = userData.filter(
      (data) => data.user === gmail && data.password === password
    );
    if (checkedData.length > 0) {
      const documentRef = doc(db, "users", checkedData[0].id);
      try {
        await updateDoc(documentRef, {
          token: randomToken,
        });
        cookies.set("eCommerce_token", randomToken);
        setUser(checkedData);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Invalid password or email", {
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

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    const userRef = collection(db, "users");
    const queryUser = query(userRef, where("user", "==", result.user.email));
    cookies.set("eCommerce_token", randomToken);
    try {
      const user: any[] = [];
      let isUser = false;
      await onSnapshot(queryUser, (snapshot) => {
        let isUser = false;
        snapshot.forEach((document) => {
          user.push({ ...document.data(), id: document.id });
          if (!isUser) {
            router.push("/");
            isUser = true;
            setUser(result.user);
            const docRef = doc(db, "users", user[0].id);
            updateDoc(docRef, {
              token: randomToken,
            });
            return;
          }
        });
        if (!isUser) {
          addNewUser(result.user.email, result.user.photoURL, randomToken);
        }
      });
    } catch (error) {
      toast.error("Failed to sign in", {
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

  async function addNewUser(
    email: string | null,
    photoURL: string | null,
    token: string
  ) {
    const userRef = collection(db, "users");
    await addDoc(userRef, {
      user: email,
      image: photoURL,
      cart: [],
      token: token,
    });
    setUser({ user: email, image: photoURL, cart: [], token: token });
    router.push("/");
  }

  function generateRandomKey() {
    const number = "0123456789";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const specialCharacter = "!@#$%&";
    const myArray = [number, characters, specialCharacter];
    for (let index = 0; index < 34; index++) {
      const randomNumber = Math.floor(Math.random() * 3);
      const randomArrayLength = Math.floor(
        Math.random() * myArray[randomNumber].length
      );
      setRandomToken((prev) => prev + myArray[randomNumber][randomArrayLength]);
    }
  }

  return (
    <main className="flex w-screen h-screen overflow-hidden">
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

        <h2 className="font-bold text-4xl capitalize mb-8">Sign In</h2>
        <form className="flex flex-col gap-3" onSubmit={checkUserData}>
          <div className="flex flex-col relative w-9/12">
            <label className="text-gray-300 text-sm">Email address</label>
            <input
              type="email"
              placeholder="your@gmail.com"
              className="px-5 py-3 rounded-md w-full outline-0 shadow pr-16"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative w-9/12">
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              placeholder="password"
              className="px-5 py-3 rounded-md w-full outline-0 shadow pr-16"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-9/12 bg-blue-500 my-5 py-3 rounded-md text-white font-bold text-xl"
          >
            Sign In
          </button>
        </form>
        <button
          className="w-9/12 shadow text-lg py-3 mb-5 rounded-md flex gap-3 justify-center items-center"
          onClick={() => signInWithGoogle()}
        >
          <img
            src="../google.png"
            alt="google logo"
            className="w-10 h-10 object-cover"
          />
          <p>Sign in with Google</p>
        </button>
        <p className="text-center w-9/12">
          Don't have an account?{" "}
          <a href="/signup" className="underline text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
      <div className="w-6/12 h-full">
        <img
          className="w-full object-contain"
          src="https://scontent.fbkk22-8.fna.fbcdn.net/v/t1.15752-9/367756848_1790571511373614_1637911619305847981_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGcA62ovEVlnSIXuij4xufpVpIrlmpv2TtWkiuWam_ZOyeZDgIMyO0yQPnaZSMBQIWrxj78_MFdGXUxpnAD0ard&_nc_ohc=9hEtytqyWggAX-TS15t&_nc_ht=scontent.fbkk22-8.fna&oh=03_AdQfFiiEZVrlXEMxHVbX2cCKkOxBFooJlP22AFKJGb3nog&oe=650ED820"
          alt="login image"
        />
      </div>
    </main>
  );
};

export default page;
