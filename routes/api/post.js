const express = require("express");
const postController = require("../../controllers/post");
const userController = require("../../controllers/user");
const checkAuth = require("../../middlewares/authenticate");
const postValidator = require("../../middlewares/schemaValidators/postValidator");
const router = express.Router();
const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("imagen");
router.post(
  "/addPost",
  checkAuth,
  validate,

  upload,

  postController.createPost
);

module.exports = router;
