import React, { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser && authUser.userId) {
      const socket = io("http://localhost:3000/", {
        query: {
          userId: authUser.userId, // Ensure this is the correct property
        },
      });

      setSocket(socket);
      socket.on("getOnline", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setOnlineUsers([]);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
