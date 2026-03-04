import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

import Logo from '../assets/react.svg'

export default function Layout() {
  const [open, setOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Assets", path: "/assets" },
    { text: "PM Schedules", path: "/pm" },
    { text: "Inventory Check", path: "/inventory" },
    { text: "Perform Inventory", path: "/inventory/perform" },
    { text: "Inventory Summary", path: "/inventory/summary" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#2c3e50" }}>
          <img src={Logo} />
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Hexagon EAM (YNY Technology)
          </Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#e7e7e7", color: "#2c3e50", padding: 0 }}>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1, pl: 1.5 }}>
            Asset Management
          </Typography>
          {/* <Typography
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </Typography> */}
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <List>
            <ListItemButton
              onClick={handleLogout}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box p={1}>
        <Outlet />
      </Box>
    </>
  );
}