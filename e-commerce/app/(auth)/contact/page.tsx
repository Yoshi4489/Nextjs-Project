"use client";

import { db } from "@/Auth/firebase-config";
import NavBar from "@/Components/NavBar";
import SearchBar from "@/Components/SearchBar";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function submitForm(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const messsgeRef = collection(db, "dmMessage");
    if (name && email && phone && message) {
      try {
        addDoc(messsgeRef, {
          name: name,
          email: email,
          phoneNumber: phone,
          message: message,
        });
      } catch (error) {
        console.log(error);
      }
    } else alert("Please fill all the blank input");
  }
  return (
    <>
      <SearchBar />
      <NavBar />
      <main className="pl-72 pr-20 py-32 flex items-center gap-20 h-screen justify-center">
        <form className="flex flex-col gap-5" onSubmit={submitForm}>
          <h2 className="text-4xl font-black">Contact Us</h2>
          <p className="text-xl">
            Feel free to contact us any time. We will get back to you as soon as
            we can!
          </p>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-2 border-b border-black outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-2 border-b border-black outline-none"
          />
          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            className="px-2 py-2 border-b border-black outline-none"
          />
          <input
            type="text"
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            className="px-2 py-2 border-b border-black outline-none"
          />
          <button
            type="submit"
            className="text-white text-xl bg-[#c9ade8] py-2 uppercase font-bold tracking-wide"
          >
            Send
          </button>
        </form>
      </main>
    </>
  );
};

export default page;
