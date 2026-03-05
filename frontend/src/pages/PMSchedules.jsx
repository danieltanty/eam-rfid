import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { workOrders } from "../mock/workOrders";
import ExpandableTable from "../components/ExpandableTable";

      {/* Alert: #ffe5e5
      Warning: #fff8e1
      Success: #d6fdd9 */}

const PMSchedules = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setTableData(workOrders);
    }, 500);
  }, []);

  const columns = [
    { field: "workOrder", headerName: "Work Order" },
    { field: "scheduledStartDate", headerName: "Schedules Start Date" },
    { field: "status", headerName: "Status" },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        PM Schedules
      </Typography>

      <Button size="small" variant="contained" sx={{ mb: 2 }}>
        Sync
      </Button>

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
              <strong>Asset:</strong> {row.asset || "-"}
            </Typography>

            <Typography variant="body2">
              <strong>PM:</strong> {row.pm || "-"}
            </Typography>

            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Last Updated: {row.lastUpdated}
            </Typography>
          </>
        )}
      />
    </Box>
  );
}

export default PMSchedules