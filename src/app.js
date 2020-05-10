import 'express-async-errors';
import express from 'express';
import Startup from './config/Server';
import initServer from './Startup/initServer';
import initRoutes from './Startup/initRoutes';

const app = express();

initServer(app);

initRoutes(app);

Startup(app);
