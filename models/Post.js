const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const {ObjectId} = mongoose.Schema.Types;
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
    ref: "User",
    required: "Se requiere autorr",
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
  likes:[{type:ObjectId,ref:"User"}],
  comments:[{
      text:String,
      postedBy:{type:ObjectId,ref:"User"}
  }],
});

postSchema.index({ localizacion: "2dsphere" });

module.exports = mongoose.model("Post", postSchema);
