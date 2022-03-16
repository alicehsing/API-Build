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

    // inserting a row
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

    // listing all rows
    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
                * 
            FROM 
                cars;`
        );
        //convert all the rows into new Car instances
        return rows.map((row) => new Car(row));
    }

    // getting a single row
    static async getById(id) {
        // get a car from database
        const { rows } = await pool.query(
            `SELECT
                *
            FROM
                cars
            WHERE
                id=$1
            `,
            [id]
        );

        if (!rows[0]) return null;
        return new Car(rows[0]);
    }

    // deleting a row
    static async deleteById(id) {
        const { rows } = await pool.query(
            `DELETE FROM 
                cars
            WHERE 
                id=$1
            RETURNING 
                *;`,
            [id]
        );

        if (!rows[0]) return null;
        return new Car(rows[0]);
    }

    // updating a row
    
};