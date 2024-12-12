import React from "react";
import useConversation from "../../../StateManagment/UserConversation.js";
import { useSocketContext } from "../../../Context/SocketIO.jsx";

const User = ({ user, lastMessage }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <>
      <div
        onClick={() => setSelectedConversation(user)}
        className={`p-3 flex items-center gap-3 transition-all duration-200 hover:bg-blue-800 ${
          isSelected ? "bg-blue-600" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-14 rounded-full">
            <img src={`http://localhost:3000/${user.userPic}`} />
          </div>
        </div>
        <div className="leading-5">
          <h3 className="text-white">{user.fullName}</h3>
          <h4>{lastMessage ? lastMessage.messages : ""}</h4>
        </div>
      </div>
    </>
  );
};

export default User;
