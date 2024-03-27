import axios from "axios";

const baseUrl = "https://localhost:7037/api";
const ApiService = {

    async Get(endpoint) {
        const response = await axios.get(baseUrl + endpoint);
        return response;
    },

    async Post(endpoint, body) {
        const response = await axios.post(baseUrl + endpoint, body);
        return response;
    }
};

export default ApiService;
