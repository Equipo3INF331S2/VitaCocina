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
const Tip = require('../../models/Tip');
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

describe('Users API', () => {
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
    await Tip.deleteMany(); 
    await User.deleteMany();
  });

  test('GET /allUsers debe devolver todos los usuarios', async () => {
    const userT = new User({
      name: 'Usuario de prueba',
      email: 'example@example.com',
      password: 'password123'
    });
    await userT.save();

    const res = await request(app).get('/api/allUsers');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe("Test User");
    expect(res.body[1].name).toBe("Usuario de prueba");
  });

  test('POST /users debe agregar un usuario', async () => {
    const userT = {
        name: 'Usuario de prueba',
        email: 'example@example.com',
        password: 'password123'
    };

    const res = await request(app).post('/api/users').send(userT);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Usuario de prueba');
    expect(res.body.email).toBe('example@example.com');
  });

  test('DELETE /users/:Id debe eliminar un usuario', async () => {
    const userT = new User({
        name: 'Usuario de prueba',
        email: 'example@example.com',
        password: 'password123'
    });
    await userT.save();

    const res = await request(app).delete(`/api/users/${userT._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario y sus recetas, consejos y reseñas eliminados exitosamente');
  });
});
