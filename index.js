const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/bookStore")
  .then(() => console.log("Connected!"));

const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: String,
  isbn: Number,
});

const Book = mongoose.model("Book", BookSchema);

app.get("/api/books", (req, res) => {
  //db.books.find()
  Book.find().then((books) => {
    console.log(books);
    res.send(books);
  });
});

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

app.put("/api/books", (req, res) => {
  Book.findByIdAndUpdate("65d71b6f004fcb39f8ba40a3", { title: "css" })
    .then(() => {
      console.log("book updated");
      res.send("book updated");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/api/books", (req, res) => {
  Book.findByIdAndDelete("65d71b6f004fcb39f8ba40a3")
    .then(() => {
      console.log("book deleted");
      res.send("book deleted");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(8000, () => {
  console.log("server started");
});
