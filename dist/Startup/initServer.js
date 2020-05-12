"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initServer = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressRequestId = _interopRequireDefault(require("express-request-id"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("../config/morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this is the one that allows me to remove trycatch  from routes
const initServer = app => {
  app.use(_morgan.default);
  app.use((0, _expressRequestId.default)());
  app.use(_express.default.json());
  app.use((0, _cors.default)());
};

exports.initServer = initServer;
var _default = initServer;
exports.default = _default;