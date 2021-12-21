"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, "../../.env") });
exports.config = {
    port: process.env.PORT || 3000,
    api_domain: process.env.API_DOMAIN || "",
    dev: process.env.NODE_ENV !== "production",
    api_base_url: process.env.API_BASE_URL || "",
    server: process.env.SERVER || "http://localhost",
};
exports.default = exports.config;
