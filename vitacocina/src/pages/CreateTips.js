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

const CreateTipContainer = styled(Stack)(({ theme }) => ({
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

export default function CreateTip(props) {
    const [titleError, setTitleError] = React.useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState('');
    const [imgError, setImgError] = React.useState(false);
    const [imgErrorMessage, setImgErrorMessage] = React.useState('');
    const [imgFile, setImgFile] = React.useState(null);
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

        let isValid = true;

        if (!title.value || title.value.length < 5) {
            setTitleError(true);
            setTitleErrorMessage('El título debe tener al menos 5 caracteres.');
            isValid = false;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }

        if (!description.value || description.value.length < 10) {
            setDescriptionError(true);
            setDescriptionErrorMessage('La descripción debe tener al menos 10 caracteres.');
            isValid = false;
        } else {
            setDescriptionError(false);
            setDescriptionErrorMessage('');
        }

        if (!imgFile) {
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
        if (titleError || descriptionError || imgError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        const user = JSON.parse(localStorage.getItem('user'));

        const formData = new FormData();
        formData.append('author', user._id);
        formData.append('title', data.get('title'));
        formData.append('description', data.get('description'));
        formData.append('img', imgFile);

        try {
            const response = await fetch('http://localhost:3000/api/tips', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error en la creación del tip');
            }
            const result = await response.json();
            alert('Tip creado exitosamente.', result);
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (event) => {
        setImgFile(event.target.files[0]);
    };

    return (
        <AppTheme {...props} >
                <CssBaseline enableColorScheme />
                <CreateTipContainer direction="column" justifyContent="center" alignItems="center">
                    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                    <Card variant="outlined">
                        <VitaCocinaIcon />
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >
                            Crear Tip
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
                                    placeholder="Título del tip"
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
                                    placeholder="Descripción del tip"
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
                                <input
                                    required
                                    fullWidth
                                    name="img"
                                    type="file"
                                    id="img"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ marginTop: '8px' }}
                                />
                                {imgError && <Typography color="error">{imgErrorMessage}</Typography>}
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={validateInputs}
                            >
                                Crear Tip
                            </Button>
                        </Box>
                    </Card>
                </CreateTipContainer>
        </AppTheme>
    );
}