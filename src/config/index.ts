import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env") });

export const config = {
  port: process.env.PORT || 3000,
  api_domain: process.env.API_DOMAIN || "",
  dev: process.env.NODE_ENV !== "production",
  api_base_url: process.env.API_BASE_URL || "",
  server: process.env.SERVER || "http://localhost",
};

export default config;
