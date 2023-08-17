const express = require("express");
const getAllTopics = require("./controllers/topics_controllers");
const {
  getArticleById,
  getAllArticles,
  patchArticle,
} = require("./controllers/articles_controllers");
const { customErrors, sqlErrors,serverErrors } = require("./db/errors");
const getAllEndpoints = require("./controllers/endpoints_controller");
const {
  getCommentsByArticleId,postComment,removeComment
} = require("./controllers/comments_controllers");
const getUsers=require('./controllers/users_controllers')

const app = express();
app.use(express.json())

app.get("/api", getAllEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/users",getUsers)

app.post('/api/articles/:article_id/comments',postComment)

app.delete('/api/comments/:comment_id',removeComment)

app.patch("/api/articles/:article_id", patchArticle);

app.use((_, res) => {
  res.status(404).send({ status: 404, msg: "Path not found" });
});

app.use(customErrors);
app.use(sqlErrors)
app.use(serverErrors);

module.exports = app;
