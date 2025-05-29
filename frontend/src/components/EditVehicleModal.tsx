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

interface EditVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
  vehicle: Vehicle | null;
}

const statusOptions = ["Available", "Out of Service", "In Maintenance"];

export default function EditVehicleModal({
  open,
  onClose,
  onSave,
  vehicle,
}: EditVehicleModalProps) {
  const [formData, setFormData] = React.useState<Vehicle | null>(null);

  React.useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const handleChange =
    (field: keyof Vehicle) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (formData) {
        setFormData({
          ...formData,
          [field]: event.target.value,
        });
      }
    };

  const handleSubmit = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Vehicle</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={formData.name}
          disabled
        />
        <TextField
          select
          margin="dense"
          label="Status"
          fullWidth
          value={formData.status}
          onChange={handleChange("status")}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
