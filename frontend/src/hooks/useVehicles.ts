import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { Vehicle } from '../types/Vehicle';
import type { RootState } from '../store';
import { useAppDispatch } from './useAppDispatch';
import { fetchVehicles, updateVehicleStatus } from '../store/slices/vehiclesSlice';

export const useVehicles = () => {
    const dispatch = useAppDispatch();
    const { items: vehicles, loading, error } = useSelector((state: RootState) => state.vehicles);

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch]);

    const updateStatus = useCallback(async (vehicle: Vehicle) => {
        await dispatch(updateVehicleStatus(vehicle));
    }, [dispatch]);

    return {
        vehicles,
        loading,
        error,
        updateStatus,
    };
}; 