const config = require('../constants');

/**
 *
 * @param statusCode the status code of the server response
 * @return {boolean|boolean} If the server response is valid as Boolean
 */
const isValidRequest = function(statusCode) {
  // return if statusCode of the request is between start and end limit, as defined in config
  return statusCode>=config.statusCodeStart && statusCode<=config.statusCodeEnd;
};
module.exports={
    isValidRequest
};