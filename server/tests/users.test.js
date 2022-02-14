const request = require('supertest');
const app = require("../app");

describe("Users routes", () => {

  it('should return a list of users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a single user', async () => {
    const res = await request(app)
      .get('/api/users/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.statusCode).toBe(200);
    expect(Object.prototype.toString.call(res.body)).toBe('[object Object]');
  });

  it('should return a 404 if user isn\'t found', async () => {
    const res = await request(app)
      .get('/api/users/420')
      .set('Accept', 'application/json')
      .expect(404);

    expect(res.body.error).toBe('User not found');
  });

  it('should create a new user in the database, given all fields', async () => {
    const user = {
      first_name: 'Jim',
      last_name: 'Testman',
      email: 'jim@testman.com',
      password: 'password'
    }

    const res = await request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201)

      expect(res.body).toBe('User created');
  });

  it('should not create a new user in the database if email already exists in database', async () => {
    const user = {
      first_name: 'Jim',
      last_name: 'Testman',
      email: 'jim@testman.com',
      password: 'password'
    }

    const res = await request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(400)

    expect(res.body.error.detail).toBe('Key (email)=(jim@testman.com) already exists.');
  });

  it('should not create a new user in the database if a field is missing', async () => {
    const user = {
      first_name: 'Jim',
      last_name: 'Testman',
      email: null,
      password: 'password'
    }

    const res = await request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(400)

    expect(res.body.error.detail).toContain('Failing row contains');
  });

  it('should login a user give the correct email and password', async () => {
    const user = {
      email: 'jim@testman.com',
      password: 'password'
    }

    const res = await request(app)
      .post('/api/users/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect(200);

    expect(res.body.firstName).toBe('Jim');
  });

  it('should not login a user given the wrong password', async () => {
    const user = {
      email: 'jim@testman.com',
      password: 'incorrectpassword'
    }

    const res = await request(app)
      .post('/api/users/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect(401);

    expect(res.body.error).toBe('Email or password is incorrect');
  });

  it('should not login and  return a 404 if user isn\'t found', async () => {
    const user = {
      email: 'notauser',
      password: 'password'
    }

    const res = await request(app)
      .post('/api/users/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect(404);

    expect(res.body.error).toBe('User not found');
  });
});
