import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { VitaCocinaIcon } from '../components/CustomIcons';
import ColorModeSelect from '../components/ColorModeSelect';
import AppTheme from '../components/AppTheme';

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignUp(props) {
    const [, setMode] = React.useState('light');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState(''); 
    const navigate = useNavigate();
    React.useEffect(() => {
        const savedMode = localStorage.getItem('themeMode');
        if (savedMode) {
            setMode(savedMode);
        } else {
            const systemPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);


    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const name = document.getElementById('name');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Por favor, introduce una dirección de correo electrónico válida.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('El nombre es obligatorio.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        if (nameError || emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        const userData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        };

        try {
            const response = await fetch(`${ENDPOINT}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Error en la creación del usuario');
            }
            const result = await response.json();
            alert('Usuario creado exitosamente.', result);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <AppTheme {...props} >
                <CssBaseline enableColorScheme />
                <SignUpContainer direction="column" justifyContent="space-between">
                    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                    <Card variant="outlined">
                        <VitaCocinaIcon />
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >
                            Registrate
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
                                <FormLabel htmlFor="name">Nombre</FormLabel>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    placeholder="Miguel Bose"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Mail</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="TuMail@mail.com"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Contraseña</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="••••••"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant="outlined"
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={validateInputs}
                            >
                                Registrate
                            </Button>
                            <Typography sx={{ textAlign: 'center' }}>
                                ¿Tienes cuenta?{' '}
                                <span>
                                    <Link
                                        href="/login"
                                        variant="body2"
                                        sx={{ alignSelf: 'center' }}
                                    >
                                        Inicia sesión
                                    </Link>
                                </span>
                            </Typography>
                        </Box>
                    </Card>
                </SignUpContainer>
        </AppTheme>
    );
}