const { selectComments, insertComment } = require("../models/comments_models");
const { selectArticleById } = require("../models/articles_models");
const selectUserByUsername = require("../models/users_models");
const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  return Promise.all([
    selectArticleById(article_id),
    selectComments(article_id),
  ])

    .then(([_, result]) => {
      res.status(200).send({ comments: result });
    })
    .catch((err) => {
      next(err);
    });
};

const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;
  if (!body || !username) {
    res.status(400).send({ msg: "missing argument" });
  } else
    return Promise.all([
      selectArticleById(article_id),
      selectUserByUsername(username),
      insertComment(article_id, username, body),
    ])
      .then(([a, b, comment]) => {
        res.status(202).send({ comment: comment });
      })
      .catch((err) => {
        next(err);
      });
};

module.exports = { getCommentsByArticleId, postComment };
