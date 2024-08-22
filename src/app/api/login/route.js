// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'; // Import the cookie serializer

const SECRET_KEY = 'f2c7066c3f52e8e7f1b8d2fdb7e9a43f91cf87450b3a1b24d7c6b9f2a732f789'; // Keep this secret and secure

// Example credentials for demonstration. In a real app, use a database and hash passwords.
const mockCredentials = {
  username: 'admin',
  password: 'password123'
};

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    console.log('Received credentials:', { username, password });

    // Check credentials (in a real application, check against a database)
    if (username === mockCredentials.username && password === mockCredentials.password) {
      // Generate the JWT token
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

      // Set the token in an HttpOnly cookie
      const cookie = serialize('authToken', token, {
        httpOnly: true, // Cookie cannot be accessed by JavaScript
        secure: false, // Set to true in production to use HTTPS
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 60 * 60, // 1 hour
        path: '/', // Root path
      });

      // Create the response and set the cookie in the headers
      const response = NextResponse.json({ message: 'Login successful' });
      response.headers.set('Set-Cookie', cookie);
      return response;
    } else {
      // Example response for failed login
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
