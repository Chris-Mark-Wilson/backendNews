const express = require("express");
const getAllTopics = require("./db/controllers/topics_controllers");
const {getArticleById,getAllArticles}=require('./db/controllers/articles_controllers')
const { customErrors, serverErrors } = require("./db/errors");
const getAllEndpoints = require("./db/controllers/endpoints_controller");

const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);

app.get("/api/articles/:article_id",getArticleById)

app.get("/api/articles",getAllArticles)

app.use((_,res)=>{
    res.status(404).send({status:404,msg:"Path not found"})
})

app.use(customErrors);
app.use(serverErrors);

module.exports = app;