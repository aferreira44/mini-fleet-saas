import * as React from "react";
import { useState, useEffect } from "react";
import type { Vehicle } from "../types/Vehicle";
import EnhancedTable, { type HeadCell } from "../components/Table";
import { Box, Container, Typography } from "@mui/material";
import EditVehicleModal from "../components/EditVehicleModal";
import { vehiclesApi } from "../api/vehicles";

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehiclesApi.getAll();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleEdit = (id: number) => {
    const vehicle = vehicles.find((v) => v.id === id);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setIsModalOpen(true);
    }
  };

  const handleSave = async (updatedVehicle: Vehicle) => {
    try {
      const savedVehicle = await vehiclesApi.updateStatus(updatedVehicle);
      setVehicles((prev) =>
        prev.map((v) => (v.id === savedVehicle.id ? savedVehicle : v))
      );
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
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
      </Box>
    </Container>
  );
}
