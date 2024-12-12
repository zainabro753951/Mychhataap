import React from "react";

const DefaultPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl py-3 text-white font-semibold">Chat App</h2>
        <p className="select-none">
          Send and receive messages without keeping your phone online.
        </p>
        <p className="select-none">
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
      </div>
    </div>
  );
};

export default DefaultPage;
