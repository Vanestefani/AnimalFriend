const mongoose = require("mongoose");
const fs = require("fs");
const User = mongoose.model("users");
const Post = require("../models/Post");
const Notificacion = require("../models/Notificacion");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const {
  uploader,
  sendEmail,
  checkFileTypem,
  storage,
  upload,
} = require("../utils/index");

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
  const users = await User.find({});
  res.status(200).json({ users });
};

// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
  try {
    const { email } = req.body;

    // Make sure this account doesn't already exist
    const user = await User.findOne({ email });

    if (user)
      return res.status(401).json({
        message:
          "La direccion de correo electronico ingresado ya está asociado con otra cuenta. ",
      });

    const password = "_" + Math.random().toString(36).substr(2, 9); //generate a random password
    const newUser = new User({ ...req.body, password });

    const user_ = await newUser.save();

    //Generate and set password reset token
    user_.generatePasswordReset();

    // Save the updated user object
    await user_.save();

    //Get mail options
    let domain = "http://" + req.headers.host;
    let subject = "Nueva cuenta creada";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link =
      "http://" +
      req.headers.host +
      "/api/auth/reset/" +
      user.resetPasswordToken;
    let html = `<p>Hola ${user.nombre}<p><br><p>Se ha creado una nueva cuenta para usted en ${domain}. Por favor haga clic en el siguiente <a href="${link}">link</a>
        para configurar su contraseña e iniciar sesión.</p>
                  <br><p>
                  Si no solicitó esto, ignore este correo electrónico.</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message: "Se ha enviado un correo electrónico a " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return res.status(401).json({ message: "El usuario no existe" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    //if there is no image, return success message
    if (!req.file)
      return res
        .status(200)
        .json({ user, message: "El usuario ha sido actualizado" });

    //Attempt to upload to cloudinary
    const result = await uploader(req);
    const user_ = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { $set: { fotoPerfil: result.url } },
      { new: true }
    );

    if (!req.file)
      return res
        .status(200)
        .json({ user: user_, message: "El usuario ha sido actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
  try {
    const id = req.params.id;
    const user_id = req.user._id;

    //Make sure the passed id is that of the logged in user

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "El usuario ha sido eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function deleteProfilePicture({ photo }) {
  fs.unlink("./public/images/profile-picture/" + photo, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("removed");
  });

  fs.unlink("./public/images/profile-picture/100x100/" + photo, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("removed");
  });
}
exports.changeProfilePicture = (req, res) => {
  User.findById(req.userData.userId)
    .select("fotoPerfil")
    .then((data) => {
      if (data.fotoPerfil !== "person.png") {
        deleteProfilePicture({ photo: data.fotoPerfil });
      }

      User.findOneAndUpdate(
        { _id: req.userData.userId },
        { fotoPerfil: req.body.photo },
        { new: true }
      )
        .select("fotoPerfil")
        .then((user) => {
          return res.status(200).json({ user });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err.message });
    });
};

exports.getUserData = (req, res, next) => {
  const notification = Notificacion.find({
    receiver: mongoose.Types.ObjectId(req.userData.userId),
    read: false,
  }).countDocuments();

  const allNotification = Notificacion.find({
    receiver: mongoose.Types.ObjectId(req.userData.userId),
  }).countDocuments();

  const posts = Post.find({
    autor: mongoose.Types.ObjectId(req.userData.userId),
  }).countDocuments();

  const messages = Message.find({
    receiver: mongoose.Types.ObjectId(req.userData.userId),
    read: false,
  }).countDocuments();

  const user = User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.userData.userId) } },
    {
      $lookup: {
        from: "followings",
        localField: "_id",
        foreignField: "user",
        as: "followings",
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "user",
        as: "followers",
      },
    },
    {
      $project: {
        nombre: 1,
        pais: 1,
        ciudad: 1,
        email: 1,
        bio: 1,
        genero: 1,
        notifications: 1,
        fotoPerfil: 1,
        followings: {
          $size: { $arrayElemAt: ["$followings.following", 0] },
        },
        followers: {
          $size: { $arrayElemAt: ["$followers.followers", 0] },
        },
        followingIds: { $arrayElemAt: ["$followings.following.user", 0] },
        postLikes: "$postLikes.post",
        commentLikes: "$commentLikes.comment",
        commentReplyLikes: "$commentReplyLikes.comment",
      },
    },
  ]);

  Promise.all([user, notification, posts, messages, allNotification])
    .then((values) => {
      const user = values[0];
      if (user.length < 1) {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }

      const data = {
        _id: user[0]._id,
        nombre: user[0].nombre,
        pais: user[0].pais,
        bio: user[0].bio,
        genero: user[0].genero,
        fotoPerfil: user[0].fotoPerfil,
        ciudad: user[0].ciudad,
        email: user[0].email,
        postLikes: user[0].postLikes,
        commentLikes: user[0].commentLikes,
        commentReplyLikes: user[0].commentReplyLikes,
        followings: user[0].followings,
        followers: user[0].followers,
        followingIds: user[0].followingIds || [],
        follwingUsers: [],
        followerUsers: [],
        notificationsCount: values[1],
        postsCount: values[2],
        messagesCount: values[3],
        allNotifications: values[4],
      };
      req.body.user = data;

      next();
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};
exports.sendUserData = (req, res) => {
  res.status(200).json({ user: req.body.user });
};

exports.followUser = (req, res) => {
  ChatRoom.find({ members: { $all: [req.userData.userId, req.body.userId] } })
    .then((room) => {
      if (!room.length) {
        new ChatRoom({
          members: [req.body.userId, req.userData.userId],
        })
          .save()
          .then((room) => {
            room
              .populate("members", "nombre fotoPerfil activityStatus")
              .execPopulate()
              .then((room) => {
                messageHandler.sendRoom(req, {
                  userId: req.body.userId,
                  room: room.toObject(),
                });
              });
          });
      }
    })
    .catch((err) => console.log(err.message));

  // if user follows itself
  if (req.userData.userId !== req.body.userId) {
    Following.updateOne(
      {
        user: req.userData.userId,
        "following.user": { $ne: req.body.userId },
      },
      {
        $addToSet: { following: { user: req.body.userId } },
      }
    ).then((document) => {
      if (document.nModified === 1) {
        const notification = new Notification({
          sender: req.userData.userId,
          message: "followed you",
          receiver: req.body.userId,
          type: "follow",
        }).save();

        const followers = Followers.updateOne(
          {
            user: req.body.userId,
          },
          {
            $push: { followers: { user: req.userData.userId } },
          }
        );

        const user = User.findById(req.userData.userId).select(
          "nombre fotoPerfil"
        );

        Promise.all([user, notification, followers])
          .then((values) => {
            notificationHandler.sendFollowNotification(req, values);
            return res.status(200).json({
              userId: req.body.userId,
              action: "followed",
            });
          })
          .catch((err) => console.log(err));
      } else {
        const following = Following.updateOne(
          { user: req.userData.userId },
          {
            $pull: { following: { user: req.body.userId } },
          }
        );

        const followers = Followers.updateOne(
          {
            user: req.body.userId,
          },
          {
            $pull: { followers: { user: req.userData.userId } },
          }
        );

        Promise.all([following, followers])
          .then(() => {
            return res.status(200).json({
              userId: req.body.userId,
              action: "unfollowed",
            });
          })
          .catch((err) => console.log(err));
      }
    });
  } else {
    res.status(403).json({ message: "Failed to follow" });
  }
};

exports.getNewUsers = (req, res) => {
  if (req.body.initialFetch) {
    const usersCount = User.find({}).countDocuments();
    const users = User.find()
      .select("nombre fecha_creacion fotoPerfil")
      .sort({ date: -1 })
      .limit(30);

    Promise.all([usersCount, users])
      .then((response) => {
        const [usersCount, users] = response;
        res.status(200).json({ usersCount, users });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  } else {
    User.find({ _id: { $lt: req.body.lastId } })
      .select("nombre fecha_creacion fotoPerfil")
      .sort({ date: -1 })
      .limit(30)
      .then((users) => {
        return res.status(200).json({ users });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
};

exports.getUserProfileData = (req, res, next) => {
  if (req.userData.email === req.body.email) {
    return res.status(200).json({ user: { loggedInUser: true } });
  }

  User.aggregate([
    { $match: { email: req.body.email } },
    {
      $lookup: {
        from: "followings",
        localField: "_id",
        foreignField: "user",
        as: "followings",
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "user",
        as: "followers",
      },
    },
    {
      $project: {
        nombre: 1,
        pais: 1,
        ciudad: 1,
        genero: 1,
        email: 1,
        bio: 1,
        fotoPerfil: 1,
        followings: {
          $size: { $arrayElemAt: ["$followings.following", 0] },
        },
        followers: {
          $size: { $arrayElemAt: ["$followers.followers", 0] },
        },
      },
    },
  ])
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      Post.find({
        autor: mongoose.Types.ObjectId(user[0]._id),
      })
        .countDocuments()
        .then((postsCount) => {
          let data = {
            _id: user[0]._id,
            nombre: user[0].nombre,
            pais: user[0].pais,
            fotoPerfil: user[0].fotoPerfil,
            ciudad: user[0].ciudad,
            genero: user[0].genero,

            email: user[0].email,
            bio: user[0].bio,
            followings: user[0].followings,
            followers: user[0].followers,
            follwingUsers: [],
            followerUsers: [],
            postsCount,
          };
          req.body.user = data;
          next();
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.getPosts = (req, res) => {
  Post.aggregate([
    {
      $match: {
        $and: [
          {
            _id: {
              $lt: mongoose.Types.ObjectId(req.body.lastId),
            },
            autor: mongoose.Types.ObjectId(req.body.userId),
          },
        ],
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 10 },
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

    {
      $project: {
        imagen: 1,
        fecha_creacion: 1,
        tags: 1,
        passing_scores: 1,
        hashtags: 1,
        localizacion: 1,
        likes: {
          $size: { $arrayElemAt: ["$likes.users_likes", 0] },
        },
        comments: {
          $size: "$comments",
        },
        description: 1,
        "autor._id": 1,
        "autor.nombre": 1,
        "autor.fotoPerfil": 1,
      },
    },
  ])
    .then((posts) => {
      return res.status(200).json({ posts });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getUserPosts = (req, res, next) => {
  Post.aggregate([
    {
      $match: { autor: mongoose.Types.ObjectId(req.body.user._id) },
    },
    { $sort: { fecha_creacion: -1 } },
    { $limit: 10 },
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
          $size: { $ifNull: ["$comments", []] },
        },
        description: 1,
        "autor._id": 1,
        "autor.nombre": 1,
      },
    },
  ])
    .then((posts) => {
      req.body.user.posts = posts;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
};
exports.searchUsersByNombre = (req, res) => {
  if (req.body.q) {
    User.findById({
      _id: req.body.q,
    })
      .limit(10)
      .select("nombre fotoPerfil pais ciudad genero bio   ")
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
};

exports.getFollowings = (req, res, next) => {
  User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.userData.userId) } },

    {
      $lookup: {
        from: "followings",
        localField: "_id",
        foreignField: "user",
        as: "followings",
      },
    },

    {
      $project: {
        followings: { $arrayElemAt: ["$followings.following.user", 0] },
      },
    },
  ])
    .then((user) => {
      req.body.followings = user[0].followings;
      next();
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getUserProfileFollowers = (req, res) => {
  Followers.find({ user: mongoose.Types.ObjectId(req.body.userId) })
    .populate("followers.user", "nombre fotoPerfil ")
    .select("followers.user")
    .then((users) => {
      return res.status(200).json({ users });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
exports.getUserProfileFollowings = (req, res) => {
  Following.find({ user: mongoose.Types.ObjectId(req.body.userId) })

    .populate("following.user", "nombre fotoPerfil ")
    .select("following.user.email")
    .then((users) => {
      return res.status(200).json({ users });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
exports.changeStatus = (userId, clients, io) => {
  if (!clients.length) {
    Followers.find({ user: mongoose.Types.ObjectId(userId) })
      .select("followers.user")
      .then((user) => {
        user[0].followers.forEach((user) => {
          const toUserId = user.user;
          io.sockets.in(toUserId).emit("activityStatusUpdate", {
            activityStatus: "offline",
            user: userId,
          });
        });
      })
      .catch((err) => console.log(err.message));

    Following.find({ user: mongoose.Types.ObjectId(userId) })
      .select("following.user")
      .then((user) => {
        user[0].following.forEach((user) => {
          const toUserId = user.user;
          io.sockets.in(toUserId).emit("activityStatusUpdate", {
            activityStatus: "offline",
            user: userId,
          });
        });
      })
      .catch((err) => console.log(err.message));

    User.findByIdAndUpdate(
      { _id: userId },
      { activityStatus: "offline" },
      { new: true }
    )
      .then(() => {})
      .catch((err) => console.log(err.message));
  } else {
    Followers.find({ user: mongoose.Types.ObjectId(userId) })
      .select("followers.user")
      .then((user) => {
        user[0].followers.forEach((user) => {
          const toUserId = user.user;
          io.sockets.in(toUserId).emit("activityStatusUpdate", {
            activityStatus: "online",
            user: userId,
          });
        });
      })
      .catch((err) => console.log(err.message));

    Following.find({ user: mongoose.Types.ObjectId(userId) })
      .select("following.user")
      .then((user) => {
        user[0].following.forEach((user) => {
          const toUserId = user.user;
          io.sockets.in(toUserId).emit("activityStatusUpdate", {
            activityStatus: "online",
            user: userId,
          });
        });
      })
      .catch((err) => console.log(err.message));

    User.findByIdAndUpdate(
      { _id: userId },
      { activityStatus: "online" },
      { new: true }
    )
      .then(() => {})
      .catch((err) => console.log(err.message));
  }
};
exports.addFollowing = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { following: req.body.userId },
      },
      {
        new: true,
      }
    ) .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    }),
      User.findByIdAndUpdate(
        req.body.userId,
        {
          $push: { followers: req.user.id },
        },
        {
          new: true,
        }
      ).then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        console.log(err);
      })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.unFollow = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { following: req.body.userId },
      },
      {
        new: true,
      }
    ) .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    }),
      User.findByIdAndUpdate(
        req.body.userId,
        {
          $pull: { followers: req.user.id },
        },
        {
          new: true,
        }
      ).then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        console.log(err);
      })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
