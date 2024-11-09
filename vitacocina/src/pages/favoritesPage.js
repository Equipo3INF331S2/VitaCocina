import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import RecipeCard from '../components/RecipeCard';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';


const ENDPOINT = process.env.REACT_APP_ENDPOINT;


const FavoritesPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState([true]);
    
    useEffect(() => {
        setLoading(true);
        fetch(`${ENDPOINT}/api/favorites/${user._id}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const transformedData = data.map(recipe => ({
                    ...recipe,
                    author: recipe.author.name
                }));

                const sortedRecipes = [...transformedData].sort((a, b) => a.name.localeCompare(b.name));
                setRecipe(sortedRecipes);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    }, [user._id]);

    const onDelete = (recipeId) => {
        fetch(`${ENDPOINT}/api/favorites/${user._id}/${recipeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar la receta de favoritos');
                }
                setRecipe(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
            })
            .catch(error => {
                console.error("Error deleting recipe:", error);
            });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <img src="/Logo.png" alt="Vita Cocina Logo" style={{ height: '15rem', width: 'auto', marginBottom: '1rem' }} />
                <Typography variant="h6" color="textSecondary">Cargando Recetas...</Typography>
                <CircularProgress sx={{ marginTop: '1rem' }} />
            </Box>
        );
    }

    if (!recipe || recipe.length === 0) {
        return (
            <Box sx={{ paddingTop: '100px', textAlign: 'center' }}>
                <Typography variant="h6">No se encontraron Recetas.</Typography>
            </Box>
        );
    }

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
                Favoritos
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2%' }}>
                <RecipeCard recipeData={recipe} showDeleteButton={true} onDelete={onDelete} />
            </Box>
        </div>
    );
}

export default FavoritesPage;