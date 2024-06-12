import React, { useEffect, useState } from 'react'

const AuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</div>
  );
}

export default AuthStatus