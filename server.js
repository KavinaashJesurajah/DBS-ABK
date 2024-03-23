const express = require("express");
const app = express();
app.use(express.json());

const auth = require("./routes/api/auth");
app.use("/api/auth", auth);
const university = require("./routes/api/university");
app.use("/api/university", university);
const events = require("./routes/api/events");
app.use("/api/events", events);
const rso = require("./routes/api/rso");
app.use("/api/rso", rso);
const comments = require("./routes/api/comments");
app.use("/api/comments", comments);

// app.get("/", (req, res) => {
//   res.json("You are good");
// });

app.listen(8800, () => {
  console.log("Connected to backend");
});
