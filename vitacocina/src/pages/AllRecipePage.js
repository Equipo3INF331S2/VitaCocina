import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import RecipeCard from '../components/RecipeCard';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';


const AllRecipePage = () => {
    // Ejemplo de datos para las tarjetas de recetas (reemplaza con tus datos reales)
    const recipeData = Array(30).fill({  // Crea 30 recetas de ejemplo
        title: 'Nombre de la Receta',
        image: 'url_de_la_imagen', // Reemplaza con la URL real de la imagen
        description: 'Descripción breve de la receta.',
    });

    return (
        <div>

            
            <Typography
                variant="h3"
                component="h3"
                sx={{
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    fontSize: 'clamp(1rem, 4vw, 6rem)',
                    textAlign: 'left',
                    marginLeft: '10%'
                }}
            >
                <Link href="/allrecipe" sx={{ color: '#000000', textDecoration: 'none' }}>Recetas</Link>
            </Typography>


            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2%' }}>
                <Grid container spacing={2} id="recipe-grid" sx={{ width: '100%', maxWidth: '1200px', direction: { xs: 'column', sm: 'row' } }}> {/* Contenedor principal */}
                    {recipeData.map((recipe, index) => (
                        <Grid item key={recipe.id} xs={12} sm={6} md={4}> {/* Define el ancho de las columnas */}
                            <RecipeCard 
                                title={recipe.title}
                                image={recipe.image}
                                description={recipe.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default AllRecipePage;