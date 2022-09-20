import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";

export default function App() {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    );
}
