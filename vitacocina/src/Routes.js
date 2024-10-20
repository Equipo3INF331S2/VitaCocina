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


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/tips/:id" element={<TipPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/posts" element={<MyPostsPage />} /> 
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} /> 
      <Route path="/allrecipe" element={<AllRecipePage />} />
      <Route path="/alltip" element={<AllTipPage />} /> 
      <Route path="/createRecipe" element={<CreateRecipe />} /> 
      <Route path="/createTip" element={<CreateTip />} />
    </Routes>
  );
};

export default AppRoutes;
