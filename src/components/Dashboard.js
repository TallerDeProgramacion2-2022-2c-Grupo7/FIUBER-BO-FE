import React from 'react';
import { RequireAuth, useAuth } from '../contexts/Auth';

export default function Dashboard() {
  let auth = useAuth();
  return (
    <RequireAuth>
      <h1>Dashboard</h1>
      <p>Welcome { auth.user }!</p>
    </RequireAuth>    
  );
}
