const express = require("express");
const app = express();

let todos = ["html", "css", "react"];

// get request api

app.get("/api/todos", (req, res) => {
  console.log("send todos");
  res.send(todos);
});

app.listen(8000, () => {
  console.log("server started");
});
