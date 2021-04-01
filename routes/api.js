"use strict";
const issueController = require("../public/controllers/issueController");
const router = require("express").Router();

router.get("/issues/apitest", issueController.viewIssues);
router.post("/issues/apitest", issueController.createIssue);
router.put("/issues/apitest", issueController.editIssue);
router.delete("/issues/apitest", issueController.deleteIssue);

module.exports = router;
