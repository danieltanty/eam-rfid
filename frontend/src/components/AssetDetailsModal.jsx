import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  useMediaQuery
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import AssetImage from "../assets/react.svg"

export default function AssetDetailsModal({ open, onClose, asset }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!asset) return null;

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="sm" fullWidth sx={{ margin: 1 }}>

      {/* HEADER */}
      <DialogTitle sx={{ display:"flex", justifyContent:"space-between" }}>
        <Typography variant="h5">
          Asset Details
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>

      <DialogContent>

        {/* SUMMARY CARD */}
        <Box
  sx={{
    p: 2,
    borderRadius: 2,
    border: "1px solid #eee",
    mb: 2,
    display: "flex",
    gap: 2,
    alignItems: "center"
  }}
>

  {/* IMAGE */}
  <Box
    component="img"
    src={AssetImage}
    alt="asset"
    sx={{
      width: 80,
      height: 80,
      objectFit: "contain",
      borderRadius: 1,
      border: "1px solid #eee"
    }}
  />

  {/* TEXT CONTENT */}
  <Box sx={{ flex: 1 }}>

    <Typography variant="h6">
      {asset.assetCode}
    </Typography>

    <Typography variant="body2" color="text.secondary">
      {asset.assetDesc}
    </Typography>

    <Chip
      label={asset.condition}
      color="success"
      size="small"
      sx={{ mt: 1 }}
    />

  </Box>

</Box>

        {/* BASIC */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            📦 Basic Information
          </AccordionSummary>

          <AccordionDetails>

            <Info label="Asset Code" value={asset.assetCode} />
            <Info label="Description" value={asset.assetDesc} />

          </AccordionDetails>
        </Accordion> */}

        {/* ORGANIZATION */}
        <Accordion defaultExpanded>

          <AccordionSummary style={{ minHeight: 50 }} expandIcon={<ExpandMoreIcon />}>
            🏢 Organization
          </AccordionSummary>

          <AccordionDetails>

            <Info label="Department" value={asset.department} />
            <Info label="Parent Description" value={asset.parentDesc} />
            <Info label="Commission Date" value={asset.commissionDate} />

          </AccordionDetails>

        </Accordion>

        {/* MANUFACTURER */}
        <Accordion>

          <AccordionSummary style={{ minHeight: 50 }} expandIcon={<ExpandMoreIcon />}>
            🏭 Manufacturer
          </AccordionSummary>

          <AccordionDetails>

            <Info label="Manufacturer" value={asset.manufacturer} />
            <Info label="Model" value={asset.model} />
            <Info label="Serial Number" value={asset.serialNumber} />

          </AccordionDetails>

        </Accordion>

        {/* IMAGE */}
        {/* <Accordion>

          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            🖼️ Asset Image
          </AccordionSummary>

          <AccordionDetails>

            <Box
              component="img"
              src={AssetImage}
              alt="asset"
              sx={{
                width:"100%",
                borderRadius:2,
              }}
            />

          </AccordionDetails>

        </Accordion> */}

        {/* ACTION BUTTONS */}
        {/* <Stack direction="row" spacing={2} mt={3}>

          <Button
            variant="contained"
            color="success"
            fullWidth
          >
            Mark Found
          </Button>

          <Button
            variant="contained"
            color="error"
            fullWidth
          >
            Mark Missing
          </Button>

        </Stack> */}

      </DialogContent>

    </Dialog>
  );
}


function Info({ label, value }) {

  return (
    <Box mb={1.5}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body2">
        {value || "-"}
      </Typography>
    </Box>
  );
}