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
const notificationHandler = require("../handlers/NotificacionHandler");
const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

const postLookup = [
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
      from: "postlikes",
      localField: "_id",
      foreignField: "post",
      as: "likes",
    },
  },
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "post",
      as: "comments",
    },
  },
];

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
}

function arrayRemove(array, value) {
  return array.filter((item) => {
    return item._id.toString() !== value.toString();
  });
}

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: (req, file, cb) => {
    cb(null, "./public/images/post-images/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, uuidv4() + "." + ext);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 10485760, //10 MB
  },
}).single("imagen");

exports.upload = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });

    if (!req.file)
      return res.status(400).json({ message: "Please upload a file" });

    req.body.imagen = req.file.filename;
    Jimp.read(req.file.path, function (err, test) {
      if (err) throw err;
      test
        .scaleToFit(480, Jimp.AUTO, Jimp.RESIZE_BEZIER)
        .quality(50)
        .write("./public/images/post-images/thumbnail/" + req.body.imagen);
      next();
    });
  });
};

exports.getPosts = (req, res) => {
  let query;

  if (req.body.initialFetch) {
    query = [
      {
        $facet: {
          posts: [
            {
              $match: {
                autor: { $in: req.body.followings },
              },
            },
            { $sort: { fecha_creacion: -1 } },
            { $limit: 5 },
            ...postLookup,

            {
              $project: {
                imagen: 1,
                fecha_creacion: 1,
                tags: 1,
                hashtags: 1,
                locacion: 1,
                likes: {
                  $size: { $arrayElemAt: ["$likes.users_likes", 0] },
                },
                comments: {
                  $size: "$comments",
                },
                descripcion: 1,
                "autor._id": 1,
                "autor.nombre": 1,
                "autor.fotoPerfil": 1,
              },
            },
          ],
          total: [
            // Filter out documents without a price e.g., _id: 7
            {
              $match: {
                autor: { $in: req.body.followings },
              },
            },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],
        },
      },
    ];
  } else {
    query = [
      {
        $match: {
          $and: [
            {
              _id: {
                $lt: mongoose.Types.ObjectId(req.body.lastId),
              },
              autor: { $in: req.body.followings },
            },
          ],
        },
      },
      { $sort: { fecha_creacion: -1 } },
      { $limit: 5 },
      ...postLookup,

      {
        $project: {
          imagen: 1,
          fecha_creacion: 1,
          tags: 1,
          hashtags: 1,
          localizacion: 1,
          likes: {
            $size: { $arrayElemAt: ["$likes.users_likes", 0] },
          },
          comments: {
            $size: "$comments",
          },
          descripcion: 1,
          "autor._id": 1,
          "autor.nombre": 1,
          "autor.fotoPerfil": 1,
        },
      },
    ];
  }

  Post.aggregate(query)
    .then((data) => {
      if (req.body.initialFetch && !data[0].total.length) {
        data[0].total.push({ _id: null, count: 0 }); //if user has no posts
      }

      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    });
};

exports.getPostsByHashtag = (req, res) => {
  let query;

  if (req.body.initialFetch) {
    query = [
      {
        $facet: {
          posts: [
            {
              $match: {
                hashtags: req.body.hashtag,
              },
            },
            { $sort: { fecha_creacion: -1 } },
            { $limit: 10 },
            ...postLookup,

            {
              $project: {
                imagen: 1,
                fecha_creacion: 1,
                tags: 1,
                hashtags: 1,
                localizacion: 1,
                likes: {
                  $size: { $arrayElemAt: ["$likes.users_likes", 0] },
                },
                comments: {
                  $size: "$comments",
                },
                descripcion: 1,
                "autor._id": 1,
                "autor.nombre": 1,
                "autor.fotoPerfil": 1,
              },
            },
          ],
          total: [
            // Filter out documents without a price e.g., _id: 7
            {
              $match: {
                hashtags: req.body.hashtag,
              },
            },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],
        },
      },
    ];
  } else {
    query = [
      {
        $match: {
          $and: [
            {
              _id: {
                $lt: mongoose.Types.ObjectId(req.body.lastId),
              },
              hashtags: req.body.hashtag,
            },
          ],
        },
      },
      { $sort: { fecha_creacion: -1 } },
      { $limit: 10 },
      ...postLookup,

      {
        $project: {
          imagen: 1,
          fecha_creacion: 1,
          tags: 1,
          hashtags: 1,
          localizacion: 1,
          likes: {
            $size: { $arrayElemAt: ["$likes.users_likes", 0] },
          },
          comments: {
            $size: "$comments",
          },
          descripcion: 1,
          "autor._id": 1,
          "autor.nombre": 1,
          "autor.fotoPerfil": 1,
        },
      },
    ];
  }

  Post.aggregate(query)
    .then((data) => {
      const { posts } = data[0];
      if (!posts.length) {
        return res.status(404).json({ message: "Hashtag not found" });
      }
      res.status(200).json({ data });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getPostsBylocalizacion = (req, res) => {
  const [lat, lng] = req.body.coordinates.split(",");

  let query;

  if (req.body.initialFetch) {
    query = [
      {
        $facet: {
          posts: [
            {
              $match: {
                "localizacion.coordinates": [parseFloat(lat), parseFloat(lng)],
              },
            },
            { $sort: { fecha_creacion: -1 } },
            { $limit: 10 },
            ...postLookup,

            {
              $project: {
                imagen: 1,
                fecha_creacion: 1,
                tags: 1,
                hashtags: 1,
                localizacion: 1,
                likes: {
                  $size: { $arrayElemAt: ["$likes.users_likes", 0] },
                },
                comments: {
                  $size: "$comments",
                },
                descripcion: 1,
                "autor._id": 1,
                "autor.nombre": 1,
                "autor.fotoPerfil": 1,
              },
            },
          ],
          total: [
            {
              $match: {
                "localizacion.coordinates": [parseFloat(lat), parseFloat(lng)],
              },
            },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],
        },
      },
    ];
  } else {
    query = [
      {
        $match: {
          $and: [
            {
              _id: {
                $lt: mongoose.Types.ObjectId(req.body.lastId),
              },
              "localizacion.coordinates": [parseFloat(lat), parseFloat(lng)],
            },
          ],
        },
      },
      { $sort: { fecha_creacion: -1 } },
      { $limit: 10 },
      ...postLookup,

      {
        $project: {
          imagen: 1,
          fecha_creacion: 1,
          tags: 1,
          hashtags: 1,
          localizacion: 1,
          likes: {
            $size: { $arrayElemAt: ["$likes.users_likes", 0] },
          },
          comments: {
            $size: "$comments",
          },
          descripcion: 1,
          "autor._id": 1,
          "autor.nombre": 1,
          "autor.fotoPerfil": 1,
        },
      },
    ];
  }

  Post.aggregate(query)
    .then((data) => {
      const { posts } = data[0];

      if (!posts.length) {
        return res.status(404).json({ message: "localizacion not found" });
      }
      res.status(200).json({ data });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getPost = (req, res) => {
  Post.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.body.postId) } },
    ...postLookup,

    {
      $project: {
        imagen: 1,
        fecha_creacion: 1,
        tags: 1,
        localizacion: 1,
        likes: {
          $size: { $arrayElemAt: ["$likes.users_likes", 0] },
        },
        comments: {
          $size: "$comments",
        },
        descripcion: 1,
        "autor._id": 1,
        "autor.nombre": 1,
        "autor.fotoPerfil": 1,
      },
    },
  ])
    .then((post) => {
      if (!post.length) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ post });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.createPost = (req, res) => {
  const hashtags = linkify // find hashtags
    .find(req.body.descripcion)
    .filter((link) => {
      if (link.type === "hashtag") {
        return link.value.substring(1);
      }
    })
    .map((hashtag) => hashtag.value.substring(1));

  const mentions = linkify // find mentions
    .find(req.body.descripcion)
    .filter((link) => {
      if (link.type === "mention") {
        return link.value.substring(1);
      }
    })
    .map((hashtag) => hashtag.value.substring(1));

  const tags = JSON.parse(req.body.tags).map((tag) => tag.value);

  const uniquenombres = [...new Set([...mentions, ...tags])];

  let newPost;
  if (req.body.coordinates) {
    const coordinates = req.body.coordinates
      .split(",")
      .map((x) => parseFloat(x));
    newPost = new Post({
      autor: req.userData.userId,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
      hashtags: [...new Set(hashtags)], // remove duplicates
      localizacion: {
        type: "Point",
        coordinates: coordinates,
        address: req.body.localizacionName,
      },
      tags: JSON.parse(req.body.tags),
    });
  } else {
    newPost = new Post({
      autor: req.userData.userId,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
      hashtags: [...new Set(hashtags)], // remove duplicates

      tags: JSON.parse(req.body.tags),
    });
  }

  newPost
    .save()
    .then((post) => {
      User.find({ nombre: { $in: uniquenombres } })
        .select("_id")
        .then((userIds) => {
          const removedUserid = arrayRemove(userIds, req.userData.userId);

          if (removedUserid.length) {
            new Notification({
              sender: req.userData.userId,
              receiver: removedUserid,
              type: "post_tagged",
              post: post._id,
            })
              .save()
              .then((notification) => {
                notification
                  .populate("post", "imagen")
                  .execPopulate()
                  .then((notification) => {
                    User.findById(req.userData.userId)
                      .select("fotoPerfil nombre")
                      .then((user) => {
                        notificationHandler.sendCommentTaggedNotification({
                          req,
                          removedUserid,
                          user,
                          notification: notification.toObject(),
                        });
                      });
                  });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ message: err.message });
              });
          }
        });

      new PostLike({ post: post._id }).save().then(() => {
        const data = {
          ...post.toObject(),
          autor: [{ nombre: req.userData.nombre, fotoPerfil: "person.png" }],
          likes: 0,
          comments: 0,
        };
        res.status(200).json({ post: data });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.messages });
    });
};

function deletePostimagen({ imagen }) {
  fs.unlink("./public/images/post-images/" + imagen, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("removed");
  });

  fs.unlink("./public/images/post-images/thumbnail/" + imagen, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("removed");
  });
}

exports.deletePost = (req, res) => {
  Post.findOneAndDelete({ _id: req.body.postId, autor: req.userData.userId })
    .then((post) => {
      if (!post) return res.status(401).json({ message: "Failed to delete" });

      deletePostimagen(post);

      Comment.deleteMany({
        post: mongoose.Types.ObjectId(post._id),
      }).then((docs) => console.log(docs));
      PostLike.findOneAndDelete({
        post: mongoose.Types.ObjectId(post._id),
      }).then(() => console.log("deleted post likes"));
      Notification.deleteMany({
        post: mongoose.Types.ObjectId(post._id),
      }).then(() => console.log("deleted notifications"));

      res.status(200).json({ message: "Deleted", id: post._id });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.likePost = (req, res) => {
  PostLike.updateOne(
    {
      post: req.body.postId,
      "users_likes.autor": { $ne: req.userData.userId },
    },
    {
      $addToSet: { users_likes: { autor: req.userData.userId } },
    }
  ).then((document) => {
    if (document.nModified === 1) {
      let notification;
      if (req.userData.userId !== req.body.autorId) {
        notification = new Notification({
          sender: req.userData.userId,
          receiver: req.body.autorId,
          type: "like_post",
          post: req.body.postId,
        })
          .save()
          .then((notification) => {
            return notification.populate("post", "imagen").execPopulate();
          })
          .then((notification) => {
            return notification.toObject();
          });
      }

      const user = User.findByIdAndUpdate(
        req.userData.userId,
        { $push: { postLikes: { post: req.body.postId } } },
        { new: true, upsert: true }
      ).select("fotoPerfil nombre");

      Promise.all([user, notification])
        .then((values) => {
          notificationHandler.sendLikePostNotification(req, values);
          return res
            .status(200)
            .json({ postId: req.body.postId, action: "liked" });
        })
        .catch((err) => console.log(err));
    } else {
      const postLike = PostLike.updateOne(
        { post: req.body.postId },
        {
          $pull: { users_likes: { autor: req.userData.userId } },
        },
        { new: true, upsert: true }
      );

      const user = User.findByIdAndUpdate(
        req.userData.userId,
        { $pull: { postLikes: { post: req.body.postId } } },
        { new: true, upsert: true }
      );

      Promise.all([postLike, user])
        .then((values) => {
          return res
            .status(200)
            .json({ postId: req.body.postId, action: "disliked" });
        })
        .catch((err) => console.log(err));
    }
  });
};

exports.getPostLikes = (req, res) => {
  PostLike.find({ post: req.body.postId })
    .populate("users_likes.autor", "nombre fotoPerfil")
    .then((users) => {
      res.status(200).json({ users });
    });
};
