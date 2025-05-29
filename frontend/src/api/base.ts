import axios, { type AxiosInstance, AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = "ApiError";
    }
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const baseApi = {
    get: async <T>(endpoint: string): Promise<T> => {
        try {
            const { data } = await axiosInstance.get<T>(endpoint);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new ApiError(error.message, error.response?.status);
            }
            throw error;
        }
    },

    put: async <T>(endpoint: string, data: unknown): Promise<T> => {
        try {
            const { data: responseData } = await axiosInstance.put<T>(endpoint, data);
            return responseData;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new ApiError(error.message, error.response?.status);
            }
            throw error;
        }
    },

    post: async <T>(endpoint: string, data: unknown): Promise<T> => {
        try {
            const { data: responseData } = await axiosInstance.post<T>(endpoint, data);
            return responseData;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new ApiError(error.message, error.response?.status);
            }
            throw error;
        }
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        try {
            const { data } = await axiosInstance.delete<T>(endpoint);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new ApiError(error.message, error.response?.status);
            }
            throw error;
        }
    },
}; 