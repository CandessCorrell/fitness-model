DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
category_id serial PRIMARY KEY NOT NULL,
description varchar(40) NOT NULL
);

DROP TABLE IF EXISTS subcategories CASCADE;
CREATE TABLE subcategories (
  subcategory_id serial PRIMARY KEY NOT NULL,
  description varchar(50),
  category_id int4 REFERENCES categories(category_id)
);

DROP TABLE IF EXISTS versions CASCADE;
CREATE TABLE versions (
  version_id serial PRIMARY KEY NOT NULL,
  description varchar(255),
  version varchar(20)
);

-- ADD THIS TABLE IN PLACE OF USERS LATER?
-- DROP TABLE IF EXISTS teams CASCADE;
-- CREATE TABLE teams (
--   team_id serial PRIMARY KEY NOT NULL,
--   team_name varchar(50),
--   password varchar(50)
-- );

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  user_id serial PRIMARY KEY NOT NULL,
  team_name varchar(50),
  password varchar(60)
);

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
question_id serial PRIMARY KEY NOT NULL,
version_id int4 REFERENCES versions(version_id) NOT NULL,
category_id int4 NOT NULL REFERENCES categories(category_id),
subcategory_id int4 REFERENCES subcategories(subcategory_id),
description varchar NOT NULL,
fitness_level int4
);

DROP TABLE IF EXISTS assessments CASCADE;
CREATE TABLE assessments (
  assessment_id serial PRIMARY KEY NOT NULL,
  user_id int4 REFERENCES users(user_id) NOT NULL,
  version_id int4 REFERENCES versions(version_id),
  start_time timestamp,
  end_time timestamp
);

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  answer_id serial PRIMARY KEY NOT NULL,
  question_id int4 NOT NULL REFERENCES questions(question_id),
  description varchar(255) NOT NULL,
  score int4 NOT NULL,
  recommendation varchar(255)
);

DROP TABLE IF EXISTS responses CASCADE;
CREATE TABLE responses (
  response_id serial PRIMARY KEY NOT NULL,
  assessment_id int4 REFERENCES assessments(assessment_id) NOT NULL,
  question_id int4 REFERENCES questions(question_id) NOT NULL,
  answer_id int4 REFERENCES answers(answer_id) NOT NULL
);

--
-- THESE AGENCY HIERARCHY TABLES ARE NOT ACCESSIBLE YET
--
-- DROP TABLE IF EXISTS agencies CASCADE;
-- CREATE TABLE agencies (
--   agency_id serial PRIMARY KEY NOT NULL,
--   description varchar(255)
-- );

-- DROP TABLE IF EXISTS divisions CASCADE;
-- CREATE TABLE divisions (
--   division_id serial PRIMARY KEY NOT NULL,
--   description varchar(75),
--   agency_id int4 REFERENCES agencies(agency_id) NOT NULL
-- );

-- DROP TABLE IF EXISTS portfolios CASCADE;
-- CREATE TABLE portfolios (
--   portfolio_id serial PRIMARY KEY NOT NULL,
--   description varchar(75),
--   division_id int4 REFERENCES divisions(division_id)
-- );

-- DROP TABLE IF EXISTS products CASCADE;
-- CREATE TABLE products (
--   product_id serial PRIMARY KEY NOT NULL,
--   description varchar(75),  
--   portfolio_id int4 REFERENCES portfolios(portfolio_id)
-- );

-- DROP TABLE IF EXISTS teams CASCADE;
-- CREATE TABLE teams (
--   team_id serial PRIMARY KEY NOT NULL,
--   description varchar(75),
--   product_id int4 REFERENCES products(product_id)
-- );

