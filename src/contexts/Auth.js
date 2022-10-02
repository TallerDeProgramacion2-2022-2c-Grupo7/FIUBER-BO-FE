import * as React from "react";
import {
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

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
const functions = getFunctions(app);
const createAdmin = httpsCallable(functions, "createAdmin");

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  let navigate = useNavigate();

  let login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return setUser(response.user);
  }

  let logout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/", { replace: true });
  };

  let createUser = async (email, password) => {
    await createAdmin({ email, password });
  };

  let listUsers = async (params) => {
    let response = await fetch(process.env.REACT_APP_USERS_URL + "?" + new URLSearchParams(params), {
      method: "GET",      
      headers: new Headers({
        "Authorization": `Bearer ${user.accessToken}`
      })
    });
    let data = await response.json();
    if (!response.ok) {
      throw new Error(data["detail"])
    }
    return data["result"];
  };

  let value = { user, login, logout, createUser, listUsers };

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
