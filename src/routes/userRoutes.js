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
    .catch(() => {
      res.status(403);
      res.send(({
        code: 'login_failed',
        message: 'Login failed'
      }));
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
    .catch(() => {
      res.status(403);
      res.send({
        code: 'registration_failed',
        message: 'registration failed'
      });
    });
});

export default userRoutes;