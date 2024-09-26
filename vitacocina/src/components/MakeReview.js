import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const MakeReview = ({ isLoggedIn }) => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState('');
  
  const handleReviewSubmit = () => {
    if (rating && review) {
      alert(`Reseña enviada: ${review} con una calificación de ${rating} estrellas.`);
      // Aquí enviarías la reseña al servidor.
    } else {
      alert('Por favor completa la reseña y la calificación antes de enviar.');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 3, boxShadow: 3, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Escribe tu reseña
        </Typography>
        
        {/* Sección de creación de reseña */}
        {isLoggedIn ? (
          <Box>

            <Typography component='legend' fontWeight='bold'>Mi Puntuación</Typography>
            <Rating
              name="recipe-rating"
              size='large'
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              sx={{ marginBottom: 2 }}
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
              Enviar reseña
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
