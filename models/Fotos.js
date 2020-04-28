const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const FotosSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    trim: true,
    default: "",
  },
  imagen: {
    type: String,
    required: "Please select image",
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You must supply an author",
  },
  mascota: {
    type: mongoose.Schema.ObjectId,
    ref: "Mascota",
    required: "You must supply an author",
  },
  hashtags: {
    type: Array,
    default: [],
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
  tags: {
    type: Array,
    default: [],
  },
});

postSchema.index({ localizacion: "2dsphere" });

module.exports = mongoose.model("Fotos", postSchema);
