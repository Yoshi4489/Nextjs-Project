"use client";

import React, { useContext } from "react";
import { FaHome, FaTripadvisor } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineEllipsis } from "react-icons/ai";
import { userContext } from "@/hooks/UserContextProvider";

const SideBar = () => {
  const { user } = useContext(userContext);
  return (
    <div className="px-5 flex flex-col py-5 justify-between lg:w-4/12 h-screen border-r max-xl:px-2">
      <div className="flex flex-col gap-5 w-full max-xl:items-center">
        <button className="hover:opacity-80 cursor-pointer">
          <FaTripadvisor size={30} color='white' />
        </button>
        <a href={"/home"} className="flex gap-5 items-center text-white">
          <FaHome color={"white"} size={30} />
          <h2 className="max-xl:hidden text-white text-xl">Home</h2>
        </a>
        <a
          href={user && user.length !== 0 ? "/explore" : "/signup"}
          className="flex gap-5 items-center text-white"
        >
          <HiMiniMagnifyingGlass color={"white"} size={30} />
          <h2 className="max-xl:hidden text-white text-xl">Explore</h2>
        </a>
        <a
          href={user && user.length !== 0 ? "/notifications" : "/signup"}
          className="flex gap-5 items-center text-white"
        >
          <IoIosNotifications color={"white"} size={30} />
          <h2 className="max-xl:hidden text-white text-xl">Notifications</h2>
        </a>
        <a
          href={user && user.length !== 0 ? "/messages" : "/signup"}
          className="flex gap-5 items-center text-white"
        >
          <BsFillEnvelopeFill color={"white"} size={30} />
          <h2 className="max-xl:hidden text-white text-xl">Messages</h2>
        </a>
        <a
          href={user && user.length !== 0 ? `/${user.id}` : "/signup"}
          className="flex gap-5 items-center text-white"
        >
          <BiSolidUser color={"white"} size={30} />
          <h2 className="max-xl:hidden text-white text-xl">Profile</h2>
        </a>
        <a
          href={user && user.length !== 0 ? "/tweet" : "/signup"}
          className="text-white font-2xl font-semibold rounded-full bg-blue-500 py-3 hover:brightness-90 max-xl:hidden text-center"
        >
          Post
        </a>
        <a
          href={user && user.length !== 0 ? "/tweet" : "/signup"}
          className="max-xl:block hidden text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
      <div className="flex justify-between items-center hover:bg-gray-500 rounded-full py-2 px-3 brightness-75 duration-100 w-full">
        <div className="flex gap-2">
          {user.image ? (
            <img src={user.image} alt="profile" sizes="50" />
          ) : (
            <FaRegUserCircle
              size={50}
              color="white"
              className="max-xl:w-10 object-contain"
            />
          )}
          <div className="max-xl:hidden flex flex-col">
            {user.length !== 0 && user ? (
              <>
                <h2 className="text-white">{user.name}</h2>
                <h2 className="text-gray-400">@{user.id}</h2>
              </>
            ) : (
              <>
                <h2 className="text-white">username</h2>
                <h2 className="text-gray-400">@userid</h2>
              </>
            )}
          </div>
        </div>
        <AiOutlineEllipsis size={30} color="white" className="max-xl:hidden" />
      </div>
    </div>
  );
};

export default SideBar;
