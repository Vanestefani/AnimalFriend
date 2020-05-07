const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.getNewUsers = (req, res, next) => {
  const schema = Joi.object({
    initialFetch: Joi.boolean().required(),
    lastId: Joi.when("initialFetch", {
      is: false,
      then: Joi.objectId().required(),
      otherwise: Joi.forbidden(),
    }),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.changeActivityStatus = (req, res, next) => {
  const schema = Joi.object({
    activityStatus: Joi.string().valid("online", "offline").required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.getUserData = (req, res, next) => {
  const schema = Joi.object({
    initialFetch: Joi.boolean().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.getPosts = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    lastId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.getUserProfileData = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.getUserProfileFollowers = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.getUserProfileFollowings = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.searchByUsername = (req, res, next) => {
  const schema = Joi.object({
    q: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.followUser = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
