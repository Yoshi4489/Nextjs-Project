"use client";

import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useRouter } from "next/navigation";

export default function Example() {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(people[0]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    if (selected) {
      router.push(`/${selected.id}`);
    }
  }, [selected]);

  function getAllUser() {
    const users: object[] = [];
    const userRef = collection(db, "users");
    const queryUser = query(userRef);
    onSnapshot(queryUser, (snapshot) => {
      snapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
    });
    setPeople(users);
  }

  const filteredPeople =
    inputValue === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(inputValue.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div className="w-full p-5">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(person) => person.name}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setInputValue("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && inputValue !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-[#e3e8ed]" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <a
                            href={`/${selected.id}`}
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </a>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            ></span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
}
