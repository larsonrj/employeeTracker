const inquirer = require("inquirer");
const query = require("./query/query");

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
    .then((response) => {
      if (response.action === "View All Employees") {
        query.viewEmployees();
      }
      if (response.action === "Add Employee") {
        console.log("add employee");
      }
      if (response.action === "Update Employee Role") {
        return;
      }
      if (response.action === "View All Roles") {
        query.viewRoles();
      }
      if (response.action === "Add Role") {
        return;
      }
      if (response.action === "View All Departments") {
        query.viewDepartments();
      }
      if (response.action === "Add Department") {
        return;
      }
      if (response.action === "Quit") {
        query.quitDb();
      }
    });
};

userAction();
exports.userAction = userAction;
