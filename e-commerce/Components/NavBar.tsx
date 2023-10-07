"use client";

import React, { useContext } from "react";
import { userContext } from "./UserContextProvider";

const NavBar = () => {
  const { user } = useContext(userContext);
  return (
    <div className="fixed top-[90px] w-64 flex flex-col h-screen justify-between border-r-2 border-gray-300 z-50">
      <div className="flex flex-col pb-5 pt-7 gap-3 ">
        <a
          href={"/"}
          className={`flex gap-3 w-8/12 mx-auto rounded-full py-2 pl-5 items-center ${
            window.location.pathname === "/" ? "current-page" : "text-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <h2
            className={`${
              window.location.pathname === "/"
                ? "font-bold text-sm"
                : "text-gray-300"
            }`}
          >
            Home
          </h2>
        </a>
        <a
          href={"/sales"}
          className={`flex gap-3 w-8/12 mx-auto rounded-full py-2 pl-5 items-center ${
            window.location.pathname === "/sales"
              ? "current-page"
              : "text-gray-300"
          }`}
        >
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
              d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <h2
            className={`${
              window.location.pathname === "/sales"
                ? "font-bold text-sm"
                : "text-gray-300"
            }`}
          >
            Best offers
          </h2>
        </a>
        <a
          href={"/product"}
          className={`flex gap-3 w-8/12 mx-auto rounded-full py-2 pl-5 items-center ${
            window.location.pathname === "/product"
              ? "current-page"
              : "text-gray-300"
          }`}
        >
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
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
            />
          </svg>
          <h2
            className={`${
              window.location.pathname === "/product"
                ? "font-bold text-sm"
                : "text-gray-300"
            }`}
          >
            Product
          </h2>
        </a>
        <a
          href={"/contact"}
          className={`flex gap-3 w-8/12 mx-auto rounded-full py-2 pl-5 items-center ${
            window.location.pathname === "/contact"
              ? "current-page"
              : "text-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clipRule="evenodd"
            />
          </svg>

          <h2
            className={`${
              window.location.pathname === "/contact"
                ? "font-bold text-sm"
                : "text-gray-300"
            }`}
          >
            Contact
          </h2>
        </a>
        <div className="mx-auto mt-3 px-5 pt-5 rounded-md w-40 bg-[#ffff80] relative trend-product">
          <h2 className="w-6/12 font-black text-xl">Trend Product</h2>
          <img
            src="../shoe.png"
            alt="shoe"
            className="w-40 h-40 object-cover -rotate-70 ml-3"
          />
          <img
            src="../decoration.png"
            alt="decoration"
            className="h-24 w-24 object-cover absolute -top-8 -right-10"
          />
          <a
            href={"/product"}
            className="absolute bottom-5 right-5 p-3 rounded-full text-white bg-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
      <div
        className={`flex items-center flex-col gap-2 border-t-2 border-gray-300 mb-24 py-5 setting-container ${
          window.location.pathname === "/account"
            ? "text-black"
            : "text-gray-300"
        }`}
      >
        <a
          href={user.length !== 0 ? "/account" : "/signup"}
          className={`flex gap-3 w-8/12 mx-auto rounded-full py-2 pl-5 items-center ${
            window.location.pathname === "/account"
              ? "text-black"
              : "text-gray-300"
          }`}
        >
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>

          <h2
            className={`${
              window.location.pathname === "/account"
                ? "text-black"
                : "text-gray-300"
            }}`}
          >
            Account
          </h2>
        </a>
        <a
          href={"/cart"}
          className={`flex gap-3 w-8/12 mx-auto rounded-full py-2 pl-5 items-center ${
            window.location.pathname === '/cart'
            ? 'text-black'
            : 'text-gray-300'
          }`}
        >
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <h2
            className={`${
              window.location.pathname === "/cart"
                ? "text-black"
                : "text-gray-300"
            }}`}
          >
            Cart
          </h2>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
