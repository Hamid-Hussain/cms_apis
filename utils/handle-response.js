const handleResponse = ({ res, data, status }) => {
  res.status(status || 200).json({
    success: true,
    data,
  });
};

const handleError = ({ res, err, statusCode = 500 }) => {
  let error = "Server Error";

  if (err.message) ({ message: error } = err);
  else if (err.error) ({ error } = err);

  res.status(err.statusCode || statusCode).json({
    success: false,
    error,
  });
};

export { handleResponse, handleError };
