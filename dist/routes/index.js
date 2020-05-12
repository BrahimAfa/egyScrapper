"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _url = _interopRequireDefault(require("url"));

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = _express.default.Router(); // get trendig movies


route.get('/movies', async (req, res) => {
  const {
    page
  } = req.query;
  const {
    data
  } = await _axios.default.get(`${_constants.HOST}/trending?page=${page}`);
  const result = getObjectFromHtml((0, _cheerio.default)('div #movies', data).children('*'));
  res.status(200).json(result);
}); // get the url to watch

route.get('/watch/:name', async (req, res) => {
  const pathName = req.params.name.includes('ep') ? 'episode' : 'movie';
  const {
    data
  } = await _axios.default.get(`${_constants.HOST}/${pathName}/${req.params.name}`);
  console.log((0, _cheerio.default)('div iframe', data).attr('src'));
  const href = (0, _cheerio.default)('div iframe', data).attr('src');
  const watch = _constants.HOST + href;
  res.status(200).json({
    watch
  });
}); // get seasons

route.get('/series/:name', async (req, res) => {
  const {
    data
  } = await _axios.default.get(`${_constants.HOST}/series/${req.params.name}`);
  const result = getObjectFromHtml((0, _cheerio.default)('div .mbox .movies_small', data).first().children('*'));
  res.status(200).json(result);
}); // get episodes

route.get('/season/:name', async (req, res) => {
  const {
    data
  } = await _axios.default.get(`${_constants.HOST}/season/${req.params.name}`);
  const result = getObjectFromHtml((0, _cheerio.default)('div .mbox .movies_small', data).first().children('*'));
  res.status(200).json(result);
});
route.get('/search', async (req, res) => {
  const {
    q
  } = req.query;
  const {
    data
  } = await _axios.default.get(`${_constants.HOST}/autoComplete.php`, {
    params: {
      q
    }
  });
  res.status(200).json(data);
});

function getObjectFromHtml(data) {
  return data.map((i, el) => {
    var _url$parse$pathname, _$$attr, _$$children$text, _$$children$attr, _$$children$text2;

    const u = (_url$parse$pathname = _url.default.parse((_$$attr = (0, _cheerio.default)(el).attr('href')) === null || _$$attr === void 0 ? void 0 : _$$attr.trim()).pathname) === null || _url$parse$pathname === void 0 ? void 0 : _url$parse$pathname.split('/')[2];
    return {
      u,
      rating: (_$$children$text = (0, _cheerio.default)(el).children('.r').text()) === null || _$$children$text === void 0 ? void 0 : _$$children$text.trim(),
      img: (_$$children$attr = (0, _cheerio.default)(el).children('img').attr('src')) === null || _$$children$attr === void 0 ? void 0 : _$$children$attr.trim(),
      title: (0, _cheerio.default)(el).children('.title').text().trim(),
      ribon: (_$$children$text2 = (0, _cheerio.default)(el).children('.ribbon').text()) === null || _$$children$text2 === void 0 ? void 0 : _$$children$text2.trim()
    };
  }).get();
}

var _default = route;
exports.default = _default;