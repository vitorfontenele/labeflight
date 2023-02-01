-- Active: 1675272628458@@127.0.0.1@3306

-- query a
DROP TABLE pilots;

-- query b
CREATE TABLE pilots(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    flight_hours REAL NOT NULL
);

-- query c
INSERT INTO pilots(id, name, flight_hours) VALUES
    ("pil001", "Frank Baldwin", 1210),
    ("pil002", "Carl Cruz", 1215),
    ("pil003", "Nina Schulte", 1345);

-- query d
SELECT * FROM pilots;

-- query e
DROP TABLE flights;

-- query f
CREATE TABLE flights(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    pilot_id TEXT NOT NULL,
    departure_airport TEXT NOT NULL,
    arrival_airport TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    FOREIGN KEY (pilot_id) REFERENCES pilots (id)
);

-- query g
INSERT INTO flights (id, pilot_id, departure_airport, arrival_airport, departure_time) VALUES
    ("DL123", "pil001", "JFK", "LAX", "2022-12-31T00:00:00Z"),
    ("UA456", "pil002", "ORD", "SFO", "2023-01-01T12:00:00Z"),
    ("AA789", "pil003", "LAX", "DFW", "2023-02-01T23:59:59Z");

-- query h
SELECT * FROM flights;