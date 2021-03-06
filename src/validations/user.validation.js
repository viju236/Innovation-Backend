const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    //email: Joi.string(),
    password: Joi.string(),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    manager: Joi.string().required(),
    location: Joi.string().required(),
    devTeam: Joi.string().required(),
    scrumTeam: Joi.string().required(),
    tags: Joi.string(),
    additionalTags: Joi.string(),
    teamType: Joi.string().required(),
    additionalTags: Joi.string(),
    reportContent: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
