// @ts-check
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import path from 'path';
import APIError from '../utils/error';
// import { to } from '../utils/helper';

const modules = ['service', 'app', 'theme'];
const methods = ['search', 'create', 'update', 'remove', 'getone', 'createmany', 'removemany', 'updatemany'];

export default async function (req, res, next) {
    const { module, action } = req.params;
    // removing lettere of module services=>service

    const subModul = module.substr(0, module.length - 1);
    if (modules.indexOf(subModul) === -1) return next(new APIError(`Invalid module. ${subModul}`, 401, true));
    if (methods.indexOf(action) === -1) return next(new APIError(`Invalid action. ${action}`, 401, true));
    const controller = require(path.resolve(__dirname, '../controller', subModul));
    // if (error) return res.send({ error });
    // cheks if the action exist in the controller
    if (!Object.prototype.hasOwnProperty.call(controller, action)) return res.status(401).send('Action not found.');
    return controller[action](req, res, next);
}
