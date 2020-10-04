const Comment = require("../models/Comment");
const Notification = require("../models/Notificacion");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const linkify = require("linkifyjs");
require("linkifyjs/plugins/mention")(linkify);
const fs = require("fs");
const socketHandler = require("../handlers/socketHandler");
/**
 * Retrieves a post's comments with a specified offset
 * @function retrieveComments
 * @param {string} postId The id of the post to retrieve comments from
 * @param {number} offset The amount of comments to skip
 * @returns {array} Array of comments
 */
module.exports.sendCommentNotification = async (
  req,
  sender,
  receiver,
  imagen,
  filter,
  message,
  postId
) => {
  try {
    if (String(sender._id) !== String(receiver)) {
      const notification = new Notification({
        sender: sender._id,
        receiver,
        notificationType: "comment",
        date: Date.now(),
        notificationData: {
          postId,
          fotoPerfil,
          message,
          filter,
        },
      });
      await notification.save();
      socketHandler.sendNotification(req, {
        ...notification.toObject(),
        sender: {
          _id: sender._id,
          nombre: sender.nombre,
          fotoPerfil: sender.fotoPerfil,
        },
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
/**
 * Sends a notification to the user when the user is mentioned
 * @function sendMentionNotification
 * @param {object} req The request object
 * @param {string} message The message sent by the user
 * @param {string} image Image of the post that was commented on
 * @param {object} post The post that was commented on
 * @param {object} user User who commented on the post
 */
module.exports.sendMentionNotification = (req, message, imagen, post, user) => {
  const mentionedUsers = new Set();
  // Looping through every mention and sending a notification when necessary
  linkify.find(message).forEach(async (item) => {
    // Making sure a mention notification is not sent to the sender or the poster
    if (
      item.type === "mention" &&
      item.value !== `@${users.nombre}` &&
      item.value !== `@${post.autor.nombre}` &&
      // Making sure a mentioned user only gets one notification regardless
      // of how many times they are mentioned in one comment
      !mentionedUsers.has(item.value)
    ) {
      mentionedUsers.add(item.value);
      // Finding the receiving user's id
      const receiverDocument = await User.findOne({
        nombre: item.value.split("@")[1],
      });
      if (receiverDocument) {
        const notification = new Notification({
          sender: user._id,
          receiver: receiverDocument._id,
          notificationType: "mention",
          date: Date.now(),
          notificationData: {
            postId: post._id,
            imagen,
            message,
            filter: post.filter,
          },
        });
        await notification.save();
        socketHandler.sendNotification(req, {
          ...notification.toObject(),
          sender: {
            _id: users._id,
            nombre: users.nombre,
            autor: users.autor,
          },
        });
      }
    }
  });
};
