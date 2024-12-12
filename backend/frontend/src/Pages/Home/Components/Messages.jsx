import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../../Context/useGetMessages.js";
import Loading from "./Loading.jsx";
import BlankPage from "./BlankPage.jsx";
import useGetSocketMessage from "../../../Context/useGetSocketMessage.jsx";
const Messages = () => {
  const { messages, loading } = useGetMessages();
  useGetSocketMessage();

  const lastMessage = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      lastMessage.current
        ? lastMessage.current?.scrollIntoView({ behavior: "smooth" })
        : null;
    }, 100);
  }, [messages]);

  return (
    <div key={"diff"} className="h-[80%] w-full p-3 overflow-x-auto">
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => {
          return (
            <>
              <div key={message.id} ref={lastMessage}>
                <Message message={message} />
              </div>
            </>
          );
        })
      )}
      {!loading && messages.length === 0 && <BlankPage />}
    </div>
  );
};

export default Messages;
