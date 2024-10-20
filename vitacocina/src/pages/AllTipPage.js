import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TipCard from '../components/TipCard';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';


const AllTipPage = () => {
    // Ejemplo de datos para las tarjetas de recetas (reemplaza con tus datos reales)
    const tipData = Array(30).fill({  // Crea 30 recetas de ejemplo
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
                    color: '#000000',
                    fontSize: 'clamp(1rem, 4vw, 6rem)',
                    textAlign: 'left',
                    marginLeft: '10%'
                }}
            >
                Consejos
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2%' }}>
                <Grid container spacing={2} id="recipe-grid" sx={{ width: '100%', maxWidth: '1200px', direction: { xs: 'column', sm: 'row' } }}> {/* Contenedor principal */}
                    {tipData.map((tip, index) => (
                        <Grid item key={tip.id} xs={12} sm={6} md={4}> {/* Define el ancho de las columnas */}
                            <TipCard
                                title={tip.title}
                                image={tip.image}
                                description={tip.description}
                                author={tip.author}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default AllTipPage;