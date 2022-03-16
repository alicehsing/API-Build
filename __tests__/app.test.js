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

it('should create a car', async () => {
  const res = await request(app)
  .post('/api/v1/cars')
  .send({ make: 'Audi', type: 'convertible', model: 'Cabriolet', yearReleased: 2015 });

  expect(res.body).toEqual({
    id: expect.any(String),
    make: 'Audi', 
    type: 'convertible', 
    model: 'Cabriolet', 
    yearReleased: 2015
  });
})

it('should be able to list an array of cars', async() => {
  await Car.insert({ make: 'Audi', type: 'convertible', model: 'Cabriolet', yearReleased: 2015 });
  const res = await request(app)
  .get('/api/v1/cars');

  expect(res.body).toEqual([
    {
      id: expect.any(String),
      make: "Mercedes",
      type: "SUV",
      model: "G-Class",
      yearReleased: 2021,
    },
    {
      id: expect.any(String),
      make: "Ford",
      type: "coupe",
      model: "Mustang GT",
      yearReleased: 2017,
    },
    {
      id: expect.any(String),
      make: 'Audi', 
      type: 'convertible', 
      model: 'Cabriolet', 
      yearReleased: 2015
    }, 
  ])
})

it('get a car by id', async() => {
  const expected = await Car.getById(1)
  const res = await request(app)
    .get(`/api/v1/cars/${expected.id}`);

  expect(res.body).toEqual({ ...expected })
});

});


