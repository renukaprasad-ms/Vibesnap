import React from "react";
import { FaHeart } from "react-icons/fa6";
import { PiShareFatFill } from "react-icons/pi";

const Post = ({ post }) => {
  const date = post.timestamp.toDate();
const hours = date.getHours();
const Day = date.toLocaleString('en-US', { weekday: 'long' });
const formattedTime = `${hours} ${Day}`;
  return (
    <div className="w-5/6 h-auto border flex flex-col items-center bg-[#F7EBFF] rounded-3xl">
      <div className="w-full h-14 lg:h-28  flex items-center">
        <div className="w-10 h-10 lg:h-16 lg:w-16 bg-black rounded-full m-2">
          <img
            className="h-full w-full object-cover rounded-full"
            src={post.user.photoURL}
            alt=""
          />
        </div>
        <div>
          <p className="text-sm font-semibold lg:text-2xl">{post.user.displayName}</p>
          <p className="text-xs opacity-40 lg:text-base">{formattedTime}</p>
        </div>
      </div>
      <div className="ml-4 w-5/6 flex items-start justify-start">
        <p className="text-xs lg:text-xl">{post.description}</p>
      </div>
      <div className="w-[90%] h-48 lg:h-96 flex items-center justify-center mt-4">
        <img
          className="w-[100%] h-[100%] object-cover rounded-xl"
          src={post.imageUrl}
          alt=""
        />
      </div>
      <div className="w-5/6 h-20  flex items-center justify-between">
        <div className="flex gap-2 w-1/3 items-center">
        <FaHeart className="lg:hidden text-pink-300"></FaHeart>
        <FaHeart size={25} className="hidden lg:block text-pink-300" />
        <span className="text-pink-300">{post.likes}</span>
        </div>
        
        <button className="w-12 h-6 lg:w-24 lg:h-10 bg-black/10 rounded-full flex items-center justify-center">
          <PiShareFatFill className="lg:hidden" />
          <PiShareFatFill size={20} className="hidden lg:block" />
        </button>
      </div>
    </div>
  );
};

export default Post;
