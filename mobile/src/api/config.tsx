import axios from "axios";
import Config from "react-native-config";

const axiosAPI = axios.create({
  baseURL: "http://192.168.1.14:8080/",
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosAPI