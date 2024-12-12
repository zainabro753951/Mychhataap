import React from "react";
import Left from "./Components/Left";
import Right from "./Components/Right";

const Home = () => {
  return (
    <>
      <div className="w-full flex h-screen overflow-hidden">
        <Left />
        <Right />
      </div>
    </>
  );
};

export default Home;
