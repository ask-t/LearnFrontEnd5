'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import authService from '../services/authService'; // Your authentication service

function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    authService.logout(); // Assuming this clears the local storage or any auth tokens
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}

export default LogoutButton;
