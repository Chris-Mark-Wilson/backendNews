const {
  selectArticleById,
  selectAllArticles,
  updateArticle,
  insertArticle,
} = require("../models/articles_models");

const { selectTopicByTopicName } = require("../models/topics_models");
const { selectUserByUsername } = require("../models/users_models");

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((result) => {
      res.status(200).send({ article: result });
    })
    .catch((err) => {
      next(err);
    });
};
const getAllArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;

  return Promise.all([
    selectTopicByTopicName(topic),
    selectAllArticles(topic, sort_by, order),
  ])
    .then(([_, articles]) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  return Promise.all([
    selectArticleById(article_id),
    updateArticle(article_id, body),
  ])
    .then(([_, article]) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

const postNewArticle = (req, res, next) => {
  const { topic } = req.body;
  const article = req.body;
  const { author } = req.body;
  return Promise.all([
    selectTopicByTopicName(topic),
    selectUserByUsername(author),
    insertArticle(article),
  ])

    .then(([topic, user, article]) => {
      return res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  getArticleById,
  getAllArticles,
  patchArticle,
  postNewArticle,
};
