const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('API-Build routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

it('should create a car', async () => {
  const res = await request(app)
  .post('/api/v1/cars')
  .send({ make: 'Audi', type: 'convertible', model: 'Cabriolet', yearReleased: 2015});

  expect(res.body).toEqual({
    id: expect.any(String),
    make: 'Audi', 
    type: 'convertible', 
    model: 'Cabriolet', 
    yearReleased: 2015
  });
})

});


