import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PostListPaper from '../components/PostsListPaper';

const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const MyPostsPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [recipes, setRecipes] = useState([]);
  const [tips, setTips] = useState([]);

  const fallbackText = {
    recipes: 'No tienes ningúna receta publicada.',
    tips: 'No tienes ningún consejo publicado.'
  }

  useEffect(() => {
    fetch(`${ENDPOINT}/api/recipes/user/${user._id}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          setRecipes(data);
        })
        .catch(error => {
            console.error("Error obteniendo recetas:", error);
        });
  }, [user._id]);

  useEffect(() => {
    fetch(`${ENDPOINT}/api/tips/user/${user._id}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          setTips(data);
        })
        .catch(error => {
            console.error("Error obteniendo consejos:", error);
        });
  }, [user._id]);

  const handleEdit = (type, id) => {
    console.log(`Edit ${type} with ID: ${id}`);
  };

  const handleDelete = async (type, id) => {
    try {
      let endpoint;

      switch (type) {
        case 'recipe':
          endpoint = `${ENDPOINT}/api/recipe/${id}`;
          break;
        case 'tip':
          endpoint = `${ENDPOINT}/api/tips/${id}`;
          break;
        default:
          throw new Error('Tipo no válido');
      }

      const response = await fetch(endpoint, { method: 'DELETE' });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar');
      }

      if (type === 'recipe') {
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      } else if (type === 'tip') {
        setTips((prev) => prev.filter((tip) => tip._id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar:', error.message);
      alert('Ocurrió un error al eliminar: ' + error.message);
    }
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
          <Box textAlign='center' marginY={2}>
            <Button onClick={() => {navigate('/createRecipe')}} variant='contained' sx={{ fontSize: '1.5rem' }}>Crear receta</Button>
          </Box>
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
          <Box textAlign='center' marginY={2}>
            <Button onClick={() => {navigate('/createTip')}} variant='contained' sx={{ fontSize: '1.5rem' }}>Crear consejo</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyPostsPage;
