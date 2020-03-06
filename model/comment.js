module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define("comments", {
    isi: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return comment;
};
