import React from 'react';

import { Paper, List, ListItem, Typography, Box, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PostListPaper = ({ posts, type, handleEdit, handleDelete, fallbackText }) => {

  return (
    <Paper elevation={4} sx={{ p: 3, height: '480px', overflowY: 'auto' }}>
      {posts.length === 0 ? (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center'}}>
          <Typography variant='h3' component='h6' textAlign='center'>{fallbackText}</Typography>
        </Box>
      ) : (
      <List>
        {posts.map((post) => (
          <Paper variant='outlined' key={post.id} sx={{ mb: 2, p: 2 }}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">{post.title}</Typography>
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(type, post.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(type, post.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
      )}
    </Paper>
  );
};

export default PostListPaper;