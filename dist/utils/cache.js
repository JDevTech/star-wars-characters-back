"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheResponse = (res, seconds) => {
    res.set("Cache-Control", `public, max-age=${seconds}`);
};
exports.default = cacheResponse;
