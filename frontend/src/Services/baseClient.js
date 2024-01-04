import axios from "axios";

const baseClient = axios.create({
  baseURL: "http://localhost:7259",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseClient;
