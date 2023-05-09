--USE --<db>
INSERT INTO dept_tbl (dept_name)
VALUES
('HR'),
('Finance'),
('IT'),
('R&D');

INSERT INTO role (title, salary, dept_id)
VALUES
('Head of HR', 100000, 1), 
('HR Team', 50000, 1 )
('CFO', 250000, 2),
('Manager of Finance', 100000, 2),
('Financial Analyst', 80000, 2),
('IT Manager', 100000, 3),
('IT Technician', 60000, 3),
('R&D Manager', 100000, 4),
('R&D Technician', 70000, 4);

INSERT INTO people (first_name, last_name, role_id, manager_id)
VALUES
('Monkey D', 'Luffy', 1, NULL), 
('Roronora', 'Zoro', 2, 1), 
('Cat Burglar', 'Nami', 3, NULL),
('Black Leg', 'Sanji', 4, 3),
('Tony Tony', 'Chopper', 5, 4), 
('Nico', 'Robin', 6, NULL),
('King', 'Usopp', 7, 6), 
('Cutty', 'Flam', 8, NULL), 
('Soul King', 'Brook', 9, 8);