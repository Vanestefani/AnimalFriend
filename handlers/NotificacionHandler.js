function idToString(id) {
  return id.toString();
}

exports.sendLikeCommenNotificacion = (req, values) => {
  const io = req.app.get("socketio");

  if (req.userData.userId !== req.body.authorId) {
    const { fotoPerfil, nombre } = values[0];
    const { _id, leido, comment, post, tipo, fecha_creacion } = values[1];
    io.sockets.in(req.body.authorId).emit("newNotificacion", {
      Notificacion: {
        _id,
        leido,
        comment: [{ ...comment }],
        post: [{ ...post }],
        tipo,
        sender: [
          {
            fotoPerfil,
            nombre,
          },
        ],
        fecha_creacion,
      },
    });
  }
};

exports.sendLikeCommenReplyNotificacion = (req, values) => {
  const io = req.app.get("socketio");

  if (req.userData.userId !== req.body.authorId) {
    const { fotoPerfil, nombre } = values[0];
    const { _id, leido, reply, post, tipo, fecha_creacion } = values[1];
    io.sockets.in(req.body.authorId).emit("newNotificacion", {
      Notificacion: {
        _id,
        leido,
        tipo,
        sender: [
          {
            fotoPerfil,
            nombre,
          },
        ],
        reply: [{ ...reply }],
        post: [{ ...post }],
        fecha_creacion,
      },
    });
  }
};

exports.sendLikePostNotificacion = (req, values) => {
  const io = req.app.get("socketio");

  if (req.userData.userId !== req.body.authorId) {
    const { fotoPerfil, nombre } = values[0];
    const { _id, leido, post, tipo, fecha_creacion } = values[1];
    io.sockets.in(req.body.authorId).emit("newNotificacion", {
      Notificacion: {
        _id,
        leido,

        post: [{ ...post }],
        tipo,
        sender: [
          {
            fotoPerfil,
            nombre,
          },
        ],
        fecha_creacion,
      },
    });
  }
};

exports.sendFollowNotificacion = (req, values) => {
  const io = req.app.get("socketio");

  if (req.userData.userId !== req.body.userId) {
    const { fotoPerfil, nombre } = values[0];
    const { _id, leido, tipo, fecha_creacion } = values[1];
    io.sockets.in(req.body.userId).emit("newNotificacion", {
      Notificacion: {
        _id,
        leido,
        tipo,
        sender: [
          {
            fotoPerfil,
            nombre,
          },
        ],
        fecha_creacion,
      },
    });
  }
};

exports.sendAddCommentReplyNotificacion = (req, values) => {
  const io = req.app.get("socketio");

  if (req.userData.userId !== req.body.authorId) {
    const { fotoPerfil, nombre } = values[0];
    const {
      _id,
      leido,
      tipo,
      comment,
      reply,
      post,
      fecha_creacion,
    } = values[1];
    io.sockets.in(req.body.authorId).emit("newNotificacion", {
      Notificacion: {
        _id,
        leido,
        sender: [
          {
            fotoPerfil,
            nombre,
          },
        ],
        post: [{ ...post }],
        comment: [{ ...comment }],
        reply: [{ ...reply }],
        tipo,
        fecha_creacion,
      },
    });
  }
};

exports.sendAddCommentNotificacion = (req, values) => {
  const io = req.app.get("socketio");

  if (req.userData.userId !== req.body.authorId) {
    const { fotoPerfil, nombre } = values[0];
    const {
      _id,
      leido,

      post,
      tipo,
      comment,
      reply,
      fecha_creacion,
    } = values[1];

    io.sockets.in(req.body.authorId).emit("newNotificacion", {
      Notificacion: {
        _id,
        leido,
        sender: [
          {
            fotoPerfil,
            nombre,
          },
        ],

        post: [{ ...post }],
        comment: [{ ...comment }],
        reply: [{ ...reply }],
        tipo,
        fecha_creacion,
      },
    });
  }
};

exports.sendCommentTaggedNotificacion = (params) => {
  const { req, removedUserid, user, Notificacion } = params;
  const io = req.app.get("socketio");
  const { _id, leido, tipo, fecha_creacion, post } = Notificacion;
  const { fotoPerfil, nombre } = user;

  removedUserid.forEach((user) => {
    if (idToString(user._id) !== idToString(req.userData.userId)) {
      io.sockets.in(user._id).emit("newNotificacion", {
        Notificacion: {
          _id,
          leido,
          sender: [
            {
              fotoPerfil,
              nombre,
            },
          ],

          post: [{ ...post }],
          tipo,
          fecha_creacion,
        },
      });
    }
  });
};

exports.sendCommentMentionNotificacion = (params) => {
  const { req, removedUserid, user, Notificacion } = params;
  const io = req.app.get("socketio");

  const { _id, leido, tipo, fecha_creacion, post } = Notificacion;
  const { fotoPerfil, nombre } = user;

  removedUserid.forEach((user) => {
    if (idToString(user._id) !== idToString(req.userData.userId)) {
      io.sockets.in(user._id).emit("newNotificacion", {
        Notificacion: {
          _id,
          leido,
          sender: [
            {
              fotoPerfil,
              nombre,
            },
          ],

          post: [{ ...post }],
          tipo,
          fecha_creacion,
        },
      });
    }
  });
};

exports.sendNewUser = (params) => {
  const { req, user } = params;
  const io = req.app.get("socketio");

  const { fotoPerfil, nombre, _id } = user;
  io.sockets.emit("newUser", {
    nombre,
    fotoPerfil,
    _id,
  });
};
