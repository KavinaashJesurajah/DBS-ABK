const express = require("express");
const router = express.Router();
const config = require("config");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});

router.get("/universities", (req, res) => {
  let sql = "SELECT * FROM University";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json(data);
  });
});

router.post("/newUniversity", (req, res) => {
  const { name, location, description } = req.body;
  let sql =
    "INSERT INTO University(Name, Location, Description) VALUES (?, ?, ?)";
  db.query(sql, [name, location, description], (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json(data);
  });
});

/*
It will return the list JSON:
    {
        "CommentID": 10,
        "EventID": 1,
        "UserID": 1,
        "CommentText": "update message"
    },
    {
        "CommentID": 12,
        "EventID": 1,
        "UserID": 1,
        "CommentText": "message 2"
    }

*/

router.get("/comments", (req, res) => {
  // let sql =
  //   "SELECT Comments.idComment, Comments_event_id, comments.Comments_user_id, comments.message, users.username FROM comments INNER JOIN users ON comments.Comments_user_id = users.idUser";

  let sql =
    "SELECT CommentID, Comment.EventID, Comment.UserID, CommentText FROM Comment INNER JOIN User ON Comment.UserID =  User.UserID";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.json(result);
  });
});

module.exports = router;
