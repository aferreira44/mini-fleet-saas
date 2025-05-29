import * as React from "react";
import { useState, useEffect } from "react";
import type { Vehicle } from "../types/Vehicle";
import EnhancedTable, { type HeadCell } from "../components/Table";
import { Box, Container, Typography } from "@mui/material";
import EditVehicleModal from "../components/EditVehicleModal";

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
        const response = await fetch("http://localhost:8000/api/vehicles");
        const data = await response.json();
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
      const response = await fetch(
        `http://localhost:8000/api/vehicles/${updatedVehicle.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updatedVehicle.status }),
        }
      );

      if (response.ok) {
        setVehicles((prev) =>
          prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
        );
        // setIsModalOpen(false);
      }
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
