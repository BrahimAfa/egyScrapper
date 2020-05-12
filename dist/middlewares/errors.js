"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logErrorService;

var _logger = require("../utils/logger");

var _constants = require("../utils/constants");

var _error = _interopRequireWildcard(require("../utils/error"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Error handler for api routes
 */
function logErrorService(err, req, res, next) {
  if (!err) {
    return new _error.default('Error with the server!', 500, true);
  }

  if (!_constants.IsPROD) {
    (0, _logger.prettyConsole)(err);
  }

  const error = {
    message: err.message || 'Internal Server Error.'
  };

  if (err.errors) {
    error.errors = {};
    const {
      errors
    } = err;

    if (Array.isArray(errors)) {
      error.errors = (0, _error.makePretty)(errors);
    } else {
      Object.keys(errors).forEach(key => {
        error.errors[key] = errors[key].message;
      });
    }
  }

  if (!_constants.IsPROD) {
    return res.status(err.status || 500).json({
      error,
      finishedat: Date.now() - err.start
    });
  }

  res.status(err.status || 500).json(error);
  return next();
}