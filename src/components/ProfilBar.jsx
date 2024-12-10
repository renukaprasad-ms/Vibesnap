import React from "react";

const ProfilBar = () => {
  return (
    <div className="w-[20%] h-screen  flex flex-col justify-start  items-center border-l-2 hidden lg:block">
      <div className="w-[80%] h-[40%] flex items-center justify-center">
        <img
          className="bg-black w-2/3 h-2/3 rounded-full object-cover"
          src=""
          alt="profile"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-sm ">Welcome Back</div>
        <div className="font-extrabold text-3xl">UserName</div>
      </div>
    </div>
  );
};

export default ProfilBar;
