// src/components/ReviewCard.jsx
import React from 'react';
import { Typography, Rating, Card, CardContent } from '@mui/material';

const ReviewCard = ({ userName, rating, comment }) => {
  return (
    <Card variant='outlined' sx={{ width: 600, margin: '20px auto' }}>
      <CardContent>
        {/* Nombre del Usuario */}
        <Typography variant="h6" component="div" gutterBottom>
          {userName}
        </Typography>

        {/* Puntuación (Rating) */}
        <Rating value={rating} precision={0.5} readOnly sx={{ marginBottom: 2 }} />

        {/* Comentario */}
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
