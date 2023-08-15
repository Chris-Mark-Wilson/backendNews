const selectComments = require("../models/comments_models");
const { selectArticleById } = require("../models/articles_models");
const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  return Promise.all([
    selectArticleById(article_id),
    selectComments(article_id),
  ])

    .then(([_, result]) => {
      res.status(200).send({ status: 200, comments: result });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCommentsByArticleId };
