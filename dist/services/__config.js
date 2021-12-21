"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const axios_1 = __importDefault(require("axios"));
const ServicesInstance = axios_1.default.create({
    baseURL: config_1.default.api_base_url,
});
exports.default = ServicesInstance;
