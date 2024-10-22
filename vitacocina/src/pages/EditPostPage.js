import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, Button, Box, TextField, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:5000';

const EditPostPage = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [post, setPost] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
    const [ingredientsError, setIngredientsError] = useState(false);
    const [ingredientsErrorMessage, setIngredientsErrorMessage] = useState('');
    const [instructionsError, setInstructionsError] = useState(false);
    const [instructionsErrorMessage, setInstructionsErrorMessage] = useState('');
    const [imgError, setImgError] = useState(false);
    const [imgErrorMessage, setImgErrorMessage] = useState('');
    const [timeError, setTimeError] = useState(false);
    const [timeErrorMessage, setTimeErrorMessage] = useState('');
    const [difficultyError, setDifficultyError] = useState(false);
    const [difficultyErrorMessage, setDifficultyErrorMessage] = useState('');
    const [dietaryPreferences, setDietaryPreferences] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        fetch(`${ENDPOINT}/api/${type}/${id}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setPost(data);
                if (type === 'recipe') {
                    setDietaryPreferences(data.dietaryPreferences);
                    setTime(data.time);
                }
            })
            .catch(error => {
                console.error("Error obteniendo datos:", error);
            });
    }, [type, id]);

    const validateInputs = () => {
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const ingredients = document.getElementById('ingredients');
        const instructions = document.getElementById('instructions');
        const img = document.getElementById('img');
        const difficulty = document.getElementById('difficulty');

        let isValid = true;

        if (!title.value || title.value.length < 1) {
            setTitleError(true);
            setTitleErrorMessage('El título es obligatorio.');
            isValid = false;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }

        if (!description.value || description.value.length < 1) {
            setDescriptionError(true);
            setDescriptionErrorMessage('La descripción es obligatoria.');
            isValid = false;
        } else {
            setDescriptionError(false);
            setDescriptionErrorMessage('');
        }

        if (type === 'recipe') {
            if (!ingredients.value || ingredients.value.length < 1) {
                setIngredientsError(true);
                setIngredientsErrorMessage('Los ingredientes son obligatorios.');
                isValid = false;
            } else {
                setIngredientsError(false);
                setIngredientsErrorMessage('');
            }

            if (!instructions.value || instructions.value.length < 1) {
                setInstructionsError(true);
                setInstructionsErrorMessage('Las instrucciones son obligatorias.');
                isValid = false;
            } else {
                setInstructionsError(false);
                setInstructionsErrorMessage('');
            }

            if (!time || time.length < 1) {
                setTimeError(true);
                setTimeErrorMessage('El tiempo es obligatorio.');
                isValid = false;
            } else {
                setTimeError(false);
                setTimeErrorMessage('');
            }

            if (!difficulty.value || difficulty.value.length < 1) {
                setDifficultyError(true);
                setDifficultyErrorMessage('La dificultad es obligatoria.');
                isValid = false;
            } else {
                setDifficultyError(false);
                setDifficultyErrorMessage('');
            }
        }

        if (!img.files || img.files.length === 0) {
            setImgError(true);
            setImgErrorMessage('La imagen es obligatoria.');
            isValid = false;
        } else {
            setImgError(false);
            setImgErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (titleError || descriptionError || imgError || (type === 'recipe' && (ingredientsError || instructionsError || timeError || difficultyError))) {
            return;
        }

        const form = event.currentTarget;

        // Subir la imagen primero
        const imgFile = form.img.files[0];
        const imgData = new FormData();
        imgData.append('img', imgFile);

        try {
            const imgResponse = await fetch(`${ENDPOINT}/api/recipesImg`, {
                method: 'POST',
                body: imgData,
            });

            if (!imgResponse.ok) {
                throw new Error('Error en la carga de la imagen');
            }

            const imgResult = await imgResponse.json();
            const imgUrl = imgResult.url;

            // Crear el objeto actualizado con la URL de la imagen
            const updatedPost = {
                author: user._id,
                title: form.title.value,
                description: form.description.value,
                img: imgUrl,
            };

            if (type === 'recipe') {
                updatedPost.name = form.title.value;
                updatedPost.ingredients = form.ingredients.value.split(',');
                updatedPost.instructions = form.instructions.value.split(',');
                updatedPost.dietaryPreferences = dietaryPreferences;
                updatedPost.time = time;
                updatedPost.difficulty = form.difficulty.value;
            }
            console.log('updatedPost:', updatedPost);
            const response = await fetch(`${ENDPOINT}/api/${type}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost),
            });

            if (!response.ok) {
                throw new Error('Error en la actualización del post');
            }

            const result = await response.json();
            alert('Post actualizado exitosamente.', result);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!post) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Container maxWidth='lg' sx={{ paddingTop: '20px' }}>
            <Typography variant="h3" gutterBottom>
                Editar {type === 'recipe' ? 'Receta' : 'Tip'}
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="title">Título</FormLabel>
                    <TextField
                        autoComplete="title"
                        name="title"
                        required
                        fullWidth
                        id="title"
                        placeholder={`Título del ${type === 'recipe' ? 'receta' : 'tip'}`}
                        defaultValue={post.title || post.name}
                        error={titleError}
                        helperText={titleErrorMessage}
                        color={titleError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="description">Descripción</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="description"
                        placeholder={`Descripción del ${type === 'recipe' ? 'receta' : 'tip'}`}
                        name="description"
                        autoComplete="description"
                        variant="outlined"
                        defaultValue={post.description}
                        error={descriptionError}
                        helperText={descriptionErrorMessage}
                        color={descriptionError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="img">Imagen</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="img"
                        type="file"
                        id="img"
                        autoComplete="img"
                        variant="outlined"
                        error={imgError}
                        helperText={imgErrorMessage}
                        color={imgError ? 'error' : 'primary'}
                    />
                </FormControl>
                {type === 'recipe' && (
                    <>
                        <FormControl>
                            <FormLabel htmlFor="ingredients">Ingredientes (separados por comas)</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="ingredients"
                                placeholder="Ingredientes de la receta"
                                id="ingredients"
                                autoComplete="ingredients"
                                variant="outlined"
                                defaultValue={post.ingredients.join(',')}
                                error={ingredientsError}
                                helperText={ingredientsErrorMessage}
                                color={ingredientsError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="instructions">Instrucciones (separadas por comas)</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="instructions"
                                placeholder="Instrucciones de la receta"
                                id="instructions"
                                autoComplete="instructions"
                                variant="outlined"
                                defaultValue={post.instructions.join(',')}
                                error={instructionsError}
                                helperText={instructionsErrorMessage}
                                color={instructionsError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="dietaryPreferences">Preferencias Dietéticas</FormLabel>
                            <Select
                                fullWidth
                                name="dietaryPreferences"
                                id="dietaryPreferences"
                                value={dietaryPreferences}
                                onChange={(e) => setDietaryPreferences(e.target.value)}
                                variant="outlined"
                            >
                                <MenuItem value="Vegano">Vegano</MenuItem>
                                <MenuItem value="Vegetariano">Vegetariano</MenuItem>
                                <MenuItem value="Keto">Keto</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="time">Tiempo</FormLabel>
                            <Select
                                fullWidth
                                name="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                variant="outlined"
                            >
                                <MenuItem value="Menos de 30 min">Menos de 30 min</MenuItem>
                                <MenuItem value="30-60 min">30-60 min</MenuItem>
                                <MenuItem value="Más de 60 min">Más de 60 min</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="difficulty">Dificultad</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="difficulty"
                                placeholder="Dificultad de la receta"
                                id="difficulty"
                                autoComplete="difficulty"
                                variant="outlined"
                                defaultValue={post.difficulty}
                                error={difficultyError}
                                helperText={difficultyErrorMessage}
                                color={difficultyError ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    Actualizar {type === 'recipe' ? 'Receta' : 'Tip'}
                </Button>
            </Box>
        </Container>
    );
};

export default EditPostPage;