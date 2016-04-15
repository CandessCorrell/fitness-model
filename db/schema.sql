CREATE TABLE assessments (
	assessment_id		integer PRIMARY KEY,
	description			varchar,
	version				varchar
);

CREATE TABLE categories (
	category_id			integer PRIMARY KEY,
	description			varchar
);

CREATE TABLE subcategories (
	subcategory_id		integer PRIMARY KEY,
	category_id			integer NOT NULL,
	description			varchar
);

CREATE TABLE questions (
	question_id			integer PRIMARY KEY,
	assessment_id		integer NOT NULL,
	category_id			integer NOT NULL,
	subcategory_id		integer,
	description			varchar,
	fitness_level		integer,
	FOREIGN KEY (assessment_id) REFERENCES assessments,
	FOREIGN KEY (category_id) REFERENCES categories,
	FOREIGN KEY (subcategory_id) REFERENCES subcategories
);

CREATE TABLE answers (
	answer_id			integer PRIMARY KEY,
	question_id			integer NOT NULL,
	description			varchar,
	value				integer,
	recommendation		varchar,
	FOREIGN KEY (question_id) REFERENCES questions
);

CREATE TABLE users (
	user_id				integer PRIMARY KEY,
	username			varchar,
	email				varchar,
	first_name			varchar,
	last_name			varchar,
	company				varchar,
	position			varchar
);

CREATE TABLE results (
	result_id			integer PRIMARY KEY,
	user_id				integer NOT NULL,
	assessment_id		integer NOT NULL,
	start_time			date,
	end_time			date,
	FOREIGN KEY (user_id) REFERENCES users,
	FOREIGN KEY (assessment_id) REFERENCES assessments
);

CREATE TABLE responses (
	response_id			integer PRIMARY KEY,
	result_id			integer NOT NULL,
	question_id			integer NOT NULL,
	answer_id			integer NOT NULL,
	FOREIGN KEY (result_id) REFERENCES results,
	FOREIGN KEY (question_id) REFERENCES questions,
	FOREIGN KEY (answer_id) REFERENCES answers
);

CREATE TABLE weights (
	weight_id			integer PRIMARY KEY,
	result_id			integer NOT NULL,
	category_id			integer NOT NULL,
	value				integer,
	FOREIGN KEY (result_id) REFERENCES results,
	FOREIGN KEY (category_id) REFERENCES categories
);
