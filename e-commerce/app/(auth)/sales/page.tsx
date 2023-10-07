"use client";

import NavBar from "@/Components/NavBar";
import SearchBar from "@/Components/SearchBar";
import { userContext } from "@/Components/UserContextProvider";
import { twoForOneProduct } from "@/data";
import React, { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const { addToCart } = useContext(userContext);
  return (
    <>
      <NavBar />
      <SearchBar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="pl-72 py-28">
        <div className="flex flex-col px-10 justidy-between">
          {twoForOneProduct.map((products) => {
            return Object.values(products).map((product) => {
              return (
                <div
                  className="flex justify-between border-b border-gray-300 py-5 active:opacity-10 duration-100 hover:scale-110"
                  onClick={() => addToCart(product.id)}
                >
                  <div className="flex gap-5">
                    <div className="bg-[#f5f5f5] px-5 py-5 rounded-sm flex items-center justify-center gap-3 best-offer">
                      <img
                        src={product.productOne.image}
                        className="w-10 h-10 object-contain"
                      />
                      <p>+</p>
                      <img
                        src={product.productTwo.image}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="w-8/12 mb-5">
                        <h2>{product.productOne.title}</h2>
                        <p>+</p>
                        <h2>{product.productTwo.title}</h2>
                      </div>
                    </div>
                  </div>
                  <h2>{product.price}</h2>
                </div>
              );
            });
          })}
        </div>
      </div>
    </>
  );
};

export default page;
