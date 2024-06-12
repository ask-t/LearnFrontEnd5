'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

function UserInfoPage() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      router.push('/login'); // Redirect to login if no token is found
      return;
    }

    const userDetails = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    setUser(userDetails);
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserInfoPage;
function Redirect(arg0: string) {
  throw new Error('Function not implemented.');
}

