import axios from "axios";
import Config from "react-native-config";

const axiosAPI = axios.create({
  baseURL: Config.API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosAPI