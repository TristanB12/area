import axios from "axios";
import Config from "react-native-config";

const axiosAPI = axios.create({
  baseURL: Config.API_URL,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 10_000,
  timeoutErrorMessage: "Server timed out"
});

export default axiosAPI