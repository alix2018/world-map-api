import AppError from '../error';

/**
 * Error handler that sorts the error code and messages
 */
export default function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.log('Error:', err.toString());
  switch (err.details.code) {
    case 'credentials_do_not_match':
    case 'email_does_not_exist':
    case 'invalid_password':
      res.status(403);
      break;
    default:
      res.status(500);
      break;
  }

  if (err instanceof AppError) {
    return res.send(err.details);
  }

  return res.send({
    code: 'generic_error',
    message: 'Something went wrong'
  });
}