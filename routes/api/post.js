const express = require("express");
const postController = require("../../controllers/post");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("imagen");
router.post("/addPost", checkAuth, validate, upload, postController.createPost);
router.get("/allpost", checkAuth, validate, postController.allpost);

router.get("/getsubpost", checkAuth, validate, postController.allpost);
router.get("/mypost", checkAuth, validate, postController.mypost);

router.put("/like", checkAuth, validate, postController.like);
router.put("/unlike", checkAuth, validate, postController.unlike);
router.put("/comment", checkAuth, validate, postController.comment);
router.delete(
  "/:postId",
  checkAuth,
  validate,
  upload,
  postController.deletepost
);

router.put("/:postId", checkAuth, validate, postController.actualizarPost);

module.exports = router;
