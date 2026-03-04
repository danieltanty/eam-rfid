import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SyncIcon from "@mui/icons-material/Sync";
import StorageIcon from "@mui/icons-material/StorageRounded"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
// import api from "../api/axios";
import { useUIStore } from "../store/uiStore";
import { useNavigate } from "react-router-dom";

export default function DatabaseSync() {
  const { user, logout } = useAuthStore();
  const setSynced = useAuthStore((state) => state.setSynced);
  const showSnackbar = useUIStore((state) => state.showSnackbar);
  const navigate = useNavigate();

  const [assetStatus, setAssetStatus] = useState("idle");
  const [pmStatus, setPmStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [lastSync, setLastSync] = useState(null);
  const [description, setDescription] = useState({
    assetDatabase: "Ready to synchronize",
    pmSchedules: "Waiting for asset async to complete"
  })
  const initalLogs = [
    `${new Date().toLocaleTimeString()} - Synchonization screen loaded. Click synchronize to begin.`,
    `${new Date().toLocaleTimeString()} - Last sync from database: ${lastSync ?? '3/4/2026, 12:26:43 PM'}`
  ]
  const [logs, setLogs] = useState(initalLogs);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `${time} - ${message}`]);
  };

  const handleSync = async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    try {
      setProgress(10);
      setAssetStatus("loading");
      addLog("Starting asset synchronization...");

      // await api.post("/sync/assets");
      await delay(2000);
      setAssetStatus("success");
      addLog("Asset database synchronized.");
      setDescription({
        ...description,
        assetDatabase: "Synced 21 equipment codes"
      })
      setProgress(50);

      setPmStatus("loading");
      addLog("Starting PM schedule synchronization...");

      // await api.post("/sync/pm");
      await delay(2000);
      setPmStatus("success");
      addLog("PM schedules synchronized.");
      setDescription({
        ...description,
        pmSchedules: "PM schedules synchronized successfully"
      })
      setProgress(100);

      setLastSync(new Date().toLocaleString());
      setSynced(true);
      showSnackbar("Synchronization completed successfully", "success");

      // Optional: Auto Redirect After Sync
      // setTimeout(() => {
      //   navigate("/assets", { replace: true });
      // }, 3000);
    } catch (err) {
        console.log("Synchronization failed", err)
      showSnackbar("Synchronization failed", "error");
    }
  };

  const handleReset = () => {
    setProgress(0)
    setLogs(initalLogs)
    setAssetStatus("idle")
    setPmStatus("idle")
    setDescription({
      assetDatabase: "Ready to synchronize",
      pmSchedules: "Waiting for asset async to complete"
    })
    setLastSync(null)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6f42c1, #4e73df)",
        p: 1,
      }}
    >
      <Paper sx={{ width: "100%", maxWidth: 480, p: 2, borderRadius: 3 }}>

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" mb={1}>
          <Button
            size="small"
            variant="text"
            startIcon={<PersonIcon />}
            color="inherit"
            onClick={handleReset}
            style={{ cursor: "default" }}
            sx={{ minHeight: "auto", textTransform: "none" }}
          >
            <Typography variant="body2" sx={{ m: 0 }}>
              {user?.username}
            </Typography>
          </Button>

          <Button
            size="small"
            variant="outlined"
            startIcon={<LogoutIcon />}
            color="inherit"
            onClick={handleLogout}
            sx={{ minHeight: "auto", textTransform: "none" }}
          >
            <Typography variant="body2" sx={{ m: 0 }}>
              Logout
            </Typography>
          </Button>
        </Stack>

        <Typography 
          // variant="h4" 
          sx={{ fontSize: "1.75rem" }}
          fontWeight="bold" 
          textAlign="center" 
          mb={0}
        >
          DB Synchronization
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Synchronize local database with HxGN EAM
        </Typography>

        <Stack spacing={2}>
          <StatusCard
            title="Asset Database"
            description={description.assetDatabase}
            status={assetStatus}
            color="#3297DB"
            icon={
              <StorageIcon
                sx={{
                  fontSize: 36,
                  color: "#3297DB",
                  // color: "gray",
                  animation: "spin 1s linear infinite",
                }}
              />
            }
          />

          <StatusCard
            title="PM Schedules"
            description={description.pmSchedules}
            status={pmStatus}
            color="#9A58B5"
            icon={
              <SyncIcon
                sx={{
                  fontSize: 36,
                  color: "#9A58B5",
                  // color: "gray",
                  animation: "spin 1s linear infinite",
                }}
              />
            }
          />

          <LinearProgress variant="determinate" value={progress} style={{ backgroundColor: "#f1f1f1" }} sx={{ borderRadius: 5 }} />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<SyncIcon />}
              fullWidth
              onClick={handleSync}
            >
              Sync
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<ArrowForwardIcon />}
              fullWidth
              disabled={progress !== 100}
              onClick={() => navigate("/assets")}
            >
              Proceed
            </Button>
          </Stack>

          {lastSync && (
            <Typography variant="body2" textAlign="center" style={{ color: "gray" }}>
              Last synchronized: {lastSync}
            </Typography>
          )}
          
          <Paper
            sx={{ p: 1 }}
            style={{ backgroundColor: "#F8F9FA" }}
          >
            <Typography variant="h6" fontWeight="bold" mb={0}>
              Synchronization Log
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                maxHeight: 200,
                overflow: "auto",
                p: 1,
                mt: 0.5
              }}
            >
              {logs.map((log, index) => (
                <Card sx={{ 
                    borderLeft: "4px solid",
                    borderColor: "#3297DB",
                    mb: 0.2
                  }}
                  elevation={0}  
                >
                  <CardContent style={{ padding: "6px", paddingLeft: 12 }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography key={index} variant="caption" display="block">
                        {log}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Paper>
        </Stack>
      </Paper>
    </Box>
  );
}

function StatusCard({ title, status, color, icon, description }) {
  return (
    <Card elevation={2}
      sx={{
        borderLeft: "6px solid",
        // borderColor: color
        borderColor:
          status === "success"
            ? "#2ECC71"
            : color,
      }}
      style={{ backgroundColor: status === "success" ? "#E8F5E9" : "#F8F9FA" }}
    >
      <CardContent style={{ paddingBottom: 16, paddingTop: 16 }} sx={{ pl: 2, pt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          {/* LEFT ICON */}
          {icon}

          {/* RIGHT CONTENT */}
          <Box>
            <Typography sx={{ fontSize: "1.25rem" }} fontWeight="bold">
              {title}
            </Typography>

            <Typography sx={{ fontSize: "0.85rem" }} color="text.secondary" >
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}