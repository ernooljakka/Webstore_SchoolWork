const requestUtils = require('../utils/requestUtils');
const User = require("../models/user");
const { basicAuthChallenge } = require('../utils/responseUtils');

/**
 * Get current user based on the request headers
 *
 * @param {http.IncomingMessage} request
 * @returns {Object|null} current authenticated user or null if not yet authenticated
 */

//This was done by me, checks if the current user credentials match and then returns the user
const getCurrentUser = async request => {
  // TODO: 8.5 Implement getting current user based on the "Authorization" request header

  // NOTE: You can import two methods which can be useful here: // - getCredentials(request) function from utils/requestUtils.js
  // - getUser(email, password) function from utils/users.js to get the currently logged in user
  const credentials = requestUtils.getCredentials(request);
  
  if (!credentials) {
    return null;
  }
  const emailUser = await User.findOne({ email: credentials[0] }).exec();
  if (!emailUser) {
    return null;
  }
  if (await emailUser.checkPassword(credentials[1])) {
    return emailUser;
  } else {
    return null;
  }
};

module.exports = { getCurrentUser };