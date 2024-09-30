import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, IconButton, Container,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Ejemplos de datos
const exampleRecipe = {
  author: "Thor, Dios del Trueno",
  name: "Ensalada César",
  description: "Una ensalada clásica y refrescante, ideal para el verano. Combina lechuga fresca con crutones y aderezo César.",
  ingredients: ["Lechuga romana", "Crutones", "Queso parmesano", "Aderezo César", "Pechuga de pollo (opcional)"],
  time: "15 minutos",
  difficulty: "Fácil",
  dietaryPreferences: "Sin gluten"
};

const exampleTip = {
  author: "Loki",
  title: "Cómo conservar la lechuga fresca",
  description: "Almacenar en un envase hermético con toallas de papel para evitar que se marchite."
};

const exampleUser = {
  email: "user@example.com",
  password: "password123"
};

const initialData = {
  recipes: [exampleRecipe],
  tips: [exampleTip],
  users: [exampleUser]
};

const AdminTable = () => {
  const [viewType, setViewType] = useState('recipes');
  const [data, setData] = useState(initialData);

  // Función para eliminar
  const handleDelete = (type, index) => {
    const updatedData = { ...data };
    updatedData[type] = updatedData[type].filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <Container maxWidth='xl' sx={{ paddingTop: '20px' }}>
      {/* Botones de selección */}
      <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
        <Typography variant='h3'>Tabla de Administración</Typography>
        <ButtonGroup variant="contained" sx={{ marginBottom: 2 }}>
          <Button
            onClick={() => setViewType('recipes')}
            sx={{
              backgroundColor: viewType === 'recipes' ? '#1976d2' : 'white',
              color: viewType === 'recipes' ? 'white' : 'black',
            }}
          >
            Recetas
          </Button>
          <Button
            onClick={() => setViewType('tips')}
            sx={{
              backgroundColor: viewType === 'tips' ? '#1976d2' : 'white',
              color: viewType === 'tips' ? 'white' : 'black',
            }}
          >
            Consejos
          </Button>
          <Button
            onClick={() => setViewType('users')}
            sx={{
              backgroundColor: viewType === 'users' ? '#1976d2' : 'white',
              color: viewType === 'users' ? 'white' : 'black',
            }}
          >
            Usuarios
          </Button>
        </ButtonGroup>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {viewType === 'recipes' && (
                <>
                  <TableCell>Autor</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Tiempo</TableCell>
                  <TableCell>Dificultad</TableCell>
                  <TableCell>Tipo de Dieta</TableCell>
                  <TableCell>Acciones</TableCell>
                </>
              )}
              {viewType === 'tips' && (
                <>
                  <TableCell>Autor</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Acciones</TableCell>
                </>
              )}
              {viewType === 'users' && (
                <>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Acciones</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {viewType === 'recipes' && data.recipes.map((recipe, index) => (
              <TableRow key={index}>
                <TableCell>{recipe.author}</TableCell>
                <TableCell>{recipe.name}</TableCell>
                <TableCell>{recipe.description}</TableCell>
                <TableCell>{recipe.time}</TableCell>
                <TableCell>{recipe.difficulty}</TableCell>
                <TableCell>{recipe.dietaryPreferences}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete('recipes', index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {viewType === 'tips' && data.tips.map((tip, index) => (
              <TableRow key={index}>
                <TableCell>{tip.author}</TableCell>
                <TableCell>{tip.title}</TableCell>
                <TableCell>{tip.description}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete('tips', index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {viewType === 'users' && data.users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete('users', index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminTable;
