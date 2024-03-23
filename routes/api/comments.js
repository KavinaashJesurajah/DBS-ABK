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

router.get("/", (req, res) => {
  res.json("Comment server");
});
/*
    - create a comment to an event
*/
router.post("/create", (req, res) => {
  const { eventID, userID, commentText, rating, timestamp } = req.body;
  let sql =
    "INSERT INTO Comment (EventID, UserID, CommentText, Rating, Timestamp) VALUES ( ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [eventID, userID, commentText, rating, timestamp],
    (err, data) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json("create successfully");
    }
  );

  //   sql =
  //     "SELECT * FROM Comment WHERE EventID = ? AND UserID = ? AND CommentText = ?";
  //   db.query(sql, [eventID, userID, commentText], (err, data) => {
  //     if (err) {
  //       return res.status(400).send(err);
  //     }
  //     console.log(data);
  //     res.json(data);
  //   });
});

router.post("/edit", (req, res) => {
  const { message, idComment } = req.body;

  let sql = "UPDATE Comment SET CommentText = ? WHERE CommentID = ?";
  db.query(sql, [message, idComment], (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.json(result);
  });
});

router.post("/delete", (req, res) => {
  const { idComment } = req.body;

  let sql = "DELETE FROM Comment WHERE CommentID = ?";
  db.query(sql, idComment, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.json(result);
  });
});
module.exports = router;
