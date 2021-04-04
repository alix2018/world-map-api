import db from '../db/models';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import AppError from '../error';

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
            throw new AppError({
              code: 'credentials_do_not_match',
              message: 'The email or the password is incorrect'
            });
          });
      }

      throw new AppError({
        code: 'email_does_not_exist',
        message: 'The email address is not found'
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

  if (passwordRegex.test(password)) {
    return bcrypt.hash(password, 10)
      .then(passwordHashed => {
        return db.User.create({
          email,
          password: passwordHashed
        })
          .then(() => {
            const token = generateToken(email);
            return {token};
          });
      });
  }

  throw new AppError({
    code: 'invalid_password',
    message: 'The password does not match the minimum requirements'
  });
};