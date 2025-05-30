import * as React from "react";
import type { Vehicle } from "../types/Vehicle";
import EnhancedTable, { type HeadCell } from "../components/Table";
import { Box, Container, Typography, Snackbar, Alert } from "@mui/material";
import EditVehicleModal from "../components/EditVehicleModal";
import { useVehicles } from "../hooks/useVehicles";
import { useModal } from "../hooks/useModal";

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
  const { vehicles, loading, error, updateStatus } = useVehicles();
  const { isOpen, open, close } = useModal();
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(
    null
  );
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleEdit = (id: number) => {
    const vehicle = vehicles.find((v: Vehicle) => v.id === id);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      open();
    }
  };

  const handleSave = async (updatedVehicle: Vehicle) => {
    await updateStatus(updatedVehicle);
    close();
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
          open={isOpen}
          onClose={close}
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
