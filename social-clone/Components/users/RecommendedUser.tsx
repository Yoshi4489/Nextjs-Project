"use client";

import { db } from "@/firebase-config";
import { userContext } from "@/hooks/UserContextProvider";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import uuid from "react-uuid";

const RecommendedUser = () => {
  const { user } = useContext(userContext);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getAllUserData();
  }, [user]);

  async function getAllUserData() {
    if (user && user.id) {
      const userRef = collection(db, "users");
      const snapshot = await getDocs(userRef);
      const users: object[] = [];

      snapshot.forEach((doc) => {
        if (doc.id !== user.id) {
          users.push({ ...doc.data(), id: doc.id });
        }
      });

      setAllUser(users);
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl text-white px-5 py-3">Who to follow</h2>
      {allUser &&
        allUser.map((user) => {
          return (
            <Link
              className="flex mx-3 bg-black hover:bg-gray-800 duration-150 px-5 py-3 rounded-full"
              key={uuid()}
              href={`/${user.id}`}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6">
                  <FaRegUserCircle size={45} color="white" />
                </div>
              )}
              <div className="ml-8">
                <h2 className="text-white hover:underline">{user.name}</h2>
                <h2 className="text-white">{user.id}</h2>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default RecommendedUser;
