import React from "react";
import ImageSec from "../components/ImageSec";
import LoginSec from "../components/LoginSec";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden justify-end flex relative items-center flex-col lg:flex-row">
      <div className="w-full h-[100vh]  absolute lg:relative lg:w-1/2">
        <ImageSec />
      </div>
      <div className=" bg-white items-center z-50 w-full h-1/4 rounded-t-[100px] flex flex-col lg:w-[calc(50%-40px)] lg:rounded-none lg:h-screen  justify-center lg:ml-10 lg:border-l-4">
        <LoginSec />
      </div>
    </div>
  );
};

export default LoginPage;
