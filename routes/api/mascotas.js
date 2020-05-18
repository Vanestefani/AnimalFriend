const express = require("express");
const MascotaController = require("../../controllers/mascotas");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");
const multer = require("multer");
const upload = multer().single("foto");
router.post("/addmascota",upload, checkAuth, validate, MascotaController.createMascota);
router.get("/getmascotas", checkAuth, validate, MascotaController.mascotasByUser);
router.get("/getmascotasporusuario/:p", checkAuth, validate, MascotaController.mascotasByPerfil);
router.get("/mascota/:m", checkAuth, validate, MascotaController.mascota);

router.delete(
  "/:mascotasId",
  checkAuth,
  validate,

  MascotaController.deletemascotas
);

router.put("/:mascotasId",upload, checkAuth, validate, MascotaController.actualizarRecordatorio);

module.exports = router;
