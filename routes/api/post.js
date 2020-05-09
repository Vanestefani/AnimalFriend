const express = require("express");
const postController = require("../../controllers/post");
const userController = require("../../controllers/user");
const checkAuth = require("../../middlewares/authenticate");
const postValidator = require("../../middlewares/schemaValidators/postValidator");
const router = express.Router();
const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("imagen");
router.post("/addPost", checkAuth, validate, upload, postController.createPost);
router.get("/allpost", checkAuth, validate, upload, postController.allpost);

router.get("/getsubpost", checkAuth, validate, upload, postController.allpost);

router.put("/like", checkAuth, validate, upload, postController.like);
router.put("/unlike", checkAuth, validate, upload, postController.unlike);
router.put("/comment", checkAuth, validate, upload, postController.comment);
router.put(
  "/deletepost/:postId",
  checkAuth,
  validate,
  upload,
  postController.deletepost
);

module.exports = router;
