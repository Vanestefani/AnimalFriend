const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const AnunciosSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  autor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users",
  },
  mascota: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Mascota",
  },
  tags: {
    type: Array,
    default: [],
  },
  imagen: {
    type: String,
    required: "Por favor elige una imagen",
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  descripcion: {
    type: String,
    trim: true,
    default: "",
  },
});

module.exports = mongoose.model("Anuncios", AnunciosSchema);
