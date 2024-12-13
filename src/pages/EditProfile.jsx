import React, { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { db,auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const EditProfile = ({
  setDisplaySideBarSm,
  setDisplayProfileBar,
  userDetails,
}) => {
  const [profilePic, setProfilePic] = useState(userDetails.profilePic || "");
  const [backdropPic, setBackdropPic] = useState(userDetails.backdropPic || "");
  const [bio, setBio] = useState(userDetails.bio || "");
  const [username, setUsername] = useState(userDetails.username || "");
  const navigate = useNavigate()

  useEffect(() => {
    setDisplaySideBarSm(false);
    setDisplayProfileBar(false);
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vibesnap");
    formData.append("cloud_name", "djvfbbvjy");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/djvfbbvjy/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadToCloudinary(file);
      if (type === "profile") {
        setProfilePic(imageUrl);
      } else if (type === "backdrop") {
        setBackdropPic(imageUrl);
      }
    }
  };
  const handleSave = async () => {
    const userRef = doc(db, "users", userDetails.uid);

    try {
      await updateDoc(userRef, {
        bio,
        profilePic,
        backdropPic,
        username,
      });
      alert("Profile updated successfully!");
      navigate("/profile/c873")
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="h-screen lg:h-[150vh] w-full flex flex-col lg:w-[80%] items-center scroll-container">
      <div className="h-[25%] lg:h-[25%] w-full bg-black flex relative">
        <img
          className="w-full h-full object-cover"
          src={backdropPic}
          alt="Backdrop"
        />
        <label className="absolute z-50 w-16 h-16 bg-black right-0 bottom-0 rounded-full flex items-center justify-center text-white cursor-pointer">
          <MdModeEdit size={20} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "backdrop")}
          />
        </label>
      </div>

      <div className="w-[90%] h-[8%] lg:h-[15%] flex items-center justify-between">
        <div className="w-[40%] lg:w-[30%] h-full flex justify-center z-30 relative">
          <img
            className="w-28 h-28 rounded-full -mt-[50%] md:w-44 md:h-44 md:-mt-[40%] lg:-mt-[20%] "
            src={profilePic}
            alt="Profile"
          />
          <label className="absolute w-10 h-10 bg-black rounded-full bottom-6 right-2 lg:right-1/4 lg:bottom-1/3 text-white flex items-center justify-center cursor-pointer">
            <MdModeEdit />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "profile")}
            />
          </label>
        </div>
      </div>
      <div className="w-[90%] h-1/3 flex flex-col justify-evenly">
        <label htmlFor="username">User Name</label>
        <input
          className="border border-black h-10"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          className="border border-black"
          rows={8}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className="w-[90%] mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
