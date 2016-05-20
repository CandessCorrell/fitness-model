CREATE SEQUENCE global_id_seq;

CREATE OR REPLACE FUNCTION next_id(OUT result bigint) AS $$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    -- shard_id int := 5;
BEGIN
    SELECT nextval('global_id_seq') % 1024 INTO seq_id;

    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    -- result := result | (shard_id << 10);
    result := result | (seq_id);
END;
$$ LANGUAGE PLPGSQL;

CREATE TABLE organizations (
	organization_id	bigint PRIMARY KEY DEFAULT next_id(),
	description	varchar
);

CREATE TABLE divisions (
	division_id bigint PRIMARY KEY DEFAULT next_id(),
	description varchar,
	organization_id integer NOT NULL,
	FOREIGN KEY (organization_id) REFERENCES organizations
);

CREATE TABLE portfolios (
	portfolio_id	bigint PRIMARY KEY DEFAULT next_id(),
	division_id	integer NOT NULL,
	FOREIGN KEY (division_id) REFERENCES divisions
);

CREATE TABLE branches (
	branch_id	bigint PRIMARY KEY DEFAULT next_id(),
	description varchar,
	division_id integer NOT NULL,
	FOREIGN KEY (division_id) REFERENCES divisions
);

CREATE TABLE teams (
	team_id bigint PRIMARY KEY DEFAULT next_id(),
	description varchar,
	branch_id integer NOT NULL,
	FOREIGN KEY (branch_id) REFERENCES branches
);

-- assessment json should follow format in testassessment.json
CREATE TABLE assessments (
	assessment_id		bigint PRIMARY KEY DEFAULT next_id(),
  description     varchar,
	version         varchar,
  assessment      jsonb NOT NULL
);

CREATE TABLE users (
	user_id			bigint PRIMARY KEY DEFAULT next_id(),
	username		varchar,
	email			varchar,
	first_name		varchar,
	last_name		varchar,
	company			varchar,
	position		varchar
--	team_id	integer NOT NULL,
--	FOREIGN KEY (team_id) REFERENCES teams
);

-- Response json should contain the responses for each question as well as the weights for each category
CREATE TABLE results (
	result_id		bigint PRIMARY KEY DEFAULT next_id(),
	user_id			integer NOT NULL,
--	portfolio_id	integer NOT NULL,
	assessment_id		integer NOT NULL,
  response      jsonb NOT NULL,
	start_time		timestamp,
	end_time		timestamp,
	FOREIGN KEY (user_id) REFERENCES users,
--	FOREIGN KEY (portfolio_id) REFERENCES portfolios,
	FOREIGN KEY (assessment_id) REFERENCES assessments
);
