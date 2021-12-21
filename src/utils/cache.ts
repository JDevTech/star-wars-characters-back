import { Response } from "express";

const cacheResponse = (res: Response, seconds: number): void => {
  res.set("Cache-Control", `public, max-age=${seconds}`);
};

export default cacheResponse;
