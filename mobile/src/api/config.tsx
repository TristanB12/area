import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://192.168.1.14:8080/",
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosAPI