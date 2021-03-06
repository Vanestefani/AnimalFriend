const express = require("express");
const eventosController = require("../../controllers/eventos");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("imagen");
router.post("/addevento",upload, checkAuth, validate, eventosController.createeventos);
//eventos usuario autenticado
router.get("/getneventos/:p", checkAuth, validate, eventosController.eventoByUser);
//todos los eventos
router.get("/alleventos", checkAuth, validate, eventosController.alleventos);
router.get("/evento/:eventosId", checkAuth, validate, eventosController.evento);

router.delete(
  "/:eventoId",
  checkAuth,
  validate,

  eventosController.deleteeventoss
);

router.put("/:eventosId", checkAuth, validate, eventosController.actualizareventoso);

module.exports = router;
