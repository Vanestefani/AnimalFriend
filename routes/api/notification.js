const express = require("express");
const notificationController = require("../../controllers/notification");
const checkAuth =  require('../../middlewares/authenticate');
const notificationValidator = require("../../middlewares/schemaValidators/notificationValidator");
const auth = require("./auth");
const user = require("./user");
module.exports = (app) => {
  app.post(
    "/readNotifications/",
    checkAuth,
    notificationValidator.readNotifications,
    notificationController.readNotifications
  );

  app.post(
    "/getNotifications/",
    checkAuth,
    notificationValidator.getNotifications,
    notificationController.getNotifications
  );
};
