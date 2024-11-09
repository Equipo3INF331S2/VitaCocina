import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { VitaCocinaIcon } from '../components/CustomIcons';
import ColorModeSelect from '../components/ColorModeSelect';
import AppTheme from '../components/AppTheme';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const CreateRecipeContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    ...theme.applyStyles('dark', {
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
}));

export default function CreateRecipe(props) {
    const [titleError, setTitleError] = React.useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState('');
    const [ingredientsError, setIngredientsError] = React.useState(false);
    const [ingredientsErrorMessage, setIngredientsErrorMessage] = React.useState('');
    const [instructionsError, setInstructionsError] = React.useState(false);
    const [instructionsErrorMessage, setInstructionsErrorMessage] = React.useState('');
    const [imgError, setImgError] = React.useState(false);
    const [imgErrorMessage, setImgErrorMessage] = React.useState('');
    const [timeError, setTimeError] = React.useState(false);
    const [timeErrorMessage, setTimeErrorMessage] = React.useState('');
    const [difficultyError, setDifficultyError] = React.useState(false);
    const [difficultyErrorMessage, setDifficultyErrorMessage] = React.useState('');
    const [dietaryPreferences, setDietaryPreferences] = React.useState('');
    const [time, setTime] = React.useState('');
    const navigate = useNavigate();

    // Verificar si el usuario está logueado
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

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

        if (!img.files || img.files.length === 0) {
            setImgError(true);
            setImgErrorMessage('La imagen es obligatoria.');
            isValid = false;
        } else {
            setImgError(false);
            setImgErrorMessage('');
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

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (titleError || descriptionError || ingredientsError || instructionsError || imgError || timeError || difficultyError) {
            return;
        }

        const form = event.currentTarget;
        const user = JSON.parse(localStorage.getItem('user'));

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

            // Crear la receta con la URL de la imagen
            const recipeData = {
                author: user._id,
                name: form.title.value,
                description: form.description.value,
                img: imgUrl,
                ingredients: form.ingredients.value.split(','),
                instructions: form.instructions.value.split(','),
                dietaryPreferences: dietaryPreferences,
                time: time,
                difficulty: form.difficulty.value,
            };

            const response = await fetch(`${ENDPOINT}/api/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error('Error en la creación de la receta');
            }

            const result = await response.json();
            alert('Receta creada exitosamente.', result);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <AppTheme {...props} >
            <CssBaseline enableColorScheme />
            <CreateRecipeContainer direction="column" justifyContent="center" alignItems="center">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <VitaCocinaIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Crear Receta
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
                                placeholder="Título de la receta"
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
                                placeholder="Descripción de la receta"
                                name="description"
                                autoComplete="description"
                                variant="outlined"
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
                                error={difficultyError}
                                helperText={difficultyErrorMessage}
                                color={difficultyError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Crear Receta
                        </Button>
                    </Box>
                </Card>
            </CreateRecipeContainer>
        </AppTheme>
    );
}