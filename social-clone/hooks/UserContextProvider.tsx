'use client'

import React, { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase-config";

interface Props {
  children: React.ReactNode;
}

export const userContext = createContext({});

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState([]);
  const [likedPost, setLikedPost] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const token = cookies.get("socialAppToken");
    if (token) {
      try {
        const userRef = collection(db, "users");
        const queryUser = query(userRef, where("token", "==", token));
        const userList: object[] = [];
        onSnapshot(queryUser, (snapshot) => {
          snapshot.forEach((doc) => {
            userList.push({ ...doc.data(), id: doc.id })
          });
          setUser(userList[0])
          getLikedPost(userList);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getLikedPost(user: object[]) {
    if (user && user[0].id) {
      const likeRef = collection(db, "likes");
      const queryLike = query(likeRef, where("userID", "==", user[0].id));

      try {
        onSnapshot(queryLike, (snapshot) => {
          const likedPosts: object[] = [];
          snapshot.forEach((doc) => {
            likedPosts.push({ ...doc.data(), id: doc.id });
          });
          setLikedPost(likedPosts);
        });
      } catch (error) {
        console.error("Error getting liked posts:", error);
      }
    } else {
      console.error("User or user.id is undefined or invalid.");
    }
  }

  return (
    <userContext.Provider value={{ user, setUser, likedPost, setLikedPost }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
