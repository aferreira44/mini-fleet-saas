import { useEffect } from 'react';
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

    const updateStatus = async (vehicle: Vehicle) => {
        await dispatch(updateVehicleStatus(vehicle));
    };

    return {
        vehicles,
        loading,
        error,
        updateStatus,
    };
}; 