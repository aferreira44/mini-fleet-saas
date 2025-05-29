import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { Vehicle } from "../types/Vehicle";
import EnhancedTable, { type HeadCell } from "../components/Table";
import { Box, Container, Typography, Snackbar, Alert } from "@mui/material";
import EditVehicleModal from "../components/EditVehicleModal";
import {
  fetchVehicles,
  updateVehicleStatus,
} from "../store/slices/vehiclesSlice";
import type { RootState } from "../store";
import { useAppDispatch } from "../hooks/useAppDispatch";

const headCells: readonly HeadCell<Vehicle>[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

export default function VehiclesPage() {
  const dispatch = useAppDispatch();
  const {
    items: vehicles,
    loading,
    error,
  } = useSelector((state: RootState) => state.vehicles);
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleEdit = (id: number) => {
    const vehicle = vehicles.find((v) => v.id === id);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setIsModalOpen(true);
    }
  };

  const handleSave = async (updatedVehicle: Vehicle) => {
    await dispatch(updateVehicleStatus(updatedVehicle));
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Vehicles
        </Typography>
        <EnhancedTable
          data={vehicles}
          loading={loading}
          headCells={headCells}
          title="Fleet"
          onEdit={handleEdit}
        />
        <EditVehicleModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          vehicle={selectedVehicle}
        />
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
