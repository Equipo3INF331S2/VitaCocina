import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('user'); // Devuelve true si el token "user" existe
  };

const ProtectedRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;