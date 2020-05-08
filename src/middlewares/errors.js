/**
 * Error handler for api routes
 */
import { prettyConsole } from '../utils/logger';
import { IsPROD } from '../utils/constants';
import APIError, { makePretty } from '../utils/error';

export default function logErrorService(err, req, res, next) {
    if (!err) {
        return new APIError(
            'Error with the server!',
            500,
            true,
        );
    }

    if (!IsPROD) {
        prettyConsole(err);
    }
    const error = {
        message: err.message || 'Internal Server Error.',
    };

    if (err.errors) {
        error.errors = {};
        const { errors } = err;
        if (Array.isArray(errors)) {
            error.errors = makePretty(errors);
        } else {
            Object.keys(errors).forEach((key) => {
                error.errors[key] = errors[key].message;
            });
        }
    }
    if (!IsPROD) {
        return res.status(err.status || 500).json({ error, finishedat: (Date.now() - err.start) });
    }
    res.status(err.status || 500).json(error);

    return next();
}
