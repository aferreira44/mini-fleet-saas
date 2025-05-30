import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import type { Vehicle } from "../types/Vehicle";
import { VehicleStatus } from "../types/Vehicle";
import { useForm } from "../hooks/useForm";

interface EditVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
  vehicle: Vehicle | null;
}

const statusOptions = Object.values(VehicleStatus);

export default function EditVehicleModal({
  open,
  onClose,
  onSave,
  vehicle,
}: EditVehicleModalProps) {
  const { values, handleChange, handleSubmit } = useForm<Vehicle>({
    initialValues: vehicle || {
      id: -1,
      name: "",
      status: VehicleStatus.AVAILABLE,
    },
    onSubmit: (formData) => {
      if (vehicle) {
        onSave({
          ...formData,
          id: vehicle.id,
        });
        onClose();
      }
    },
  });

  if (!vehicle) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={values.name}
            disabled
          />
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            value={values.status}
            onChange={handleChange("status")}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
