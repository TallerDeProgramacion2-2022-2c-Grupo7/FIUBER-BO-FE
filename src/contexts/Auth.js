import * as React from "react";
import {
  useLocation,
  Navigate,
} from "react-router-dom";

// This represents some generic auth provider API, like Firebase.
const fakeAuthProvider = {
  isAuthenticated: false,
  login(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
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

  let login = (newUser, callback) => {
    return fakeAuthProvider.login(() => {
      setUser(newUser);
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
