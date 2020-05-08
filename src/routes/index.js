import express from 'express';
import routeManager from './manager';

const service = express.Router();

service.get('/:module/:action', routeManager);
service.post('/:module/:action', routeManager);
service.put('/:module/:action', routeManager);
service.delete('/:module/:action', routeManager);

export default service;
