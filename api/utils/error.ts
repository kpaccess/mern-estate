export const errorHandler = (statusCode: number, message: string) => {
  const error = {
    errorResponse: {
      message: "",
      statusCode: 400,
    },
  };
  error.errorResponse.message = message;
  error.errorResponse.statusCode = statusCode;
  return error;
};
