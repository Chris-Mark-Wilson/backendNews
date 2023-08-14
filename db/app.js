const express=require('express');
const getAllTopics = require('./controllers/topics_controllers');
const {customErrors,sqlErrors}=require('../db/errors')

const app=express();

app.get('/api/topics',getAllTopics)


app.use(customErrors)
app.use(sqlErrors)

module.exports=app;