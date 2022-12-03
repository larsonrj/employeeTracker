const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
  },
  console.log(`Connected to the books_db database.`)
);
