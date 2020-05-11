const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Token = require("../models/token");
const { ObjectId } = mongoose.Schema.Types;
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
  },
  pais: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
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
    default:
      "https://res.cloudinary.com/animalfriendsocial/image/upload/v1588920197/profile-picture/undraw_happy_music_g6wc_bqxw4e.png",
  },
  activityStatus: {
    type: String,
    default: "offline",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  resetPasswordToken: {
    type: String,
    required: false,
  },

  resetPasswordExpires: {
    type: Date,
    required: false,
  },
  postLikes: [postLikeSchema],
  commentLikes: [commentLikeSchema],
  commentReplyLikes: [commentReplyLikeSchema],
  followers: [{ type: ObjectId, ref: "users" }],
  following: [{ type: ObjectId, ref: "users" }],
});
UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    nombre: this.nombre,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};
UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
UserSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString("hex"),
  };

  return new Token(payload);
};

module.exports = User = mongoose.model("users", UserSchema);
