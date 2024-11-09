import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, Typography, Container, CircularProgress } from '@mui/material';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export default function RecipePage() {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${ENDPOINT}/api/tip/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTip(data);
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

  return (
    <Container maxWidth="md" sx={{ paddingTop: '20px' }}>
      <Typography variant="h3">{tip.title}</Typography>

      <Typography>{tip.description}</Typography>
      <Typography lineHeight={2} variant='body2'>Publicado por <strong>{tip.author.name}</strong></Typography>

      <Card sx={{ margin: '20px auto', boxShadow: 3, borderRadius: 4 }}>
        <CardMedia component="img" height="400" image={`${ENDPOINT}/uploads/${tip.img}`} alt="food image" />
      </Card>
    </Container>
  );
}
