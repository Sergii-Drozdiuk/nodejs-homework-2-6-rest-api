import mongoose from 'mongoose';
import request from 'supertest';
import 'dotenv/config';
import app from '../../app.js';
import User from '../../models/User.js';

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe('test /api/users/register', () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  test('test register with correct data', async () => {
    const registerData = {
      email: 'testuser@gmail.com',
      password: '123456',
    };
    const { statusCode, body } = await request(app)
      .post('/api/users/register')
      .send(registerData);
    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
  });
});

describe('test /api/users/login', () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);

    const registerData = {
      email: 'testuser@gmail.com',
      password: '123456',
    };

    await request(app).post('/api/users/register').send(registerData);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('test login with correct data', async () => {
    const loginData = {
      email: 'testuser@gmail.com',
      password: '123456',
    };

    const { statusCode, body } = await request(app)
      .post('/api/users/login')
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();

    const user = await User.findOne({ email: loginData.email });
    expect(user.email).toBe(loginData.email);
    expect(typeof user.email).toBe('string');
    expect(user.subscription).toBe(loginData.subscription || 'starter');
    expect(typeof user.subscription).toBe('string');
    expect(user.avatarURL).toBeDefined();
  });
});
