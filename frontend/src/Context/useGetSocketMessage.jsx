import React, { useEffect } from "react";
import { useSocketContext } from "./SocketIO.jsx";
import useConversation from "../StateManagment/UserConversation.js";
import sound from "../assets/note.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      const notifications = new Audio(sound);
      notifications.play();
      setMessages([...messages, newMessage]); // Correct spreading
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};

export default useGetSocketMessage;
