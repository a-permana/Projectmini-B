module.exports = (sequelize, Sequelize) => {
  const article = sequelize.define("articles", {
    judul: {
      type: Sequelize.STRING
    },
    isi: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return article;
};
