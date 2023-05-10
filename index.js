const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// sql connection
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "company_db",
});

// connect to database
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the Company Database");
    start();
  }
});
// function to start system
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "Welcome to the company database. What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "View employee by department",
        "View employee by role",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "View all departments":
          viewAllDept();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDept();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "View employee by department":
          viewByDept();
          break;
        case "View employee by role":
          viewByRole();
          break;
        case "Quit":
          console.log("K Bye!");
          db.end();
      }
    });
}

// functions
function viewAllDept() {
  const request = `SELECT * FROM dept_tbl;`;
  console.log("Here is your table:");
  db.query(request, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllRoles() {
  const request = `SELECT role.title, role.id, dept_tbl.dept_name, role.salary FROM role JOIN dept_tbl ON role.dept_id = dept_tbl.id;`;
  console.log("Here is your table:");
  db.query(request, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllEmployees() {
  const request = `SELECT p.id, p.first_name, p.last_name, r.title, d.dept_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM person p
  LEFT JOIN role r ON p.role_id = r.id
  LEFT JOIN dept_tbl d ON r.dept_id = d.id
  LEFT JOIN person m ON p.manager_id = m.id`;
  console.log("Here is your table:");
  db.query(request, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addDept() {
  inquirer
    .prompt({
      type: "input",
      name: "dept_name",
      message: "Please enter the name of the new department:",
      validate: validateInput,
    })
    .then((answer) => {
      const request = `INSERT INTO dept_tbl (dept_name) VALUES ("${answer.dept_name}");`;
      db.query(request, (err, res) => {
        if (err) throw err;
        console.log(
          `the department of '${answer.dept_name}' has been added to the database`
        );
        start();
      });
    });
}

function addRole() {
  const sql = "SELECT * FROM dept_tbl";
  db.query(sql, (err, res) => {
    if (err) throw err;
    const departments = res.map(({id, dept_name}) => ({
        name: dept_name,
        value: id,
      }));
  inquirer
    .prompt(
      [{
        type: "input",
        name: "title",
        message: "Please enter the title of the new role:",
        validate: validateInput,
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary of the new role in $:",
        validate: validateNum,
      },
      {
        type: "list",
        name: "dept",
        message: "Please choose the the department for this role",
        choices: departments,
      },
    ])
    .then((answers) => {
      const request = "INSERT INTO role SET ?";
      db.query(request,
        {
          title: answers.title,
          salary: answers.salary,
          dept_id: answers.dept, 
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `the role of '${answers.title}' has been added to the database`
          );
          start();
        }
      );
    });
});
};

function addEmployee(){
    const sql = "SELECT id, title FROM role";
    db.query(sql, (err, res) => {
      if (err) throw err;

      const role = res.map(({id, title}) => ({
        name: title,
        value: id,
      }));// ! review

    const sql2 = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM person';

    db.query(sql2, (err, res) => {
        if (err) throw err;
        const managers = res.map(({id, name}) =>({
            name, 
            value: id,
        }));
    inquirer
      .prompt(
        [{
          type: "input",
          name: "firstName",
          message: "Please enter the first name of the new employee:",
          validate: validateInput,
        },
        {
          type: "input",
          name: "lastName",
          message: "Please enter the last name of the new employee:",
          validate: validateInput,
        },
        {
            type: "list",
            name: "roleID",
            message: "Please choose the role for this ",
            choices: role,
          },
        {
          type: "list",
          name: "managerID",
          message: "Please choose a manager for this employee",
          choices: [{name: "none", value: null}, ...managers,],
        },
      ])
      .then((answers) => {
        const request = `INSERT INTO person (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

        const values = [answers.firstName, answers.lastName, answers.roleID, answers.managerID,];

        db.query(
          request,
          values,
          (err, res) => {
            if (err) throw err;
            console.log(
              `the employee '${answers.firstName + ' ' + answers.lastName}' has been added to the database`
            );
            start();
          }
        );
      });
    });
  });
}

function updateEmployee(){
    const sql = "SELECT * FROM person";
    const sql2 = "SELECT * FROM role";
    const sql3 = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM person';

    db.query(sql, (err, res1) =>{
        if(err) throw err;
        db.query(sql2, (err, res2) =>{
            if(err) throw err; 
            db.query(sql3, (err,res3) => {
                if(err) throw err;
                const managers = res3.map(({id, name}) =>({
                    name, 
                    value: id,}));
                    

                inquirer.prompt([{
                    type: 'list',
                    name: 'employee',
                    message: "Select the employee you'd like to update:",
                    choices: res1.map((person) => `${person.first_name} ${person.last_name}`),
                },{
                    type: 'list',
                    name: 'newRole',
                    message: 'Select role:',
                    choices: res2.map((role) => role.title),
                }, {
                    type: "list",
                    name: "managerID",
                    message: "Please choose a manager for this employee",
                    choices: [{name: "none", value: null}, ...managers,],
                  },
                ]).then((answers) =>{
                    const employee = res1.find((person) => `${person.first_name} ${person.last_name}` === answers.employee);

                    const newRole = res2.find((role) => role.title === answers.newRole);

                    const request = 'UPDATE person SET role_id = ?, manager_id = ? WHERE id = ?';
                    db.query(request, [newRole.id, answers.managerID, employee.id], (err, res) => {
                        if(err) throw err;
                        console.log(`Updated ${employee.first_name} ${employee.last_name} with the role of ${newRole.title}`);
                        start();
                })
            })
        })})
    })

};

// validate text inputs
function validateInput(answer) {
  if ((answer.trim() !== "") && (answer.trim().length <= 30)) {
    return true;
  }
  return "invalid answer. Try again";
};


function validateNum(answer) {
  if((answer.trim() !== "") && (isNaN(answer) === false) && (answer.trim().length <= 9))
  {
    return true;
  }
  return "Please enter the raw numeric value(1-999999999) without any commas, periods, or $";
};

