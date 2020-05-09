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
const { uploader, sendEmail } = require("../utils/index");
const notificationHandler = require("../handlers/NotificacionHandler");
const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

exports.createPost = async (req, res) => {
  try {
    console.log(req.body, req.file);
    const result = await uploader(req);
    const descripcion = req.body.descripcion;
    const autor = req.body.autor;

    const newPost = new Post({
      descripcion: descripcion,
      autor: autor,
      imagen: result.url,
    });

    const post_ = await newPost.save().then((result) => {
      res.json({ post: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.allpost = async (req, res) => {
  try {
    Post.find()
      .populate("autor", "_id nombre fotoPerfil")
      .populate("comments.autor", "_id nombre fotoPerfil")
      .sort("-fecha_creacion")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getsubpost = async (req, res) => {
  try {
    // if postedBy in following
    Post.find({ autor: { $in: req.user.following } })
      .populate("autor", "_id nombre fotoPerfil")
      .populate("comments.autor", "_id nombre fotoPerfil")
      .sort("-fecha_creacion")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.mypost = async (req, res) => {
  try {
    Post.find({ autor: req.user._id })
      .populate("fecha_creacion", "_id nombre")
      .then((mypost) => {
        res.json({ mypost });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.like = async (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.unlike = async (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.comment = async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      autor: req.user._id,
    };
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.autor", "_id nombre fotoPerfil ")
      .populate("postedBy", "_id nombre fotoPerfil")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.deletepost = async (req, res) => {
  try {
    Post.findOne({ _id: req.params.postId })
      .populate("autor", "_id")
      .exec((err, post) => {
        if (err || !post) {
          return res.status(422).json({ error: err });
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          post
            .remove()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
