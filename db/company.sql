DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;


CREATE TABLE dept_tbl (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    salary DECIMAL(9,2)NOT NULL,
    dept_id INT, 
    FOREIGN KEY (dept_id)
  REFERENCES dept_tbl(id)
  ON DELETE SET NULL
);

CREATE TABLE person (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL, 
    FOREIGN KEY (role_id)
  REFERENCES role(id),
    manager_id INT 
);


--test selects

--insert

--delete

--select