const db = require("../app/db.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "All User",
    user: user
  });
});

exports.updateUsers = asyncMiddleware(async (req, res) => {
  await User.update(
    {
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(200).send({
    description: "user successfully update"
  });
});

exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "User Content Page",
    user: user
  });
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "Admin Board",
    user: user
  });
});

exports.managementBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "Management Board",
    user: user
  });
});

exports.deleteUsersId = asyncMiddleware(async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "user successfully deleted.",
    user: user
  });
});
