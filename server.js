const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware para servir imagenes
app.use('/uploads', express.static('uploads'));

// Conectar a MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));
}

// Rutas
const recipeRoutes = require('./routes/recipeRoutes');
const tipRoutes = require('./routes/tipRoutes');
const userRouter = require('./routes/userRoutes');
const reviewsRouter = require('./routes/reviewRoutes');

app.use('/api', [recipeRoutes, tipRoutes, userRouter, reviewsRouter]);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


module.exports = { app };