import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If the user state is empty, redirect them straight to the login interface
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the targeted page content safely
  return children;
};

export default ProtectedRoute;
