const request = require('supertest');
const protectedRoute = require('../middleware/protectedRoute');
const app = require("../app");

describe("Fridges routes", () => {

  it('should create a new fridge in the database, given all fields', async () => {
    const fridge = {
      id: 1,
      name: 'Test',
      user_id: 1
    }

    const res = await request(app)
      .post('/api/fridges')
      .send(fridge)
      .set('Accept', 'application/json')
      .expect(201)

      expect(res.body).toBe('Fridge Created');
  });

  it('should not create a new fridge in the database if a field is missing', async () => {
    const fridge = {
      id: null,
      name: null,
      user_id: 1
    }

    const res = await request(app)
      .post('/api/fridges')
      .send(fridge)
      .set('Accept', 'application/json')
      .expect(400)
  });
});
