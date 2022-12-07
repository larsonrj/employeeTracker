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

userAction();
exports.userAction = userAction;
