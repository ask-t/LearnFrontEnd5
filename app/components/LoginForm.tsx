'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import authService from '../services/authService';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        console.log("success");
        location.replace('/');
      } else {
        setErrorMsg('Invalid credentials or server error'); // Handle unsuccessful login
      }
    } catch (error) {
      console.error('Login error', error);
      setErrorMsg('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-500 font-medium rounded-md"
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
