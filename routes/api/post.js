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
router.get("/allpost", checkAuth, validate, postController.allpost);

router.get("/getsubpost", checkAuth, validate, postController.allpost);
router.post(
  "/getPostLikes",
  checkAuth,
  validate,

  postController.getPostLikes
);

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
router.get("/mypost", checkAuth, (req, res) => {
  Post.find({ autor: req.user._id })
    .populate("autor", "_id nombre")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
