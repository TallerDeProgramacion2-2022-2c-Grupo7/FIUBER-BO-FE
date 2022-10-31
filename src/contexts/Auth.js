import * as React from 'react';
import {
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
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
  const [user, setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')));
  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const currentUser = response.user;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    return setUser(currentUser);
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
        Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail);
    }
    return data.result;
  };

  const getUser = async (uid) => {
    const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${uid}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail);
    }
    return data.result;
  };

  const setUserStatus = async (uid, status) => {
    const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${uid}?active=${status}`, {
      method: 'PATCH',
      headers: new Headers({
        Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail);
    }
  };

  const sendPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const listRecentEvents = async () => {
    const response = await fetch(`${process.env.REACT_APP_METRICS_URL}?max_results=10`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail);
    }
    return data.result.map((event) => ({
      id: event.event_id,
      fields: [event.datetime, event.user_id, event.event_type],
    }));
  };

  const listMetrics = async () => {
    const response = await fetch(`${process.env.REACT_APP_METRICS_URL}/stats`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail);
    }
    return data.result;
  };

  const getUsersSummary = async () => {
    const response = await fetch(`${process.env.REACT_APP_METRICS_URL}/usersSummary`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail);
    }
    return data.result;
  };

  const value = {
    user,
    login,
    logout,
    createUser,
    listUsers,
    setUserStatus,
    getUser,
    sendPasswordReset,
    listRecentEvents,
    listMetrics,
    getUsersSummary,
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
