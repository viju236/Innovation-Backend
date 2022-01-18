const httpStatus = require('http-status');
const { User, Report } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email) && userBody.name == undefined && userBody.accountId == undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (!(userBody.accountId)) {
    const user = await User.create(userBody);
    Report.create({ user: user._id, reportContent: userBody.reportContent, weekDate: userBody.weekDate });
    return user;
  } else {
    const user = await getUserById(userBody.accountId);
    Report.create({ user: user._id, reportContent: userBody.reportContent, weekDate: userBody.weekDate });
    console.log(user);
    return user;
  }
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const getUniqueFilters = async () => {
  const scrumTeam = await User.distinct("scrumTeam");
  const devTeam = await User.distinct("devTeam");
  const manager = await User.distinct("manager");
  
  const result = {
    scrumTeam: scrumTeam,
    devTeam : devTeam,
    manager: manager
  }
  console.log(result);
  return result;
};

const getReports = async (req) => {


  let filters = {};

  if(req.body.scrumTeam) {
    filters.scrumTeam = req.body.scrumTeam;
  }

  if(req.body.devTeam) {
    filters.devTeam = req.body.devTeam;
  }

  if(req.body.manager) {
    filters.manager = req.body.manager;
  }

  if(req.body.location) {
    filters.location = req.body.location;
  }

  if(req.body.weekDate) {
    filters.weekDate = req.body.weekDate;
  }

  if(req.body.teamType) {
    filters.teamType = req.body.teamType;
  }

  var user = await User.find(filters);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  } else {
    user.forEach(async us => {
      let rep = await Report.find({user: us._id});
      Object.assign(us, {reportContent: rep});
    })

    console.log(user);
    //user[0]['reportContent'] = await Report.find({user: req.body.accountId});
    return user;
  }
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUniqueFilters,
  getReports
};
