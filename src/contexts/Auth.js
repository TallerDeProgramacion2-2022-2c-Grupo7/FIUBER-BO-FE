import * as React from "react";
import {
  useLocation,
  Navigate,
} from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5_ujrP3dxsFWTgOgqLag8Wi8ubHUtcME",
  authDomain: "fiuber.firebaseapp.com",
  projectId: "fiuber",
  storageBucket: "fiuber.appspot.com",
  messagingSenderId: "595724404035",
  appId: "1:595724404035:web:3002641d5eb53e2c119bf6",
  measurementId: "G-6W43T36L2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// This represents some generic auth provider API, like Firebase.
const fakeAuthProvider = {
  isAuthenticated: false,
  login({username, password},  callback) {
    // fakeAuthProvider.isAuthenticated = true;
    // setTimeout(callback, 100); // fake async
    // console.log('LOGIN', username, password);
    signInWithEmailAndPassword(auth, username, password).then((user) => {
      // console.log('User', JSON.stringify(user));
      // console.log('Current', JSON.stringify(auth.currentUser));
      callback(user.user);
    })
  },
  logout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

const AuthContext = React.createContext();

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let login = (user, callback) => {
    return fakeAuthProvider.login(user, (logedInUser) => {
      setUser(logedInUser);
      callback();
    });
  };

  let logout = (callback) => {
    return fakeAuthProvider.logout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, login, logout };

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
