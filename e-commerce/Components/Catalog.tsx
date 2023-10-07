"use client";

import React, { useContext, useEffect } from "react";
import { userContext } from "./UserContextProvider";

const Catalog = () => {
  useEffect(() => {
    setHomePageCatalog("All Items");
  }, []);
  const { homePageCatalog, setHomePageCatalog } = useContext(userContext);
  return (
    <div className="flex justify-evenly font-bold text-xl mb-5 flex-wrap gap-5">
      <h2
        className={
          homePageCatalog === "All Items" ? "current-catalog" : "text-gray-300 cursor-pointer"
        }
        onClick={() => setHomePageCatalog("All Items")}
      >
        All Items
      </h2>
      <h2
        className={
          homePageCatalog === "Shoes" ? "current-catalog" : "text-gray-300 cursor-pointer"
        }
        onClick={() => setHomePageCatalog("Shoes")}
      >
        Shoes
      </h2>
      <h2
        className={
          homePageCatalog === "Accessories"
            ? "current-catalog"
            : "text-gray-300  cursor-pointer"
        }
        onClick={() => setHomePageCatalog("Accessories")}
      >
        Accessories
      </h2>
      <h2
        className={
          homePageCatalog === "Bag" ? "current-catalog" : "text-gray-300 cursor-pointer"
        }
        onClick={() => setHomePageCatalog("Bag")}
      >
        Bag
      </h2>
      <h2
        className={
          homePageCatalog === "T-Shirt" ? "current-catalog" : "text-gray-300 cursor-pointer"
        }
        onClick={() => setHomePageCatalog("T-Shirt")}
      >
        T-Shirt
      </h2>
      <h2
        className={
          homePageCatalog === "Jacket" ? "current-catalog" : "text-gray-300 cursor-pointer"
        }
        onClick={() => setHomePageCatalog("Jacket")}
      >
        Jacket
      </h2>
      <h2
        className={
          homePageCatalog === "Glasses" ? "current-catalog" : "text-gray-300 cursor-pointer"
        }
        onClick={() => setHomePageCatalog("Glasses")}
      >
        Glasses
      </h2>
    </div>
  );
};

export default Catalog;
