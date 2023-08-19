const articleRouter = require("express").Router();

const {
  getCommentsByArticleId,
  postComment,
} = require("../controllers/comments_controllers");

const {
  getArticleById,
  getAllArticles,
  patchArticle,
  postNewArticle,
} = require("../controllers/articles_controllers");

articleRouter.get("/", getAllArticles);

articleRouter.get("/:article_id/comments", getCommentsByArticleId);

articleRouter.post("/:article_id/comments", postComment);

articleRouter.get("/:article_id", getArticleById);

articleRouter.patch("/:article_id", patchArticle);

articleRouter.post('/',postNewArticle)

module.exports = articleRouter;
