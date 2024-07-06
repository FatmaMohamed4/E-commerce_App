
const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
    console.log('development mode **************************************************************************')
  } else  if (process.env.NODE_ENV === 'production'){
    sendErrorForProd(err, res);
  }
};

//Error development
const sendErrorForDev = (err, res) =>
  
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  }
);


//Error production
const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });



export default globalError