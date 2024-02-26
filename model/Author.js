const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    // embedded documents
    permanent: {
      street: String,
      ward: Number,
    },
  },
  contact: Number,
  email: String,
  website: String,
});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
