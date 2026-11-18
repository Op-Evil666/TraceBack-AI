import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_GATEWAY_URL}`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Access token remains in memory only.
let accessToken = null;
let refreshPromise = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

const isExcludedFromRefresh = (url = "") => {
  const path = url.split("?")[0].replace(/\/+$/, "");

  return (
    path === "/users/login" ||
    path === "/users/register" ||
    path === "/users/refresh" ||
    path === "/users/logout" ||
    /^\/users\/verify-otp\/[^/]+$/.test(path)
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isExcludedFromRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(
            `${BASE_URL}/users/refresh`,
            {},
            { withCredentials: true }
          )
          .then((response) => {
            const token = response.data.accessToken;

            if (!token) {
              throw new Error("Refresh response has no access token.");
            }

            setAccessToken(token);
            return token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newToken = await refreshPromise;

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      return Promise.reject(refreshError);
    }
  }
);