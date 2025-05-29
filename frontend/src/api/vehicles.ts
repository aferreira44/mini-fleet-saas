import type { Vehicle } from "../types/Vehicle";
import { baseApi } from "./base";

const ROUTES = {
    getAll: "/vehicles",
    updateStatus: (id: number) => `/vehicles/${id}/status`,
} as const;

export const vehiclesApi = {
    getAll: async (): Promise<Vehicle[]> => {
        return baseApi.get<Vehicle[]>(ROUTES.getAll);
    },

    updateStatus: async (vehicle: Vehicle): Promise<Vehicle> => {
        return baseApi.put<Vehicle>(ROUTES.updateStatus(vehicle.id), { status: vehicle.status });
    },
}; 