const apiRouter = require("express").Router();
const getAllEndpoints = require("../controllers/endpoints_controller");

apiRouter.get("/", getAllEndpoints);

module.exports = apiRouter;
