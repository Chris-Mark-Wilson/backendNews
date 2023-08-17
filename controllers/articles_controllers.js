const {
  selectArticleById,
  selectAllArticles,
  updateArticle
} = require("../models/articles_models");
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
  const {topic,sort_by,order}=req.query;
  selectAllArticles(topic,sort_by,order)
    .then((articles) => {
      res.status(200).send({ articles:articles });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
return Promise.all([selectArticleById(article_id),updateArticle(article_id, body)])
.then(([_,article])=>{res.status(200).send({article:article})
})
.catch((err)=>{
    next(err)
})
}
module.exports = { getArticleById, getAllArticles,patchArticle };
