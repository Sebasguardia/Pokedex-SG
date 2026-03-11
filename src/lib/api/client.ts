import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor for basic error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // We could handle global connection errors here
        console.error("API Error:", error.message);
        return Promise.reject(error);
    }
);
