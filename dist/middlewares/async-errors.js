"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncErrors;

// this is used to handele errors and to use one try catch
// tha handles all the route middleware errors
function asyncErrors(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      // pass to  error midllware
      next(ex);
    }
  };
}