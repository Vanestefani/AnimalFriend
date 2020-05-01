const express = require("express");
const postController = require("../../controllers/post");
const userController = require("../../controllers/user");
const checkAuth = require('../../middlewares/authenticate');
const postValidator = require("../../middlewares/schemaValidators/postValidator");
module.exports = (app) => {
  app.post(
    "/getPosts",
    checkAuth,
    postValidator.getPosts,
    userController.getFollowings,
    postController.getPosts
  )

  app.post(
    "/getPostsByHashtag",
    checkAuth,
    postValidator.getPostsByHashtag,
    postController.getPostsByHashtag
  );

  app.post(
    "/getPostLikes",
    checkAuth,
    postValidator.getPostLikes,
    postController.getPostLikes
  );

  app.post(
    "/getPostsByLocation",
    checkAuth,
    postValidator.getPostsByLocation,
    postController.getPostsByLocation
  );

  app.post(
    "/addPost",
    checkAuth,
    postController.upload,
    postValidator.createPost,
    postController.createPost
  );

  app.post(
    "/getPost",
    checkAuth,
    postValidator.getPost,
    postController.getPost
  );

  app.post(
    "/likePost/",
    checkAuth,
    postValidator.likePost,
    postController.likePost
  );

  app.post(
    "/delete/",
    checkAuth,
    postValidator.deletePost,
    postController.deletePost
  );
};
