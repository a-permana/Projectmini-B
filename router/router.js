const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const articleController = require("../controller/articleController.js");
const commentController = require("../controller/commentController.js");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");

module.exports = function(app) {
  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    authController.signup
  ); // Auth

  app.post("/signin", authController.signin);

  app.get("/users", [authJwt.verifyToken], userController.users); // get all user

  app.put(
    "/users/:id",
    //[authJwt.verifyToken],
    userController.updateUsers
  );

  app.delete("/users/:id", [authJwt.verifyToken], userController.deleteUsersId);
  // app.get("/user", [authJwt.verifyToken], userController.userContent); // get 1 user according to roles

  app.get(
    "admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  app.post(
    "/articles/:id",
    [authJwt.verifyToken],
    articleController.addArticle
  );

  app.get("/articles", articleController.showAllArticle);

  app.get(
    "/articles/:id",
    // [authJwt.verifyToken],
    articleController.showArticle
  );

  app.put(
    "/articles/:id",
    [authJwt.verifyToken],
    articleController.updateArticle
  );

  app.delete(
    "/articles/:id",
    [authJwt.verifyToken],
    articleController.deleteArticle
  );

  app.post(
    "/comments/:article_id/:user_id",
    [authJwt.verifyToken],
    commentController.addComment
  );

  app.get("/comments", [authJwt.verifyToken], commentController.showAllComment);

  app.get(
    "/comments/:id",
    [authJwt.verifyToken],
    commentController.showComment
  );

  app.put(
    "/comments/:id",
    [authJwt.verifyToken],
    commentController.updateComment
  );

  app.delete(
    "/comments",
    [authJwt.verifyToken],
    commentController.deleteComment
  );

  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
