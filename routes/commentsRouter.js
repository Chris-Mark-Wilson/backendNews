const commentRouter = require("express").Router();
const { removeComment } = require("../controllers/comments_controllers");

commentRouter.delete("/:comment_id", removeComment);

module.exports = commentRouter;
