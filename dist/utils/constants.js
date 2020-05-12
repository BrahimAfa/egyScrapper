"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProdLogFormate = exports.IsPROD = exports.HOST = exports.PORT = void 0;
const PORT = process.env.PORT || 3030;
exports.PORT = PORT;
const HOST = 'https://gose.egybest.xyz';
exports.HOST = HOST;
const IsPROD = process.env.NODE_ENV === 'production';
exports.IsPROD = IsPROD;
const ProdLogFormate = ':id :remote-addr - :remote-user [:date [web]] " :method :url HTTP/:http-version"  :status  :res[content-length]';
exports.ProdLogFormate = ProdLogFormate;