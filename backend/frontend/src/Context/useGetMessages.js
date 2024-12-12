import React, { useEffect, useState } from "react";
import useConversation from "../StateManagment/UserConversation.js";
import axios from "axios";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let getMessages = async () => {
      if (selectedConversation && selectedConversation._id) {
        try {
          const messagesData = await axios.get(
            `/api/messages/get/${selectedConversation._id}`
          );
          setMessages(messagesData.data);
          setTimeout(() => setLoading(false), 1000);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
