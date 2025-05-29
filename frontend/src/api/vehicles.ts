import type { Vehicle } from "../types/Vehicle";
import { handleError } from "../utils/errorHandling";
import { baseApi } from "./base";

const ROUTES = {
    getAll: "/vehicles",
    updateStatus: (id: number) => `/vehicles/${id}/status`,
} as const;

export const vehiclesApi = {
    getAll: async (): Promise<Vehicle[]> => {
        try {
            return await baseApi.get<Vehicle[]>(ROUTES.getAll);
        } catch (error) {
            handleError(error, 'Failed to fetch vehicles');
            return Promise.reject(error);
        }
    },

    updateStatus: async (vehicle: Vehicle): Promise<Vehicle> => {
        try {
            return await baseApi.put<Vehicle>(ROUTES.updateStatus(vehicle.id), { status: vehicle.status });
        } catch (error) {
            handleError(error, 'Failed to update vehicle status');
            return Promise.reject(error);
        }
    },
}; 