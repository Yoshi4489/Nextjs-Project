import React from "react";
import { twoForOneProduct } from "@/data";

const ExclusiveTimeEvent = () => {
  return (
    <main className="flex-col w-6/12 exclusive-product-container">
        <div className="bg-[#fff3fd] flex justify-center items-center flex-col rounded-3xl w-full exclusive-product relative pb-5">
          <div className="flex items-center gap-3 -translate-y-8 products z-10">
            <img
              src={twoForOneProduct[0][0].productOne.image}
              alt="product"
              className="w-32 h-32 object-contain bg-[#ffcfe5] p-2 rounded-full"
            />
            <p className="font-bold text-2xl">+</p>
            <img
              src={twoForOneProduct[0][0].productTwo.image}
              alt="product"
              className="w-32 h-32 object-contain bg-[#c9ade8] p-2 rounded-full"
            />
          </div>
          <div className="-translate-y-5 text">
            <h2 className="text-4xl font-black font">Buy 1 Get 1 Free!!</h2>
            <p className="text-gray-500 font-sans text-center mt-2 text-sm">
              *Valid until 18 January 2023
            </p>
          </div>
          <a
            href="/sales"
            className="absolute bg-[#effd68] rounded-full shop-button p-10 w-32 h-32 flex items-center justify-center font-serif font-xl font-bold flex-col -right-10 -bottom-16 exclusive-link"
          >
            <img
              src="./decoration.png"
              alt="decoration"
              className="absolute -right-5 -top-5 w-20 h-20 object-contain "
            />
            <p>Shop</p>
            <p>Now</p>
          </a>
        </div>
        <div className="flex items-center gap-2 px-10 rounded-2xl text-white bg-black w-full pt-10 pb-3 relative extra-products -z-10 -translate-y-8">
          <p>More:</p>
          <img
            src={twoForOneProduct[0][1].productOne.image}
            alt="product"
            className="w-10 h-10 object-contain bg-[#ffcfe5] p-2 rounded-full"
          />
          <p className="font-bold text-2xl">+</p>
          <img
            src={twoForOneProduct[0][1].productTwo.image}
            alt="product"
            className="w-10 h-10 object-contain bg-[#c9ade8] p-2 rounded-full"
          />
          <img
            src={twoForOneProduct[0][2].productOne.image}
            alt="product"
            className="w-10 h-10 object-contain bg-[#ffcfe5] p-2 rounded-full"
          />
          <p className="font-bold text-2xl">+</p>
          <img
            src={twoForOneProduct[0][2].productTwo.image}
            alt="product"
            className="w-10 h-10 object-contain bg-[#c9ade8] p-2 rounded-full"
          />
        </div>
    </main>
  );
};

export default ExclusiveTimeEvent;
