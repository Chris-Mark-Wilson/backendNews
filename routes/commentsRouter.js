const commentRouter = require("express").Router();
const { removeComment,patchCommentVotes } = require("../controllers/comments_controllers");

commentRouter.delete("/:comment_id", removeComment);
commentRouter.patch('/:comment_id',patchCommentVotes)

module.exports = commentRouter;
