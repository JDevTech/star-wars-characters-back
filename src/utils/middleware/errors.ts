import boom from "@hapi/boom";
import config from "../../config";
import { NextFunction, Request, Response } from "express";

const withErrorStack = (error: any, stack: any) => {
  if (config.dev) {
    return { ...error, stack };
  }
  return { error };
};

const logErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  next(err);
};

const wrapErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let is404Error = err.response.status === 404;

  if (!err.isBoom && !is404Error) {
    next(boom.badImplementation(err));
  } else {
    next(boom.notFound(err));
  }

  next(err);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
};

export { logErrors, wrapErrors, errorHandler };
