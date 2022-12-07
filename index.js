const inquirer = require("inquirer");
const query = require("./query/query");

// Main inquirer prompt to start the CLI
const userAction = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    // For each value there is a function from query.js that will query the database and provide/update the info in the database
    .then((response) => {
      if (response.action === "View All Employees") {
        query.viewEmployees();
      }
      if (response.action === "Add Employee") {
        query.addEmployee();
      }
      if (response.action === "Update Employee Role") {
        query.updateRole();
      }
      if (response.action === "View All Roles") {
        query.viewRoles();
      }
      if (response.action === "Add Role") {
        query.addRole();
      }
      if (response.action === "View All Departments") {
        query.viewDepartments();
      }
      if (response.action === "Add Department") {
        deptPrompt();
      }
      if (response.action === "Quit") {
        query.quitDb();
      }
    });
};

// Prompt to add a department which does not need to query the database to create inputs to the questions
const deptPrompt = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "dept",
      },
    ])
    .then((response) => {
      console.log(response);
      query.addDepartment(response.dept);
    });
};

// Kickoff CLI and export the function back to the query so that the application allows the user to make multiple actions until they decide to quit
userAction();
exports.userAction = userAction;
