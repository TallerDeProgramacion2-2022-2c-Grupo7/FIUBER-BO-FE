// import React, { useState } from "react";
import * as React from "react";
import SignIn from "./components/LogIn";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { fakeAuthProvider } from "./common/auth";

let AuthContext = React.createContext();

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("email");

    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  }

  return <SignIn handleSubmit={handleSubmit}></SignIn>
}

function PublicPage() {
  return <h1>Public</h1>;
}

function ProtectedPage() {
  return <h1>Protected</h1>;
}

export default function App() {
    return (
      <AuthProvider>
        <Routes>
              <Route path="/" element={<PublicPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
              path="/protected"
              element={
                  <RequireAuth>
                  <ProtectedPage />
                  </RequireAuth>
              }
              />
        </Routes>
      </AuthProvider>
    );
}
