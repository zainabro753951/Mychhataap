import React from "react";
import Search from "./Search";
import Users from "./Users";

const Left = () => {
  return (
    <>
      <div className="w-[30%] bg-[#161D6F] h-full overflow-x-auto">
        <Search />
        <Users />
      </div>
    </>
  );
};

export default Left;
