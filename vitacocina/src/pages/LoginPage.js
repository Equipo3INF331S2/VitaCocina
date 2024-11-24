import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/ForgotPassword';
import { VitaCocinaIcon } from '../components/CustomIcons';
import AppTheme from '../components/AppTheme';
import ColorModeSelect from '../components/ColorModeSelect';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

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

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        if (emailError || passwordError) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            const response = await fetch(`${ENDPOINT}/api/users?email=${email}&password=${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error en la verificación del usuario');
            }

            const result = await response.json();
            console.log('Usuario encontrado:', result);

            localStorage.setItem('user', JSON.stringify(result.user));

            alert('Inicio de sesión exitoso');

            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
        }
    };

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Ingrese un mail válido.');
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

        return isValid;
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <VitaCocinaIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Inicio Sesión
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
                            <FormLabel htmlFor="email">Mail</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="TuMail@mail.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                sx={{ ariaLabel: 'email' }}
                            />
                        </FormControl>
                        <FormControl>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="password">Contraseña</FormLabel>
                                <Link
                                    component="button"
                                    type="button"
                                    onClick={handleClickOpen}
                                    variant="body2"
                                    sx={{ alignSelf: 'baseline' }}
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </Box>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recuérdame"
                        />
                        <ForgotPassword open={open} handleClose={handleClose} />
                        <Button
                            id="loginButton"
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Login
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            ¿No tienes cuenta?{' '}
                            <span>
                                <Link
                                    href="/register"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Registrate
                                </Link>
                            </span>
                        </Typography>
                    </Box>

                </Card>
            </SignInContainer>
        </AppTheme>
    );
}