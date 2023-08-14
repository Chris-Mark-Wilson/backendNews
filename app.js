const express = require("express");
const getAllTopics = require("./db/controllers/topics_controllers");

const { customErrors, sqlErrors } = require("./db/errors");
const getAllEndpoints = require("./db/controllers/endpoints_controller");

const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);

app.use(customErrors);
app.use(sqlErrors);

module.exports = app;
