"use client";

import { fullMonths } from "@/Data";
import { db } from "@/firebase-config";
import { userContext } from "@/hooks/UserContextProvider";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import uuid from "react-uuid";
import UserPost from "./UserPost";
import FollowButton from "../ui/FollowButton";
import UnFollowButton from "../ui/UnFollowButton";
import ChatButton from "../ui/ChatButton";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { user } = useContext(userContext);
  const url = location.href;
  const pathname = url.split("/");
  const id = pathname[pathname.length - 1];

  const [userData, setUser] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [id, isFollow]);

  async function fetchUserData() {
    try {
      const docRef = doc(db, "users", id);
      const userDoc = await getDoc(docRef);
      setUser([{ ...userDoc.data(), id: userDoc.id }]);
      await getUserPost(userDoc.id);

      const followerRef = query(
        collection(db, "followers"),
        where("userID", "==", id),
        where("followerID", "==", user.id)
      );
      const followDoc = await getDocs(followerRef);
      if (followDoc.size) {
        setIsFollow(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function getUserPost(id: string) {
    if (user) {
      try {
        const postRef = collection(db, "posts");
        const queryPosts = query(
          postRef,
          where("userID", "==", id),
          orderBy("postTimestamp")
        );

        const posts: object[] = [];

        onSnapshot(queryPosts, (snapshot) => {
          snapshot.forEach((doc) => {
            posts.push({ ...doc.data(), id: doc.id });
          });

          setUserPost(posts);
        });
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
  }

  return (
    <div className="w-5/12 flex flex-col text-white overflow-y-scroll max-lg:w-8/12">
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
      {userData &&
        userData.length > 0 &&
        userData.map((item) => (
          <div key={uuid()} className="w-full">
            <div className="fixed top-0 pt-5 flex gap-5 items-center bg-black z-50 w-[40.5%] px-5 max-lg:w-8/12">
              <a href={"/home"} className="text-white text-2xl">
                &#8592;
              </a>
              <h2 className="text-xl">{item.name}</h2>
            </div>
            <div className="py-16">
              <div className="flex flex-col relative">
                {item.headerPhoto ? (
                  <img
                    src={item.headerPhoto}
                    alt="header photo"
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="w-full h-52 bg-[#cfd9de]"></div>
                )}
                <div className="absolute bottom-0 left-5">
                  {item.image ? (
                    <img src={item.image} />
                  ) : (
                    <FaRegUserCircle className="rounded-full w-32 h-32 border-black border-4"></FaRegUserCircle>
                  )}
                </div>
                {id === user.id ? (
                  <button className="bg-white rounded-full self-end mx-5 text-black px-2 my-2 py-1 font-medium">
                    Edit profile
                  </button>
                ) : (
                  <div className="flex justify-end items-center gap-3 px-5">
                    <ChatButton senderID={user.id} reciverID={item.id} />
                    {isFollow ? (
                      <UnFollowButton
                        followingUserID={id}
                        followerUserID={user.id}
                        follower={item.follower}
                        following={user.following}
                        setIsFollowing={setIsFollow}
                        username={item.name}
                      />
                    ) : (
                      <FollowButton
                        followingUserID={id}
                        followerUserID={user.id}
                        follower={item.follower}
                        following={user.following}
                        setIsFollowing={setIsFollow}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="m-5">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <h2>@{item.id}</h2>
                <div className="flex gap-1 my-3">
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  <h2 className="text-white">
                    Joined{" "}
                    {item.createdAt && fullMonths[item.createdAt.split(" ")[2]]}{" "}
                    {item.createdAt && item.createdAt.split(" ")[3]}
                  </h2>
                </div>
                <div className="flex gap-5">
                  <h2>{item.following ? item.following : 0} Following</h2>
                  <h2>{item.follower ? item.follower : 0} Follower</h2>
                </div>
              </div>

              <div className="pt-5 pb-3 px-5 border-b border-white">
                <span className="active relative cursor-pointer">Posts</span>
              </div>
              {userPost && <UserPost posts={userPost} />}
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserProfile;
