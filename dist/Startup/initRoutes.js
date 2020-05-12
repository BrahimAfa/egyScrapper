"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initRoutes = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _errors = _interopRequireDefault(require("../middlewares/errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initRoutes = app => {
  app.use('/', _routes.default);
  app.use(_errors.default);
};

exports.initRoutes = initRoutes;
var _default = initRoutes;
exports.default = _default;