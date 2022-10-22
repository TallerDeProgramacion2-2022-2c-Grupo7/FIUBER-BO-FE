import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Users from './components/Users';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import PricingRule from './components/PricingRule';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/pricing" element={<PricingRule />} />
      </Routes>
    </AuthProvider>
  );
}
