import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBczecSpcmaHgrkN0GWwRoZkUYZwPPGNnM",
  authDomain: "mediqueue-1ac5a.firebaseapp.com",
  projectId: "mediqueue-1ac5a",
  storageBucket: "mediqueue-1ac5a.firebasestorage.app",
  messagingSenderId: "42163505465",
  appId: "1:42163505465:web:3036ee7818c5398ef080e8",
  measurementId: "G-NLL1JM1K35"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;