export type ErrorProps = {
  errorResponse: {
    errmsg: string;
    errorMessage: string;
    statusCode: number;
  };
};

export type ErrorHandler = {
  statusCode: number;
  message: string;
  name: string;
};
