import route from '../routes';
import logErrorService from '../middlewares/errors';

export const initRoutes = (app) => {
    app.use('/', route);
    app.use(logErrorService);
};
export default initRoutes;
