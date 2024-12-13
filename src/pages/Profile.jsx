import React, { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import blankProfilr from "../assets/profilepic.webp";

const Profile = ({ setDisplaySideBarSm, setDisplayProfileBar,userDetails }) => {
  const navigate = useNavigate();
  const user = auth?.currentUser;
  const [posts, setPosts] = useState([]);

  const handleCreateClick = () => {
    navigate("/create");
  };
  const handleEditButton = () => {
    navigate("/edit")
  }

  const getPosts = async () => {
    try {
      if (!user) return;
      const postCollectionRef = collection(db, "posts");
      const q = query(postCollectionRef, where("user.uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const filteredPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(filteredPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    setDisplaySideBarSm(false);
    setDisplayProfileBar(false);
    getPosts();
  }, []);

  return (
    <div className="h-screen lg:h-[150vh] w-full flex flex-col lg:w-[80%] items-center scroll-container">
      <div className="h-[25%] lg:h-[25%] w-full bg-black">
        <img
          className="w-full h-full object-cover"
          src={userDetails.backdropPic}
          alt=""
        />
      </div>
      <div className="w-[90%] h-[8%] lg:h-[15%] flex items-center justify-between">
        <div className="w-[40%] lg:w-[30%] h-full flex justify-center">
          <img
            className="w-28 h-28 rounded-full -mt-[50%] md:w-44 md:h-44 md:-mt-[40%] lg:-mt-[20%]"
            src={userDetails.profilePic || blankProfilr}
            alt=""
          />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <button className="w-full h-8 rounded-full font-light border border-gray-400" onClick={handleEditButton}>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="w-[90%] h-[15%] flex flex-col gap-4">
        <p className="font-bold text-2xl lg:text-4xl">{userDetails.username}</p>
        <p className="text-sm lg:text-lg">
        {userDetails.bio}
        </p>
      </div>
      <div className="w-[90%] h-[52%] flex flex-col gap-4 relative">
        <div className="font-bold lg:text-2xl">My Posts</div>
        <div className="w-full h-[90%] flex flex-wrap overflow-scroll items-center gap-2 scroll-container">
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-[48%] h-2/3 lg:h-[75%]rounded-xl"
            >
              <img
                src={post.imageUrl || blankProfilr}
                alt={post.description || "Post Image"}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
        <div
          className="w-20 h-20 absolute bg-black bottom-0 right-0 rounded-full flex items-center justify-center text-white"
          onClick={handleCreateClick}
        >
          <HiOutlinePlusSm size={30} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
