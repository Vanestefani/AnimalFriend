const auth = require("./auth");
const user = require("./user");
const recordatorio = require("./recordatorios");
const mascota = require("./mascotas");
const post = require("./post");
const anuncios = require("./anuncios");
const negocios = require("./negocios");
const eventos = require("./eventos");
const chat = require("./chat");

const notification = require("./notification");

const authenticate = require("../../middlewares/authenticate");

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/user", authenticate, user);
  app.use("/api/post", authenticate, post);
  app.use("/api/recordatorio", authenticate, recordatorio);
  app.use("/api/mascota", authenticate, mascota);
  app.use("/api/anuncios", authenticate, anuncios);
  app.use("/api/negocios", authenticate, negocios);
  app.use("/api/eventos", authenticate, eventos);
  app.use("/api/chat", authenticate, chat);

  app.use("/api/notificacion", authenticate, notification);

};
