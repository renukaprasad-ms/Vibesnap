import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const ProfilBar = () => {
  const navigate = useNavigate()
  const handleProfileClick = () => {
    navigate("/profile/732467")
    
  }
  const user = auth?.currentUser
  return (
    <div className="w-1/5 h-screen  flex flex-col justify-center  items-center border-l-2 hidden lg:block">
      <div className="w-60 h-60 flex items-center justify-center ml-8" onClick={() => handleProfileClick()}>
        <img
          className="bg-black w-2/3 h-2/3 rounded-full object-cover"
          src={user.photoURL}
          alt="profile"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-sm ">Welcome Back</div>
        <div className="font-extrabold text-3xl">{user.displayName}</div>
      </div>
    </div>
  );
};

export default ProfilBar;
