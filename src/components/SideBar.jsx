import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { useNavigate} from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import blankProfile from "../assets/profilepic.webp"

const SideBar = ({displaySideBarSm }) => {
  const [selected, setSelected] = useState('home')
  const user = auth?.currentUser
  const navigate = useNavigate();
  const handleprofileClick = () => {
    navigate("/profile/7843");
    setSelected('profile')
  };
  const handleCreateClick = () => {
    navigate("/create");
    setSelected('create')
  };
  const handleHomeClick = () => {
    setSelected('home')
    navigate("/");
  };
  const handleSignOut =async () =>{
    try{
      await signOut(auth);
    }catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="w-full lg:w-[20%] h-auto lg:flex flex-col justify-center cursor-pointer  items-start border-r-2 ">
      <div className="w-[20%] h-screen fixed hidden lg:block ">
        <div className="w-full h-[20%] flex items-center justify-start border-b-2">
          <img
            className="w-24 h-24 rounded-full"
            src="https://s3-alpha-sig.figma.com/img/e588/3ae0/261c0b95b3d799ea23271ef18084f911?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ro97CzrY1-xXAkdAkDnEOVx0tKagq7W2ADpM15gZ1QOPtDnU29AXGYvfbDDrklbMp8DoeEgQWeqKo3jAw-IpDrI~IZCetw-42e06AiWgM7fFouaaHpyWp4CpqZ4uAtJMmgNP770y652TlCGXZrT0Ld5Gia-ZDSj2QWLgqbj9uHwPEHGK9a1ruXZ6Hz84poJRdYvh3iKmguBDCG3PONGKgdYSrK669uu8pLJqMdVmVtVqv9vnxHxRuSBelqL7m2ghelPKWDFbbdh2vBeQJS7dGwq-GMHCGXUkvEOOGi9XmZr2ZOpFPLHea0DTBbnouhtseaDC-c-6BTGuHuxaUTSHcQ__"
            alt=""
          />
          <h1 className="font-extrabold text-3xl">VibeSnap</h1>
        </div>
        <div className="w-full h-[60%] flex flex-col gap-6 pt-[10%]">
          <div
            className={`w-full h-[15%] flex items-center justify-center ${selected == 'home'? "text-2xl font-bold" : "text-lg"} gap-4`}
            onClick={() => handleHomeClick()}
          >
            <div>
              <IoMdHome size={30} />
            </div>
            Home
          </div>
          <div
            className={`w-full h-[15%] flex items-center justify-center ${selected == 'profile'? "text-2xl font-bold" : "text-lg"} gap-4`}
            onClick={() => handleprofileClick()}
          >
            <div>
              <CgProfile size={30} />
            </div>
            Profile
          </div>
          <div
            className={`w-full h-[15%] flex items-center justify-center ${selected == 'create'? "text-2xl font-bold" : "text-lg"} gap-4`}
            onClick={() => handleCreateClick()}
          >
            <div>
              <AiOutlinePlusCircle size={30} />
            </div>
            Create
          </div>
        </div>

        <div className="w-full h-[15%] flex items-center justify-center  gap-4 text-lg border-t-2" onClick={handleSignOut}>
          <div>
            <CgLogOut size={30} />
          </div>
          LogOut
        </div>
      </div>
      <div
        className={`w-full h-32 lg:hidden flex items-center justify-start pl-6 gap-6 ${
          !displaySideBarSm && "hidden"
        }`}
      >
        <div
          className="w-16 h-16 rounded-full"
          onClick={() => handleprofileClick()}
        >
          <img
            className="h-full w-full object-cover rounded-full"
            src={user.photoURL || blankProfile}
            alt=""
          />
        </div>
        <div>
          <p className="text-sm opacity-60">Welcome Back</p>
          <p className="text-xl font-bold">{user.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
