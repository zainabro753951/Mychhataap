import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full h-full bg-[#0B2F9F] items-center justify-center">
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton bg-[#161D6F] h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton bg-[#161D6F] h-4 w-20"></div>
            <div className="skeleton bg-[#161D6F] h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton bg-[#161D6F] h-32 w-full"></div>
      </div>
    </div>
  );
};

export default Loading;
