import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';


const exampleTips = [
    { id: 1, title: "Cortes de cebolla", desc: "Desc1", author: "Me" },
    { id: 2, title: "Cortes de pimiento", desc: "Desc2", author: "Me" },
    { id: 3, title: "Cortes de zanahoria", desc: "Desc3", author: "Me" },
    { id: 4, title: "Cortes de tomate", desc: "Desc4", author: "Me" },
    { id: 5, title: "Cortes de perejil", desc: "Desc5", author: "Me" },
    { id: 6, title: "Cortes de apio", desc: "Desc6", author: "Me" },
    { id: 7, title: "Cortes de carne", desc: "Desc7", author: "Me" },
]

const TipCard = () => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exampleTips.length);
    const randomTip = exampleTips[randomIndex];
    setTitle(randomTip.title);
    setDesc(randomTip.desc);
    setId(randomTip.id);
    setAuthor(randomTip.author);
  }, []); 


  return (
    <Link to={`/Tips/${id}`} style={{ textDecoration: 'none' }}>
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
          <Typography variant="body2" color="text.secondary">
            Autor: {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
};

export default TipCard;

