const socket_io = require("socket.io");
const rateLimit = require("express-rate-limit");

const io = socket_io();

io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", (socket) => {
    // Connection now authenticated to receive further events
    socket.join(socket.userData.userId);
    io.in(socket.userData.userId).clients((err, clients) => {
      userController.changeStatus(socket.userData.userId, clients, io);
      //console.log(clients);
    });
    socket.on("typing", (data) => {
      socket.to(data.userId).emit("typing", { roomId: data.roomId });
    });
    socket.on("stoppedTyping", (data) => {
      socket.to(data.userId).emit("stoppedTyping", { roomId: data.roomId });
    });
    socket.on("disconnect", () => {
      socket.leave(socket.userData.userId);
      io.in(socket.userData.userId).clients((err, clients) => {
        userController.changeStatus(socket.userData.userId, clients, io);
        //console.log(clients);
      });
    });
  });
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per windowMs
  });