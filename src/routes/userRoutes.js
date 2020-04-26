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
      res.send('Credentials don\'t match');
    });
});

export default userRoutes;