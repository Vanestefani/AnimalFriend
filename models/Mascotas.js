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

    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  raza: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
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

    maxlength: 15,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  estatura: {
    type: String,
  },
  estelerizado: {
    type: Boolean,
  },
  peligroso: {
    type: Boolean,
  },
  alergias: {
    type: Array,
    default: [],
  },
  personalidad: {
    type: Array,
    default: [],
  },

  fecha_nacimiento: {
    type: Date,
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
