import React, { useState } from "react";
import useConversation from "../StateManagment/UserConversation.js";
import axios from "axios";
const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  let sendMessages = async (message) => {
    setLoading(true);
    if (selectedConversation && selectedConversation._id) {
      try {
        const messagesData = await axios.post(
          `/api/messages/send/${selectedConversation._id}`,
          { message }
        );
        console.log(messages);

        if (messages) {
          setMessages([...messages, messagesData.data.newMessage]);
          setLoading(false);
        } else {
          setMessages(messagesData.data);
          setLoading(false);
        }
        setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error("Error Sending messages:", error);
      }
    }
  };
  return { loading, sendMessages };
};

export default useSendMessages;
