import * as React from "react";
import {
  useLocation,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5_ujrP3dxsFWTgOgqLag8Wi8ubHUtcME",
  authDomain: "fiuber.firebaseapp.com",
  projectId: "fiuber",
  storageBucket: "fiuber.appspot.com",
  messagingSenderId: "595724404035",
  appId: "1:595724404035:web:3002641d5eb53e2c119bf6",
  measurementId: "G-6W43T36L2V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AuthContext = React.createContext();
const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return setUser(response.user);
  }

  let logout = async () => {
    setUser(null);
  };

  let createUser = async (firstName, lastName, email, password) => {
    console.log({ firstName, lastName, email, password });
    window.auth = auth;
    const response = await createUserWithEmailAndPassword(auth, email, password);
    window.firebase_response = response;
  };

  let value = { user, login, logout, createUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, RequireAuth, useAuth };
