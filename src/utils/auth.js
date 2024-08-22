'use client';

import jwt from 'jsonwebtoken';

// Example function to verify token
const SECRET_KEY = 'f2c7066c3f52e8e7f1b8d2fdb7e9a43f91cf87450b3a1b24d7c6b9f2a732f789'; // Keep this secret and secure

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Return decoded token if verification is successful
  } catch (err) {
    console.error('Token verification failed:', err);
    return null; // Return null if token verification fails
  }
}
