CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE plants (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    plant_name TEXT NOT NULL,
    plant_species TEXT NOT NULL,
    watering_interval_days INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_plants_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE watering_events (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    plant_id INT NOT NULL,
    watered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    amount_ml INT,

    CONSTRAINT fk_watering_plant
        FOREIGN KEY (plant_id)
        REFERENCES plants(id)
        ON DELETE CASCADE
);
