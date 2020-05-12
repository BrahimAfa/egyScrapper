"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SomeOtherLoggerLater = exports.prettyConsole = void 0;

var _prettyError = _interopRequireDefault(require("pretty-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prettyConsole = err => {
  const pe = new _prettyError.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  console.log(pe.render(err));
};

exports.prettyConsole = prettyConsole;
const SomeOtherLoggerLater = {};
exports.SomeOtherLoggerLater = SomeOtherLoggerLater;