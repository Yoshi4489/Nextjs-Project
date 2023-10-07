"use client";

import { db } from "@/firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface FollowProps {
  followingUserID: string;
  followerUserID: string;
  follower: number;
  following: number;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowButton = ({
  followingUserID,
  followerUserID,
  follower,
  following,
  setIsFollowing,
}: FollowProps) => {
  const [isLoading, setIsLoading] = useState(false);
  async function followHandle() {
    try {
      setIsLoading(true);
      const followingDocRef = doc(db, "users", followingUserID);
      await updateDoc(followingDocRef, {
        follower: follower ? follower + 1 : 1,
      });

      const followerDocRef = doc(db, "users", followerUserID);
      await updateDoc(followerDocRef, {
        following: following ? following + 1 : 1,
      });

      const followersCollection = collection(db, "followers");
      await addDoc(followersCollection, {
        userID: followingUserID,
        followerID: followerUserID,
        followAt: serverTimestamp(),
      });
      setIsLoading(false);
      setIsFollowing(true);
    } catch (error) {
      toast.error("Error please try again later", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <button
      className="bg-white rounded-full self-end  text-black px-2 my-2 py-1 font-medium"
      onClick={followHandle}
      disabled={isLoading}
    >
      Follow
    </button>
  );
};

export default FollowButton;
