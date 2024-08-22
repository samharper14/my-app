// src/app/home/page.js
'use client';

import { redirect } from 'next/navigation';
import { verifyToken } from '../../utils/auth';
import { parseCookies } from 'nookies'; // Import a helper to parse cookies

export default function Home() {
  // Get the JWT token from cookies or headers

  const cookies = parseCookies();
  const token = cookies.authToken; 
  console.log(cookies);
  console.log(token);
  if (!token || !verifyToken(token)) {
    // Redirect to login page if the token is invalid or not present
    redirect('/');
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
    </div>
  );
}
