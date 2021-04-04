/**
 * App Error class
 */
export default class AppError extends Error {
  constructor({code, message}) {
    super();
    this.details = {
      code,
      message
    };
  }
}

/**
 * Overwrite toString method from Error class
 */
AppError.prototype.toString = function () {
  return JSON.stringify(this.details);
};