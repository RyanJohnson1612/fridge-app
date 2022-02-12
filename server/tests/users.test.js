const request = require('supertest');
const app = require("../app");

describe("Users routes", () => {

  xit('should return a list of users', async () => {
    const res = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
  });

  xit('should return a single user', async () => {
    const res = await request(app)
      .get('/users/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.statusCode).toBe(200);
    expect(Object.prototype.toString.call(res.body)).toBe('[object Object]');
  });

  xit('should return an empty string if user isn\'t found', async () => {
    const res = await request(app)
      .get('/users/420')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toBe('');
  });

  it('should create a new user in the database, given all fields', (done) => {
    const data = {
      first_name: 'Jim',
      last_name: 'Testman',
      email: 'jim@testman.com',
      password: 'password'
    }
    request(app)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
