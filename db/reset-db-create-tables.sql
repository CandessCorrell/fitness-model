https://github.com/private-pilot/fitness-model/blob/master/db/schemav3.pdf

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

DROP TABLE IF EXISTS assessments CASCADE;
CREATE TABLE assessments (
  assessment_id serial PRIMARY KEY NOT NULL,
  description varchar(255),
  version varchar(20)
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  user_id serial PRIMARY KEY NOT NULL,
  username varchar(50),
  email varchar(50),
  first_name varchar(50),
  last_name varchar(50),
  company varchar(50),
  position varchar(50)
);

DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
  organization_id serial PRIMARY KEY NOT NULL,
  description varchar(255)
);

DROP TABLE IF EXISTS divisions CASCADE;
CREATE TABLE divisions (
  division_id serial PRIMARY KEY NOT NULL,
  description varchar(75),
  organization_id int4 REFERENCES organizations(organization_id) NOT NULL
);

DROP TABLE IF EXISTS portfolios CASCADE;
CREATE TABLE portfolios (
  portfolio_id serial PRIMARY KEY NOT NULL,
  division_id int4 REFERENCES divisions(division_id)
);

DROP TABLE IF EXISTS branches CASCADE;
CREATE TABLE branches (
  branch_id serial PRIMARY KEY NOT NULL,
  division_id int4 references divisions(division_id),
  description varchar(75)
);

DROP TABLE IF EXISTS teams CASCADE;
CREATE TABLE teams (
  team_id serial PRIMARY KEY NOT NULL,
  description varchar(75),
  branch_id int4 REFERENCES branches(branch_id)
);

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
question_id serial PRIMARY KEY NOT NULL,
assessment_id int4 REFERENCES assessments(assessment_id) NOT NULL,
category_id int4 NOT NULL REFERENCES categories(category_id),
subcategory_id int4 REFERENCES subcategories(subcategory_id),
description varchar NOT NULL,
fitness_level int4
);

DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results (
  result_id serial PRIMARY KEY NOT NULL,
  user_id int4 REFERENCES users(user_id) NOT NULL,
  assessment_id int4 REFERENCES assessments(assessment_id),
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
  result_id int4 REFERENCES results(result_id) NOT NULL,
  question_id int4 REFERENCES questions(question_id) NOT NULL,
  answer_id int4 REFERENCES answers(answer_id) NOT NULL
);
