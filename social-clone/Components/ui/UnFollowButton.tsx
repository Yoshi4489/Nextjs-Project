"use client";

import { db } from "@/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";

interface UnFollowButtonProps {
  username: string;
  followingUserID: string;
  followerUserID: string;
  follower: number;
  following: number;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnFollowButton = ({
  followingUserID,
  followerUserID,
  follower,
  following,
  setIsFollowing,
  username,
}: UnFollowButtonProps) => {
  const [isLoading, setIsLoaind] = useState(false);

  function askPermission() {
    swal(
      `Unfollow @${username}?
    Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected. 
    `,
      {
        buttons: {
          Unfollow: "Unfollow",
          Cancel: true,
        },
      }
    ).then((value) => {
      switch (value) {
        case "Unfollow":
          unfollowHandle();
          break;
        default:
          break;
      }
    });
  }

  async function unfollowHandle() {
    try {
      setIsLoaind(true);
      const followingDocRef = doc(db, "users", followingUserID);
      await updateDoc(followingDocRef, {
        follower: follower - 1,
      });

      const followerDocRef = doc(db, "users", followerUserID);
      await updateDoc(followerDocRef, {
        following: following - 1,
      });

      const followerRef = query(
        collection(db, "followers"),
        where("userID", "==", followingUserID),
        where("followerID", "==", followerUserID)
      );
      onSnapshot(followerRef, (snapshot) => {
        snapshot.forEach((docData) => {
          const docRef = doc(db, "followers", docData.id);
          deleteDoc(docRef);
        });
      });
      setIsLoaind(false);
      setIsFollowing(false);
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
      onClick={askPermission}
      disabled={isLoading}
    >
      Unfollow
    </button>
  );
};

export default UnFollowButton;
