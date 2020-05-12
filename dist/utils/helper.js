"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.to = exports.makeDir = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
const makeDir = (currentPlace, dirName) => {
  _fs.default.mkdir(_path.default.join(currentPlace, dirName), err => {
    if (err) {
      if (err.code === 'EEXIST') return; // if any err else thant dir Exist

      console.log(err);
      return;
    }

    console.log('Folder Created Successfully');
  });
};

exports.makeDir = makeDir;

const to = async promise => {
  try {
    const result = await promise;
    return {
      result
    };
  } catch (error) {
    return {
      error
    };
  }
};

exports.to = to;