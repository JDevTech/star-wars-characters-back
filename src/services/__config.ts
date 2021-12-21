import config from "../config";
import axios, { AxiosInstance } from "axios";

const ServicesInstance: AxiosInstance = axios.create({
  baseURL: config.api_base_url,
});

export default ServicesInstance;
