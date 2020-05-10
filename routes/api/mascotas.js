const express = require("express");
const MascotaController = require("../../controllers/mascotas");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");

router.post("/addmascota", checkAuth, validate, MascotaController.createMascota);
router.get("/getmascotas", checkAuth, validate, MascotaController.mascotasByUser);

router.delete(
  "/:mascotasId",
  checkAuth,
  validate,

  MascotaController.deletemascotas
);

router.put("/:mascotasId", checkAuth, validate, MascotaController.actualizarRecordatorio);

module.exports = router;
