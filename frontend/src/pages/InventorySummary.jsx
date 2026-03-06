import { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Stack, Button } from "@mui/material";
import ExpandableTable from "../components/ExpandableTable";
import AssetDetailsModal from "../components/AssetDetailsModal";
import { assetsDetails } from "../mock/assetsDetails";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";

export default function InventorySummary() {

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([]);
const [workOrders, setWorkOrders] = useState([]);
  const [workOrderFilter, setWorkOrderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
  setTimeout(() => {
    setRows(assetsDetails);

    const uniqueWorkOrders = [
      "All",
      ...new Set(assetsDetails.map(asset => asset.workOrder))
    ];

    setWorkOrders(uniqueWorkOrders);
  }, 0);
}, []);

  const filteredData = rows.filter((row) => {
    const matchWorkOrder =
      workOrderFilter === "All" ||
      row.workOrder === workOrderFilter;

    const matchStatus =
      statusFilter === "All" ||
      row.status === statusFilter;

    return matchWorkOrder && matchStatus;

  });

  const handleStatusChange = (rowId,value)=>{
    setRows(prev =>
      prev.map(row =>
        row.id === rowId
          ? { ...row, status:value }
          : row
      )
    );
  };

  const handleInspectAsset = (row) => {
    setSelectedAsset(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    { field:"assetCode", headerName:"Asset Code" },
    { field:"assetDesc", headerName:"Description" },
  ];

  return (
    <Box sx={{p:1}}>

      <Typography variant="h5" fontWeight="bold" sx={{mb:2}}>
        Today's Inventory Check: Summary
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >

      <FormControl size="small" fullWidth>
        <InputLabel>Work Order</InputLabel>

        <Select
          value={workOrderFilter}
          label="Work Order"
          onChange={(e) => setWorkOrderFilter(e.target.value)}
        >
          {workOrders.map((wo) => (
            <MenuItem key={wo} value={wo}>
              {wo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <FormControl size="small" fullWidth>
        <InputLabel>Status</InputLabel>

        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="matched">Matched</MenuItem>
          <MenuItem value="missing">Missing</MenuItem>
          <MenuItem value="returned">Returned</MenuItem>
          <MenuItem value="new">New</MenuItem>
        </Select>

      </FormControl>

      </Stack>

      <Typography>
        Work Order: <strong>52645</strong>
      </Typography>

      <Typography sx={{ mt:1, mb: 2 }}>
        Parent Asset: <strong>Summer Meeting Room</strong>
      </Typography>

      <ExpandableTable
        columns={columns}
        data={filteredData}
        isExpandable={true}
        isInspectable={true}
        onInspect={handleInspectAsset}
        renderExpandedContent={(row)=>(
          <Box sx={{display:"flex", alignItems:"center", gap:3}}>

            <Box sx={{display:"flex", alignItems:"center", gap:1}}>
              <Typography variant="body2">Work Order: <strong>{row.workOrder}</strong></Typography>
            </Box>

            <Box sx={{display:"flex", alignItems:"center", gap:1}}>
              <Typography variant="body2">Status:</Typography>

              <Select
                size="small"
                value={row.status}
                sx={{ fontSize: 14 }}
                onChange={(e)=>handleStatusChange(row.id,e.target.value)}
              >
                <MenuItem value="matched">Matched</MenuItem>
                <MenuItem value="missing">Missing</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
              </Select>
            </Box>

            {/* <PlagiarismIcon
              sx={{ fontSize: 24, cursor: "pointer" }}
              color="primary"
              onClick={() => handleInspectAsset(row)}
            /> */}

          </Box>
        )}
        getRowSx={(row)=>({

          backgroundColor:
            row.status === "matched"
              ? "#d6fdd9"
              : row.status === "missing"
              ? "#fff8e1"
              : row.status === "new"
              ? "#ffe5e5"
              : row.status === "returned"
              ? "#e3f2fd"
              : "inherit"

        })}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#397e00" }}
          onClick={() => console.log('Save Inventory Changes')}
        >
          Save Changes
        </Button>

        <Button size="small" variant="contained" color="primary">
          Submit to Hxgn EAM
        </Button>
      </Box>
{/* 
      <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
        Showing {filteredData.length} records
      </Typography> */}

      <AssetDetailsModal
        open={openModal}
        asset={selectedAsset}
        onClose={handleCloseModal}
      />

    </Box>
  );
}