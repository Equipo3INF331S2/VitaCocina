import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';


const exampleRecipes = [
    { id: 1, title: "Ensalada César", desc: "Desc1" },
    { id: 2, title: "Tarta de Manzana", desc: "Desc2" },
    { id: 3, title: "Queque de vainilla", desc: "Desc3" },
    { id: 4, title: "Galletas de chocolate", desc: "Desc4" },
    { id: 5, title: "Mermelada de frutilla", desc: "Desc5" },
    { id: 6, title: "Tortilla de papas", desc: "Desc6" },
    { id: 7, title: "Albóndigas", desc: "Desc7" },
    
  ];

const RecipeCard = () => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exampleRecipes.length);
    const randomRecipe = exampleRecipes[randomIndex];
    setTitle(randomRecipe.title);
    setDesc(randomRecipe.desc);
    setId(randomRecipe.id);
  }, []); 


  return (
    <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg" 
          alt={title} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
};

export default RecipeCard;

