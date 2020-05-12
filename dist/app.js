"use strict";

require("express-async-errors");

var _express = _interopRequireDefault(require("express"));

var _Server = _interopRequireDefault(require("./config/Server"));

var _initServer = _interopRequireDefault(require("./Startup/initServer"));

var _initRoutes = _interopRequireDefault(require("./Startup/initRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _initServer.default)(app);
(0, _initRoutes.default)(app);
(0, _Server.default)(app);