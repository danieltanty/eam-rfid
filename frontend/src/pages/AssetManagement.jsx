import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { dummyAssets } from "../mock/assets";
import ExpandableTable from "../components/ExpandableTable";

export default function AssetManagement() {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setTableData(dummyAssets);
    }, 500);
  }, []);

  const columns = [
    { field: "assetCode", headerName: "Asset Code" },
    { field: "assetDesc", headerName: "Description" },
    { field: "parentDescription", headerName: "Location" },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Asset Management
      </Typography>

      <Button size="small" variant="contained" sx={{ mb: 2 }}>
        Sync
      </Button>
      
      {/* <Button size="small" variant="contained" sx={{ mb: 2 }}>
        Sync equipment
      </Button> */}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Showing equipment for organization: YNY
      </Typography>

      {/* <ExpandableAssetTable assets={assets} /> */}

      <ExpandableTable
        columns={columns}
        data={tableData}
        getRowSx={(row) => ({
          backgroundColor:
            row.status === "Inactive"
              ? "#ffe5e5"
              : row.status === "Warning"
              ? "#fff8e1"
              : "inherit",
        })}
        renderExpandedContent={(row) => (
          <>
            <Typography variant="body2">
              <strong>Parent Asset:</strong> {row.parentAsset || "-"}
            </Typography>

            <Typography variant="body2">
              <strong>Parent Description:</strong> {row.parentDescription || "-"}
            </Typography>

            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Last Updated: {row.lastUpdated}
            </Typography>
          </>
        )}
      />


      {/* {isMobile ? (
        <Box sx={{ mt: 1 }}>
          {assets.map((asset) => (
            // <AssetCard key={asset.assetCode} asset={asset} />
          ))}
        </Box>
      ) : (
        <AssetTable assets={assets} />
        // <div>Asset Table</div>
      )} */}
    </Box>
  );
}


// If you want next level, we can:

// Integrate RFID auto search (when tag scanned → auto highlight)

// Add infinite scroll

// Add offline badge indicator

// Design Perform Inventory page mobile-first