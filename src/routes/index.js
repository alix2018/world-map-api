import express from 'express';
import userRoutes from './userRoutes';

const routes = express.Router();

routes.use('/users', userRoutes);

export default routes;