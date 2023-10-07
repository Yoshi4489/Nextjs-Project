"use client";

import { db } from "@/Auth/firebase-config";
import NavBar from "@/Components/NavBar";
import SearchBar from "@/Components/SearchBar";
import { userContext } from "@/Components/UserContextProvider";
import { PromoCode, productData, twoForOneProduct } from "@/data";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const { cart, setCart, user } = useContext(userContext);
  const [usePromo, setUsePromo] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [cart]);

  function calculatePrice() {
    let value = 0;
    for (const cartID of cart) {
      for (const items of productData) {
        for (const item of Object.values(items)) {
          for (const product of Object.values(item)) {
            if (product.id == cartID) {
              value += parseFloat(product.price.replace("$", ""));
            }
          }
        }
      }
    }

    for (const cartID of cart) {
      for (const products of twoForOneProduct) {
        for (const product of Object.values(products)) {
          if (product.id === cartID) {
            value += parseFloat(product.price.replace("$", ""));
          }
        }
      }
    }
    if (value < 100) {
      const taxPrice = parseFloat((value % 7).toFixed(2));
      setTax(taxPrice);
    }
    if (value < 500 && value !== 0) {
      const shippingPrice = 15;
      setShipping(shippingPrice);
    }
    const discount = value - value * (percentage / 100);
    percentage ? setPrice(discount) : setPrice(value);
  }

  async function deleteCart(id: number) {
    if (user) {
      try {
        const filteredCart = cart.filter((product) => product !== id);
        const docRef = doc(db, "users", user.id);
        await updateDoc(docRef, {
          cart: filteredCart,
        });
        setCart(filteredCart);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handlePurchase() {
    try {
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, {
        cart: [],
      });
      setCart([]);
      toast.success('Purchase Complete', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.log(error);
    }
  }

  function checkPromoCode(promoCode: string) {
    const codeFilter = PromoCode.map((items) => {
      return Object.values(items).filter((item) => item.code === promoCode);
    });
    if (codeFilter[0].length > 0) {
      setPercentage(parseInt(codeFilter[0][0].discount.replace("%", "")));
    } else setPercentage(0);
  }

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
      <div className="pl-72 pr-20 py-28 flex gap-28">
        <div className="w-6/12">
          {twoForOneProduct.map((products) => {
            return Object.values(products).map((product) => {
              return cart.map((cartID) => {
                return (
                  <>
                    {cartID === product.id ? (
                      <div className="flex justify-between border-b border-gray-300 py-5 text">
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
                            <button
                              className="cursor-pointer"
                              onClick={() => deleteCart(product.id)}
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <h2>{product.price}</h2>
                      </div>
                    ) : null}
                  </>
                );
              });
            });
          })}
          {productData.map((items) => {
            return Object.values(items).map((item) => {
              return Object.values(item).map((product) => {
                return cart.map((cartID) => {
                  return (
                    <>
                      {cartID === product.id ? (
                        <div
                          className="flex justify-between border-b border-gray-300 py-5"
                          id={product.id}
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
                              <button
                                className="cursor-pointer"
                                onClick={() => deleteCart(product.id)}
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <h2>{product.price}</h2>
                        </div>
                      ) : null}
                    </>
                  );
                });
              });
            });
          })}
        </div>
        <div className="w-6/12 flex flex-col summary-container">
          <h2 className="text-2xl font-medium mb-5">Summary</h2>

          <div className="w-9/12 font-medium flex flex-col gap-3">
            <button
              onClick={() => setUsePromo((prev) => !prev)}
              className="flex justify-between w-full"
            >
              <p>Do you have a Promo Code?</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 cursor-pointer ${
                  usePromo ? "rotate-180" : null
                } ease-out duration-100`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            {usePromo ? (
              <input
                type="text"
                className="outline-0 shadow py-2 rounded-md px-5"
                onChange={(e) => checkPromoCode(e.target.value)}
              />
            ) : null}

            <div className="w-full flex justify-between">
              <p>Subtotal</p>
              <p>${price}</p>
            </div>
            <div className="w-full flex justify-between">
              <p>Estimated Shipping & Handling</p>
              <p>${shipping}</p>
            </div>
            <div className="w-full flex justify-between">
              <p>Estimated Tax</p>
              <p>${tax}</p>
            </div>
            <p className="py-5 border-t border-b border-gray-300 w-full">
              Total : ${(price + tax + shipping).toFixed(2)}
            </p>
          </div>
          <div className="my-5 gap-5 flex flex-col">
            <button
              className="bg-black text-white w-9/12 rounded-full py-4 font-semibold  text-lg"
              onClick={() => handlePurchase()}
            >
              Checkout
            </button>
            <button
              className="bg-gray-300 border w-9/12 rounded-full py-4 flex justify-center items-center"
              onClick={() => handlePurchase()}
            >
              <img
                src="https://www.nike.com/assets/experience/pet/payment-icons/paypal@2x.png"
                alt="paypal"
                className="w-10 h-10 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
