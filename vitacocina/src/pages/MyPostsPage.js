import { Typography, Container } from '@mui/material';
const exampleRecipes = [
  { id: 1, title: "Ensalada César" },
  { id: 2, title: "Tarta de Manzana" },
  { id: 3, title: "Queque de vainilla" },
  { id: 4, title: "Galletas de chocolate" },
  { id: 5, title: "Mermelada de frutilla" },
  { id: 6, title: "Tortilla de papas" },
  { id: 7, title: "Albóndigas" },
  
];

const exampleTips = [
  { id: 1, title: "Consejo para asar carnes" },
  { id: 2, title: "Cómo hacer una vinagreta perfecta" },
];

const MyPostsPage = () => {
  return (
    <Container maxWidth='lg' sx={{ paddingTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Mis Publicaciones
      </Typography>
    </Container>
  );
};

export default MyPostsPage;
