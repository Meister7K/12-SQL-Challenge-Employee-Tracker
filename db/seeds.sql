--USE --<db>
INSERT INTO dept_tbl (dept_name)
VALUES
('Marketing'), 
('HR'),
('Finance'),
('IT'),
('R&D'),
('QA'),
('legal'),
('board');

INSERT INTO role (title, salary, dept_id)
VALUES
('CEO', 100, 8)