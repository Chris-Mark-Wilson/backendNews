const express = require("express");
const getAllTopics = require("./controllers/topics_controllers");

const { customErrors, sqlErrors,serverErrors } = require("./db/errors");

const {
  getCommentsByArticleId,postComment,removeComment
} = require("./controllers/comments_controllers");
const getUsers=require('./controllers/users_controllers')
const apiRouter = require('./routes/apiRouter');
const articleRouter = require("./routes/articlesRouter");


const app = express();
app.use(express.json())

app.use('/api', apiRouter);
app.use('/api/articles',articleRouter)





app.get("/api/topics", getAllTopics);

app.get("/api/users",getUsers)



app.delete('/api/comments/:comment_id',removeComment)



app.use((_, res) => {
  res.status(404).send({ status: 404, msg: "Path not found" });
});

app.use(customErrors);
app.use(sqlErrors)
app.use(serverErrors);

module.exports = app;
