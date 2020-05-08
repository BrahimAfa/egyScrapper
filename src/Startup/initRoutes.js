import service from '../routes';
import seed from '../routes/seed';
// Request log and its associated Response log would have the same id
import logErrorService from '../middlewares/errors';

export const initRoutes = (app) => {
    app.use('/api/v1/seed/', seed);
    app.use('/api/v1/', service);
    app.use(logErrorService);
};
export default initRoutes;
