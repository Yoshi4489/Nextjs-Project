import { db } from "@/firebase-config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { Fragment, useState } from "react";
import swal from "sweetalert";

const options = [
  {
    title: "Delete",
    icon: `
    http://cdn.onlinewebfonts.com/svg/img_487212.png
`,
    color: "text-red-500",
  },
  {
    title: "Edit",
    icon: `
    http://cdn.onlinewebfonts.com/svg/img_426586.png
`,
    color: "text-black",
  },
];

interface PopoverProps {
  postID: string;
}

const EditPopover = ({ postID }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function askPermission() {
    if (postID) {
      setIsLoading(true);
      swal("Do you want to delete post?", {
        buttons: {
          Delete: true,
          Cancel: true,
        },
      }).then((value) => {
        switch (value) {
          case "Delete":
            deletePost();
            break;
          default:
            break;
        }
      });
    }

    setIsLoading(false);
  }

  async function deletePost() {
    try {
      setIsLoading(true);
      const docRef = doc(db, "posts", postID);
      await deleteDoc(docRef);
      swal("Success", "Your post was deleted", "success");
    } catch (error) {
      swal("Error", "Please try again later", "error");
    }
    setIsLoading(false);
  }

  function editPost() {
    setIsLoading(true);
    swal("Write something here:", {
      content: 'input'
    })
    .then(async (value) => {
      if (value && postID) {
        try {
          const docRef = doc(db, 'posts', postID);
          await updateDoc(docRef, {
            caption: value
          })
          swal('Success', 'The post has been edited', 'success')
        } catch (error) {
          swal("Error", "Please try again later", "error");
        }
      }
    });
    
    setIsLoading(false);
  }

  return (
    <Fragment>
      <button className="relative" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <div className="bg-white flex flex-col rounded-xl py-2">
            {options.map((option, index) => (
              <button
                key={index}
                className={`flex px-10 py-2 gap-5 ${option.color} cursor-pointer hover:brightness-75 px-10 items-center`}
                onClick={() =>
                  option.title === "Delete" ? askPermission() : editPost()
                }
                disabled={isLoading}
              >
                <img className="w-6 h-6 object-contain" src={option.icon} />
                <h2>{option.title}</h2>
              </button>
            ))}
          </div>
        ) : (
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
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        )}
      </button>
    </Fragment>
  );
};

export default EditPopover;
