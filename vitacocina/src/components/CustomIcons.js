import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Box from '@mui/material/Box';

export function VitaCocinaIcon() {
  return (
      <Box 
      component="img"
      src="/Logo.png"
      alt="Vita Cocina Logo"
      sx={{ height: '25%', width: '25%' }}
      />
  );
}