const Issue = require("../models/issueModel");
const Helper = require("../utils/helpers");
const issueController = {
  viewIssues: async (req, res) => {
    const {
      open,
      _id,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    } = req.query;
    const params = {
      open,
      _id,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    };
    const filteredParams = Helper.removeUndefinedAndEmptyStringValuesFromObj(
      params
    );
    const issueList = await Issue.find(filteredParams);
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
    if (!issue_title || !issue_text || !created_by) {
      return res.json({ error: "required field(s) missing" });
    }
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
        res.json(data);
        console.log("an issue was created in the DB");
      }
    });
  },
  editIssue: async (req, res) => {
    const {
      _id,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text,
      open = undefined
    } = req.body;
    if (!_id) {
      return res.json({ error: "missing _id" });
    } else {
      const issue = await Issue.findById(_id);
      if (!issue) {
        return res.json({ error: "could not update", _id: _id });
      }
    }
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
    if (Helper.checkIsEmptyObject(filteredParams)) {
      return res.json({ error: "no update field(s) sent", _id: _id });
    }
    Issue.findOneAndUpdate({ _id }, { ...filteredParams }, err => {
      if (err) return console.log(err);
      res.json({ result: "successfully updated", _id });
    });
  },
  deleteIssue: async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
      return res.json({ error: "missing _id" });
    }
    const isIssueInDatabase = await Issue.findById(_id).exec();
    if (!isIssueInDatabase) {
      return res.json({ error: "could not delete", _id: _id });
    }
    Issue.findByIdAndRemove(_id, err => {
      if (err) return res.json({ error: "could not delete", _id: _id });
      res.json({ result: "successfully deleted", _id });
    });
  }
};
module.exports = issueController;
