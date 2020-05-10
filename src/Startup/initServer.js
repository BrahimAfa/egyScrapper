// this is the one that allows me to remove trycatch  from routes
import express from 'express';
import addRequestId from 'express-request-id';
import morganMiddleware from '../config/morgan';

export const initServer = (app) => {
    app.use(morganMiddleware);
    app.use(addRequestId());
    app.use(express.json());
};
export default initServer;
