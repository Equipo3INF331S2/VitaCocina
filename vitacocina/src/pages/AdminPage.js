import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, IconButton, Container,
  Box,
  Typography,
  TablePagination,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const AdminTable = () => {
  const [viewType, setViewType] = useState('recipes');
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [recipesLoaded, setRecipesLoaded] = useState(false);
  const [tipsLoaded, setTipsLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    fetch(`${ENDPOINT}/api/recipes`, { method: 'GET' })
      .then(response => response.json())
      .then(recipesData => {
        const transformedRecipes = recipesData.map(recipe => ({
          ...recipe,
          author: recipe.author.name
        }));

        setData(prevData => ({
          ...prevData,
          recipes: transformedRecipes
        }));
        setRecipesLoaded(true);
      })
      .catch(error => console.error('Error al obtener recetas:', error));
  }, []);
  
  useEffect(() => {
    fetch(`${ENDPOINT}/api/tips`, { method: 'GET' })
      .then(response => response.json())
      .then(tipsData => {
        const transformedTips = tipsData.map(tip => ({
          ...tip,
          author: tip.author.name
        }));

        setData(prevData => ({
          ...prevData,
          tips: transformedTips
        }));
        setTipsLoaded(true);
      })
      .catch(error => console.error('Error al obtener consejos:', error));
  }, []);
  
  useEffect(() => {
    fetch(`${ENDPOINT}/api/allUsers`, { method: 'GET' })
      .then(response => response.json())
      .then(usersData => {
        setData(prevData => ({
          ...prevData,
          users: usersData
        }));
        setUsersLoaded(true);
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);
  

  const handleDelete = async (type, index, id) => {
    const updatedData = { ...data };
  
    try {
      let endpoint;

      switch (type) {
        case 'recipes':
          endpoint = `${ENDPOINT}/api/recipe/${id}`;
          break;
        case 'tips':
          endpoint = `${ENDPOINT}/api/tips/${id}`;
          break;
        case 'users':
          endpoint = `${ENDPOINT}/api/users/${id}`;
          break;
        default:
          throw new Error('Tipo no válido');
      }

      const response = await fetch(endpoint, { method: 'DELETE' });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar');
      }

      updatedData[type] = updatedData[type].filter((_, i) => i !== index);
      setData(updatedData);
    } catch (error) {
      console.error('Error al eliminar:', error.message);
      alert('Ocurrió un error al eliminar: ' + error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDisplayedData = () => {
    const currentData = data[viewType] || [];
    return currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  if (!(recipesLoaded && tipsLoaded && usersLoaded)) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: '200px', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

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
                  <TableCell>Nombre</TableCell>
                  <TableCell>Acciones</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {getDisplayedData().map((item, index) => (
              <TableRow key={index}>
                {viewType === 'recipes' && (
                  <>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.difficulty}</TableCell>
                    <TableCell>{item.dietaryPreferences}</TableCell>
                  </>
                )}
                {viewType === 'tips' && (
                  <>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </>
                )}
                {viewType === 'users' && (
                  <>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.name}</TableCell>
                  </>
                )}
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(viewType, index, item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        component="div"
        count={data[viewType].length} // Total de elementos
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Container>
  );
};

export default AdminTable;
