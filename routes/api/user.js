const express = require("express");
const User = require("../../controllers/user");

const checkAuth = require("../../middlewares/authenticate");

const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("imagen");

const router = express.Router();

//INDEX
router.get("/", User.index);

//STORE

//SHOW
router.get("/:id", checkAuth, validate, User.show);

//UPDATE
router.put("/:id", upload, User.update);

//DELETE
router.delete("/:id", User.destroy);
//Buiscar usuario por nombre y correo
router.get(
  "/searchByUsername",

  validate,
  
  User.searchUsersByNombre
);

module.exports = router;
