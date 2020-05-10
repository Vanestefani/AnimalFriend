const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const EventosSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  autor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users",
  },

  tags: {
    type: Array,
    default: [],
  },
  fecha_inicio: {
    type: Date,

  },
  fecha_finalizacion: {
    type: Date,

  },  descripcion: {
    type: String,
    trim: true,
    default: "",
  },
  imagen: {
    type: String,
    required: "Please select image",
  },
  privado: {
    type: Boolean,
    default: false,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  localizacion: {
    type: {
      type: String,
    },
    cooredenadas: { type: [], default: undefined },
    direccion: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Eventos", EventosSchema);
