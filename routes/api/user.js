const express = require("express");
const User = require("../../controllers/user");
const multer = require("multer");
const upload = multer().single("imagen");
const checkAuth = require("../../middlewares/authenticate");

const validate = require("../../middlewares/validate");

const router = express.Router();

//INDEX
router.get("/all", checkAuth, validate, User.index);

//STORE

//SHOW
router.get("/:id", checkAuth, validate, User.show);

//DELETE
router.delete("/:id", checkAuth, validate, User.destroy);
//Buiscar usuario por nombre y correo
router.post(
  "/searchByUsername",

  checkAuth,
  validate,

  User.searchUsersByNombre
);
router.put("/follow", checkAuth, validate, User.addFollowing);
router.put("/unfollow", checkAuth, validate, User.unFollow);
router.put("/changefoto", checkAuth, validate, upload,User.changefoto);
router.put("/:userId", checkAuth, validate, User.update);

module.exports = router;
