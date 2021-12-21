"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.wrapErrors = exports.logErrors = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = __importDefault(require("../../config"));
const withErrorStack = (error, stack) => {
    if (config_1.default.dev) {
        return Object.assign(Object.assign({}, error), { stack });
    }
    return { error };
};
const logErrors = (err, req, res, next) => {
    console.log(err);
    next(err);
};
exports.logErrors = logErrors;
const wrapErrors = (err, req, res, next) => {
    let is404Error = err.response.status === 404;
    if (!err.isBoom && !is404Error) {
        next(boom_1.default.badImplementation(err));
    }
    else {
        next(boom_1.default.notFound(err));
    }
    next(err);
};
exports.wrapErrors = wrapErrors;
const errorHandler = (err, req, res, next) => {
    const { output: { statusCode, payload }, } = err;
    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
};
exports.errorHandler = errorHandler;
