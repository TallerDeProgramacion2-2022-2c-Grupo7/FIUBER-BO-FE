import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";

export default function App() {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/protected" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    );
}
