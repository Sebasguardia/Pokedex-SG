import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ─── In-flight request deduplication ──────────────────────────────────────────
// If two components request the same URL at the same time, we return the
// same promise instead of firing two HTTP requests.
const inflight: Map<string, Promise<any>> = new Map();

const originalGet = apiClient.get.bind(apiClient);
apiClient.get = (url: string, config?: any) => {
    const key = url + (config?.params ? JSON.stringify(config.params) : "");
    if (inflight.has(key)) {
        return inflight.get(key)!;
    }
    const promise = originalGet(url, config).finally(() => {
        inflight.delete(key);
    });
    inflight.set(key, promise);
    return promise;
};
// ──────────────────────────────────────────────────────────────────────────────

// Response interceptor for basic error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.message);
        return Promise.reject(error);
    }
);
