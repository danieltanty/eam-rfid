import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { inventoryCheckData } from "../mock/InventoryCheckData";
import ExpandableTable from "../components/ExpandableTable";

{/* Alert: #ffe5e5
Warning: #fff8e1
Success: #d6fdd9 */}

const InventoryCheck = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setTableData(inventoryCheckData);
    }, 500);
  }, []);

  const handleStartInventory = () => {
    if (tableData.length === 0) return;

    navigate("/inventory/perform", {
      state: {
        inventory: tableData[0],
      },
    });
  };

  const handleStartRowInventory = (row) => {
    navigate("/inventory/perform", {
      state: {
        inventory: row,
      },
    });
  };

  const columns = [
    { field: "workOrder", headerName: "Work Order" },
    { field: "asset", headerName: "Asset" },
    { field: "status", headerName: "Status" },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Inventory Check
      </Typography>

      <Button
        size="small"
        variant="contained"
        sx={{ mb: 2, backgroundColor: "#ff9317" }}
        onClick={handleStartInventory}
      >
        Start Inventory Check
      </Button>

      <br />

      <Button size="small" variant="contained" sx={{ mb: 2 }}>
        Inventory Summary
      </Button>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Today's Inventory Check (2)
      </Typography>

      <ExpandableTable
        columns={columns}
        data={tableData}
        getRowSx={(row) => ({
          backgroundColor:
            row.status === "Job Done"
              ? "#d6fdd9"
              : "inherit",
        })}
        renderExpandedContent={(row) => (
          <>
            <Typography variant="body2">
              <strong>Scheduled Start Date:</strong> {row.scheduledStartDate || "-"}
            </Typography>

            <Typography variant="body2">
              <strong>PM:</strong> {row.pm || "-"}
            </Typography>

            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Last Updated: {row.lastUpdated}
            </Typography>

            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "#ff9317" }}
              onClick={() => handleStartRowInventory(row)}
            >
              Check Inventory
            </Button>
          </>
        )}
      />
    </Box>
  );
}

export default InventoryCheck