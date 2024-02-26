const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Book = require("./model/Book");
const Author = require("./model/Author");

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/bookStore")
  .then(() => console.log("Connected!"));

/* 
app.get("/api/books", (req, res) => {
  /// db.books.find()
  Book.find().then((books) => {
    console.log(books);
    res.send(books);
  });
});
*/

app.get("/api/books", async (req, res, next) => {
  //db.books.find()
  try {
    let books = await Book.find({});
    res.send(books);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/authors", async (req, res, next) => {
  try {
    let authors = await Author.find({});
    res.send(authors);
  } catch (err) {
    return next(err);
  }
});

/* 
One way to do it

app.post("/api/books", (req, res) => {
  // db.books.insertOne()
  let { title, isbn } = req.body;
  Book.create({ title, isbn })
    .then((book) => {
      console.log("book created");
      res.send(book);
    })
    .catch((err) => {
      res.send(err);
    });
});

*/

// Other way to do it

app.post("/api/books", async (req, res, next) => {
  // db.books.insertOne()
  try {
    let books = await Book.create(req.body);
    res.send(books);
  } catch (err) {
    next(err);
  }
});

app.post("/api/authors", async (req, res, next) => {
  let { name, contact, email, website } = req.body;
  try {
    let author = await Author.create({ name, contact, email, website });
    res.send(author);
  } catch (err) {
    next(err);
  }
});

app.put("/api/books/:_id", async (req, res, next) => {
  const id = req.params._id;
  const { title, isbn } = req.body;

  let matched = await Book.findById(id);
  if (!matched) {
    res.status(404).send();
  }
  try {
    let book = await Book.findByIdAndUpdate(
      id,
      { title, isbn },
      { new: true, runValidators: true }
    );
    res.send(book);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/books/:_id", async (req, res, next) => {
  try {
    let book = await Book.findByIdAndDelete(req.params._id);
    res.status(204).send("");
  } catch (err) {
    next();
  }
});

app.use((req, res) => {
  res.status(404).send({
    msg: "resource not found",
    name: err.name,
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let msg = "Server Error";
  if (err.name == "ValidationError") {
    statusCode = 400;
    msg = "bad request / please check your form";
  }
  res.status(statusCode).send({
    msg,
    name: err.name,
    error: err.errors,
  });
});

app.listen(8000, () => {
  console.log("server started");
});
