const mysql = require("mysql2");
const cTable = require("console.table");
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

const quitDb = () => {
  db.promise().end();
  return;
};

exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
exports.viewEmployees = viewEmployees;
exports.quitDb = quitDb;
