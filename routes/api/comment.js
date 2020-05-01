const express = require("express");
const commentController = require("../../controllers/comment");
const checkAuth = require('../../middlewares/authenticate');
const commentValidator = require("../../middlewares/schemaValidators/commentValidator");
const auth = require("./auth");
const user = require("./user");
module.exports = (app) => {
  app.post(
    "/getComments/",
    checkAuth,
    commentValidator.getComments,
    commentController.getCommentsForPost
  );
  app.post(
    "/getCommentReplies/",
    checkAuth,
    commentValidator.getCommentReplies,
    commentController.getRepliesForComment
  );

  app.post(
    "/addComment/",
    checkAuth,
    commentValidator.addComment,
    commentController.addComment
  );

  app.post(
    "/addCommentReply/",
    checkAuth,
    commentValidator.addCommentReply,
    commentController.addCommentReply
  );

  app.post(
    "/getCommentLikes",
    checkAuth,
    commentValidator.getCommentLikes,
    commentController.getCommentLikes
  );
  app.post(
    "/getCommentReplyLikes",
    checkAuth,
    commentValidator.getCommentReplyLikes,
    commentController.getCommentReplyLikes
  );
  app.post(
    "/likeComment/",
    checkAuth,
    commentValidator.likeComment,
    commentController.likeComment
  );
  app.post(
    "/likeCommentReply/",
    checkAuth,
    commentValidator.likeCommentReply,
    commentController.likeCommentReply
  );
};
