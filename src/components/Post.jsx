import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { PiShareFatFill } from "react-icons/pi";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const Post = ({ post }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [likes, setLikes] = useState(post.likes); // Initialize likes state with the value from the post object

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userRef = doc(db, "users", post.user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();
  }, [post.user.uid]);

  const date = post.timestamp.toDate();
  const hours = date.getHours();
  const Day = date.toLocaleString("en-US", { weekday: "long" });
  const formattedTime = `${hours} ${Day}`;

  const handleLike = async () => {
    const postRef = doc(db, "posts", post.id);

    try {
      await updateDoc(postRef, {
        likes: increment(1),
      });

      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShare = () => {
    const shareData = {
      title: post.description,
      text: post.description,
      url: post.imageUrl,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((error) => console.error("Error sharing post:", error));
    }
  };

  return (
    <div className="w-5/6 h-auto border flex flex-col items-center bg-[#F7EBFF] rounded-3xl">
      <div className="w-full h-14 lg:h-28 flex items-center">
        <div className="w-10 h-10 lg:h-16 lg:w-16 bg-black rounded-full m-2">
          <img
            className="h-full w-full object-cover rounded-full"
            src={userDetails?.profilePic}
            alt=""
          />
        </div>
        <div>
          <p className="text-sm font-semibold lg:text-2xl">{userDetails?.username}</p>
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
      <div className="w-5/6 h-20 flex items-center justify-between">
        <div className="flex gap-2 w-1/3 items-center">
          <FaHeart
            onClick={handleLike}
            className="lg:hidden text-pink-300 cursor-pointer"
          />
          <FaHeart
            size={25}
            onClick={handleLike}
            className="hidden lg:block text-pink-300 cursor-pointer"
          />
          <span className="text-pink-300">{likes}</span>
        </div>
        <button
          className="w-12 h-6 lg:w-24 lg:h-10 bg-black/10 rounded-full flex items-center justify-center"
          onClick={handleShare}
        >
          <PiShareFatFill className="lg:hidden" />
          <PiShareFatFill size={20} className="hidden lg:block" />
        </button>
      </div>
    </div>
  );
};

export default Post;
