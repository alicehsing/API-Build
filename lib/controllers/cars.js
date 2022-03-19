const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()

// POST /api/v1/cars (Create Entry)
.post('/', async (req, res) => {
    const car = await Car.insert(req.body);
    res.json(car);
})

// GET /api/v1/cars (GET All entries)
.get('/', async (req, res) => {
    const cars = await Car.getAll();
    res.json(cars);
})

// GET /api/v1/cars/:id (GET entry by Id)
.get('/:id', async (req, res, next) => {
    try {
    // select a car from database
    const car = await Car.getById(req.params.id);
    // return the car if found
    res.json(car);
    } catch (error) {
    // return a 404 if no car found
    error.status = 404;
    next(error);
    }
})

// DELETE entry by Id
.delete('/:id', async (req, res) => {
    const car = await Car.deleteById(req.params.id);
    res.json(car);
})

// UPDATE (PUT/PATCH) entry by Id
.patch('/:id', async (req, res) => {
    const car = await Car.updateById(req.params.id, req.body);
    res.json(car);
})

