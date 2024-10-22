// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import { createRecipe, getRecipe, updateRecipe, deleteRecipe } from '../api/recipes'; 

jest.setTimeout(30000);
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../../server');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Recipes API', () => {
  let user;

  beforeEach(async () => {
    
    user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    });
    await user.save();
  });

  afterEach(async () => {
    await Recipe.deleteMany(); 
    await User.deleteMany();
  });

  test('GET /recipes debe devolver todas las recetas', async () => {
    const recipe = new Recipe({
      name: 'Receta de prueba',
      description: 'Descripción de prueba',
      img: 'imagen.jpg',
      ingredients: ['Ingrediente 1', 'Ingrediente 2'],
      instructions: ['Paso 1', 'Paso 2'],
      dietaryPreferences: 'Vegetariana',
      time: '30 minutos',
      difficulty: 'Fácil',
      author: user._id
    });
    await recipe.save();

    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Receta de prueba');
  });

  test('POST /recipes debe agregar una receta', async () => {
    const newRecipe = {
      name: 'Nueva Receta',
      description: 'Una deliciosa receta',
      img: 'imagen.jpg',
      ingredients: ['Ingrediente 1', 'Ingrediente 2'],
      instructions: ['Paso 1', 'Paso 2'],
      dietaryPreferences: 'Vegana',
      time: '45 minutos',
      difficulty: 'Media',
      author: user._id
    };

    const res = await request(app).post('/api/recipes').send(newRecipe);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Nueva Receta');
    expect(res.body.dietaryPreferences).toBe('Vegana');
  });

  test('DELETE /recipe/:recipeId debe eliminar una receta', async () => {
    const recipe = new Recipe({
      name: 'Receta de prueba',
      description: 'Descripción de prueba',
      img: 'imagen.jpg',
      ingredients: ['Ingrediente 1', 'Ingrediente 2'],
      instructions: ['Paso 1', 'Paso 2'],
      dietaryPreferences: 'Vegetariana',
      time: '30 minutos',
      difficulty: 'Fácil',
      author: user._id
    });
    await recipe.save();

    const res = await request(app).delete(`/api/recipe/${recipe._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Receta eliminada exitosamente');
  });

  test('GET /recipes/user/:userId debe listar recetas de un usuario específico', async () => {
    const recipe = new Recipe({
      name: 'Receta de usuario',
      description: 'Descripción de prueba',
      img: 'imagen.jpg',
      ingredients: ['Ingrediente 1', 'Ingrediente 2'],
      instructions: ['Paso 1', 'Paso 2'],
      dietaryPreferences: 'Omnívora',
      time: '15 minutos',
      difficulty: 'Fácil',
      author: user._id
    });
    await recipe.save();

    const res = await request(app).get(`/api/recipes/user/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].author.name).toBe('Test User');
  });
});
