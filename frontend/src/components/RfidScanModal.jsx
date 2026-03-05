import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

// INPUT SAMPLE
// OSPK-002,OSPK-003,OSPK-004,OSPK-005,OSPK-006

const RfidScanModal = ({ open, onClose, onProcess }) => {
    const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [scanInput, setScanInput] = useState("");
//   const [parsedCodes, setParsedCodes] = useState([])

  const parsedCodes = [
    ...new Set(
      scanInput
        .split(/[\n,]+/)
        .map(code => code.trim().toUpperCase())
        .filter(code => code !== "")
    )
  ];

  const handleProcess = () => {
    onProcess(parsedCodes); // Send current parsed codes
    setScanInput("");        // Optional: clear input after processing
  };

  const handleClose = () => {
    setScanInput("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      fullScreen={fullScreen}
      sx={{ margin: 1 }}
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold"
        }}
      >
        RFID Scan Input

        <IconButton size="small" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>

        <Typography sx={{ mb: 2 }}>
          Scan or insert a list of asset codes (comma or newline separated)
        </Typography>

        <TextField
          multiline
          rows={6}
          fullWidth
          autoFocus
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          placeholder="0CHR-001, 0CHR-003, 0SPK-002"
        />

        {parsedCodes.length > 0 && (
            <>
                <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                Parsed Result ({parsedCodes.length})
                </Typography>

                <Typography
                component="pre"
                sx={{
                    mt: 1,
                    p: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    maxHeight: 200,
                    overflow: "auto"
                }}
                >
                {parsedCodes.join("\n")}
                </Typography>
            </>
        )}

      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>

        <Button
          variant="contained"
          color="success"
          onClick={handleProcess}
        >
          Process Scan
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          Cancel
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default RfidScanModal;