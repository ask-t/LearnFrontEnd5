'use client'
import React, { useState } from 'react';
import authService from '../services/authService';

function SignUpForm() {
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    try {
      const response = await authService.signUP({ name, userid, email, password });
      console.log("Sign up successful", response.data);
      location.replace('/auth/login');
    }
    catch (error: any) {
      console.error("Sign up error", error.response.data);
    }
  }

  return (
    <form onSubmit={handleSignUp} className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow-md rounded-lg">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <div>
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserid(e.target.value)} // Ensure this is correct; it was setName in your original code
          placeholder="UserId"
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
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
        Sign Up
      </button>
    </form>
  );

}

export default SignUpForm;