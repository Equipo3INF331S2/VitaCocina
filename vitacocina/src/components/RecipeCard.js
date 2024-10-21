import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Button, Box } from '@mui/material';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const RecipeCard = ({ recipeData, showDeleteButton = false, onDelete }) => {
  if (!recipeData || recipeData.length === 0) { // Manejar el caso donde no hay recetas
    return (
      <Container maxWidth="md" sx={{ paddingTop: '100px', textAlign: 'center' }}>
        <Typography variant="h6">No se encontraron Recetas.</Typography>
      </Container>
    );
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%', maxWidth: '1300px', direction: { xs: 'column', sm: 'row' } }}>
      {recipeData.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card>
              <Link key={recipe._id} to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none', color: 'black'}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${ENDPOINT}/uploads/${recipe.img}`}
                    alt="food image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {recipe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.description.substring(0, 100)}...
                    </Typography>
                    {/* Mostrar el botón de eliminar solo si showDeleteButton es true */}
                  </CardContent>
                </CardActionArea>
              </Link>
              {showDeleteButton && (
                <Box display='flex' justifyContent='center'>
                  <Button
                    variant="contained"
                    startIcon={<HeartBrokenIcon />}
                    color='error'
                    sx={{
                      marginBottom: '8px',
                      padding: '6px 16px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                    onClick={() => onDelete(recipe._id)} // Llama a la función onDelete con el ID de la receta
                  >
                    Eliminar de favoritos
                  </Button>
                </Box>
              )}
            </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeCard;
