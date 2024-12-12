import React, { useEffect, useRef } from "react";
import useConversation from "../../../StateManagment/UserConversation";
import { useSocketContext } from "../../../Context/SocketIO";
import gsap from "gsap";
const AllUsers = ({ user, isOpen, setIsOpen }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  const userRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.from(userRef.current, {
        y: -30,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: {
          amount: 1,
        },
      });
    }
  }, [isOpen]);
  return (
    <>
      <div
        ref={userRef}
        onClick={() => {
          setSelectedConversation(user);
          setIsOpen(false);
        }}
        className={`p-3 flex items-center gap-3 hover:bg-blue-800`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-14 rounded-full">
            <img src={`http://localhost:3000/${user.userPic}`} />
          </div>
        </div>
        <div className="leading-5">
          <h3 className="text-white">{user.fullName}</h3>
          <h4>{user.email}</h4>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
