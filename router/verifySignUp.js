const db = require("../app/db.js");
const config = require("../app/config.js");
// const ROLEs = config.ROLEs;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
  // -> Check Username is already in use
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send("Fail -> Username is already taken!");
      return;
    }

    // -> Check Email is already in use
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send("Fail -> Email is already in use!");
        return;
      }

      next();
    });
  });
};

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
// signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;
