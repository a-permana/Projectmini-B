const db = require("../app/db.js");
const Article = db.article;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

// Add Article
exports.addArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.create(
    {
      judul: req.body.judul,
      isi: req.body.isi,
      user_id: req.params.id,
      status: true
    }
    // { where: { user_id: req.params.id } }
  );
  res.status(201).send({
    description: "Article successfully added!",
    article: article
  });
});

//show all article
exports.showAllArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    attributes: ["id", "judul", "isi", "status"]
  });
  res.status(200).json({
    description: "show All Articles",
    article: article
  });
});

//show article by id
exports.showArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.findOne({
    where: { id: req.params.id },
    attributes: ["id", "judul", "isi", "status", "id"],
    include: {
      model: User,
      attributes: ["name"]
    }
  });

  res.status(200).json({
    description: "Show article selected",
    article: article
  });
});

//update article
exports.updateArticle = asyncMiddleware(async (req, res) => {
  await Article.update(
    {
      id: req.body.id,
      judul: req.body.judul,
      isi: req.body.isi,
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Article successfully updated!"
  });
});

//delete article
exports.deleteArticle = asyncMiddleware(async (req, res) => {
  await Article.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "article successfully deleted."
  });
});
