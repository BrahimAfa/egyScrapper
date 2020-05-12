"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _helper = require("../utils/helper");

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logDirectory = './logs';
(0, _helper.makeDir)('.', 'logs');

const accessLogStream = _fs.default.createWriteStream(_path.default.join('.', `${logDirectory}/morgan-logs.log`), {
  flags: 'a'
});

const logFormate = _constants.IsPROD ? _constants.ProdLogFormate : 'dev';

_morgan.default.token('id', req => req.id); // log in logs/errors.logs and only log 4xx and 5xx errors


const morganProd = (0, _morgan.default)(logFormate, {
  stream: accessLogStream,

  skip(req, res) {
    return res.statusCode < 400;
  }

});
const morganMiddleware = _constants.IsPROD ? morganProd : (0, _morgan.default)(logFormate);
var _default = morganMiddleware;
exports.default = _default;