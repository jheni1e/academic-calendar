import { isTokenExpired, logout } from "./auth";
const BASE_URL = import.meta.env.VITE_BASE_ROUTE_API;

const apiClient = async (url, options = {}) => {
    const token = sessionStorage.getItem("token");

    if (isTokenExpired(token)) {
        logout();
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        ...(token && {
            Authorization: `Bearer ${token}`
        }),
        ...options.headers
    };

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${BASE_URL}${url}`, config);

        if (response.status === 204) {
            return null;  // No content to return
        }

        if (!response.ok) {
            let errorData;

            try {
                errorData = await response.json();
            } catch (parseError) {
                errorData = {
                    message: `HTTP ${response.status}: ${response.statusText}`

                };
            }

            const error = new Error(
                errorData.message ||
                errorData.error?.message ||
                `Request failed with status ${response.status}`
            );

            error.response = {
                status: response.status,
                statusText: response.statusText,
                data: errorData
            };

            throw error;
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            const networkError = new Error('Erro de conexão. Verifique sua internet.');
            networkError.response = { status: 0, data: null };
            throw networkError;
        }

        throw error;
    }
};

export const getData = (url) => apiClient(url);

export const postData = (url, data) =>
    apiClient(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });

export const putData = (url, data) =>
    apiClient(url, {
        method: 'PUT',
        body: JSON.stringify(data)
    });

export const deleteData = (url) =>
    apiClient(url, {
        method: 'DELETE'
    });