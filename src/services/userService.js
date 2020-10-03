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
}

/**
* Check user email address
* and returns the token
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
              const token = generateToken(userDb.email);
              return {token};
            }

            throw {
              code: 'credentials_don\'t_match',
              message: 'The cerdentials don\'t match'
            };
          })
          .catch(() => {
            throw {
              code: 'generic_error',
              message: 'generic error'
            };
          })
      }

      throw {
        code: 'email_doesn\'t_exist',
        message: 'The email address doesn\'t exist'
      };
    });
};

/**
* Hash the password
* and add username and password to the User table
*/
const registration = user => {
  const {email, password} = user;

  // Check if email already exists
  return db.User.findOne({
    attributes: ['email', 'password'],
    where: {email}
  })
    .then(() => {
      throw {
        code: 'user_already_registered',
        message: 'The user is already registered'
      };
    })

    .catch(() => {
      return bcrypt.hash(password, 10)
        .then(passwordHashed => {
          // Save the new user in the db with hashed password
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
              console.log('error', error);
              throw {
                code: 'unprocessable_entity',
                message: error.message
              };
            })
        })
        // .catch(() => {
        //   console.log("GOING HERE");
        //   throw {
        //     code: 'generic_error',
        //     message: 'generic error'
        //   };
        // })
    })
};

export {
  login,
  registration
};