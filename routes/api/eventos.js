const express = require("express");
const eventosController = require("../../controllers/eventos");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");

router.post("/addeventos", checkAuth, validate, eventosController.createeventos);
router.get("/getneventos", checkAuth, validate, eventosController.eventoByUser);

router.delete(
  "/:eventoId",
  checkAuth,
  validate,

  eventosController.deleteeventoss
);

router.put("/:eventosId", checkAuth, validate, eventosController.actualizareventoso);

module.exports = router;