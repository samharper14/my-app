'use client';
import { redirect } from 'next/navigation';
import { verifyToken } from '../../utils/auth';
import { parseCookies } from 'nookies'; // Import a helper to parse cookies

export default function About() {
  // Get the JWT token from cookies or headers
  const cookies = parseCookies();
  const token = cookies.authToken; 
  
    if (!token || !verifyToken(token)) {
    // Redirect to login page if the token is invalid or not present
    redirect('/');
  }
  
    return (
      <div>
        <h1>About Us</h1>
        <p>This is the about page of your application.</p>
      </div>
    );
}