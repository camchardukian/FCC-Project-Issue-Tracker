const Issue = require("../models/issueModel");
const issueController = {
  viewIssues: async (req, res) => {
    const issueList = await Issue.find();
    res.send(issueList);
  },
  createIssue: (req, res) => {
    const {
      issue_title,
      issue_text,
      created_by,
      assigned_to = "",
      status_text = ""
    } = req.body;
    const issueToBeCreated = new Issue({
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    });
    issueToBeCreated.save((err, data) => {
      if (err) {
        return console.error(err);
      } else {
        console.log("an issue was created in the DB");
      }
    });
  },
  editIssue: (req, res) => {
    console.log("edittt");
  },
  deleteIssue: (req, res) => {
    console.log("deleteee");
  }
};
module.exports = issueController;
