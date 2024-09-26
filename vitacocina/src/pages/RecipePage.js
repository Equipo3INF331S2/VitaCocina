import * as React from 'react';
import Typography from '@mui/material/Typography';
export default function RecipePage() {
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

    </>
  );
}