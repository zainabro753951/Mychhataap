import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const GetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    let getAllUsersData = async () => {
      try {
        let token = Cookies.get("token");
        let AllusersData = await axios.get("/api/users/getAllUsers", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(AllusersData.data);
        setAllUsers(AllusersData.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getAllUsersData();
  }, []);

  return allUsers;
};

export default GetAllUsers;
