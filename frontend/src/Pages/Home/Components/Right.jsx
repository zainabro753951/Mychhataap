import React from "react";
import MessageHeader from "./MessageHeader";
import MessageFooter from "./MessageFooter";
import Messages from "./Messages";
import useConversation from "../../../StateManagment/UserConversation.js";
import DefaultPage from "./DefaultPage.jsx";

const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <>
      <div className="w-[70%] h-full bg-[#0B2F9F]">
        {selectedConversation !== null ? (
          <>
            <MessageHeader />
            <Messages />
            <MessageFooter />
          </>
        ) : (
          <DefaultPage />
        )}
      </div>
    </>
  );
};

export default Right;
