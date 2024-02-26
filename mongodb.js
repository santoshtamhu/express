/* 
MongoDB operations
*/

/* 
 table => collections
 row => documents

  show dbs: to check existing database

  use bookStore (database name):
    - creates new database with the name "bookStore" and switches into it
    - switches to bookStore if it already exists.
  
  show collections: 
    -to see the table/collection of a selected database

*/

/* CRUD operators */

// to create a new collection
db.createCollection("books");

// to insert single data/document/row
db.books.insertOne({ name: "ruby", isbn: 1234 });

// to insert multiple data/document
db.books.insertMany([
  { name: "java", isbn: 2222 },
  { name: "html", isbn: 3333 },
  { name: "python", isbn: 1111 },
  { name: "ruby", isbn: 1234 },
]);

// to return all the data/documents from the selected collection (books)
db.books.find();

// to return all the documents where the "name" equals "java"
db.books.find({ name: "java" }); // db.books.find(filter)

// to return all the documents with "ISBN" either "1234" or "2344"
db.books.find({ isbn: { $in: [1234, 2344] } });

//  to update the data
/* $set is one of the update operators */
db.books.updateOne({ name: "java" }, { $set: { name: "ruby on rails" } });

// to update multiple documents simultaniously
db.books.updateMany({}, { $set: { published_date: "2020-01-01" } });

// to delete single document
db.books.deleteOne({ name: "java" });

// to delete multiple document
db.books.deleteMany({ isbn: 1234 });
