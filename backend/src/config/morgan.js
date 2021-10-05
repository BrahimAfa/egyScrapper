import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { makeDir } from '../utils/helper';
import { ProdLogFormate, IsPROD } from '../utils/constants';

const logDirectory = './logs';
makeDir('.', 'logs');
const accessLogStream = fs.createWriteStream(path.join('.', `${logDirectory}/morgan-logs.log`), { flags: 'a' });
const logFormate = IsPROD ? ProdLogFormate : 'dev';
morgan.token('id', (req) => req.id);
// log in logs/errors.logs and only log 4xx and 5xx errors
const morganProd = morgan(logFormate, {
    stream: accessLogStream,
    skip(req, res) { return res.statusCode < 400; },
});

const morganMiddleware = IsPROD ? morganProd : morgan(logFormate);
export default morganMiddleware;
