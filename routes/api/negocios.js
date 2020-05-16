const express = require("express");
const negociosController = require("../../controllers/negocios");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("imagen");
router.post("/addnegocio",upload, checkAuth, validate, negociosController.createnegocios);
//negocios usuario autenticado
router.get("/getnnegocios", checkAuth, validate, negociosController.negocioByUser);
//todos los negocios
router.get("/allnegocios", checkAuth, validate, negociosController.allnegocios);
router.get("/negocio/:negociosId", checkAuth, validate, negociosController.negocio);

router.delete(
  "/:negocioId",
  checkAuth,
  validate,

  negociosController.deletenegocioss
);

router.put("/:negociosId", checkAuth, validate, negociosController.actualizarnegocioso);

module.exports = router;
