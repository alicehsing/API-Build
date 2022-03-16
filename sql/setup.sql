-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    make TEXT NOT NULL,
    type TEXT NOT NULL,
    model TEXT NOT NULL,
    year_release INT NOT NULL
);

INSERT INTO cars (
    make, type, model, year_release
)

VALUES
('Mercedes', 'SUV', 'G-Class', 2021),
('Ford', 'coupe', 'Mustang GT', 2017);