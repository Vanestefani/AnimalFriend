const express = require("express");
const RecordatorioController = require("../../controllers/recordatorios");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");

router.post(
  "/addrecordatorio",
  checkAuth,
  validate,
  RecordatorioController.createRecordatorio
);
router.get(
  "/recordtorios",
  checkAuth,
  validate,
  RecordatorioController.RecordatoriosByUser
);

router.delete(
  "/:recordatorioId",
  checkAuth,
  validate,

  RecordatorioController.deleterecordatorio
);

router.put(
  "/:recordatorioId",
  checkAuth,
  validate,
  RecordatorioController.actualizarRecordatorio
);

module.exports = router;
