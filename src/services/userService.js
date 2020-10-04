import db from '../db/models';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/**
* Generates a JWT signed token
*/
const generateToken = email => {
  return jwt.sign({email}, 'aB123456@', {
    expiresIn: '30d',
    subject: email
  });
};

/**
* Check user email address
* and returns the token
*/
export const login = user => {
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
              const token = generateToken(userDb.email);
              return {token};
            }
            throw new Error({
              code: 'credentials_don\'t_match',
              message: 'The cerdentials don\'t match'
            });
          })
          .catch(() => {
            throw new Error({
              code: 'generic_error',
              message: 'generic error'
            });
          });
      }

      throw new Error({
        code: 'email_doesn\'t_exist',
        message: 'The email address doesn\'t exist'
      });
    });
};

/**
* Hash the password
* and add username and password to the User table
*/
export const registration = user => {
  const {email, password} = user;
  const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})');

  // Check if password match minimum requirements
  if (passwordRegex.test(password)) {
    return bcrypt.hash(password, 10)
      .then(passwordHashed => {
        return db.User.create({
          email,
          password: passwordHashed
        })
          .then(() => {
            // Return token if successful
            const token = generateToken(email);
            return {token};
          })
          .catch(error => {
            throw new Error({
              code: 'unprocessable_entity',
              message: error.errors[0].message // Sequelize error
            });
          });
      });
  }

  throw new Error({
    code: 'invalid_password',
    message: 'The password doesn\'t match the minimum requirements'
  });
};