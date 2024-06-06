export type ErrorProps = {
  message: string;
  statusCode: number;
};

export type ErrorHandler = {
  statusCode: number;
  message: string;
  name: string;
};

export interface AuthenticateRequest extends Request {
  user?: {
    id?: string;
  };
}
