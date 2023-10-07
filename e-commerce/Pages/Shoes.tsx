'use client';

import React, { useContext } from "react";
import { productData } from "@/data";
import { userContext } from "@/Components/UserContextProvider";


const Shoes = () => {
  const { addToCart } = useContext(userContext);
  return (
    <>
      <div
        id={productData[0].shoes[0].id}
        className="relative flex flex-col items-center cursor-pointer  active:opacity-10 duration-100 hover:scale-110"
        onClick={() => addToCart(productData[0].shoes[0].id)}
      >
        <img
          src={productData[0].shoes[0].image}
          alt="shoes"
          className="w-36 h-36 object-contain bg-[#f5f6fa] p-3 rounded-full"
        />
        <h2 className="w-40 text-center">{productData[0].shoes[0].title}</h2>
        <p className="font-bold">{productData[0].shoes[0].price}</p>
        <div className="absolute top-0 right-0 flex items-center justify-center bg-black rounded-full w-10 h-10 text-white">
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
        </div>
      </div>
      <div
        id={productData[0].shoes[1].id}
        className="relative flex flex-col items-center cursor-pointer  active:opacity-10 duration-100 hover:scale-110"
        onClick={() => addToCart(productData[0].shoes[1].id)}
      >
        <img
          src={productData[0].shoes[1].image}
          alt="shoes"
          className="w-36 h-36 object-contain bg-[#f5f6fa] p-3 rounded-full"
        />
        <h2 className="w-40 text-center">{productData[0].shoes[1].title}</h2>
        <p className="font-bold">{productData[0].shoes[1].price}</p>
        <div className="absolute top-0 right-0 flex items-center justify-center bg-black rounded-full w-10 h-10 text-white">
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
        </div>
      </div>
      <div
        id={productData[0].shoes[2].id}
        className="relative flex flex-col items-center cursor-pointer  active:opacity-10 duration-100 hover:scale-110"
        onClick={() => addToCart(productData[0].shoes[2].id)}
      >
        <img
          src={productData[0].shoes[2].image}
          alt="shoes"
          className="w-36 h-36 object-contain bg-[#f5f6fa] p-3 rounded-full"
        />
        <h2 className="w-40 text-center">{productData[0].shoes[2].title}</h2>
        <p className="font-bold">{productData[0].shoes[2].price}</p>
        <div className="absolute top-0 right-0 flex items-center justify-center bg-black rounded-full w-10 h-10 text-white">
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
        </div>
      </div>
    </>
  );
};

export default Shoes;
