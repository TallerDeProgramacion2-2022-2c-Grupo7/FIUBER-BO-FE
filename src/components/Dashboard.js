import React from 'react';
import { RequireAuth, useAuth } from '../contexts/Auth';

export default function Dashboard() {
  let auth = useAuth();
  console.log(auth);
  return (
    <RequireAuth>
      <h1>Dashboard</h1>
      <p>Welcome { auth.user?.email }!</p>
    </RequireAuth>    
  );
}
