import React, { useEffect, useRef, useState } from "react";
import GetConversation from "../../../Context/GetConversation.jsx";
import useConversation from "../../../StateManagment/UserConversation.js";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import User from "./User.jsx";
import GetAllUsers from "../../../Context/GetAllUsers.jsx";
import AllUsers from "./AllUsers.jsx";
import { gsap } from "gsap";

const Search = () => {
  const [search, setSearch] = useState("");
  const { users } = GetConversation();
  const allUsers = GetAllUsers();
  const { setSelectedConversation } = useConversation();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleSelectUser = (user) => {
    setSelectedConversation(user);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="p-5">
      <div className=" relative ">
        <div className="justify-between items-center text-3xl flex">
          <h1 className="py-3 font-semibold text-white">Chat</h1>
          <span
            onClick={handleToggleDropdown}
            className="cursor-pointer p-2 transition-all duration-200 hover:bg-blue-500 hover:text-cyan-200 rounded-full"
          >
            <IoChatbubbleEllipsesOutline />
          </span>
        </div>
        <div
          ref={dropdownRef}
          className={`w-[400px] fixed bg-slate-800 cursor-pointer z-50 left-[370px] overflow-hidden transition-all duration-500 rounded-xl ${
            isOpen ? "max-h-full" : "max-h-0"
          }`}
        >
          <div className="p-5 w-full h-full">
            {allUsers.map((user) => {
              return (
                <AllUsers user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
              );
            })}
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!search) return;
          const conversation = users.find((user) => {
            return user.fullName.toLowerCase().includes(search.toLowerCase());
          });
          if (conversation) {
            setSelectedConversation(conversation);
            setSearch(" ");
          } else {
            alert("User not found");
          }
        }}
        className="flex items-center max-w-sm mx-auto"
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
};

export default Search;
