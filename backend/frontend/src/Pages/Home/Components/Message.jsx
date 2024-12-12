import React from "react";

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("userInfo"));

  const itsme = message.senderId === authUser.id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme
    ? "bg-[#090d73] text-white"
    : "bg-[#0de3ff] text-black";

  const createdAt = new Date(message.timestamp);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className={`chat ${chatName}`}>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">{formattedTime}</time>
        </div>
        <div className={`chat-bubble ${chatColor}`}>{message.messages}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
};

export default Message;
