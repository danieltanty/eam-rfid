import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    
    try {
    //   const res = await api.post("/login", {
    //     username,
    //     password,
    //   });
    
    const res = {
        data: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0IiwiaWF0IjoxNjg1NzY2MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            user: {
                username: "Daniel",
                role: "admin"
            },
        },
        password
      };

      login(res.data.token, res.data.user);
      navigate("/sync", { replace: true });
    } catch (err) {
      setError(`Invalid username or password. ${err}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6f42c1, #4e73df)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pl: 2,
        pr: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          // variant="h5"
          sx={{ fontSize: "1.75rem" }}
          fontWeight="bold"
          textAlign="center"
          mb={2}
        >
          Inventory System
        </Typography>

        {/* <Typography
          // variant="body2"
          sx={{ fontSize: "1rem" }}
          textAlign="center"
          color="text.secondary"
          mb={1}
        >
          Sign in to continue
        </Typography> */}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          size="medium"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          size="medium"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 2,
            height: 48,
            fontWeight: "bold",
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          mt={3}
          color="text.secondary"
        >
          © {new Date().getFullYear()} Inventory System
        </Typography>
      </Paper>
    </Box>
  );
}