
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD8W5xZixWB6tZsHYd4vATrYX-jq42By_k",
  authDomain: "vibesnap-ecf11.firebaseapp.com",
  projectId: "vibesnap-ecf11",
  storageBucket: "vibesnap-ecf11.firebasestorage.app",
  messagingSenderId: "658859114321",
  appId: "1:658859114321:web:48e442c6d97c8ed1c3dd70",
  measurementId: "G-GFT1GNN3BK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
