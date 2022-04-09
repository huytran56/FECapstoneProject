import { faTemperatureEmpty } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://oswrs-api-app.herokuapp.com/api/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default axiosClient;
