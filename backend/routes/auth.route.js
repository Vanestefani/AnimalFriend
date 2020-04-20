const express = require("express");
const router = express.Router();
//Cargar controladores
const {
  registerController,
} = require("../controller/auth.controller");

//Rutas
router.post("/register", registerController);

module.exports = router;
