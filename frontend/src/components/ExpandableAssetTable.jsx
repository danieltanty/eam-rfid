import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

function AssetRow({ asset }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Main Row (3 columns only) */}
      <TableRow
        hover
        onClick={() => setOpen(!open)}
        sx={{ cursor: "pointer" }}
      >
        <TableCell sx={{ fontWeight: 600 }}>
          {asset.assetCode}
        </TableCell>

        <TableCell>
          {asset.assetDesc}
        </TableCell>

        <TableCell>
          {asset.parentDescription || "-"}
        </TableCell>
        
        <TableCell sx={{ padding: 1 }}>
            {open ? <KeyboardArrowUpIcon sx={{ fontSize: 12 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />}
        </TableCell>
      </TableRow>

      {/* Expandable Row */}
      <TableRow>
        <TableCell colSpan={4} sx={{ backgroundColor: open ? "#eef6ff" : "inherit", p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
              <Typography variant="body2">
                <strong>Parent Asset:</strong>{" "}
                {asset.parentAsset || "-"}
              </Typography>

              <Typography variant="body2">
                <strong>Parent Description:</strong>{" "}
                {asset.parentDescription || "-"}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                Last Updated: {asset.lastUpdated}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ExpandableAssetTable({ assets }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: "#2c3e50" }}>
          <TableRow>
            <TableCell sx={{ color: "#e7e7e7", fontWeight: "bold" }}>Asset Code</TableCell>
            <TableCell sx={{ color: "#e7e7e7", fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ color: "#e7e7e7", fontWeight: "bold" }}>Location</TableCell>
            <TableCell sx={{ color: "#e7e7e7", fontWeight: "bold" }} style={{ padding: 0 }}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {assets.map((asset) => (
            <AssetRow key={asset.assetCode} asset={asset} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}