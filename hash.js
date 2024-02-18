const bcrypt = require("bcrypt");
const saltRounds = 4;

function signup(username, email, password) {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    let data = {
      username,
      email, // if key value are same, you can also use key only
      password: hash,
    };
    console.log(data);
  });
}

function login(password) {
  let hash = "$2b$04$d3.5bECLXXNaAtyky4P.G.1ejBqODSbHtt1bgGZogTsfjPyiHEoX2";
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      console.log("login success");
    } else {
      console.log("login failed..");
    }
  });
}

// named export
module.exports = {
  signup: signup,
  login: login,
};
