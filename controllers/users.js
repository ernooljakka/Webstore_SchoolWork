const User = require('../models/user');
const responseUtils = require('../utils/responseUtils');

/**
 * Send all users as JSON
 *
 * @param {http.ServerResponse} response
 */

//This was done by me
const getAllUsers = async response => {
  // TODO: 10.2 Implement this
  responseUtils.sendJson(response, await User.find({}));
};

/**
 * Delete user and send deleted user as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 */
const deleteUser = async(response, userId, currentUser) => {
  // TODO: 10.2 Implement this
  if(currentUser === currentUser._id) {
    responseUtils.badRequest(response, '400 Bad Request');
  }

  const existingUser = await User.findById(userId).exec();

  if(!existingUser) {
    responseUtils.notFound(response);
  }

  await User.deleteOne({ _id: userId });
  responseUtils.sendJson(response, existingUser);
};

/**
 * Update user and send updated user as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 * @param {Object} userData JSON data from request body
 */

//This was done by me
const updateUser = async(response, userId, currentUser, userData) => {
  // TODO: 10.2 Implement this
  if(currentUser === currentUser._id) {
    responseUtils.badRequest(response, '400 Bad Request');
  }
  
  if (!userData || (userData.role !== 'admin' && userData.role !== 'customer')) {
    responseUtils.badRequest(response, "Invalid user role");
  }

  const existingUser = await User.findById(userId).exec();

  if(!existingUser) {
    responseUtils.notFound(response);
  }
  existingUser.role = userData.role;
  await existingUser.save();
  responseUtils.sendJson(response, existingUser);
};

/**
 * Send user data as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 */
const viewUser = async(response, userId, currentUser) => {
  // TODO: 10.2 Implement this
  if(!currentUser) {
    responseUtils.notFound(response);
  }
  responseUtils.sendJson(response, await User.findById(userId).exec());
};

/**
 * Register new user and send created user back as JSON
 *
 * @param {http.ServerResponse} response
 * @param {Object} userData JSON data from request body
 */

//This was done by me
const registerUser = async(response, userData) => {
  // TODO: 10.2 Implement this
  const newUser = new User(userData);

  if(!newUser.name || !newUser.password || !newUser.email) {
    responseUtils.badRequest(response, '400 Bad Request');
  }

  const existingEmailUser = await User.findOne({ email: userData.email }).exec();
  if(existingEmailUser) {
    responseUtils.badRequest(response, '400 Bad Request');
  }

  await newUser.save();
  
  responseUtils.createdResource(response, newUser);
};

module.exports = { getAllUsers, registerUser, deleteUser, viewUser, updateUser };