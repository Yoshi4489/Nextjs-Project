import React from "react";
import ExclusiveTimeEvent from "./ExclusiveTimeEvent";
import SomeProducts from "./SomeProducts";
import Catalog from "./Catalog";
import SaleBanner from "./SaleBanner";

const Shop = () => {
  return (
    <div className="pl-72 pr-20 py-32 gap-3">
      <div className="w-full flex justify-between mt-5 flex-wrap banner-container">
        <ExclusiveTimeEvent />
        <SaleBanner />
      </div>
      <Catalog />
      <SomeProducts />
    </div>
  );
};

export default Shop;
