INSERT INTO departments (name) 
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO roles(title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES("Accountant", 125000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES("Legal Team Lead", 250000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES("Lawyer", 190000, 4);


INSERT INTO employees (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES("Mike", "Chan", 2);

INSERT INTO employees (first_name, last_name, role_id)
VALUES("Ashley", "Deborah", 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Kevin", "Tupik", 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Melissa", "Brown", 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Sarah", "Lourd", 6);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Tom", "Allen", 7);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("John", "Smith", 4);