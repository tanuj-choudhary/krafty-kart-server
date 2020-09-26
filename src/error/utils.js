const AppError = require('./appError');

// Send Production Error
const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 400;

  res.status(statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

// Send Development Error
const sendErrorProd = (err, res) => {
  // Trusted Error send error message
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  /**
   * Non trusted or unhandled error
   * Do not send or leak error data
   * Log error
   * Send a generic error message
   */

  console.log(err);

  return res.status(500).json({
    status: 'Fail',
    message: 'Something went wrong',
  });
};

// Handle DB Cast Error
const handleDBCastError = (err) => {
  const message = `Invalid ID provided. ${err.value}`;
  return new AppError(message, 401);
};

module.exports = {
  sendErrorDev,
  sendErrorProd,
  handleDBCastError,
};
