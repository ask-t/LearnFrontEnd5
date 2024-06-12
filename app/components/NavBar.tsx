'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTheme } from "next-themes"

const NavBar = () => {
  const currentPath = usePathname();
  const { setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // This effect runs only once on component mount, which only happens on the client-side
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, [router]);

  // Function to handle logout
  const handleLogout = (e: any) => {
    e.preventDefault(); // Prevent default Link behavior
    localStorage.removeItem('user'); // Manually remove the user
    router.push('/auth/login'); // Redirect to login page
  };

  const links = [
    { label: "Home", href: '/' },
    { label: "History", href: '/history' },
    // Conditional rendering based on user's authentication state
    ...(isLoggedIn ? [
      { label: "Sign Out", href: '/', onClick: handleLogout },
      {label: "info", href: "/auth/userinfo"},
    ] : [
      { label: "Login", href: '/auth/login' },
      { label: "Sign Up", href: '/auth/signup' },
    ])
  ];

  return (
    <div>
      <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center text-black dark:bg-black dark:text-white'>
        <Link href='/' passHref><span className='font-bold text-2xl cursor-pointer'>Your Quote</span></Link>
        <ul className='flex space-x-6'>
          {links.map((link) => (
            <li key={link.href} className={classnames({ 'text-cyan-700 font-bold': link.href === currentPath, 'text-zinc-900 dark:text-white': link.href !== currentPath })}>
              <Link href={link.href} passHref>
                <span className={classnames('cursor-pointer', { 'text-cyan-700 font-bold': link.href === currentPath, 'text-zinc-900 dark:text-white': link.href !== currentPath })}
                  onClick={link.onClick ? (e) => link.onClick(e) : undefined}>
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;
