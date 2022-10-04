import * as React from 'react';
import {
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyA5_ujrP3dxsFWTgOgqLag8Wi8ubHUtcME',
  authDomain: 'fiuber.firebaseapp.com',
  projectId: 'fiuber',
  storageBucket: 'fiuber.appspot.com',
  messagingSenderId: '595724404035',
  appId: '1:595724404035:web:3002641d5eb53e2c119bf6',
  measurementId: 'G-6W43T36L2V',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AuthContext = React.createContext();
const useAuth = () => React.useContext(AuthContext);
const functions = getFunctions(app);
const createAdmin = httpsCallable(functions, 'createAdmin');

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return setUser(response.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/', { replace: true });
  };

  const createUser = async (email, password) => {
    await createAdmin({ email, password });
  };

  const listUsers = async (params) => {
    const response = await fetch(`${process.env.REACT_APP_USERS_URL}?${new URLSearchParams(params)}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${user.accessToken}`,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail);
    }
    return data.result;
  };

  const value = {
    user, login, logout, createUser, listUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
  const currentAuth = useAuth();
  const location = useLocation();

  if (!currentAuth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, RequireAuth, useAuth };
