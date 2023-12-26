import axios from "axios";

const baseClient = axios.create({
    baseURL: "http://localhost:5216",
    headers: {
        "Content-Type": "application/json"
    }
});

export default baseClient;