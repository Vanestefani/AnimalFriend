const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    trim: true,
    default: "",
  },
  imagen: {
    type: String,
    required: "Se requiere imagen",
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: "Se requiere autorr",
  },
  filter: String,
  thumbnail: String,
  caption: String,
  hashtags: [
    {
      type: String,
      lowercase: true,
    },
  ],
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
  likes: [{ type: ObjectId, ref: "users" }],
  comments: [
    {
      commenterId: String,
      text: String,
      fecha_creacion: {
        type: Date,
        default: Date.now,
      },
      autor: { type: ObjectId, ref: "users" },
    },
  ],
});

postSchema.index({ localizacion: "2dsphere" });

module.exports = mongoose.model("Post", postSchema);
