const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");
const userValidator = require("../../middlewares/schemaValidators/userValidator");
const User = require("../../controllers/user");
const validate = require("../../middlewares/validate");

const router = express.Router();

const upload = multer().single("profileImage");

//INDEX
router.get("/", User.index);

//STORE
router.post(
  "/",
  [
    check("email")
      .isEmail()
      .withMessage("Ingrese una dirección de correo electrónico válida"),
    check("nombre").not().isEmpty().withMessage("You nombre is required"),
    check("nombre").not().isEmpty().withMessage("You first name is required"),
    check("pais").not().isEmpty().withMessage("You last name is required"),
  ],
  validate,
  User.store
);

//SHOW
router.get("/:id", User.show);

//UPDATE
router.put("/:id", upload, User.update);

//DELETE
router.delete("/:id", User.destroy);
//Buiscar usuario por nombre y correo
router.post(
  "/searchByUsername",

  validate,
  userValidator.searchByUsername,
  User.searchUsersByNombre
);

module.exports = router;
