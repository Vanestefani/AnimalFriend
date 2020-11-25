const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mascotasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  especie: {
    type: String,
    required: true,
  },
  raza: {
    type: String,
    required: true,
    minlength: 3,
  },
  genero: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  chip: {
    type: String,
    default: "No",
    maxlength: 15,
  },
  estatura: {
    type: String,
    default: "Mediana",
  },
  estelerizado: {
    type: String,
    default: "No",
  },
  peligroso: {
    type: String,
    default: "No",
  },
  alergias: {
    type: String,
    default: "Ninguna",
  },
  civil: {
    type: String,
    default: "Soltero",
  },
  personalidad: {
    type: String,
    default: "No definida",
  },

  fecha_nacimiento: {
    type: Date,
    default: "2020/01/18",
  },
  descripcion: {
    type: String,
    trim: true,
    default: "",
  },
  color: {
    type: String,
    minlength: 3,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  foto: {
    type: String,
    required: "Please select image",
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  propietario: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: "Debe tener responsable",
  },
});

module.exports = mongoose.model("Mascota", mascotasSchema);
