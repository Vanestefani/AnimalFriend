const express = require("express");
const chatController = require("../controllers/chat");
const chatValidator = require("../middleware/schemaValidators/chatValidator");
const chechChat = require("../middleware/chechChat");
const checkAuth = require('../../middlewares/authenticate');

module.exports = (app) => {
  app.post("/getChatRooms/", chatController.getChatRooms);

  app.post(
    "/getMessagesForRoom",
 checkAuth,
    chatValidator.getMessagesForRoom,
    chatController.getMessagesForRoom
  );

  app.post(
    "/sendImage",
 checkAuth,
    chatController.upload,
    chatValidator.sendImage,
    chechChat,
    chatController.createImageMessage
  );

  app.post(
    "/call",
 checkAuth,
    chatValidator.handleCall,
    chechChat,
    chatController.handleCall
  );

  app.post(
    "/answer",
 checkAuth,
    chatValidator.answer,
    chechChat,
    chatController.answer
  );

  app.post(
    "/sendMessage",
 checkAuth,
    chatValidator.sendMessage,
    chechChat,
    chatController.sendMessage
  );

  app.post(
    "/readMessages",
 checkAuth,
    chatValidator.readMessages,
    chechChat,
    chatController.readMessages
  );

};
