const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postLikeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Post",
  },
});

const commentLikeSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Comment",
  },
});

const commentReplyLikeSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Reply",
  },
});
// Create Schema
const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 40,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  pais: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  ciudad: {
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
    maxlength: 10,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
    default: "",
    trim: true,
    maxlength: 250,
  },
  fotoPerfil: {
    type: String,
    default: "person.png",
  },
  activityStatus: {
    type: String,
    default: "offline",
  },
  postLikes: [postLikeSchema],
  commentLikes: [commentLikeSchema],
  commentReplyLikes: [commentReplyLikeSchema],
});

module.exports = User = mongoose.model("users", UserSchema);
