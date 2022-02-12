const request = require('supertest');
const app = require("../app");

describe("Users routes", () => {

  it('should return a list of users', async () => {
    const res = await request(app)
      .get('/users')

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(4);
  });

  it('should return a single user', async () => {
    const res = await request(app)
      .get('/users/1')

    expect(res.statusCode).toBe(200);
    console.log(res.body)
    expect(Object.prototype.toString.call(res.body)).toBe('[object Object]');
  });

  it('should return an empty string if user isn\'t found', async () => {
    const res = await request(app)
      .get('/users/420')

    expect(res.body).toBe('');
  });
});
