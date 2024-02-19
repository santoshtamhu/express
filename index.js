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

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    return res.send(todo);
  }
  res.status(404).send({
    erros: {
      message: "product not found",
    },
  });
});

// route level middleware //

app.post("/api/todos", checkAuthentication, checkValidRole, (req, res) => {
  console.log("todos added");

  const lastTodo = todos[todos.length - 1];
  const newId = lastTodo ? lastTodo.id + 1 : 1;

  const title = req.body.title;
  const status = req.body.status;

  const newTodo = {
    id: newId,
    title,
    status,
  };

  let inputValue = req.body.title?.trim();
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
    return res.status(400).send({
      errors: {
        message: "todo already exists",
      },
    });
  }

  if (!inputValue) {
    return res.status(400).send({
      errors: {
        key: "title",
        message: "field required",
      },
    });
  }

  todos.push(newTodo);
  res.send("todos added");
});

app.put("/api/todos/:id", checkAuthentication, checkValidRole, (req, res) => {
  console.log("todo updated");
  const id = req.params.id;
  // const todoIndex = todos.findIndex((todo) => todo.id == id);

  const title = req.body.title?.trim();
  const status = req.body.status?.trim();

  if (!title && !status) {
    return res.status(400).send({
      erros: [
        {
          key: "title",
          message: "field required",
        },
        {
          key: "status",
          message: "field required",
        },
      ],
    });
  } else if (!title || !status) {
    return res.status(400).send({
      errors: {
        key: !title ? "title" : !status ? "status" : "",
        message: "field required",
      },
    });
  }

  let matched = false;
  matched = todos.some((e) => e.title.toLowerCase() == title.toLowerCase());

  if (matched) {
    return res.status(400).send({
      erros: {
        message: "todo already exists",
      },
    });
  }

  /*   if (todoIndex !== -1) {
    todos[todoIndex].title = title;
    todos[todoIndex].status = status;
    return res.send("todo updated");
  }
  res.status(404).send({
    errors: {
      message: "todo not found",
    },
  }); */

  todos.map((e) => {
    if (e.id == id) {
      e.title = title;
      e.status = status;
      res.send("todo updated");
    } else {
      res.status(404).send({
        errors: {
          message: "todo not found",
        },
      });
    }
    return e;
  });
});

app.delete(
  "/api/todos/:id",
  checkAuthentication,
  checkValidRole,
  (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex((todo) => todo.id == id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      return res.status(204).send("todo deleted successfully");
    }
    res.status(400).send({
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
    res.status(204).send("todos reset");
  }
);

app.listen(8000, () => {
  console.log("server started");
});
