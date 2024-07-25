import AppError from "./AppError.js";

export const respondWithError = (next, message, statusCode = 400) => {
  return next(new AppError(message, statusCode));
};

export const respondWithSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};
