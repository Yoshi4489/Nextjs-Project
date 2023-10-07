"use client";

import React, { useContext } from "react";
import { userContext } from "./UserContextProvider";
import AllItems from "@/Pages/AllItems";
import Shoes from "@/Pages/Shoes";
import Accessories from "@/Pages/Accessories";
import Bag from "@/Pages/Bag";
import TShirt from "@/Pages/TShirt";
import Jacket from "@/Pages/Jacket";
import Glasses from "@/Pages/Glasses";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SomeProducts = () => {
  const { homePageCatalog } = useContext(userContext);
  return (
    <div className="flex gap-7 pr-5 flex-wrap someproducts">
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
      {homePageCatalog === "All Items" && <AllItems />}
      {homePageCatalog === "Shoes" && <Shoes />}
      {homePageCatalog === "Accessories" && <Accessories />}
      {homePageCatalog === "Bag" && <Bag />}
      {homePageCatalog === "T-Shirt" && <TShirt />}
      {homePageCatalog === "Jacket" && <Jacket />}
      {homePageCatalog === "Glasses" && <Glasses />}
    </div>
  );
};

export default SomeProducts;
