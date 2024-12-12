import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const GetConversation = () => {
  const [loading, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let getUsers = async () => {
      try {
        setloading(true);
        let token = Cookies.get("token");
        let usersData = await axios.get("/api/users/getUserProfile", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersData.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setloading(false);
      }
    };
    getUsers();
  }, []);
  return { users, loading };
};

export default GetConversation;
