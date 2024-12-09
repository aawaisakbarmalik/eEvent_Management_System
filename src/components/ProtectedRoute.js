import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated (e.g., check for a valid JWT or a session cookie)
  const isAuthenticated = localStorage.getItem('token'); // Assuming you're storing the JWT in localStorage after login

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/" />;
  }

  return children; // If authenticated, render the protected component
};

export default ProtectedRoute;
