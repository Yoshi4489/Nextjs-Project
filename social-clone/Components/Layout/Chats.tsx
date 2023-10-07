"use client";

import { db } from "@/firebase-config";
import { userContext } from "@/hooks/UserContextProvider";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

const Chats = () => {
  const { user } = useContext(userContext);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const chatRef = collection(db, "userChats");
    const queryChat = query(
      chatRef,
      where("user1", "==", user.id),
      where("user2", "==", user.id)
    );
    const userData: object[] = [];
    const subscribe = onSnapshot(queryChat, (snapshot) => {
      snapshot.forEach((doc) => {
        userData.push({ ...doc.data(), id: doc.id });
      });
    });

    setPeople(userData);

    return () => subscribe();
  }, []);

  return <div>Chats</div>;
};

export default Chats;
