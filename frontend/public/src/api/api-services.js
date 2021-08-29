const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 5000
});

export default api;
