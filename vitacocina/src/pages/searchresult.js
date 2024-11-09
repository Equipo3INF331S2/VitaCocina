import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import RecipeCard from '../components/RecipeCard';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams, useLocation } from 'react-router-dom';


const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const SearchResults = () => {

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {


        const searchTerm = searchParams.get('q');
        const diet = searchParams.get('diet');
        const time = searchParams.get('time');
        const skill = searchParams.get('skill');



        let apiQueryString = `?q=${encodeURIComponent(searchTerm || '')}`;
        if (diet) { apiQueryString += `&diet=${encodeURIComponent(diet)}`; }
        if (time) { apiQueryString += `&time=${encodeURIComponent(time)}`; }
        if (skill) { apiQueryString += `&skill=${encodeURIComponent(skill)}`; }


        const url = `${ENDPOINT}/api/searchrecipes${apiQueryString}`;
        console.log("URL de fetch:", url);

        setLoading(true);
        fetch(`${ENDPOINT}/api/searchrecipes${apiQueryString}`, { method: 'GET' })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error en la solicitud: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setResults(data)
                setLoading(false);
            })

            .catch(error => {
                console.error("Error al obtener los resultados:", error);
                setResults([]);
                setLoading(false);
            });

    }, [location.search]);



    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <img src="/Logo.png" alt="Vita Cocina Logo" style={{ height: '15rem', width: 'auto', marginBottom: '1rem' }} />
                <Typography variant="h6" color="textSecondary">Cargando Recetas...</Typography>
                <CircularProgress sx={{ marginTop: '1rem' }} />
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
                Recetas
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2%' }}>
                <RecipeCard recipeData={results} />
            </Box>
        </div>
    );
}

export default SearchResults;