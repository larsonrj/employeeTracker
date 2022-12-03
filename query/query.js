const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});

const viewDepartments = () => {
  db.query("SELECT * FROM departments", function (err, result) {
    console.table(result);
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, result) {
    console.table(result);
    db.end();
  });
};

exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
