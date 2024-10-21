import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('user'); // Devuelve true si el token "user" existe
  };

const PublicRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Navigate to="/" /> : <Component />;
};

export default PublicRoute;
