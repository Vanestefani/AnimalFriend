const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.pais = !isEmpty(data.pais) ? data.pais : "";
  data.ciudad = !isEmpty(data.ciudad) ? data.ciudad : "";
  data.genero = !isEmpty(data.genero) ? data.genero : "";

  // genero checks
  if (Validator.isEmpty(data.genero)) {
    errors.genero = "El campo genero es requerido";
  }
  // ciudad checks
  if (Validator.isEmpty(data.ciudad)) {
    errors.ciudad = "El campo ciudad es requerido";
  }
  // pais checks
  if (Validator.isEmpty(data.pais)) {
    errors.pais = "El campo pais es requerido";
  }
  // Namnombree checks
  if (Validator.isEmpty(data.nombre)) {
    errors.nombre = "El campo nombre es requerido";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "El campo email es requerido";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email es invalido";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "El campo contraseña es requerido";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "El campo comfirmación de contraseña es requerido";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "La contraseña al menos debe tener al menos 6 caracteres";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Las contraseñas deben coincidir";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
