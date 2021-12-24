import { Router } from 'express';
import apiRoutes from './resize';

const routes = Router();

routes.use('/', apiRoutes);

export default routes;
