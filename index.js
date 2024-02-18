const express = require("express");
const app = express();

const { checkAuthentication, checkValidRole } = require("./middleware/auth");

let todos = [
  {
    id: 1,
    title: "html",
    status: "completed",
  },
  {
    id: 2,
    title: "css",
    status: "completed",
  },
];

/* middleware
     - simply a function which has access to req and res, and can modify them
     - next: points to the next upcomming valid middleware
*/

// app.use(checkAuthentication); // global middleware
// app.use(checkValidRole); // global middleware

app.use(express.json());

app.get("/api/todos", (req, res) => {
  console.log("list of todos");
  res.send(todos);
});

// route level middleware //

app.post("/api/todos", checkAuthentication, checkValidRole, (req, res) => {
  console.log("todos added");

  req.body.id = todos.length + 1;
  const id = req.body.id;
  const title = req.body.title;
  const status = req.body.status;

  const newTodo = {
    id,
    title,
    status,
  };

  let inputValue = req.body.title.trim();
  let matched = false;

  /*
  includes() method: checks if an array contains a specified element and returns true if found, false otherwise.

  matched = todos.includes(inputValue.title);
*/

  // some() - checks the condition and returns a boolen value

  matched = todos.some(
    (e) => e.title.toLowerCase() == inputValue.toLowerCase()
  );

  if (matched) {
    return res.status(403).send({
      errors: {
        message: "todo already exists",
      },
    });
  }

  if (!inputValue) {
    return res.status(403).send({
      errors: {
        key: "title",
        message: "field required",
      },
    });
  }

  todos.push(newTodo);

  res.send("todos added");
});

app.delete(
  "/api/todos/:id",
  checkAuthentication,
  checkValidRole,
  (req, res) => {
    let id = req.params.id;
    console.log(id);
    const todoIndex = todos.findIndex((todo) => todo.id == id);

    console.log(todoIndex);

    if (todoIndex !== -1) {
      res.send("todo deleted successfully");
      return todos.splice(todoIndex, 1);
    }
    res.status(401).send({
      errors: { message: "Todo not found" },
    });
  }
);

app.delete(
  "/api/todos/reset",
  checkAuthentication,
  checkValidRole,
  (req, res) => {
    todos = [];
    res.send("todos reset");
  }
);

app.listen(8000, () => {
  console.log("server started");
});
