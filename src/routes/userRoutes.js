import express from 'express';
import {userService} from '../services';

const userRoutes = express.Router();

/**
 * [POST] /login
 * Return a token
 */
userRoutes.post('/login', (req, res, next) => {
  userService.login(req.body)
    .then(token => {
      res.status(200);
      res.send(token);
    })
    .catch(next);
});

/**
 * [POST] /registration
 * Return a token
 */
userRoutes.post('/registration', (req, res, next) => {
  userService.registration(req.body)
    .then(token => {
      res.status(200);
      res.send(token);
    })
    .catch(next);
});

export default userRoutes;