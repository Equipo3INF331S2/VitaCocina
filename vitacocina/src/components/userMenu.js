import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Link from '@mui/material/Link';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));


const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
};

const user = JSON.parse(localStorage.getItem('user'));
const isUserLoggedIn = Boolean(user);
const isAdmin = isUserLoggedIn && user.email.endsWith('@vitacocina.com');

const actions = isAdmin ? [  // <-- Condicional para acciones de admin
  { icon: <Link href="/posts" sx={{ color: '#000000', textDecoration: 'none' }}>Ver mis publicaciones</Link> },
  { icon: <Link href="/createRecipe" sx={{ color: '#000000', textDecoration: 'none' }}>Agregar Receta</Link> },
  { icon: <Link href="/createTip" sx={{ color: '#000000', textDecoration: 'none' }}>Agregar Consejo</Link> },
  // { icon: <Link href="/allrecipe" sx={{ color: '#000000', textDecoration: 'none' }}>Editar Cuenta</Link> },
  { icon: <Link href="/favorites" sx={{ color: '#000000', textDecoration: 'none' }}>Ver Lista favoritos</Link> },
  { icon: <Link href="/admin" sx={{ color: '#000000', textDecoration: 'none' }}>Administrar Vitacocina</Link> },
  { icon: <Link onClick={handleLogout} sx={{ color: '#000000', textDecoration: 'none', cursor: 'pointer' }}>Cerrar Sesión</Link> },

] : [ // <-- Acciones para usuarios normales
  { icon: <Link href="/posts" sx={{ color: '#000000', textDecoration: 'none' }}>Ver mis publicaciones</Link> },
  { icon: <Link href="/createRecipe" sx={{ color: '#000000', textDecoration: 'none' }}>Agregar Receta</Link> },
  { icon: <Link href="/createTip" sx={{ color: '#000000', textDecoration: 'none' }}>Agregar Consejo</Link> },
  // { icon: <Link href="/allrecipe" sx={{ color: '#000000', textDecoration: 'none' }}>Editar Cuenta</Link> },
  { icon: <Link href="/favorites" sx={{ color: '#000000', textDecoration: 'none' }}>Ver Lista favoritos</Link> },
  { icon: <Link onClick={handleLogout} sx={{ color: '#000000', textDecoration: 'none', cursor: 'pointer' }}>Cerrar Sesión</Link> },

];

const UserMenu = () => {
  const [direction, setDirection] = React.useState('down');
  const [hidden, setHidden] = React.useState(false);


  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Box  sx={{ position: 'relative', mt: 3, height: 320 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              sx={{
                '&.MuiSpeedDialAction-fab': {
                  width: 130, 
                  borderRadius: 1,
                  height: 45,
                },
              }}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}

export default UserMenu;