const { selectComments, insertComment,deleteComment } = require("../models/comments_models");
const { selectArticleById } = require("../models/articles_models");

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
    return insertComment(article_id, username, body)
      .then((comment) => {
        res.status(201).send({ comment: comment });
      })
      .catch((err) => {
        next(err);
      });
};

const removeComment=((req,res,next)=>{

  const {comment_id}=req.params;
  deleteComment(comment_id)
  .then(()=>{
    res.status(204).send()
  })
  .catch((err)=>{
  next(err)
  })
})

module.exports = { getCommentsByArticleId, postComment,removeComment };
