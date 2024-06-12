import React from 'react';
import { redirect } from "next/navigation";
import authService from '../services/authService'; // Your authentication service

function LogoutButton() {

  const handleLogout = () => {
    authService.logout(); // Assuming this clears the local storage or any auth tokens
    redirect('/login'); // Redirect to login page after logout
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}

export default LogoutButton;
