const pool = require('../utils/pool');

module.exports = class Car {
    id;
    make;
    type;
    model;
    year_release;

    constructor(row) {
        this.id = row.id;
        this.make = row.make;
        this.type = row.type;
        this.model = row.model;
        this.yearReleased = row.year_release;
    }

    static async insert({ make, type, model, yearReleased }) {
        const { rows } = await pool.query(
            `INSERT INTO 
                cars (make, type, model, year_release) 
            VALUES 
                ($1, $2, $3, $4) 
            RETURNING 
            *;`, 
            [make, type, model, yearReleased]
        );
        return new Car(rows[0]);
    }
}