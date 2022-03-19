const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

describe('API-Build routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

it('creates a car', async () => {
  const expected = {
    make: 'Audi', 
    type: 'convertible', 
    model: 'Cabriolet', 
    yearReleased: 2015
  }
  const res = await request(app)
  .post('/api/v1/cars')
  .send(expected);

  expect(res.body).toEqual({
    id: expect.any(String),
    make: 'Audi', 
    type: 'convertible', 
    model: 'Cabriolet', 
    yearReleased: 2015
  });
})

it('should list an array of cars', async() => {
  const expected = await Car.getAll();
  const res = await request(app)
  .get('/api/v1/cars');

  expect(res.body).toEqual(expected)
})

it('gets a car by id', async() => {
  const expected = await Car.getById(1)
  const res = await request(app)
    .get(`/api/v1/cars/${expected.id}`);

  expect(res.body).toEqual({ ...expected })
});

it('delete a car by id', async() => {
  // Create a new car in database
  const newCar = await Car.insert({ make: 'Audi', type: 'convertible', model: 'Cabriolet', yearReleased: 2015 })
  // Get the new car as the expected
  const expected = await Car.getById(newCar.id);
  // Delete the car that was just added
  const res = await request(app)
    .delete(`/api/v1/cars/${expected.id}`);

    expect(res.body).toEqual(expected)
});

it('updates a car by id', async() => {
  const expected = {
    id: expect.any(String),
    make: 'Mercedes',
    type: 'wagon',
    model: 'G-Class',
    yearReleased: 2021
  }
  const res = await request(app)
    .patch('/api/v1/cars/1')
    .send({ type: 'wagon' });

  expect(res.body).toEqual(expected);
})
});


