import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Vehicle } from '../../types/Vehicle';
import { vehiclesApi } from '../../api/vehicles';

interface VehiclesState {
    items: Vehicle[];
    loading: boolean;
    error: string | null;
}

const initialState: VehiclesState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    async (_, { rejectWithValue }) => {
        try {
            const vehicles = await vehiclesApi.getAll();
            return vehicles;
        } catch (error) {
            return rejectWithValue('Failed to fetch vehicles');
        }
    }
);

export const updateVehicleStatus = createAsyncThunk(
    'vehicles/updateStatus',
    async (vehicle: Vehicle, { rejectWithValue }) => {
        try {
            const updatedVehicle = await vehiclesApi.updateStatus(vehicle);
            return updatedVehicle;
        } catch (error) {
            return rejectWithValue('Failed to update vehicle status');
        }
    }
);

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch vehicles
            .addCase(fetchVehicles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action: PayloadAction<Vehicle[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch vehicles';
            })
            // Update vehicle status
            .addCase(updateVehicleStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVehicleStatus.fulfilled, (state, action: PayloadAction<Vehicle>) => {
                state.loading = false;
                const index = state.items.findIndex((vehicle) => vehicle.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateVehicleStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to update vehicle status';
            });
    },
});

export const { clearError } = vehiclesSlice.actions;
export default vehiclesSlice.reducer; 