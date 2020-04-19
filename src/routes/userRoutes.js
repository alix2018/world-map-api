import express from 'express';
import {userService} from '../services';

const userRoutes = express.Router();

/**
 * [GET] /
 * Return an hello string
 */
userRoutes.get('/', (req, res) => {
  res.send(userService.helloUser());
});

export default userRoutes;