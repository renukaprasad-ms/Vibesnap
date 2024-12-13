import React, { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import blankProfilr from "../assets/profilepic.webp";

const Profile = ({ setDisplaySideBarSm, setDisplayProfileBar }) => {
  const navigate = useNavigate();
  const user = auth?.currentUser;
  const [posts, setPosts] = useState([]);

  const handleCreateClick = () => {
    navigate("/create");
  };

  const getPosts = async () => {
    try {
      if (!user) return; // Ensure the user is logged in
      const postCollectionRef = collection(db, "posts");
      const q = query(postCollectionRef, where("user.uid", "==", user.uid)); // Filter posts by UID
      const querySnapshot = await getDocs(q);
      const filteredPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID if needed
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
          src="https://s3-alpha-sig.figma.com/img/d4b7/bb5d/bd8b3943a763e1d2e13b607efc1e224e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A1pL5l3UkYsKUQu~NsQFaKRw7PlByESy7RxouuE3Hwmt3DSbVicU-RffRXt9ZbYvCf3TLgPf5e4FtpcGWpE~-hBjPWqgdRQ9FQaz9A4AidFggdpWXL8jGK~xF4R~y3IE0OIAtPPpzBuNvjkBXcS~LqiXBJcffEiSHIMsAezKcO2ZH5TdVX53gdtO2kvCSCGUvGCYbJKMPOaU~jH5fyJ03dWX8il2084C80kpIvu7LU1IgyXmN-lvDqmd-VORxD5y355D~n4HWpvJiRa9K9wrDttiGafSz1jqjW1ka-ncrIoiN-SvTyM-wJ8n3LMNUfkbbAACRvCHNe2DNemxjt3eQw__"
          alt=""
        />
      </div>
      <div className="w-[90%] h-[8%] lg:h-[15%] flex items-center justify-between">
        <div className="w-[40%] lg:w-[30%] h-full flex justify-center">
          <img
            className="w-28 h-28 rounded-full -mt-[50%] md:w-44 md:h-44 md:-mt-[40%] lg:-mt-[20%]"
            src={user.photoURL || blankProfilr}
            alt=""
          />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <button className="w-full h-8 rounded-full font-light border border-gray-400">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="w-[90%] h-[15%] flex flex-col gap-4">
        <p className="font-bold text-2xl lg:text-4xl">{user?.displayName}</p>
        <p className="text-sm lg:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa error
          quis itaque ipsam. Hic tempore quae eligendi quisquam fugit eos!
        </p>
      </div>
      <div className="w-[90%] h-[52%] flex flex-col gap-4 relative">
        <div className="font-bold lg:text-2xl">My Posts</div>
        <div className="w-full h-[90%] flex flex-wrap overflow-scroll items-center gap-2 scroll-container">
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-[48%] h-2/3 lg:h-[75%] bg-red-500 rounded-xl"
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
