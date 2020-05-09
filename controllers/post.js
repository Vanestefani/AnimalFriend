const fs = require("fs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.model("users");

const Post = require("../models/Post");
const PostLike = require("../models/PostLike");
const Notificacion = require("../models/Notificacion");
const Comment = require("../models/Comment");
const Jimp = require("jimp");
const path = require("path");
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const {uploader, sendEmail} = require('../utils/index');
const notificationHandler = require("../handlers/NotificacionHandler");
const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

exports.createPost = async (req, res) => {
  try {

console.log(req.body,req.file);
    const result = await uploader(req);
    const descripcion=req.body.descripcion;
    const autor=req.body.autor;

    const newPost = new Post({
      descripcion: descripcion,
      autor: autor,
      imagen: result.url,
    })

    const post_ = await newPost.save().then((result) => {
      res.json({ post: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPostLikes = (req, res) => {
  PostLike.find({ post: req.body.postId })
    .populate("users_likes.autor", "nombre fotoPerfil")
    .then((users) => {
      res.status(200).json({ users });
    });
};
