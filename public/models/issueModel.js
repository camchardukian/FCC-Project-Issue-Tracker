const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const issueSchema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  open: { type: Boolean, required: true },
  assigned_to: { type: String, required: false },
  status_text: { type: String, required: false }
});
module.exports = mongoose.model("issues", issueSchema);
