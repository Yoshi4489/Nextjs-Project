"use client";

import NavBar from "@/Components/NavBar";
import SearchBar from "@/Components/SearchBar";
import { userContext } from "@/Components/UserContextProvider";
import { productData } from "@/data";
import React, { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const { addToCart } = useContext(userContext);
  return (
    <>
      <SearchBar />
      <NavBar />
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
        <div className="px-10">
          {productData.map((items) => {
            return Object.values(items).map((item) => {
              return Object.values(item).map((product) => {
                return (
                  <div
                    className="flex justify-between border-b border-gray-300 py-5 cursor-pointer active:opacity-10 duration-100 hover:scale-110"
                    id={product.id}
                    key={product.id}
                    onClick={() => addToCart(product.id)}
                  >
                    <div className="flex gap-5">
                      <div className="bg-[#f5f5f5] px-5 py-5 rounded-sm">
                        <img
                          src={product.image}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <h2 className="w-8/12">{product.title}</h2>
                      </div>
                    </div>
                    <h2>{product.price}</h2>
                  </div>
                );
              });
            });
          })}
        </div>
      </div>
    </>
  );
};

export default CartPage;
