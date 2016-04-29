CREATE TABLE organizations (
	organization_id	SERIAL PRIMARY KEY,
	description	varchar
);

CREATE TABLE divisions (
	division_id SERIAL PRIMARY KEY,
	description varchar,
	organization_id integer NOT NULL,
	FOREIGN KEY (organization_id) REFERENCES organizations
);

CREATE TABLE portfolios (
	portfolio_id	SERIAL PRIMARY KEY,
	division_id	integer NOT NULL,
	FOREIGN KEY (division_id) REFERENCES divisions
);

CREATE TABLE branches (
	branch_id	SERIAL PRIMARY KEY,
	description varchar,
	division_id integer NOT NULL,
	FOREIGN KEY (division_id) REFERENCES divisions
);

CREATE TABLE teams (
	team_id SERIAL PRIMARY KEY,
	description varchar,
	branch_id integer NOT NULL,
	FOREIGN KEY (branch_id) REFERENCES branches
);

CREATE TABLE assessments (
	assessment_id		SERIAL PRIMARY KEY,
	description		varchar,
	version			varchar
);

CREATE TABLE categories (
	category_id		SERIAL PRIMARY KEY,
	description		varchar
);

CREATE TABLE subcategories (
	subcategory_id		SERIAL PRIMARY KEY,
	category_id		integer NOT NULL,
	description		varchar
);

CREATE TABLE questions (
	question_id		SERIAL PRIMARY KEY,
	assessment_id		integer NOT NULL,
	category_id		integer NOT NULL,
	subcategory_id		integer,
	description		varchar,
	fitness_level		integer,
	FOREIGN KEY (assessment_id) REFERENCES assessments,
	FOREIGN KEY (category_id) REFERENCES categories,
	FOREIGN KEY (subcategory_id) REFERENCES subcategories
);

CREATE TABLE answers (
	answer_id		SERIAL PRIMARY KEY,
	question_id		integer NOT NULL,
	description		varchar,
	value			integer,
	recommendation		varchar,
	FOREIGN KEY (question_id) REFERENCES questions
);

CREATE TABLE users (
	user_id			SERIAL PRIMARY KEY,
	username		varchar,
	email			varchar,
	first_name		varchar,
	last_name		varchar,
	company			varchar,
	position		varchar
--	team_id	integer NOT NULL,
--	FOREIGN KEY (team_id) REFERENCES teams
);

CREATE TABLE results (
	result_id		SERIAL PRIMARY KEY,
	user_id			integer NOT NULL,
--	portfolio_id	integer NOT NULL,
	assessment_id		integer NOT NULL,
	start_time		timestamp,
	end_time		timestamp,
	FOREIGN KEY (user_id) REFERENCES users,
--	FOREIGN KEY (portfolio_id) REFERENCES portfolios,
	FOREIGN KEY (assessment_id) REFERENCES assessments
);

CREATE TABLE responses (
	response_id		SERIAL PRIMARY KEY,
	result_id		integer NOT NULL,
	question_id		integer NOT NULL,
	answer_id		integer NOT NULL,
	FOREIGN KEY (result_id) REFERENCES results,
	FOREIGN KEY (question_id) REFERENCES questions,
	FOREIGN KEY (answer_id) REFERENCES answers
);

CREATE TABLE weights (
	weight_id		SERIAL PRIMARY KEY,
	result_id		integer NOT NULL,
	category_id		integer NOT NULL,
	value			integer NOT NULL,
	FOREIGN KEY (result_id) REFERENCES results,
	FOREIGN KEY (category_id) REFERENCES categories
);
