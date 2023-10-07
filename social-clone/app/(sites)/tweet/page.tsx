import React, { useContext, useState } from "react";
import SideBar from "@/Components/Layout/SideBar";
import CreatePost from "@/Components/posts/CreatePost";

export default function Example() {
  return (
    <main className="flex">
      <SideBar />
      <CreatePost />
    </main>
  );
}
