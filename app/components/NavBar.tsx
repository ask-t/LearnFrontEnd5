'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { redirect } from "next/navigation";
import classnames from 'classnames';
import { useTheme } from "next-themes"

const NavBar = () => {
  const currentPath = usePathname();
  const { setTheme } = useTheme();

  // Function to handle logout
  const handleLogout = () => {
    // Assuming authService.logOut() clears the user data from local storage
    localStorage.removeItem('user'); // Example of manually removing the user
    redirect('/login'); // Redirect to login page
  };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('user');

  const links = [
    { label: "Home", href: '/' },
    { label: "History", href: '/history' },
    // Conditional rendering based on user's authentication state
    ...(isLoggedIn ? [
      { label: "Sign Out", href: '/', onClick: handleLogout },
    ] : [
      { label: "Login", href: '/auth/login' },
      { label: "Sign Up", href: '/auth/signup' },
    ])
  ];

  console.log(`This is the current path: ${currentPath}`);

  return (
    <div>
      <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center text-black dark:bg-black dark:text-white'>
        <Link href='/' className='font-bold text-2xl'>Your Quote</Link>
        <ul className='flex space-x-6'>
          {links.map((link) => (
            <li key={link.href} className={classnames({ 'text-cyan-700 font-bold': link.href === currentPath, 'text-zinc-900 dark:text-white': link.href !== currentPath })}>
              {link.onClick ? (
                <a href={link.href} onClick={(e) => {
                  e.preventDefault();
                  link.onClick();
                }}>{link.label}</a>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;
