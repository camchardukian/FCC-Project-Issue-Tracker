const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  test("Create an issue with every field: POST request to /api/issues/apitest", done => {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        issue_title: "I have an issue",
        issue_text: "describing the issue....",
        created_by: "the main culprit",
        open: true,
        assigned_to: "The person who has to put out the fire",
        status_text: "ready to be assigned"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("Create an issue with only required fields: POST request to /api/issues/apitest", done => {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        issue_title: "my issue",
        issue_text: "my description of the issue",
        created_by: "the person who created the issue"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("Create an issue with missing required fields: POST request to /api/issues/apitest", done => {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        issue_title: "I have an issue",
        assigned_to: "The person who has to put out the fire",
        status_text: "ready to be assigned"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("View issues on a project: GET request to /api/issues/apitest", done => {
    chai
      .request(server)
      .get("/api/issues/apitest")
      .end((err, res) => {
        assert.typeOf(
          res.body,
          "array",
          "A plain GET request to /api/issues/apitest returns an array"
        );
        assert.equal(res.status, 200);
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("View issues on a project with one filter: GET request to /api/issues/apitest", done => {
    chai
      .request(server)
      .get("/api/issues/apitest")
      .query({ open: false })
      .end((err, res) => {
        assert.typeOf(
          res.body,
          "array",
          "A GET request with a single filter to /api/issues/apitest returns an array"
        );
        assert.equal(res.status, 200);
        for (let i = 0; i < res.body.length; i += 1) {
          assert.equal(res["body"][i]["open"], false);
        }
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("View issues on a project with multiple filters: GET request to /api/issues/apitest", done => {
    chai
      .request(server)
      .get("/api/issues/apitest")
      .query({ open: false, _id: "606d928da76c980d6660a24b" })
      .end((err, res) => {
        assert.typeOf(
          res.body,
          "array",
          "A GET request with multiple filters to /api/issues/apitest returns an array"
        );
        assert.equal(res.status, 200);
        for (let i = 0; i < res.body.length; i += 1) {
          assert.equal(res["body"][i]["open"], false);
          assert.equal(res["body"][i]["_id"], "606d928da76c980d6660a24b");
        }
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
