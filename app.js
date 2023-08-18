const express = require("express");


const { customErrors, sqlErrors,serverErrors } = require("./db/errors");

const {
  getCommentsByArticleId,postComment,removeComment
} = require("./controllers/comments_controllers");
const getUsers=require('./controllers/users_controllers')
const apiRouter = require('./routes/apiRouter');
const articleRouter = require("./routes/articlesRouter");
const topicRouter=require('./routes/topicsRouter');
const userRouter = require("./routes/usersRouter");
const commentRouter=require('./routes/commentsRouter')


const app = express();
app.use(express.json())

app.use('/api', apiRouter);
app.use('/api/articles',articleRouter)
app.use('/api/topics',topicRouter)
app.use('/api/users',userRouter)
app.use('api/comments',commentRouter)











app.delete('/api/comments/:comment_id',removeComment)



app.use((_, res) => {
  res.status(404).send({ status: 404, msg: "Path not found" });
});

app.use(customErrors);
app.use(sqlErrors)
app.use(serverErrors);

module.exports = app;
