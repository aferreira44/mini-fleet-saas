import { Link } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useDrawer } from "../hooks/useDrawer";
import React from "react";

const Navbar = React.memo(function Navbar() {
  const { isOpen, open, close, anchor } = useDrawer();

  const handleDrawerClick = React.useCallback(() => {
    close({}, "backdropClick");
  }, [close]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        close({}, "escapeKeyDown");
      }
    },
    [close]
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={open}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mini Fleet SaaS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor={anchor} open={isOpen} onClose={close}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClick}
          onKeyDown={handleKeyDown}
        >
          <List>
            <ListItem>
              <ListItemButton component={Link} to="/">
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={Link} to="/vehicles">
                <ListItemText>Vehicles</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
});

export default Navbar;
