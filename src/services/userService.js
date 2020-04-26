import db from '../db/models';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/**
* Return hello string
*/
const login = user => {
  const {email, password} = user;
  return db.User.findOne({
    attributes: ['email', 'password'],
    where: {email}
  })
    .then(userDb => {
      if (userDb) {
        return bcrypt.compare(password, userDb.password)
          .then(passwordsMatched => {
            if (passwordsMatched) {
              const token = jwt.sign({email: userDb.email}, 'aB123456@', {
                expiresIn: '30d',
                subject: userDb.email
              });
              return {token};
            }

            throw new Error('Credentials error');
          });
      }

      throw new Error('Credentials error');
    });
};

export {
  login
};