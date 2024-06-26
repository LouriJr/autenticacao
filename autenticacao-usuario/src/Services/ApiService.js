import axios from "axios";

const baseUrl  = "https://localhost:7037/api"
const ApiService = {

    async get(endpoint) {
        const response = await axios.get(baseUrl + endpoint);
        return response;
    },

    async post(endpoint, body) {
        const response = await axios.post(baseUrl + endpoint, body);
        return response;
    }
};

export default ApiService;