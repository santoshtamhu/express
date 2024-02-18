let isLoggedIn = true;
let validRole = true;

function checkAuthentication(req, res, next) {
  if (!isLoggedIn) {
    return res.status(401).send();
  }
  next();
}

function checkValidRole(req, res, next) {
  if (!validRole) {
    return res.status(403).send({
      message: "not a valid role",
    });
  }
  next();
}

module.exports = {
  checkAuthentication,
  checkValidRole,
};
