export interface Vehicle {
    id: number;
    name: string;
    status: VehicleStatus;
}

export enum VehicleStatus {
    AVAILABLE = "Available",
    OUT_OF_SERVICE = "Out of Service",
    IN_MAINTENANCE = "In Maintenance",
}