const express = require("express");
const anunciosController = require("../../controllers/anuncios");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("imagen");
router.post(
  "/addanuncio",
  upload,
  checkAuth,
  validate,
  anunciosController.createAnuncios
);
//anuncios usuario autenticado
router.get(
  "/getnanuncios/:p",
  checkAuth,
  validate,
  anunciosController.anunciosByUser
);
//todos los anuncios
router.get("/allanuncios", checkAuth, validate, anunciosController.allanuncios);
router.get(
  "/anuncio/:anuncioId",
  checkAuth,
  validate,
  anunciosController.anuncio
);
router.delete(
  "/:anuncioId",
  checkAuth,
  validate,

  anunciosController.deleteanuncioss
);

router.put(
  "/:anuncioId",
  checkAuth,
  validate,
  anunciosController.actualizaranuncioso
);

module.exports = router;
