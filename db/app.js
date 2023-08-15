const express=require('express');
const getAllTopics = require('./controllers/topics_controllers');
const getArticleById=require("./controllers/articles_controllers")
const {customErrors,serverErrors}=require('../db/errors')
const getCommentsByArticleId=require("./controllers/comments_controllers")

const app=express();

app.get('/api/topics',getAllTopics)

app.get("/api/articles/:article_id",getArticleById)

app.get("/api/articles/:article_id/comments",getCommentsByArticleId)


app.use(customErrors)
app.use(serverErrors)

module.exports=app;