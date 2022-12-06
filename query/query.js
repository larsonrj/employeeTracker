const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const action = require("../index");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});

const viewDepartments = () => {
  db.promise()
    .query("SELECT departments.id,name AS department FROM departments;")
    .then(([row, fields]) => {
      console.table(row);
    })
    .then(() => action.userAction());
};

const viewRoles = () => {
  db.promise()
    .query(
      "SELECT role.id,title,name AS department, salary FROM departments JOIN role ON departments.id = role.department_id;"
    )
    .then(([row, fields]) => {
      console.table(row);
    })
    .then(() => action.userAction());
};

const viewEmployees = () => {
  db.promise()
    .query(
      "SELECT employee.id,employee.first_name,employee.last_name,title,name as department,salary,concat(manager.first_name,' ',manager.last_name) AS Manager FROM employee LEFT JOIN employee AS manager ON employee.manager_id=manager.id JOIN role ON employee.role_id =role.id JOIN departments ON role.department_id=departments.id;"
    )
    .then(([row, fields]) => {
      console.table(row);
    })
    .then(() => action.userAction());
};

const addDepartment = (dept) => {
  db.promise()
    .query(
      `INSERT INTO departments (name) VALUES (
    "${dept}")`
    )
    .then(() => {
      console.log(`Added ${dept} to the database`);
      action.userAction();
    });
};

const quitDb = () => {
  db.promise().end();
  return;
};

const addRole = () => {
  const depts = [];
  db.promise()
    .query("SELECT name AS department FROM departments;")
    .then(([row, fields]) => {
      row.forEach((el) => depts.push(el.department));
    });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "role",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "salary",
      },
      {
        type: "list",
        message: "What department does the role belong to?",
        name: "department",
        choices: depts,
      },
    ])
    .then((response) => {
      index = depts.findIndex((element) => element === response.department) + 1;
      db.promise()
        .query(
          `INSERT INTO role (title,salary,department_id) VALUES (
      "${response.role}",${response.salary},${index});`
        )
        .then(() => {
          console.log(`Added ${response.role} to the database`);
          action.userAction();
        });
    });
};

exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
exports.viewEmployees = viewEmployees;
exports.quitDb = quitDb;
exports.addDepartment = addDepartment;
exports.addRole = addRole;
