const express = require("express");
const { check } = require("express-validator");
const Auth = require("../../controllers/auth");
const Password = require("../../controllers/password");
const validate = require("../../middlewares/validate");
const router = express.Router();

router.get("/", Auth.usuarioAutenticado);

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Introduzca una dirección de correo electrónico válida"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Debe tener al menos 6 caracteres de largo"),
    check("nombre")
      .not()
      .isEmpty()
      .withMessage("El campo nombre es requerido"),
    check("pais").not().isEmpty().withMessage("El campo pais es requerido"),
    check("ciudad").not().isEmpty().withMessage("El campo ciudad es requerido"),
    check("genero").not().isEmpty().withMessage("El campo genero es requerido"),
    check("password2").not().isEmpty().withMessage("El campo confirmar contraseña es requerido"),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
  ],
  validate,
  Auth.register
);
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password").not().isEmpty(),
  ],
  validate,
  Auth.login
);
//EMAIL Verification
router.get("/verify/:token", Auth.verify);
router.post("/resend", Auth.resendToken);
//Password RESET
router.post(
  "/recover",
  [check("email").isEmail().withMessage("Enter a valid email address")],
  validate,
  Password.recover
);
router.get("/reset/:token", Password.reset);
router.post(
  "/reset/:token",
  [
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Must be at least 6 chars long"),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
  ],
  validate,
  Password.resetPassword
);
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});
module.exports = router;
