const Post = require("../models/Post");
var mongoose = require('mongoose');
const Notificacion = require("../models/Notificacion");

const { uploader, sendEmail } = require("../utils/index");

const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);
function arrayRemove(array, value) {
  return array.filter((item) => {
    return item._id.toString() !== value.toString();
  });
}
exports.createPost = async (req, res) => {
  try {
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
      .catch((err) => {});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getsubpost = async (req, res) => {
  try {
    let following = req.user.following;

    // if postedBy in following
    Post.find({ $or: [{ autor: { $in: following } }] })
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
exports.postbyuser = async (req, res) => {
  try {
    Post.find({ autor: req.params.postid })
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
        res.json({ result });
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
        if (post.autor._id.toString() === req.user._id.toString()) {
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

// Actualiza un
exports.actualizarPost = async (req, res) => {
  try {
    // extraer la información del proyecto
    const nuevoPost = {};

    nuevoPost.descripcion = req.body.descripcion;

    // revisar el ID
    let publicacion = await Post.findById(req.params.postId);

    // si el proyecto existe o no
    if (!publicacion) {
      return res.status(404).json({ msg: "Post  no encontrado" });
    }

    // actualizar
    publicacion = await Post.findOneAndUpdate(
      { _id: req.params.postId },

      nuevoPost,
      { new: true }
    );

    res.json({ publicacion });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
exports.deletecomment = async (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.body.postId,

      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, post) => {
        if (err) return res.status(400).send(err);
        return res.send(post);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.updatecomment = async (req, res) => {
  const comment = {
    text: req.body.comentario,
  };

  try {

  } catch (err) {
    return res.status(400).send(err);
  }
};
