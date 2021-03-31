const issue = require("../models/issueModel");

const issueController = {
  viewIssues: (req, res) => {
    console.log("viewwww");
  },
  createIssue: (req, res) => {
    console.log("createeee");
    console.log("body", req.body);
  },
  editIssue: (req, res) => {
    console.log("edittt");
  },
  deleteIssue: (req, res) => {
    console.log("deleteee");
  }
};

module.exports = issueController;
