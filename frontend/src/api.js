import axios from "axios";

const API = axios.create({
  baseURL: "https://deliveryservice-gfi9.onrender.com/",
});

export default API;