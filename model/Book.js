const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true, // database validation
  },
  isbn: Number,
  author: {
    // reference documents
    type: ObjectId,
    ref: "Author",
    required: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
