const getUser = require('../auth/auth');
const responseUtils = require('../utils/responseUtils');

/**
 * Send all products as JSON
 *
 * @param {http.ServerResponse} response
 */
const getAllProducts = async response => {
  // TODO: 10.2 Implement this
  responseUtils.sendJson(response, require('../products.json').map(product => ({...product})));
};

module.exports = { getAllProducts };