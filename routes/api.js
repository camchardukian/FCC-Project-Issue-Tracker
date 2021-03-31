"use strict";
const issueController = require("../public/controllers/issueController");
const router = require("express").Router();

module.exports = function(app) {
  router.get("/api/issues/:project", issueController.viewIssues);
  router.post("/api/issues/:project", issueController.createIssue);
  router.put("/api/issues/:project", issueController.editIssue);
  router.delete("/api/issues/:project", issueController.deleteIssue);
};
