// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipePage from './pages/RecipePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/recipes/:id" element={<RecipePage />} />
    </Routes>
  );
};

export default AppRoutes;
