const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    //email: Joi.string(),
    password: Joi.string().custom(password),
    name: Joi.string().required(),
    manager: Joi.string().required(),
    location: Joi.string().required(),
    devTeam: Joi.string().required(),
    scrumTeam: Joi.string().required(),
    tags: Joi.string().required(),
    additionalTags: Joi.string(),
    reportContent: Joi.string().required(),
    weekDate: Joi.string(),
    accountId: Joi.string(),
    teamType: Joi.string().required()

  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
