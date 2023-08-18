const topicRouter = require("express").Router();
const getAllTopics = require("./controllers/topics_controllers");

topicRouter.get('/',getAllTopics)


module.exports=topicRouter;