const db = require("../app/db.js");
const Comment = db.comment;
// const User = db.user;
const asyncMiddleware = require("express-async-handler");

// Add Comment
exports.addComment = asyncMiddleware(async (req, res) => {
  console.log(req.body);
  console.log(req.params.user_id);
  console.log(req.params.article_id);

  await Comment.create({
    user_id: req.params.user_id,
    article_id: req.params.article_id,
    isi: req.body.isi_comment,
    status: true
  });
  res.status(201).send({
    status: "Article successfully added!"
  });
});

//show all comment
exports.showAllComment = asyncMiddleware(async (req, res) => {
  const comment = await Comment.findAll({
    attributes: ["id", "isi", "status"]
  });
  res.status(200).json({
    description: "show All comment",
    comment: comment
  });
});

//show comment by id
exports.showComment = asyncMiddleware(async (req, res) => {
  const comment = await Comment.findAll({
    where: { id: req.params.id },
    attributes: ["id", "isi", "status"]
  });

  res.status(201).json({
    description: "Show article selected",
    comment: comment
  });
});

//update comment
exports.updateComment = asyncMiddleware(async (req, res) => {
  await Comment.update(
    {
      id: req.body.id,
      isi: req.body.isi,
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Comment successfully updated!"
  });
});

//delete comment
exports.deleteComment = asyncMiddleware(async (req, res) => {
  await comment.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "comment successfully deleted."
  });
});
