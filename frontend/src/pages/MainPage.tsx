import { Typography } from "@mui/material";

import { Box } from "@mui/material";

import { Container } from "@mui/material";

export default function MainPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Mini Fleet SaaS
        </Typography>
      </Box>
    </Container>
  );
}
