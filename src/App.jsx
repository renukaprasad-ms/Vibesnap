import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import ProfileBar from "./components/ProfilBar";
import Profile from "./pages/Profile";
import CraetePost from "./pages/CraetePost";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <BrowserRouter>
      {!loggedIn ? (
        <LoginPage />
      ) : (
        <div className="w-full h-[100vh] flex flex-col lg:flex-row">
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CraetePost />} />
          </Routes>
          <ProfileBar />
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
