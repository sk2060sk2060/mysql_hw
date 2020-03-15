mysql = require("mysql");
inquirer  = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
let start = async () => {
  let answer = await inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Exit"
      ]
    });

    switch(answer.action) {
      case "View All Employees":
        view_all_employees();
        break;
      case "View All Departments":
        view_all_departments();
        break;  
      case "View All Roles":
        view_all_roles();
        break;
      case "Add Employee":
        add_employee();
        break;
      case "Add Role":
        add_role();
        break;   
      case "Add Department":
        add_department();
        break;
      case "Update Employee Role":
        update_employee_role();
        break;
      case "Exit":
        connection.end();  
    }
};


function view_all_employees() {
  console.log("Viewing All Employees");
  var query = `SELECT employees.id as employee_id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary
               FROM employees, roles, departments
               WHERE employees.role_id = roles.id
               AND roles.department_id = departments.id`;
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function view_all_departments() {
  console.log("Viewing All Departments");
  var query = `SELECT * FROM departments`;
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function view_all_roles() {
  console.log("Viewing All Roles");
  var query = `SELECT * FROM roles`;
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

async function add_employee() {
  console.log("Adding Employee");
  let answer = await inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"        
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Enginner",
          "Accountant",
          "Legal Team Lead",
          "Lawyer" 
        ]
      }  
    ]);
    var dbQuery = `INSERT INTO employees (first_name, last_name, role_id)
                   VALUES ("${answer.first_name}", "${answer.last_name}", (SELECT id FROM roles WHERE title = "${answer.role}"))`;
    connection.query(dbQuery, function(err,res) {
      if (err) throw err;
      start();
    });
}

let add_role = async() => {
  console.log("Adding new role");
  let answer = await inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the new role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary associated with the new role?"
      },
      {
        name: "department",
        type: "list",
        message: "Select the department for this role:",
        choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal"
        ]
      }
    ]);
    var dbQuery = `INSERT INTO roles (title, salary, department_id)
                   VALUES ("${answer.title}", "${answer.salary}", (SELECT id FROM departments WHERE name = "${answer.department}"))`;
    connection.query(dbQuery, function(err, res) {
      if (err) throw err;
      start();
    });
}

let add_department = async () => {
  console.log("Adding new department")
  let answer = await inquirer
    .prompt({
      name: "department_name",
      type: "input",
      message: "Enter the name of the department you want to add:"
    });
    let dbQuery = `INSERT INTO departments (name)
                   VALUES ("${answer.department_name}")`
    connection.query(dbQuery, function(err, res) {
      if (err) throw err;
      start();
    });
}

let update_employee_role = async () => {
  let answer = await inquirer
  .prompt([
    {
      name: "employee",
      type: "list",
      message: "Select the employee whose role you want to update:",
      choices: [
        "1. John Doe",
        "2. Mike Chan",
        "3. Ashley Deborah",
        "4. Kevin Tupik",
        "5. Melissa Brown",
        "6. Sarah Lourd",
        "7. Tom Allen"
      ]
    },
    {
      name: "role",
      type: "list",
      message: "Select the employee's new role:",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Enginner",
        "Accountant",
        "Legal Team Lead",
        "Lawyer"
      ]
    }
  ]);
  let emp = answer.employee;
  let regex = /(\d+)/;
  let emp_id = emp.match(regex)[0];
  dbQuery = `UPDATE employees
             SET role_id = (SELECT id FROM roles WHERE title = "${answer.role}")
             WHERE id = ${parseInt(emp_id)}`;             
  connection.query(dbQuery, function(err, res) {
    if (err) throw err;
    start();
  })
}