"use client";

import { db } from "@/Auth/firebase-config";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

export const userContext = createContext({});

const UserContextProvider = ({ children }: Props) => {
  const cookies = new Cookies();
  const [homePageCatalog, setHomePageCatalog] = useState("");
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getToken();
  }, [user]);

  function getToken() {
    const token = cookies.get("eCommerce_token");
    if (token) {
      const userRef = collection(db, "users");
      const userQuery = query(userRef, where("token", "==", token));
      onSnapshot(userQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          setUser({ ...doc.data(), id: doc.id });
          setCart(doc.data().cart);
        });
      });
    }
  }

  async function addToCart(id: string) {
    if (user.length !== 0 && user) {
      const docRef = doc(db, "users", user.id);
      try {
        setCart((prev) => [...prev, id])
        await updateDoc(docRef, {
          cart: [...cart, id], // Use the updated cart state here
        });
        toast.success('added to cart', {
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
        toast.error('Failed to add', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } else {
      router.push("/signup");
    }
  }
  

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        homePageCatalog,
        setHomePageCatalog,
        addToCart,
        cart,
        setCart,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
