-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE planets
(
  name TEXT PRIMARY KEY,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around TEXT NOT NULL,
);

CREATE TABLE stars
(
  name TEXT PRIMARY KEY,
  galaxy_id TEXT NOT NULL,
);

CREATE TABLE galaxies
(
  name TEXT PRIMARY KEY,
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbits_around TEXT NOT NULL,
);

INSERT INTO galaxies
  (name)
VALUES
  ('The Milky Way');

INSERT INTO stars
  (name, galaxy_id)
VALUES
  ('The Sun', 'The Milky Way'),
  ('Proxima Centauri', 'The Milky Way'),
  ('Gliese 876', 'The Milky Way');
  
INSERT INTO planets
  (name, orbital_period_in_years, orbits_around)
VALUES
  ('Earth', 1.00, 'The Sun'),
  ('Mars', 1.88, 'The Sun'),
  ('Venus', 0.62, 'The Sun'),
  ('Neptune', 164.8, 'The Sun'),
  ('Proxima Centauri b', 0.03, 'Proxima Centauri'),
  ('Gliese 876 b', 0.23, 'Gliese 876');
  

INSERT INTO moons
  (name, orbits_around)
VALUES
  ('The Moon', 'Earth'),
  ('Phobos', 'Mars'),
  ('Deimos', 'Mars'),
  ('Naiad', 'Neptune'),
  ('Thalassa', 'Neptune'),
  ('Despina', 'Neptune'),
  ('Galatea', 'Neptune'),
  ('Larissa', 'Neptune'),
  ('Proteus', 'Neptune'),
  ('Triton', 'Neptune'),
  ('Nereid', 'Neptune'),
  ('Halimede', 'Neptune'),
  ('Sao', 'Neptune'),
  ('Laomedeia', 'Neptune'),
  ('Psamathe', 'Neptune'),
  ('Neso', 'Neptune'),
  ('S/2004 N 1', 'Neptune');
  