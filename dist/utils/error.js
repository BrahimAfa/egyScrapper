"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.makePretty = void 0;

/**
 * Class representing an API error.
 *
 * @extends Error
 */
class APIError extends Error {
  /**
  * Creates an API error.
  *
  * @param {String} message - Error message.
  * @param {Number} status - HTTP status code of error.
  * @param {Boolean} isPublic - Whether the message should be visible to user or not.
  */
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // Error.captureStackTrace(this, this.constructor.name);
  }

}
/**
 * Class for required error
 *
 * @class RequiredError
 */

/**
  * Make error pretty
  *
  *
  * @param {Array} errors - Array of error Object
  * @returns {Object} - errors - Pretty Object transform
  */


const makePretty = errors => errors.reduce((obj, error) => {
  const nObj = obj;
  const {
    _original
  } = error;
  nObj[_original.name] = {
    message: error.message.replace(/"/g, '')
  };
  return nObj;
}, {});

exports.makePretty = makePretty;
var _default = APIError;
exports.default = _default;