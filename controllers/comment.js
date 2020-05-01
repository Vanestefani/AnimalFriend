const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const CommentLike = require("../models/CommentLike");
const CommentReply = require("../models/CommentReply");
const Notificacion = require("../models/Notificacion");
const CommentReplyLike = require("../models/CommentReplyLike");
const User = mongoose.model("users");

const NotificacionHandler = require("../handlers/NotificacionHandler");
const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

function arrayRemove(array, value) {
  return array.filter((item) => {
    return item._id.toString() !== value.toString();
  });
}

exports.addComment = (req, res) => {
  //NotificacionHandler.sendCommentmentionNotificacion(req, values);

  const mentions = linkify // find mentions
    .find(req.body.value)
    .filter((link) => {
      if (link.type === "mention") {
        return link.value.substring(1);
      }
    })
    .map((hashtag) => hashtag.value.substring(1));

  const uniquenombres = [...new Set([...mentions])];

  Post.findById({ _id: req.body.postId })
    .then((post) => {
      if (!post) {
        return res
          .status(400)
          .json({ message: "No hay publicación con esa identificación" });
      }
      new Comment({
        post: post._id,
        autor: req.userData.userId,
        text: req.body.value,
      })
        .save()
        .then((comment) => {
          comment.populate("autor", (err) => {
            if (err) {
              return res.status(400).json({ message: err.message });
            }
            let Notificacion;

            if (req.userData.userId !== req.body.autorId) {
              Notificacion = new Notificacion({
                sender: req.userData.userId,
                receiver: req.body.autorId,
                post: req.body.postId,
                comment: comment._id,
                tipo: "post_comment",
              })
                .save()
                .then((Notificacion) => {
                  return Notificacion.populate("comment", "text")
                    .populate("post", "imagen")
                    .execPopulate();
                })
                .then((Notificacion) => {
                  return Notificacion.toObject();
                });
            }
            const commentLike = new CommentLike({
              comment: comment._id,
            }).save();
            const user = User.findById(req.userData.userId).select(
              "fotoPerfil "
            );

            User.find({ email: { $in: uniqueemail } })
              .select("_id")
              .then((userIds) => {
                const removedUserid = arrayRemove(userIds, req.userData.userId);

                new Notificacion({
                  sender: req.userData.userId,
                  receiver: removedUserid,
                  tipo: "comment_tagged",
                  post: req.body.postId,
                })
                  .save()
                  .then((Notificacion) => {
                    Notificacion.populate("post", "imagen")
                      .execPopulate()
                      .then((Notificacion) => {
                        User.findById(req.userData.userId)
                          .select("fotoPerfil email")
                          .then((user) => {
                            NotificacionHandler.sendCommentmentionNotificacion({
                              req,
                              removedUserid,
                              user,
                              Notificacion: Notificacion.toObject(),
                            });
                          });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(400).json({ message: err.message });
                  });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err.message });
              });

            Promise.all([user, Notificacion, commentLike])
              .then((values) => {
                NotificacionHandler.sendAddCommentNotificacion(req, values);
                const data = {
                  _id: comment._id,
                  autor: [
                    {
                      _id: comment.autor._id,
                      nombre: comment.autor.nombre,
                      email: comment.autor.email,
                      fotoPerfil: comment.autor.fotoPerfil,
                    },
                  ],
                  text: comment.text,
                  fecha_creacion: comment.fecha_creacion,
                  post: comment.post,
                  likes: 0,
                  replies: 0,
                };
                res.status(200).json({ comment: data });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err.message });
              });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
};

exports.getCommentsForPost = (req, res) => {
  let query;

  if (req.body.initialFetch) {
    query = {
      $match: {
        post: mongoose.Types.ObjectId(req.body.postId),
      },
    };
  } else {
    query = {
      $match: {
        $and: [
          {
            _id: {
              $lt: mongoose.Types.ObjectId(req.body.lastId),
            },
            post: mongoose.Types.ObjectId(req.body.postId),
          },
        ],
      },
    };
  }
  Comment.aggregate([
    query,
    { $sort: { fecha_creacion: -1 } },
    { $limit: 15 },
    {
      $lookup: {
        from: "users",
        localField: "autor",
        foreignField: "_id",
        as: "autor",
      },
    },
    {
      $lookup: {
        from: "commentlikes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "replies",
        localField: "_id",
        foreignField: "fecha_creacion",
        as: "replies",
      },
    },
    {
      $lookup: {
        from: "replies",
        as: "match_docs",
        let: { indicator_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$fecha_creacion", "$$indicator_id"] },
            },
          },
          { $sort: { fecha_creacion: 1 } }, // add sort if needed (for example, if you want first 100 comments by creation date)
          { $limit: 1 },
        ],
      },
    },
    {
      $project: {
        image: 1,
        fecha_creacion: 1,
        match_docs: 1,
        text: 1,
        likes: {
          $size: { $arrayElemAt: ["$likes.users_likes", 0] },
        },
        replies: {
          $size: "$replies",
        },
        "autor._id": 1,
        "autor.nombre": 1,
        "autor.email": 1,
        "autor.fotoPerfil": 1,
      },
    },
  ])
    .then((comments) => {
      res.status(200).json({ comments, postId: req.body.postId });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
};

exports.addCommentReply = (req, res) => {
  Comment.findById({ _id: req.body.commentId })
    .then((comment) => {
      if (!comment) {
        return res.status(400).json({ message: "Sin comments con ese id" });
      }
      new CommentReply({
        commentAt: comment._id,
        autor: req.userData.userId,
        text: req.body.text,
      })
        .save()
        .then((comment) => {
          comment.populate("autor", (err) => {
            if (err) {
              return res.status(400).json({ message: err.message });
            }

            let Notificacion;

            if (req.userData.userId !== req.body.autorId) {
              Notificacion = new Notificacion({
                sender: req.userData.userId,
                receiver: req.body.autorId,
                comment: req.body.commentId,
                post: req.body.postId,
                reply: comment._id,
                tipo: "comment_reply",
              })
                .save()
                .then((Notificacion) => {
                  return Notificacion.populate("comment", "text")
                    .populate("reply", "text")
                    .populate("post", "imagen")
                    .execPopulate();
                })
                .then((Notificacion) => {
                  return Notificacion.toObject();
                });
            }
            const commentReplyLike = new CommentReplyLike({
              comment: comment._id,
            }).save();

            const user = User.findById(req.userData.userId).select(
              "fotoPerfil nombre"
            );

            Promise.all([user, Notificacion, commentReplyLike])
              .then((values) => {
                NotificacionHandler.sendAddCommentReplyNotificacion(
                  req,
                  values
                );
                const data = {
                  _id: comment._id,
                  autor: [
                    {
                      _id: comment.autor._id,
                      nombre: comment.autor.nombre,

                      email: comment.autor.email,
                      fotoPerfil: comment.autor.fotoPerfil,
                    },
                  ],
                  text: comment.text,
                  fecha_creacion: comment.fecha_creacion,
                  commentAt: comment.commentAt,
                  likes: 0,
                };
                res.status(200).json({ comment: data });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err.message });
              });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
};

exports.getRepliesForComment = (req, res) => {
  let query;

  if (req.body.initialFetch) {
    query = {
      $match: {
        fecha_creacion: mongoose.Types.ObjectId(req.body.commentId),
      },
    };
  } else {
    query = {
      $match: {
        $and: [
          {
            _id: {
              $lt: mongoose.Types.ObjectId(req.body.lastId),
            },
            fecha_creacion: mongoose.Types.ObjectId(req.body.commentId),
          },
        ],
      },
    };
  }

  CommentReply.aggregate([
    query,
    { $sort: { fecha_creacion: -1 } },
    { $limit: 1 },
    {
      $project: {
        text: 1,
        fecha_creacion: 1,
        autor: 1,
        commentAt: 1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "autor",
        foreignField: "_id",
        as: "autor",
      },
    },
    {
      $lookup: {
        from: "commentreplylikes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $project: {
        text: 1,
        fecha_creacion: 1,
        commentAt: 1,
        likes: {
          $size: { $arrayElemAt: ["$likes.users_likes", 0] },
        },
        "autor._id": 1,
        "autor.nombre": 1,
        "autor.email": 1,

        "autor.fotoPerfil": 1,
      },
    },
  ])
    .then((comments) => {
      res.status(200).json({ comments, commentId: req.body.commentId });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
};

exports.likeComment = (req, res) => {
  CommentLike.updateOne(
    {
      comment: req.body.commentId,
      "users_likes.autor": { $ne: req.userData.userId },
    },
    {
      $addToSet: { users_likes: { autor: req.userData.userId } },
    }
  ).then((document) => {
    if (document.nModified === 1) {
      let Notificacion;
      if (req.userData.userId !== req.body.autorId) {
        Notificacion = new Notificacion({
          sender: req.userData.userId,
          receiver: req.body.autorId,
          comment: req.body.commentId,
          post: req.body.postId,
          tipo: "like_comment",
        })
          .save()
          .then((Notificacion) => {
            return Notificacion.populate("post", "imagen ")
              .populate("comment", "text ")
              .execPopulate();
          })
          .then((Notificacion) => {
            return Notificacion.toObject();
          });
      }

      const user = User.findByIdAndUpdate(
        req.userData.userId,
        { $push: { commentLikes: { comment: req.body.commentId } } },
        { new: true, upsert: true }
      );
      Promise.all([user, Notificacion])
        .then((values) => {
          NotificacionHandler.sendLikeCommenNotificacion(req, values);

          return res.status(200).json({
            commentId: req.body.commentId,
            postId: req.body.postId,
            action: "liked",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: err.message });
        });
    } else {
      const commentLike = CommentLike.updateOne(
        { comment: req.body.commentId },
        {
          $pull: { users_likes: { autor: req.userData.userId } },
        },
        { new: true, upsert: true }
      );

      const user = User.findByIdAndUpdate(
        req.userData.userId,
        { $pull: { commentLikes: { comment: req.body.commentId } } },
        { new: true, upsert: true }
      );

      Promise.all([commentLike, user])
        .then((values) => {
          return res.status(200).json({
            commentId: req.body.commentId,
            postId: req.body.postId,
            action: "disliked",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: err.message });
        });
    }
  });
};

exports.likeCommentReply = (req, res) => {
  CommentReplyLike.updateOne(
    {
      comment: req.body.commentId,
      "users_likes.autor": { $ne: req.userData.userId },
    },
    {
      $addToSet: { users_likes: { autor: req.userData.userId } },
    }
  ).then((document) => {
    if (document.nModified === 1) {
      let Notificacion;
      if (req.userData.userId !== req.body.autorId) {
        Notificacion = new Notificacion({
          sender: req.userData.userId,
          receiver: req.body.autorId,
          reply: req.body.commentId,
          post: req.body.postId,
          tipo: "like_commentReply",
        })
          .save()
          .then((Notificacion) => {
            return Notificacion.populate("post", "iamgen")
              .populate("reply", "text")
              .execPopulate();
          })
          .then((Notificacion) => {
            return Notificacion.toObject();
          });
      }

      const user = User.findByIdAndUpdate(
        req.userData.userId,
        { $push: { commentReplyLikes: { comment: req.body.commentId } } },
        { new: true, upsert: true }
      );
      Promise.all([user, Notificacion])
        .then((values) => {
          NotificacionHandler.sendLikeCommenReplyNotificacion(req, values);
          return res.status(200).json({
            commentId: req.body.commentId,
            parentId: req.body.commentAt,
            action: "liked",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: err.message });
        });
    } else {
      const commentReplyLike = CommentReplyLike.updateOne(
        { comment: req.body.commentId },
        {
          $pull: { users_likes: { autor: req.userData.userId } },
        },
        { new: true, upsert: true }
      );

      const user = User.findByIdAndUpdate(
        req.userData.userId,
        { $pull: { commentReplyLikes: { comment: req.body.commentId } } },
        { new: true, upsert: true }
      );

      Promise.all([commentReplyLike, user])
        .then((values) => {
          return res.status(200).json({
            commentId: req.body.commentId,
            parentId: req.body.commentAt,
            action: "disliked",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: err.message });
        });
    }
  });
};

exports.getCommentLikes = (req, res) => {
  CommentLike.find({ comment: req.body.commentId })
    .populate("users_likes.autor", "nombre fotoPerfil")
    .then((users) => {
      res.status(200).json({ users });
    });
};

exports.getCommentReplyLikes = (req, res) => {
  CommentReplyLike.find({ comment: req.body.commentId })
    .populate("users_likes.autor", "nombre fotoPerfil")
    .then((users) => {
      res.status(200).json({ users });
    });
};
