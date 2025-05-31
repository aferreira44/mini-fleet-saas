import * as React from "react";
import type { Vehicle } from "../types/Vehicle";
import EnhancedTable, { type HeadCell } from "../components/Table";
import { Box, Container, Typography, Snackbar, Alert } from "@mui/material";
import EditVehicleModal from "../components/EditVehicleModal";
import { useVehicles } from "../hooks/useVehicles";
import { useModal } from "../hooks/useModal";

export default function VehiclesPage() {
  const { vehicles, loading, error, updateStatus } = useVehicles();
  const { isOpen, open, close } = useModal();
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(
    null
  );
  const [showError, setShowError] = React.useState(false);

  const headCells = React.useMemo(
    () =>
      [
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
      ] as const,
    []
  );

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleEdit = React.useCallback(
    (id: number) => {
      const vehicle = vehicles.find((v: Vehicle) => v.id === id);
      if (vehicle) {
        setSelectedVehicle(vehicle);
        open();
      }
    },
    [vehicles, open]
  );

  const handleSave = React.useCallback(
    async (updatedVehicle: Vehicle) => {
      await updateStatus(updatedVehicle);
      close();
    },
    [updateStatus, close]
  );

  const handleCloseError = React.useCallback(() => {
    setShowError(false);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setSelectedVehicle(null);
    close();
  }, [close]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Fleet
        </Typography>
        <EnhancedTable
          data={vehicles}
          loading={loading}
          headCells={headCells}
          title="Vehicles"
          onEdit={handleEdit}
        />
        {selectedVehicle && (
          <EditVehicleModal
            open={isOpen}
            onClose={handleCloseModal}
            vehicle={selectedVehicle}
            onSave={handleSave}
          />
        )}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
