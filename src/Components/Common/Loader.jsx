import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
          <div className="absolute border-t-4 border-gray-300 border-solid rounded-full w-16 h-16"></div>
        </div>
        <p className="text-blue-500 text-lg font-semibold ml-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
