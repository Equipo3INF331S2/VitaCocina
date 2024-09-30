// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipePage from './pages/RecipePage';
import AdminPage from './pages/AdminPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;
