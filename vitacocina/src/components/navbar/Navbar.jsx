import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/vitacocina.png';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isUserLoggedIn = Boolean(user);
  const isAdmin = isUserLoggedIn && user.email.endsWith('@vitacocina.com');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleNavigation = (page) => {
    if (page === 'Inicio') {
      navigate('/');
    } else if (page === 'Recetas') {
      navigate('/allrecipe');
    } else if (page === 'Consejos') {
      navigate('/alltip');
    } else if (page === 'Publicaciones') {
      navigate('/posts');
    } else if (page === 'Favoritos') {
      navigate('/favorites');
    } else if (page === 'Admin') {
      navigate('/admin');
    }
  };

  const publicPages = ['Inicio', 'Recetas', 'Consejos'];
  const privatePages = isUserLoggedIn ? ['Publicaciones', 'Favoritos'] : [];

  return (
    <AppBar position="static" sx={{ height: 80 }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Toolbar disableGutters sx={{ height: '100%', alignItems: 'center' }}>
          {/* Logo */}
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            onClick={() => navigate('/')}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: 80, cursor: 'pointer' }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {[...publicPages, ...privatePages, isAdmin && 'Admin'].filter(Boolean).map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Box
            component="a"
            href="#"
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 2,
              flexGrow: 1,
              textDecoration: 'none',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Box component="img" src={Logo} alt="Logo" sx={{ height: 80 }} />
          </Box>

          {/* Botones de navegación */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {[...publicPages, ...privatePages, isAdmin && 'Admin'].filter(Boolean).map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Botón de cerrar/iniciar sesión */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isUserLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}>
              <Button onClick={isUserLoggedIn ? handleLogout : handleLogin} sx={{ color: 'white' }}>
                {isUserLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
