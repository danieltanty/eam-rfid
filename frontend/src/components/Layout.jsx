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
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Logo from '../assets/ynylogo_white.png';

// Import icons
import { 
  Inventory as InventoryIcon, 
  CalendarToday as PmSchedulesIcon, 
  CheckCircle as InventoryCheckIcon, 
  Build as PerformInventoryIcon, 
  Summarize as InventorySummaryIcon, 
  ExitToApp as LogoutIcon ,
  Person as PersonIcon
} from "@mui/icons-material";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { text: "Assets", path: "/assets", icon: <InventoryIcon /> },
    { text: "PM Schedules", path: "/pm", icon: <PmSchedulesIcon /> },
    { text: "Inventory Check", path: "/inventory", icon: <InventoryCheckIcon /> },
    { text: "Perform Inventory Check", path: "/inventory/perform", icon: <PerformInventoryIcon /> },
    { text: "Inventory Summary", path: "/inventory/summary", icon: <InventorySummaryIcon /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#2c3e50", color: "#e7e7e7", padding: 0 }}>
          <IconButton color="inherit" onClick={() => setOpen(true)} sx={{ padding: '8px' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 0, pl: 1.5 }}>
            Hxgn EAM
          </Typography>
          <Typography variant="h7" sx={{ flexGrow: 1, pl: 1.5 }}>
            (YNY Technology)
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "80vw",
            height: "100%",
            color: "#e7e7e7",
            backgroundColor: "#2c3e50",
            padding: 2,
            boxSizing: "border-box",
          }}
        >
          {/* Menu Links */}
          <List sx={{ paddingBottom: 2 }}>
            {menuItems.map((item, index) => (
              <ListItemButton
                key={index} // Ensure each item has a unique key
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                sx={{
                  padding: '12px 16px',
                  '&:hover': {
                    backgroundColor: "#34495e",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#e7e7e7" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ fontWeight: 500 }} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ backgroundColor: '#7f8c8d', marginBottom: 2 }} />

          {/* User / Logout */}
          <List>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                padding: '12px 16px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: "#34495e",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#e7e7e7" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={user?.username} sx={{ fontWeight: 500 }} />
            </ListItemButton>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                padding: '12px 16px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: "#e7e7e7",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#e7e7e7" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ fontWeight: 600 }} />
            </ListItemButton>
          </List>

          {/* Logo at the Bottom */}
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "100%",
                maxWidth: "180px",
                objectFit: "contain",
                margin: "auto",
              }}
            />
          </Box>
        </Box>
      </Drawer>

      {/* Content */}
      <Box p={2}>
        <Outlet />
      </Box>
    </>
  );
}