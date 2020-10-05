const router = require("express").Router();
const chatroomController = require("../../controllers/chatroomController");
const validate = require("../../middlewares/validate");

const checkAuth = require("../../middlewares/authenticate");

router.post("/", checkAuth, validate, chatroomController.createChatroom);

module.exports = router;