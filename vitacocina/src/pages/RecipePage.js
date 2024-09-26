import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Image from '../assets/food.jpg'
export default function RecipePage() {
  const tagsTitle = ["Dieta", "Tiempo", "Dificultad"];

  const calculateAverageRating = (recipe) => {
    const { reviews } = recipe;
    if (reviews.length === 0) return -1;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
};


  const exampleRecipe = {
  author: "Thor, Dios del Trueno",
  name: "Ensalada César",
  description: "Una ensalada clásica y refrescante, ideal para el verano. Combina lechuga fresca con crutones y aderezo César.",
  ingredients: [
    "Lechuga romana",
    "Crutones",
    "Queso parmesano",
    "Aderezo César",
    "Pechuga de pollo (opcional)"
  ],
  instructions: [
    "Lavar y trocear la lechuga.",
    "Agregar crutones y queso parmesano al gusto.",
    "Añadir aderezo César y mezclar bien.",
    "Si se desea, agregar pechuga de pollo a la ensalada."
  ],
  dietaryPreferences: "Sin gluten", // Opcional
  time: "15 minutos",
  difficulty: "Fácil",
  reviews: [
    {
      user: "Juan Pérez",
      rating: 4,
      comment: "Deliciosa y fácil de hacer."
    },
    {
      user: "Ana Gómez",
      rating: 5,
      comment: "La mejor ensalada César que he probado."
    }
  ]
};

const averageRating = calculateAverageRating(exampleRecipe);

  return (
    <>
      <Typography variant="h3">{exampleRecipe.name}</Typography>

      <Box display='flex' marginY={1}>
        <Rating
          name="simple-controlled"
          value={averageRating}
          precision={0.5}
          readOnly
          sx={{ mr: 1 }}
        />
        <Typography variant='body1'>{averageRating}</Typography>
        <Divider orientation='vertical' flexItem sx={{ marginX: 1.5 }}/>
        <Typography href='#reviews' component='a'>{exampleRecipe.reviews.length} Reseñas</Typography>
      </Box>

      <Typography>{exampleRecipe.description}</Typography>
      <Typography lineHeight={2} variant='body2'>Publicado por <strong>{exampleRecipe.author}</strong></Typography>

      <Card sx={{ maxWidth: 600, margin: '0 auto', boxShadow: 3, borderRadius: 4 }}>
      <CardMedia component="img" height="320" image={Image} alt="food image"/>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', marginTop: 3, justifyContent: 'center'}}>
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
            {tagsTitle[0]}: {exampleRecipe.dietaryPreferences}
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
            {tagsTitle[1]}: {exampleRecipe.time}
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
            {tagsTitle[2]}: {exampleRecipe.difficulty}
          </Box>
        </Box>
      </CardContent>
      </Card>
    </>
  );
}