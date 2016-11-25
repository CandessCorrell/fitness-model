INSERT INTO assessments (assessment_id, description, version) VALUES 
	(1, 'Test data pulled from the assessment draft.', '0.0');

INSERT INTO categories (category_id, description) VALUES 
	(1, 'Build'),
	(2, 'Testing'),
	(3, 'Deployments');

INSERT INTO questions (question_id, assessment_id, category_id, subcategory_id, description, fitness_level) VALUES 
	(1, 1, 1, NULL, 'Do you build from a repository?', 1),
	(2, 1, 1, NULL, 'Is your source code repository integrated with your Continuous Integration(CI) server?', 1),
	(3, 1, 1, NULL, 'Does your build produce deployable artifacts?', 1),
	(4, 1, 1, NULL, 'Do you re-use your build scripts?', 2),
	(5, 1, 1, NULL, 'Are your build dependencies managed?', 2),
	(6, 1, 1, NULL, 'Are integration challenges discussed regularly?', 3),
	(7, 1, 2, NULL, 'Do all test scripts reside in a version control repository?', 1),
	(8, 1, 2, NULL, 'Automated functional and interface testing?', 1),
	(9, 1, 2, NULL, 'Automated unit tests for each user story?', 1),
	(10, 1, 2, NULL, 'Automated acceptance tests for each user story?', 2),
	(11, 1, 2, NULL, 'Automated regression tests?', 2),
	(12, 1, 2, NULL, 'Are non-functional requirements defined and measured?', 3),
	(13, 1, 2, NULL, 'Are production rollbacks rare?', 3),
	(14, 1, 2, NULL, 'Is A/B testing used?', 3),
	(15, 1, 2, NULL, 'Is the system validated that it works as intended - customer value?', 3),
	(16, 1, 2, NULL, 'Is performance testing completed and used to inform operations monitoring?', 3),
	(17, 1, 3, NULL, 'Are all of your environments configurations externalized and versioned?', 1),
	(18, 1, 3, NULL, 'Is your deployment process singular for all environments?', 1),
	(19, 1, 3, NULL, 'Are your deployable environments inexpensive and scalable?', 2),
	(20, 1, 3, NULL, 'Is your infrastructure code-based?', 2),
	(21, 1, 3, NULL, 'Is environment provisioning fully automated?', 3);

INSERT INTO answers (answer_id, question_id, description, score, recommendation) VALUES 
	(1, 1, 'No', 0, 'Start consolidating your code to an SCM solution (GIT, SVN, Dimension, etc) plan for daily check ins into the repository.'),
	(2, 1, 'Yes', 4, NULL),
  (3, 1, 'Select', 0, NULL),
	(4, 2, 'No', 0, 'Use of web-hooks, APIs, CI server plugins can link your repository and CI server.'),
	(5, 2, 'Yes', 4, NULL),
  (6, 2, 'Select', 0, NULL),
	(7, 3, 'No', 0, 'As part of the automated build process, deployable artifacts should be part of the end state'),
	(8, 3, 'Yes', 4, NULL),
  (9, 3, 'Select', 0, NULL),
	(10, 4, 'No', 0, 'Build scripts should be maintained and treated as code'),
	(11, 4, 'Yes', 4, NULL),
  (12, 4, 'Select', 0, NULL),
	(13, 5, 'No', 0, 'Code is code - version control everything'),
	(14, 5, 'Yes', 4, NULL),
  (15, 5, 'Select', 0, NULL),
	(16, 6, 'No', 0, 'Form a team to do this which includes stakeholders, developers, business analysts, testers, quality assurance, and operations personnel'),
	(17, 6, 'Yes', 4, NULL),
  (18, 6, 'Select', 0, NULL),
	(19, 7, 'No', 0, 'Move test scripts to a version control repository such as a GitHub Enterprise'),
	(20, 7, 'Yes', 4, NULL),
  (21, 7, 'Select', 0, NULL),
	(22, 8, 'No', 0, 'Testers should begin writing automated functional and interface tests for each user story.'),
	(23, 8, 'Yes', 4, NULL),
  (24, 8, 'Select', 0, NULL),
	(25, 9, 'No', 0, 'Developers should begin writing automated unit tests for each user story.'),
	(26, 9, 'Yes', 4, NULL),
  (27, 9, 'Select', 0, NULL),
	(28, 10, 'No', 0, 'Testers should begin writing automated acceptance tests for each user story.'),
	(29, 10, 'Yes', 4, NULL),
  (30, 10, 'Select', 0, NULL),
	(31, 11, 'No', 0, 'Testers should begin writing automated regression tests for each user story.'),
	(32, 11, 'Yes', 4, NULL),
  (33, 11, 'Select', 0, NULL),
	(34, 12, 'No', 0, 'Form a team to begin defining non-functional requirements.'),
	(35, 12, 'Yes', 4, NULL),
  (36, 12, 'Select', 0, NULL),
	(37, 13, 'No', 0, 'Begin tracking rollbacks over time to understand the common reasons for why the rollback occurred.'),
	(38, 13, 'Yes', 4, NULL),
  (39, 13, 'Select', 0, NULL),
	(40, 14, 'No', 0, 'Begin experimenting with A/B testing in Dev / Test environments'),
	(41, 14, 'Yes', 4, NULL),
  (42, 14, 'Select', 0, NULL),
	(43, 15, 'No', 0, 'Form a team to reach out to end users to gain feedback related to customer satisfaction.'),
	(44, 15, 'Yes', 4, NULL),
  (45, 15, 'Select', 0, NULL),
	(46, 16, 'No', 0, 'Reach out to performance_testing@uscis.dhs.gov for internal performance testing resources.'),
	(47, 16, 'Yes', 4, NULL),
  (48, 16, 'Select', 0, NULL),
	(49, 17, 'No', 0, 'You can''t manage what you don''t know. Inventory your servers so you know your current state.'),
	(50, 17, 'Yes', 4, NULL),
  (51, 17, 'Select', 0, NULL),
	(52, 18, 'No', 0, 'Even if your deploy process is manual, you should have a repeatable and well-documented process. Assign a team member to create a step-by-step instruction guide for how to configure your deployment environment.'),
	(53, 18, 'Yes', 4, NULL),
  (54, 18, 'Select', 0, NULL),
	(55, 19, 'No', 0, 'If your team is not leveraging Amazon Web Services, join the #aws Slack channel and ask about how your team can begin using AWS to host your application.'),
	(56, 19, 'Yes', 4, NULL),
  (57, 19, 'Select', 0, NULL),
	(58, 20, 'No', 0, 'Using Configuration Management tools such as Chef, Puppet, or Ansible enable automation and environment fidelity.'),
	(59, 20, 'Yes', 4, NULL),
  (60, 20, 'Select', 0, NULL),
	(61, 21, 'No', 0, 'Assign a team member to begin learning about a configuration management tool such as Ansible, Puppet, or Chef.'),
	(62, 21, 'Yes', 4, NULL),
  (63, 21, 'Select', 0, NULL);

INSERT INTO users (user_id, username, email, first_name, last_name, company, position) VALUES 
	(1, 'jward0', 'jward0@miitbeian.gov.cn', 'Jeremy', 'Ward', 'Youbridge', 'Civil Engineer'),
	(2, 'lcarter1', 'lcarter1@blogtalkradio.com', 'Lois', 'Carter', 'Riffwire', 'Librarian'),
	(3, 'lfowler2', 'lfowler2@godaddy.com', 'Lois', 'Fowler', 'Voonix', 'Director of Sales'),
	(4, 'tdunn3', 'tdunn3@myspace.com', 'Terry', 'Dunn', 'Jabbercube', 'Nuclear Power Engineer'),
	(5, 'swheeler4', 'swheeler4@kickstarter.com', 'Susan', 'Wheeler', 'Thoughtstorm', 'Automation Specialist I'),
	(6, 'swhite5', 'swhite5@redcross.org', 'Steven', 'White', 'Oodoo', 'Desktop Support Technician'),
	(7, 'tstanley6', 'tstanley6@webnode.com', 'Teresa', 'Stanley', 'Topdrive', 'Research Nurse'),
	(8, 'amorales7', 'amorales7@1688.com', 'Angela', 'Morales', 'Yata', 'Registered Nurse'),
	(9, 'vdean8', 'vdean8@disqus.com', 'Victor', 'Dean', 'Snaptags', 'Human Resources Manager'),
	(10, 'bmoore9', 'bmoore9@eventbrite.com', 'Brandon', 'Moore', 'Divanoodle', 'Human Resources Assistant II'),
	(11, 'schapmana', 'schapmana@hubpages.com', 'Samuel', 'Chapman', 'Thoughtblab', 'Assistant Manager'),
	(12, 'nadamsb', 'nadamsb@reddit.com', 'Nicole', 'Adams', 'Oyoyo', 'Programmer II'),
	(13, 'dmyersc', 'dmyersc@bloglovin.com', 'Donald', 'Myers', 'Yotz', 'Web Developer II'),
	(14, 'jjamesd', 'jjamesd@theglobeandmail.com', 'Julie', 'James', 'Jabberbean', 'Data Coordiator'),
	(15, 'wrodrigueze', 'wrodrigueze@hp.com', 'Walter', 'Rodriguez', 'Thoughtstorm', 'Web Developer II'),
	(16, 'cfoxf', 'cfoxf@engadget.com', 'Carolyn', 'Fox', 'Shufflester', 'Sales Representative'),
	(17, 'hburkeg', 'hburkeg@columbia.edu', 'Howard', 'Burke', 'Linktype', 'Marketing Assistant'),
	(18, 'ejohnsonh', 'ejohnsonh@timesonline.co.uk', 'Emily', 'Johnson', 'Voonder', 'Assistant Media Planner'),
	(19, 'fhernandezi', 'fhernandezi@hp.com', 'Frank', 'Hernandez', 'Mybuzz', 'Director of Sales'),
	(20, 'kmccoyj', 'kmccoyj@dailymotion.com', 'Kathryn', 'Mccoy', 'Ozu', 'Nuclear Power Engineer'),
	(21, 'jpiercek', 'jpiercek@zimbio.com', 'Johnny', 'Pierce', 'Gigabox', 'Automation Specialist I'),
	(22, 'jbutlerl', 'jbutlerl@pen.io', 'Jeffrey', 'Butler', 'Tagpad', 'Senior Quality Engineer'),
	(23, 'sreedm', 'sreedm@myspace.com', 'Sarah', 'Reed', 'Feedfire', 'Engineer I'),
	(24, 'cblackn', 'cblackn@uiuc.edu', 'Christina', 'Black', 'Yambee', 'Dental Hygienist'),
	(25, 'bbutlero', 'bbutlero@howstuffworks.com', 'Beverly', 'Butler', 'Kamba', 'Recruiter');

INSERT INTO results (result_id, user_id, assessment_id, start_time, end_time) VALUES 
	(1, 5, 1, null, null),
	(2, 6, 1, null, null),
	(3, 13, 1, null, null),
	(4, 20, 1, null, null),
	(5, 15, 1, null, null),
	(6, 18, 1, null, null),
	(7, 2, 1, null, null),
	(8, 11, 1, null, null),
	(9, 20, 1, null, null),
	(10, 14, 1, null, null),
	(11, 6, 1, null, null),
	(12, 6, 1, null, null),
	(13, 13, 1, null, null),
	(14, 15, 1, null, null),
	(15, 24, 1, null, null),
	(16, 8, 1, null, null),
	(17, 12, 1, null, null),
	(18, 6, 1, null, null),
	(19, 11, 1, null, null),
	(20, 24, 1, null, null),
	(21, 16, 1, null, null),
	(22, 12, 1, null, null),
	(23, 16, 1, null, null),
	(24, 2, 1, null, null),
	(25, 16, 1, null, null);

INSERT INTO responses (answer_id, question_id, result_id) VALUES 
	(3, 1, 1),
	(6, 2, 1),
	(9, 3, 1),
	(12, 4, 1),
	(15, 5, 1),
	(18, 6, 1),
	(21, 7, 1),
	(24, 8, 1),
	(27, 9, 1),
	(30, 10, 1),
	(33, 11, 1),
	(36, 12, 1),
	(39, 13, 1),
	(42, 14, 1),
	(45, 15, 1),
	(48, 16, 1),
	(51, 17, 1),
	(54, 18, 1),
	(57, 19, 1),
	(60, 20, 1),
	(63, 21, 1);
