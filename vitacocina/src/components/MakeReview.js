import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const MakeReview = ({ isLoggedIn, user, userReview, recipeId }) => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState('');
  
  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setReview(userReview.comment);
    }
  }, [userReview]);

  const handleReviewSubmit = async () => {
    if (rating && review) {
      try {
        if (userReview) {
          // Modificar una reseña existente
          const response = await fetch(`${ENDPOINT}/api/recipe/${recipeId}/reviews`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user._id,
              rating: rating,
              comment: review,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            alert('Reseña modificada exitosamente.');
          } else {
            alert(`Error al modificar la reseña: ${data.error}`);
          }
        } else {
          // Añadir una nueva reseña
          const response = await fetch(`${ENDPOINT}/api/recipe/${recipeId}/reviews`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user._id,
              rating: rating,
              comment: review,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            alert('Reseña añadida exitosamente.');
          } else {
            alert(`Error al añadir la reseña: ${data.error}`);
          }
        }
      } catch (error) {
        console.error('Error en el envío de la reseña:', error);
        alert('Hubo un problema al enviar la reseña.');
      }
    } else {
      alert('Por favor completa la reseña y la calificación antes de enviar.');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 3, boxShadow: 3, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          {userReview ? 'Modificar tu reseña' : 'Escribe tu reseña'}
        </Typography>
        
        {/* Sección de creación de reseña */}
        {isLoggedIn ? (
          <Box>

            <Typography component='legend' fontWeight='bold'>Mi Puntuación</Typography>
            <Rating
              name="recipe-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              sx={{ marginBottom: 2, fontSize: '3rem' }}
            />
            
            {/* Campo para escribir la reseña */}
            <TextField
              label="Escribe tu reseña"
              multiline
              fullWidth
              rows={4}
              variant="outlined"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            
            {/* Botón para enviar la reseña */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit}
            >
              {userReview ? 'Modificar reseña' : 'Enviar reseña'}
            </Button>
          </Box>
        ) : (
          <Box textAlign="center">
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Debes estar conectado para dejar una reseña.
            </Typography>
            <Button variant="outlined" color="primary" href="/login">
              Iniciar sesión
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MakeReview;
