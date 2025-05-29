import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const baseApi = {
    get: async <T>(url: string): Promise<T> => {
        try {
            const response = await axiosInstance.get<T>(url);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.detail || error.message);
            }
            throw error;
        }
    },

    put: async <T>(url: string, data: unknown): Promise<T> => {
        try {
            const response = await axiosInstance.put<T>(url, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.detail || error.message);
            }
            throw error;
        }
    },

    post: async <T>(endpoint: string, data: unknown): Promise<T> => {
        try {
            const { data: responseData } = await axiosInstance.post<T>(endpoint, data);
            return responseData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.detail || error.message);
            }
            throw error;
        }
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        try {
            const { data } = await axiosInstance.delete<T>(endpoint);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.detail || error.message);
            }
            throw error;
        }
    },
}; 