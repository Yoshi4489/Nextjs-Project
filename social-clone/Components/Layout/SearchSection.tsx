import React from "react";
import SearchBar from "../ui/SearchBar";
import SideBar from "./SideBar";
import RecommendedBar from "./RecommendedBar";
import RecommendedPost from "../posts/RecommendedPost";

const SearchSection = () => {
  return (
    <main className="flex">
      <SideBar />
      <div className="w-5/12 border-r max-lg:w-8/12">
        <SearchBar />
        <RecommendedPost />
      </div>
      <div className="max-lg:hidden">
        <RecommendedBar />
      </div>
    </main>
  );
};

export default SearchSection;
