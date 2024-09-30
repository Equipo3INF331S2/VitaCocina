import React, { useState } from 'react';
import { Typography, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PostListPaper from '../components/PostsListPaper';

// Ejemplos de recetas y consejos
const exampleRecipes = [
  { id: 1, title: "Ensalada César" },
  { id: 2, title: "Tarta de Manzana" },
  { id: 3, title: "Queque de vainilla" },
  { id: 4, title: "Galletas de chocolate" },
  { id: 5, title: "Mermelada de frutilla" },
  { id: 6, title: "Tortilla de papas" },
  { id: 7, title: "Albóndigas" },
  
];

const exampleTips = [
  { id: 1, title: "Consejo para asar carnes" },
  { id: 2, title: "Cómo hacer una vinagreta perfecta" },
];

const MyPostsPage = () => {
  const [recipes, setRecipes] = useState(exampleRecipes);
  const [tips, setTips] = useState(exampleTips);

  const fallbackText = {
    recipes: 'No tienes ningúna receta publicada.',
    tips: 'No tienes ningún consejo publicado.'
  }

  const handleEdit = (type, id) => {
    console.log(`Edit ${type} with ID: ${id}`);
  };

  const handleDelete = (type, id) => {
    if (type === 'recipe') {
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } else if (type === 'tip') {
      setTips((prev) => prev.filter((tip) => tip.id !== id));
    }
    console.log(`Delete ${type} with ID: ${id}`);
  };

  return (
    <Container maxWidth='lg' sx={{ paddingTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Mis Publicaciones
      </Typography>

      <Grid container spacing={4} columns={{ xs: 12 }} marginTop={5}>
        {/* Columna de recetas */}
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Typography variant="h4" textAlign='center' gutterBottom>
            Recetas
          </Typography>
          <PostListPaper 
            posts={recipes} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            type={'recipe'} 
            fallbackText={fallbackText.recipes}
          />
        </Grid>

        {/* Columna de consejos */}
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Typography variant="h4" textAlign='center' gutterBottom>
            Consejos
          </Typography>
          <PostListPaper 
            posts={tips} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            type={'tip'} 
            fallbackText={fallbackText.tips}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyPostsPage;
