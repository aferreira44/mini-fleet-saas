import { Typography } from "@mui/material";

import { Box } from "@mui/material";

import { Container } from "@mui/material";
import Table from "../components/Table";

export default function VehiclesPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Vehicles
        </Typography>
        <Table />
      </Box>
    </Container>
  );
}
