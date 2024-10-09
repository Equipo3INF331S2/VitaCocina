// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipePage from './pages/RecipePage';
import AdminPage from './pages/AdminPage';
import MyPostsPage from './pages/MyPostsPage'; 
import SignIn from './pages/LoginPage'; 
import SignUp from './pages/RegisterPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/posts" element={<MyPostsPage />} /> 
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} /> 
    </Routes>
  );
};

export default AppRoutes;
