import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import ProfileBar from "./components/ProfilBar";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import LoginPage from "./pages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firebase";
import EditProfile from "./pages/EditProfile";
import { doc, getDoc, setDoc } from "firebase/firestore";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [displayProfileBar, setDisplayProfileBar] = useState(true);
  const [displaySideBarSm, setDisplaySideBarSm] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          const userData = {
            uid: currentUser.uid,
            username: currentUser.displayName || "New User",
            email: currentUser.email,
            profilePic: currentUser.photoURL || "",
            bio: "",
          };
          await setDoc(userDocRef, userData);
          setUserDetails(userData);
        } else {
          setUserDetails(userDocSnap.data());
        }
      } else {
        setLoggedIn(false);
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);
  if (!userDetails && loggedIn) {
    return <div>Loading...</div>;
  }

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
                  userDetails={userDetails}
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
            <Route
              path="/edit"
              element={
                <EditProfile
                  setDisplayProfileBar={setDisplayProfileBar}
                  setDisplaySideBarSm={setDisplaySideBarSm}
                  userDetails={userDetails}
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
