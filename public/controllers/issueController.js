const Issue = require("../models/issueModel");
const Helper = require("../utils/helpers");

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
      status_text,
      open: true
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
    const {
      _id,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text,
      open = undefined
    } = req.body;

    const params = {
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text,
      open
    };
    const filteredParams = Helper.removeUndefinedAndEmptyStringValuesFromObj(
      params
    );

    Issue.findOneAndUpdate(_id, filteredParams, { new: true }, err => {
      if (err) return console.log(err);
    });
  },
  deleteIssue: (req, res) => {
    const { _id } = req.body;
    Issue.findByIdAndRemove(_id, err => {
      if (err) return console.log(err);
    });
  }
};
module.exports = issueController;
