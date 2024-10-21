// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipePage from './pages/RecipePage';
import TipPage from "./pages/TipPage";
import AdminPage from './pages/AdminPage';
import MyPostsPage from './pages/MyPostsPage'; 
import SignIn from './pages/LoginPage'; 
import SignUp from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AllRecipePage from './pages/AllRecipePage';
import AllTipPage from './pages/AllTipPage'; 
import CreateRecipe from './pages/CreateRecipe'; 
import CreateTip from './pages/CreateTips';
import FavoritesPage from './pages/favoritesPage';

import Navbar from './components/navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<PublicRoute element={SignIn} />} />
      <Route path="/register" element={<PublicRoute element={SignUp} />} />
      
      <Route 
        path="/*" 
        element={
          <>
            <Navbar />
            <Routes>
              <Route path="/posts" element={<ProtectedRoute element={MyPostsPage} />} />
              <Route path="/admin" element={<ProtectedRoute element={AdminPage} />} />
              <Route path="/createRecipe" element={<ProtectedRoute element={CreateRecipe} />} /> 
              <Route path="/createTip" element={<ProtectedRoute element={CreateTip} />} />
              <Route path="/favorites" element={<ProtectedRoute element={FavoritesPage} />} />

              <Route path="/recipes/:id" element={<RecipePage />} />
              <Route path="/tips/:id" element={<TipPage />} />
              <Route path="/allrecipe" element={<AllRecipePage />} />
              <Route path="/alltip" element={<AllTipPage />} /> 
            </Routes>
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
