require('dotenv').config({
  path: '.env.test',
  silent: false,
});
const http = require('http');
const mongoose = require('mongoose');
const request = require('supertest');

const User = require('../src/models/User');

const { app } = require('../src/app');
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
      console.log('Connected successfully');
    });

    server.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server is running`);
      console.log(new Date().toUTCString());
      console.log('Port: ', process.env.PORT);
      console.log('Environment: ', process.env.NODE_ENV);
    });
  })
  .catch((err) => {
    console.log('Something went wrong with the database connection');
  });

beforeAll(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await User.deleteMany();
});

describe('Register and Login User', () => {
  it('should create a new user', async () => {
    const res = await request(server)
      .post('/api/v1/user/register')
      .send({
        name: 'user name',
        email: 'useremail@gmail.com',
        password: '123456',
        confirmPassword: '123456',
      })
      .set('Accept', 'application/json');

    // console.log(res.request.url);
    // console.log(res.body.errors);
    expect(res.statusCode).toBe(201);
    expect(res.body.error).toBe(null);
    expect(res.header).not.toHaveProperty('token');
  });

  it('should login a user', async () => {
    const res = await request(server)
      .post('/api/v1/user/login')
      .send({
        email: 'useremail@gmail.com',
        password: '123456',
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(null);
    expect(res.header).not.toHaveProperty('token');
  });
});

describe('Register and Login User With Empty Fields', () => {
  it('should respond with a 400 status code', async () => {
    const res = await request(server).post('/api/v1/user/register').send({});
    expect(res.statusCode).toBe(400);
  });

  it('should respond with a 400 status code', async () => {
    const res = await request(server).post('/api/v1/user/login').send({});
    expect(res.statusCode).toBe(400);
  });
});
