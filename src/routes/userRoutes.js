import express from 'express';
import {userService} from '../services';

const userRoutes = express.Router();

/**
 * [POST] /login
 * Return a token
 */
userRoutes.post('/login', (req, res) => {
  userService.login(req.body)
    .then(token => {
      res.status(200);
      res.send(token);
    })
    .catch(error => {
      res.status(403);
      res.send({
        code: error.code,
        message: error.message
      })
    });
});

/**
 * [POST] /registration
 * Return a token
 */
userRoutes.post('/registration', (req, res) => {
  userService.registration(req.body)
    .then(token => {
      res.status(200);
      res.send(token);
    })
    .catch(error => {
      res.status(403);
      res.send({
        code: error.code,
        message: error.message
      })
    });
});

export default userRoutes;