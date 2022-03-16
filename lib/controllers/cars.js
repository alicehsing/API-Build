const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()

// CREATE (POST) entry
.post('/', async (req, res) => {
    const car = await Car.insert(req.body);
    res.json(car);
})

// GET All entries
.get('/', async (req, res) => {
    const cars = await Car.getAll();
    res.json(cars);
})

// GET entry by Id


// UPDATE (PUT/PATCH) entry by Id


// DELETE entry by Id