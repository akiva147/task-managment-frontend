import axios, { AxiosHeaders } from "axios";
import { validateEnvs } from "../utils/env.utils";

const { VITE_SERVER_URL } = validateEnvs();

export const axiosInstance = axios.create({
  baseURL: VITE_SERVER_URL,
});
