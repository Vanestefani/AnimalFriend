const express = require("express");
const negociosController = require("../../controllers/negocios");
const checkAuth = require("../../middlewares/authenticate");
const router = express.Router();
const validate = require("../../middlewares/validate");

router.post("/addnegocio", checkAuth, validate, negociosController.createnegocios);
router.get("/getnegocios", checkAuth, validate, negociosController.negociosByUser);

router.delete(
  "/:negocioId",
  checkAuth,
  validate,

  negociosController.deletenegocioss
);

router.put("/:negocioId", checkAuth, validate, negociosController.actualizarnegocioso);

module.exports = router;
