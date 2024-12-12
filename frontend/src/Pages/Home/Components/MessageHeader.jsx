import React from "react";
import useConversation from "../../../StateManagment/UserConversation.js";
import { useSocketContext } from "../../../Context/SocketIO.jsx";

const MessageHeader = () => {
  const { selectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();
  const userOnline = (userId) => {
    return onlineUsers.includes(userId) ? "online" : "offline";
  };

  return (
    <>
      <div className="h-[10%] px-10 bg-[#508C9B] flex items-center gap-3">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img
              src={`http://localhost:3000/${selectedConversation.userPic}`}
            />
          </div>
        </div>
        <div className="leading-5">
          <h3 className="text-white">{selectedConversation.fullName}</h3>
          <h4 className="text-white">{userOnline(selectedConversation._id)}</h4>
        </div>
      </div>
    </>
  );
};

export default MessageHeader;
