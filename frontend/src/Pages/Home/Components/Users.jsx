import React from "react";
import User from "./User";
import GetAllUsers from "../../../Context/GetConversation";

const Users = () => {
  const { users } = GetAllUsers();

  return (
    <>
      {users.map((conversation) => {
        let lastMessage = conversation.lastMessage;
        let participant = conversation.participants;

        return participant.map((participant) => {
          return <User user={participant} lastMessage={lastMessage} />;
        });
      })}
    </>
  );
};

export default Users;
