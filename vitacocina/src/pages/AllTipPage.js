import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TipCard from '../components/TipCard';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';



const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const AllTipPage = () => {

    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${ENDPOINT}/api/tips`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                const sortedTips = [...data].sort((a, b) => a.title.localeCompare(b.title));
                setTips(sortedTips);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching tips:", error);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}> 
                <img src="/Logo.png" alt="Vita Cocina Logo" style={{ height: '15rem', width: 'auto', marginBottom: '1rem' }} />
                <Typography variant="h6" color="textSecondary">Cargando Consejos...</Typography> 
                <CircularProgress sx={{marginTop:'1rem'}}/>
            </Box>
        );
    }

    if (!tips || tips.length === 0) {
        return (
            <Box sx={{ paddingTop: '100px', textAlign: 'center' }}>
                <Typography variant="h6">No se encontraron Consejos.</Typography>
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
                Consejos
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2%' }}>
                <TipCard tipData={tips} /> {/* Pasa todos los tips a TipCard */}
            </Box>
        </div>
    );
}

export default AllTipPage;