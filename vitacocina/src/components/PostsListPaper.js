import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, List, ListItem, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';

const PostListPaper = ({ posts, type, handleEdit, handleDelete, fallbackText }) => {
  const navigate = useNavigate();

  const handlePaperClick = (postId) => {
    if (type === 'recipe') {
      navigate(`/recipes/${postId}`);
    } else if (type === 'tip') {
      navigate(`/tips/${postId}`);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 3, height: '480px', overflowY: 'auto' }}>
      {posts.length === 0 ? (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography variant='h3' component='h6' textAlign='center'>{fallbackText}</Typography>
        </Box>
      ) : (
        <List>
          {posts.map((post) => (
            <Paper 
              variant='outlined' 
              key={post._id} 
              sx={{
                mb: 2,
                p: 2,
                backgroundImage: `url(${ENDPOINT}/uploads/${post.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                position: 'relative',
                cursor: 'pointer' // Cambia el cursor para indicar que es clickeable
              }}
              onClick={() => handlePaperClick(post._id)}
            >
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <Typography variant="h6">{type === 'recipe' ? post.name : post.title}</Typography>
                <Box sx={{ zIndex: 1, display: 'flex', gap: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: 0.25,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.3s',
                      '&:hover': { backgroundColor: 'lightblue' }
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(type, post._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: 0.25,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.3s',
                      '&:hover': { backgroundColor: 'lightblue' }
                    }}
                  >
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el clic se propague al Paper
                        handleDelete(type, post._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
              <Box 
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  zIndex: 0
                }}
              />
            </Paper>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default PostListPaper;
