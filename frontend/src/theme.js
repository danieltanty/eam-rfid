import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 14, // Slightly smaller base font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48, // Touch friendly
          fontSize: "1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 12,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
          root: {
            fontSize: "0.95rem",
            padding: "12px 16px",
          },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});

export default theme;