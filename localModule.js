/*  
  Global object
  - conlole
  - __dirname
  - __filename
  - require
  
*/

/* 
 Node modules
  - third party
    eg, axios, nodemon, bcrypt ...
  - core
  - local
  
*/

const auth = require("./auth"); // {signup() => {}, login() => {}} // if it's named export
const products = require("./products");

auth.signup("ram", "ram@ram.com", "password");
auth.login("password");

products.create();
products.fetch();
