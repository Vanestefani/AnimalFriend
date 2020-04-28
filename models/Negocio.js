const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const AnunciosSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  autor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },

  tags: {
    type: Array,
    default: [],
  },
  imagen: {
    type: String,
    required: "Please select image",
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
