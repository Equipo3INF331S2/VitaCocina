import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

import MakeReview from '../components/MakeReview';
import ReviewCard from '../components/Review';

const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const tagsTitle = {
    dietaryPreferences: "Dieta",
    time: "Tiempo",
    difficulty: "Dificultad"
  };

  const calculateAverageRating = (recipe) => {
    const { reviews } = recipe;
    if (reviews.length === 0) return -1;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  useEffect(() => {
    fetch(`${ENDPOINT}/api/recipe/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setRecipe(data);
        console.log(data);
        setLoading(false); // Cambiar a false cuando la carga haya terminado
      });
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: '200px', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const averageRating = calculateAverageRating(recipe);

  return (
    <Container maxWidth="md" sx={{ paddingTop: '20px' }}>
      <Typography variant="h3">{recipe.name}</Typography>

      <Box display='flex' marginY={1}>
        {averageRating === -1 ? (
          <Typography variant='body1' href='#reviews' component='a'>Sé el primero en publicar una reseña!</Typography>
        ) : (<>
          <Rating
            name="simple-controlled"
            value={averageRating}
            precision={0.5}
            readOnly
            sx={{ mr: 1 }}
          />
          <Typography variant='body1' component='div'>{averageRating}</Typography>
          <Divider orientation='vertical' flexItem sx={{ marginX: 1.5 }} />
          <Typography variant='body1' href='#reviews' component='a'>{recipe.reviews.length} Reseñas</Typography>
        </>)}
      </Box>

      <Typography>{recipe.description}</Typography>
      <Typography lineHeight={2} variant='body2'>Publicado por <strong>{recipe.author.name}</strong></Typography>

      <Box marginY='16px'>
        <Button
          variant="contained"
          startIcon={<FavoriteIcon />}
          color='error'
          sx={{
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={() => {}}
        >
          Agregar a Favoritos
        </Button>
      </Box>

      <Card sx={{ margin: '20px auto', boxShadow: 3, borderRadius: 4 }}>
        <CardMedia component="img" height="400" image={`${ENDPOINT}/uploads/${recipe.img}`} alt="food image" />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', marginTop: 3, justifyContent: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#81d4fa',
                padding: '6px 12px',
                borderRadius: '20px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
            >
              {tagsTitle.dietaryPreferences}: {recipe.dietaryPreferences}
            </Box>

            <Box
              sx={{
                backgroundColor: '#ffd54f',
                padding: '6px 12px',
                borderRadius: '20px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
            >
              {tagsTitle.time}: {recipe.time}
            </Box>

            <Box
              sx={{
                backgroundColor: '#a5d6a7',
                padding: '6px 12px',
                borderRadius: '20px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
            >
              {tagsTitle.difficulty}: {recipe.difficulty}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Typography variant='h4'>Ingredientes</Typography>
      <ul>
        {recipe.ingredients.map((ingrediente) => (
          <li key={ingrediente}>{ingrediente}</li>
        ))}
      </ul>

      <Typography variant='h4'>Instrucciones</Typography>
      <ul>
        {recipe.instructions.map((instruccion) => (
          <li key={instruccion}>{instruccion}</li>
        ))}
      </ul>

      <Typography variant='h6' marginTop={4}>Comparte esta receta</Typography>
      <ButtonGroup variant="text" aria-label="share recipe" sx={{ marginTop: 1 }}>
        <Button
          onClick={() => {}}
          sx={{
            width: 64,
            height: 50,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <FacebookIcon sx={{ color: '#000' }} />
        </Button>
        <Button
          onClick={() => {}}
          sx={{
            width: 64,
            height: 50,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <InstagramIcon sx={{ color: '#000' }} />
        </Button>
        <Button
          onClick={() => {}}
          sx={{
            width: 64,
            height: 50,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <XIcon sx={{ color: '#000' }} />
        </Button>
      </ButtonGroup>

      <Typography id='reviews' variant='h4' lineHeight={3}>Reseñas</Typography>
      <MakeReview isLoggedIn={true}></MakeReview>
      {recipe.reviews.map((review) => (
        <ReviewCard key={review.user._id} userName={review.user.name} rating={review.rating} comment={review.comment} />
      ))}
    </Container>
  );
}
