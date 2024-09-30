// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipePage from './pages/RecipePage';
import AdminPage from './pages/AdminPage';
import MyPostsPage from './pages/MyPostsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/posts" element={<MyPostsPage />} />
    </Routes>
  );
};

export default AppRoutes;
