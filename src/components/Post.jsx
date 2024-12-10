import React from "react";
import { FaHeart } from "react-icons/fa6";
import { PiShareFatFill } from "react-icons/pi";

const Post = () => {
  return (
    <div className="w-5/6 h-auto border border-yellow-500 flex flex-col items-center">
      <div className="w-full h-14 lg:h-28  flex items-center">
        <div className="w-10 h-10 bg-black rounded-full m-2">
          <img
            className="h-full w-full object-cover rounded-full"
            src=""
            alt=""
          />
        </div>
        <div>
          <p className="text-sm font-semibold lg:text-2xl">UserName</p>
          <p className="text-xs opacity-40 lg:text-base">2 hours</p>
        </div>
      </div>
      <div className="ml-4">
        <p className="text-xs">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          ipsa sapiente non, eveniet 
        </p>
      </div>
      <div className="w-[90%] h-48 flex items-center justify-center mt-4">
        <img className="w-[100%] h-[100%] object-cover rounded-xl" src="https://s3-alpha-sig.figma.com/img/92fa/0669/9fc5c5ac336e1596b0abe398f32fdc70?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mMphcmKQsBoabGeXTFFD15JhAA5xPBJcam28-pi3XzFVRoUggoy32oRtGOcDXM6SE15AY6a8GpolfuJJe9HCwvl4f2a3n3isrcC1jmGcyO7BxHC-Oh0hnl3zMIlLbDHdoB4liaKo7hscGtk2uIAAwHnHAB3ySpyVkDSOp4gDSDuH9FsXqQZ~gkT-oZ94dBCWuu3FfdXyGPmfNDidg-IIl81ZaflHOvd4oYlhsrIcrdg9sefzMHtE3pehhXvG1uiOnz0vF0vYfDtEkbnMqg4Upv5vz7POc4Le9LXXux44m3nzZEOXRP6T7Lg5dR9ZPPMXQ6jq6finIHfkQRB2TvlnYg__" alt="" />
      </div>
      <div className="w-5/6 h-10  flex items-center justify-between">
        <FaHeart/>
        <PiShareFatFill/>
      </div>
    </div>
  );
};

export default Post;
