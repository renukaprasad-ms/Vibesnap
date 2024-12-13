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
          // User does not exist in Firestore, create a new user document
          const userData = {
            uid: currentUser.uid,
            username: currentUser.displayName || "New User", // Use Firebase displayName or fallback to a default
            email: currentUser.email,
            profilePic: currentUser.photoURL || "",
            bio: "", // You can add a default bio or leave it empty
          };
          await setDoc(userDocRef, userData); // Add the new user to Firestore
          setUserDetails(userData); // Set the new user data in state
        } else {
          // User exists in Firestore, update state with their data
          setUserDetails(userDocSnap.data());
        }
      } else {
        setLoggedIn(false);
        setUserDetails(null); // Reset user details when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  // If user details are not loaded yet, show a loading state
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
