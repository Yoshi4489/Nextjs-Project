'use client'

import Link from "next/link";
import React, { useContext } from "react";
import { userContext } from "./UserContextProvider";

const SearchBar = () => {
  const { user } = useContext(userContext);
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 px-10 py-5 flex justify-between items-center z-50">
      <div className="flex gap-5 items-center">
        <img
          src="http://clipart-library.com/images/kcMKg476i.png"
          alt="logo"
          className="w-12 h-12 object-cover logo"
        />
        <h2 className="font-bold text-xl title">YoshiMart</h2>
      </div>
      <div className="w-9/12 flex items-center gap-5 input-container">
        <input
          type="text"
          className="rounded-full px-10 py-3 border border-gray-300 w-full"
          placeholder="Search"
        />
        <button className="font-bold font-mono rounded-full px-10 py-3 text-white bg-black shadow-whiteShadow border-b-2 border-black search-button">Search</button>
      </div>
      <Link href={user.length !== 0 ? '/account' : '/signup'}>
        {
          user.length !== 0 && user.image ? (
            <img src={user.image} alt="profile" className="w-10 h-10 object-contain rounded-full shadow-md" />
          )
          : (
                    <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
          )
        }
      </Link>
    </div>
  );
};

export default SearchBar;
