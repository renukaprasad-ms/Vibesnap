import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaFileImage } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const CreatePost = ({ setDisplayProfileBar, setDisplaySideBarSm }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayProfileBar(false);
    setDisplaySideBarSm(false);
  }, [setDisplayProfileBar, setDisplaySideBarSm]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleCameraOpen = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const triggerCameraCapture = () => {
    cameraInputRef.current.click();
  };

  const handleCreateButton = async () => {
    if (!selectedFile && !description.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      let imgUrl = null;
      if (selectedFile) {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "vibesnap");
        data.append("cloud_name", "djvfbbvjy");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djvfbbvjy/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const uploadResult = await res.json();
        imgUrl = uploadResult.secure_url;
        console.log(imgUrl)
      }

      const user = auth?.currentUser;
      if (!user) throw new Error("User is not logged in");

      const postCollectionRef = collection(db, "posts");
      const postData = {
        description: description.trim(),
        likes: 0,
        imageUrl: imgUrl || null,
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        timestamp: new Date(),
      };
      console.log(postData)
      await addDoc(postCollectionRef, postData);
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const canCreatePost = selectedFile || description.length > 0;

  return (
    <div className="w-full lg:w-[80%] h-screen flex flex-col items-center">
      <div className="w-[90%] h-[10%] flex items-center gap-4">
        <IoMdArrowRoundBack size={20} onClick={handleBackClick} />
        <p className="font-bold text-xl">New Post</p>
      </div>

      {error && <p className="w-[90%] text-red-500">{error}</p>}

      <div className="w-[90%] h-auto">
        <textarea
          name="description"
          rows={10}
          placeholder="What's on your mind"
          className="w-full border rounded-xl p-2 text-lg"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </div>

      <div className="w-[90%] flex flex-col mt-4 gap-2">
        <div
          className="w-full h-8 flex gap-2 items-center cursor-pointer"
          onClick={triggerFileUpload}
        >
          <FaFileImage /> Choose the file
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        <div
          className="w-full h-8 flex gap-2 items-center cursor-pointer"
          onClick={triggerCameraCapture}
        >
          <FaCamera /> Camera
        </div>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          style={{ display: "none" }}
          onChange={handleCameraOpen}
        />
      </div>

      {selectedFile && (
        <div className="w-[90%] mt-4">
          <p className="text-sm text-gray-500">Preview:</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div className="w-[90%] flex items-center justify-center mt-8 mb-8">
        <button
          className={`w-full lg:h-14 bg-black text-white rounded-full ${
            canCreatePost && !isLoading ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!canCreatePost || isLoading}
          onClick={handleCreateButton}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
