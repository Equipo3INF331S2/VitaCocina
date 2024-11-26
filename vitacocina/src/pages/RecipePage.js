import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { jsPDF } from 'jspdf';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import MakeReview from '../components/MakeReview';
import ReviewCard from '../components/Review';
import { Helmet } from 'react-helmet';
import 'jspdf-autotable';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export default function RecipePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [averageRating, setAverageRating] = useState(-1);
  const [reviewsCount, setReviewsCount] = useState(-1);

  const shareUrl = `${ENDPOINT}/recipes/${id}`;
  const shareTitle = "Mira esta receta de VitaCocina!"

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
        // Filtrar las reseñas para no incluir la reseña del usuario
        const filteredReviews = user
          ? data.reviews.filter(review => review.user._id !== user._id)
          : data.reviews;

        // Establecer la receta sin la reseña del usuario
        setRecipe({ ...data, reviews: filteredReviews });
        setAverageRating(calculateAverageRating(data));
        setReviewsCount(data.reviews.length)
        setLoading(false);

        if (user) {
          const existingReview = data.reviews.find(review => review.user._id === user._id);
          if (existingReview) {
            setUserReview(existingReview);
          }
        }
      });
  }, [id]);

  useEffect(() => {
    if (user) { // Solo verifica si hay un usuario conectado
      fetch(`${ENDPOINT}/api/favorites/check/${user._id}/${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          setIsFavorite(data.inFavorites);
        });
    }
  }, [id, user]);

  const addToFavorites = (recipeId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`${ENDPOINT}/api/favorites/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar receta a favoritos');
        }
        setIsFavorite(true);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const removeFromFavorites = (recipeId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`${ENDPOINT}/api/favorites/${user._id}/${recipeId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar receta de favoritos');
        }
        setIsFavorite(false);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(30);
    doc.text('VitaCocina', 105, 20, {align:'center'})

    doc.setFontSize(30);
    const titleY = 50;
    doc.text(recipe.name, 105, titleY, { align: 'center' });

    const titleHeight = 20;
    const tableStartY = titleY + titleHeight + 10; 

    const recipeInfo = [
      [`Publicado por:`, recipe.author.name],
      [`Dieta:`, recipe.dietaryPreferences],
      [`Tiempo:`, recipe.time],
      [`Dificultad:`, recipe.difficulty],
    ];
    doc.autoTable({
      startY: tableStartY,
      head: [],
      body: recipeInfo,
      columnStyles: { 0: { fontStyle: 'bold' } }
    });


    doc.setFontSize(16);
    doc.text('Ingredientes', 10, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      body: recipe.ingredients.map(ing => [ing]),
      columnStyles: { 0: { cellWidth: '100%' } }
    });


    doc.setFontSize(16);
    doc.text('Instrucciones', 10, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      body: recipe.instructions.map((instruccion, index) => [`${index + 1}. ${instruccion}`]),
      columnStyles: { 0: { cellWidth: '100%' } }
    });

    doc.save(`${recipe.name}.pdf`);
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: '200px', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: '20px' }}>
      <Helmet>
        <title>{recipe ? recipe.name + " - VitaCocina" : "Cargando... - VitaCocina"}</title>
        <meta name="description" content={recipe ? recipe.description : "Cargando receta..."} />
        <meta property="og:title" content={recipe ? recipe.name + " - VitaCocina" : "Cargando... - VitaCocina"} />
        <meta property="og:description" content={recipe ? recipe.description : "Cargando receta..."} />
        <meta property="og:image" content={recipe ? `${ENDPOINT}/uploads/${recipe.img}` : ""} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={recipe ? recipe.name + " - VitaCocina" : "Cargando... - VitaCocina"} />
        <meta name="twitter:description" content={recipe ? recipe.description : "Cargando receta..."} />
        <meta name="twitter:image" content={recipe ? `${ENDPOINT}/uploads/${recipe.img}` : ""} />
      </Helmet>
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
          <Typography variant='body1' href='#reviews' component='a'>{reviewsCount} Reseñas</Typography>
        </>)}
      </Box>

      <Typography>{recipe.description}</Typography>
      <Typography lineHeight={2} variant='body2'>Publicado por <strong>{recipe.author.name}</strong></Typography>

      <Box marginY='16px'>
        <Button
          variant="contained"
          startIcon={isFavorite ? <HeartBrokenIcon /> : <FavoriteIcon />}
          color='error'
          sx={{
            width: '25%',
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
        </Button>
      </Box>
      <Box marginY='16px'>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          color='primary'
          sx={{
            width: '25%',
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={downloadPDF}
        >
          Descargar PDF
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
        <FacebookShareButton url={shareUrl} quote={shareTitle}>
          <Button
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
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareTitle}>
          <Button
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
        </TwitterShareButton>

        <WhatsappShareButton title={shareTitle} separator='' url={shareUrl}>
          <Button
            sx={{
              width: 64,
              height: 50,
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <WhatsAppIcon sx={{ color: '#000' }} />
          </Button>
        </WhatsappShareButton>

      </ButtonGroup>

      <Typography id='reviews' variant='h4' lineHeight={3}>Reseñas</Typography>
      <MakeReview isLoggedIn={!!user} user={user} userReview={userReview} recipeId={id}></MakeReview>
      {recipe.reviews.map((review) => (
        <ReviewCard key={review.user._id} userName={review.user.name} rating={review.rating} comment={review.comment} />
      ))}
    </Container>
  );
}
