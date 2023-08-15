const express=require('express');
const getAllTopics = require('./db/controllers/topics_controllers');
const getArticleById=require("./db/controllers/articles_controllers")
const {customErrors,serverErrors}=require('./db/errors')
const getCommentsByArticleId=require("./db/controllers/comments_controllers")
const getAllEndpoints=require('./db/controllers/endpoints_controller')
const app=express();

app.get("/api",getAllEndpoints)

app.get('/api/topics',getAllTopics)

app.get('/api/articles/:article_id/comments',getCommentsByArticleId)

app.get("/api/articles/:article_id",getArticleById)



app.use(customErrors)
app.use(serverErrors)

module.exports=app;