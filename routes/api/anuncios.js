const express = require("express");
const AnunciosController = require("../../controllers/anuncios");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");

router.post("/addanuncio", checkAuth, validate, AnunciosController.createAnuncios);
router.get("/getanuncios", checkAuth, validate, AnunciosController.anunciosByUser);

router.delete(
  "/:anuncioId",
  checkAuth,
  validate,

  AnunciosController.deleteanuncioss
);

router.put("/:anuncioId", checkAuth, validate, AnunciosController.actualizaranuncioso);

module.exports = router;
