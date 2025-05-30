import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import WarningIcon from "@mui/icons-material/Warning";
import AddIcon from "@mui/icons-material/Add";
import { useVehicles } from "../hooks/useVehicles";
import { VehicleStatus } from "../types/Vehicle";
import { Link } from "react-router";

const withVehicles = (WrappedComponent: React.ComponentType<any>) => {
  return function WithVehiclesComponent(props: any) {
    const vehiclesData = useVehicles();
    return <WrappedComponent {...props} vehiclesData={vehiclesData} />;
  };
};

interface MainPageProps {
  vehiclesData: {
    vehicles: Array<{
      id: number;
      name: string;
      status: VehicleStatus;
    }>;
    loading: boolean;
    error: string | null;
  };
}

class MainPage extends React.Component<MainPageProps> {
  getVehicleStats() {
    const { vehicles } = this.props.vehiclesData;
    return {
      total: vehicles.length,
      inMaintenance: vehicles.filter(
        (v) => v.status === VehicleStatus.IN_MAINTENANCE
      ).length,
      outOfService: vehicles.filter(
        (v) => v.status === VehicleStatus.OUT_OF_SERVICE
      ).length,
      available: vehicles.filter((v) => v.status === VehicleStatus.AVAILABLE)
        .length,
    };
  }

  shouldComponentUpdate(nextProps: MainPageProps) {
    // Only update if vehicles data has changed
    return (
      this.props.vehiclesData.vehicles !== nextProps.vehiclesData.vehicles ||
      this.props.vehiclesData.loading !== nextProps.vehiclesData.loading ||
      this.props.vehiclesData.error !== nextProps.vehiclesData.error
    );
  }

  render() {
    const { loading, error } = this.props.vehiclesData;
    const stats = this.getVehicleStats();

    if (loading) {
      return (
        <Container maxWidth="lg">
          <Box sx={{ my: 4, textAlign: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
          </Box>
        </Container>
      );
    }

    if (error) {
      return (
        <Container maxWidth="lg">
          <Box sx={{ my: 4, textAlign: "center" }}>
            <Typography color="error">
              Error loading fleet data: {error}
            </Typography>
          </Box>
        </Container>
      );
    }

    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
            Fleet Dashboard
          </Typography>

          {/* Quick Actions */}
          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Tooltip title="Vehicle management is currently disabled">
                  <span>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      component={Link}
                      to="/vehicles"
                      disabled
                    >
                      Add Vehicle
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="To be implemented">
                  <span>
                    <Button
                      variant="outlined"
                      startIcon={<BuildIcon />}
                      component={Link}
                      to="/vehicles"
                      disabled
                    >
                      Schedule Maintenance
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>

          {/* Fleet Statistics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Fleet Statistics</Typography>
                <Typography variant="caption" color="text.secondary">
                  Actual data
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <DirectionsCarIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Total Vehicles</Typography>
                  </Box>
                  <Typography variant="h3">{stats.total}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <DirectionsCarIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6">Available</Typography>
                  </Box>
                  <Typography variant="h3">{stats.available}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <BuildIcon color="warning" sx={{ mr: 1 }} />
                    <Typography variant="h6">In Maintenance</Typography>
                  </Box>
                  <Typography variant="h3">{stats.inMaintenance}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <WarningIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6">Out of Service</Typography>
                  </Box>
                  <Typography variant="h3">{stats.outOfService}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Activity */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Recent Activity</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sample data
                  </Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Vehicle #1234 sent for maintenance"
                      secondary="2 hours ago"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="New vehicle added to fleet"
                      secondary="5 hours ago"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Vehicle #5678 returned to service"
                      secondary="1 day ago"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Maintenance Schedule</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sample data
                  </Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Vehicle #1234 - Oil Change"
                      secondary="Due in 2 days"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Vehicle #5678 - Tire Rotation"
                      secondary="Due in 5 days"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Vehicle #9012 - Annual Inspection"
                      secondary="Due in 1 week"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}

export default withVehicles(MainPage);
