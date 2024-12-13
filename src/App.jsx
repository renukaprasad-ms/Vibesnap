import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import ProfileBar from "./components/ProfilBar";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import LoginPage from "./pages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayProfileBar, setDisplayProfileBar] = useState(true);
  const [displaySideBarSm, setDisplaySideBarSm] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      {!loggedIn ? (
        <LoginPage />
      ) : (
        <div className="w-full h-[100vh] flex flex-col lg:flex-row">
          <SideBar displaySideBarSm={displaySideBarSm} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setDisplayProfileBar={setDisplayProfileBar}
                  setDisplaySideBarSm={setDisplaySideBarSm}
                />
              }
            />
            <Route
              path="/profile/:UserId"
              element={
                <Profile
                  setDisplaySideBarSm={setDisplaySideBarSm}
                  setDisplayProfileBar={setDisplayProfileBar}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreatePost
                  setDisplayProfileBar={setDisplayProfileBar}
                  setDisplaySideBarSm={setDisplaySideBarSm}
                />
              }
            />
          </Routes>
          {displayProfileBar && <ProfileBar />}
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
