import { faTemperatureEmpty } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://oswrs-api-app.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});
export const axiosServer = axios.create({
  baseURL: "https://oswrs-api-app.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});
axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default axiosClient;
