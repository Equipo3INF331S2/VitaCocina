import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;


const TipCard = ({tipData}) => {

  if (!tipData || tipData.length === 0) { // <-- Manejar el caso donde no hay recetas
    return (
      <Container maxWidth="md" sx={{ paddingTop: '100px', textAlign: 'center' }}>
        <Typography variant="h6">No se encontraron Consejos.</Typography>
      </Container>
    );
  }


  return (
    <Grid container spacing={2} sx={{ width: '100%', maxWidth: '1300px', direction: { xs: 'column', sm: 'row' } }}>
      {tipData.map((tip) => (
        <Grid item xs={12} sm={6} md={4} key={tip._id}>
          <Link to={`/Tips/${tip._id}`} style={{ textDecoration: 'none' }}>
            <Card className={'TipsCard'}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${ENDPOINT}/uploads/${tip.img}`}
                  alt="tip image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tip.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Autor: {tip.author}
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

export default TipCard;

