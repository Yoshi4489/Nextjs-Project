import { db } from "@/firebase-config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

interface ChatProps {
  senderID: string;
  reciverID: string;
}

const ChatButton = ({ senderID, reciverID }: ChatProps) => {
  const router = useRouter();
  async function chatHandle() {
    try {
      const chatID1 = senderID + reciverID;
      const chatID2 = reciverID + senderID;
      const queryChat = query(
        collection(db, "chats"),
        where("id", "==", chatID1),
        where("id", "==", chatID2)
      );
      const checkDoc = await getDocs(queryChat);
      if (checkDoc.size < 1) {
        await setDoc(doc(db, "chats", chatID1), {
          messages: []
        });
      }
      router.push(`/messages/${senderID}-${reciverID}`);
    } catch (error) {
      toast.error("Error please try again later", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error)
    }
  }

  return (
    <button
      className="relative rounded-full border-2 border-solid border-white text-white w-8 h-8 p-1 flex justify-center items-center messageBox"
      onClick={chatHandle}
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
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    </button>
  );
};

export default ChatButton;
