DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

--create tables
CREATE TABLE dept_tbl (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    dept-id INT, 
    FOREIGN KEY (dept_id)
  REFERENCES dept_tbl(id)
  ON DELETE SET NULL
);

CREATE TABLE person (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role-id INT, 
    FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
    manager_id INT
    FOREIGN KEY (manager_id)
  REFERENCES person(id)
  ON DELETE SET NULL
);

--test selects

--insert

--delete

--select