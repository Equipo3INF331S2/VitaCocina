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
import { Grid } from '@mui/material';


const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const RecipeCard = ({recipe}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const tagsTitle = {
    dietaryPreferences: "Dieta",
    time: "Tiempo",
    difficulty: "Dificultad"
  };

  useEffect(() => {
    fetch(`${ENDPOINT}/api/recipes`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
        console.log(data);
        setLoading(false); // Cambiar a false cuando la carga haya terminado
      })
      .catch(error => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: '200px', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!recipes || recipes.length === 0) { // <-- Manejar el caso donde no hay recetas
    return (
      <Container maxWidth="md" sx={{ paddingTop: '100px', textAlign: 'center' }}>
        <Typography variant="h6">No se encontraron recetas.</Typography>
      </Container>
    );
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%', maxWidth: '1200px', direction: { xs: 'column', sm: 'row' } }}>
      {recipes.map(recipe => (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
        <Link key={recipe._id} to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
          <Card>
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
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeCard;

