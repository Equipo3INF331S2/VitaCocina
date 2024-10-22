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

describe('Tips API', () => {
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

  test('GET /tips debe devolver todas los consejos', async () => {
    const tip = new Tip({
      title: 'Consejo de prueba',
      description: 'Descripción de prueba',
      img: 'imagen.jpg',
      author: user._id
    });
    await tip.save();

    const res = await request(app).get('/api/tips');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Consejo de prueba");
  });

  test('POST /tips debe agregar un tip', async () => {
    const newTip = {
      title: 'Nuevo Consejo',
      description: 'Un buen consejo',
      img: 'imagen.jpg',
      author: user._id
    };

    const res = await request(app).post('/api/tips').send(newTip);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Nuevo Consejo');
    expect(res.body.description).toBe('Un buen consejo');
  });

  test('DELETE /tip/:tipId debe eliminar un tip', async () => {
    const tip = new Tip({
      title: 'Consejo de usuario',
      description: 'Descripción de prueba',
      img: 'imagen.jpg',
      author: user._id
    });
    await tip.save();

    const res = await request(app).delete(`/api/tips/${tip._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Consejo eliminado exitosamente');
  });

  test('GET /tips/user/:userId debe listar tips de un usuario específico', async () => {
    const tip = new Tip({
      title: 'Consejo de usuario',
      description: 'Descripción de prueba',
      img: 'imagen.jpg',
      author: user._id
    });
    await tip.save();

    const res = await request(app).get(`/api/tips/user/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].author.name).toBe('Test User');
  });

  test('PUT /tip/:tipId debe actualizar un consejo', async () => {
    const tip = new Tip({
      title: 'Consejo de usuario',
      description: 'Descripción de prueba',
      img: 'imagen.jpg',
      author: user._id,
    });
    await tip.save();

    const updatedData = {
      title: 'Consejo actualizado',
      description: 'Descripcion actualizada'
    };

    const res = await request(app)
      .put(`/api/tip/${tip._id}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Consejo actualizado');
    expect(res.body.description).toBe('Descripcion actualizada')


  });
});
