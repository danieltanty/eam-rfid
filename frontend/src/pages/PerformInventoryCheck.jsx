import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, InputLabel, MenuItem, Select, Typography, Chip } from "@mui/material";
import { assetsDetails } from "../mock/assetsDetails";
import AssetDetailsModal from "../components/AssetDetailsModal";
import RfidScanModal from "../components/RfidScanModal";
import ExpandableTable from "../components/ExpandableTable";

{/* Alert: #ffe5e5
Warning: #fff8e1
Success: #d6fdd9 */}

const PerformInventoryCheck = () => {
  const location = useLocation();
  const inventory = location.state?.inventory;

  const [tableData, setTableData] = useState([]);
  const [selectedAsset, setSelectedAssset] = useState(inventory?.asset)
  const [selectedAssetDetails, setSelectedAssetDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openScanModal, setOpenScanModal] = useState(false);
  const [stats, setStats] = useState({
    matched: 0,
    new: 0,
    missing: 0,
    returned: 0
  });

  useEffect(() => {
    if (!inventory) return;

    console.log("Selected Inventory:", inventory);

    // call API later
    // api.get(`/inventory/${inventory.id}`)

    const data = assetsDetails.filter(x => x.parentDesc === selectedAsset)
    setTableData(data);

  }, [inventory, selectedAsset]);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      const data = assetsDetails.filter(x => x.parentDesc === selectedAsset)
      setTableData(data);
    }, 0);
  }, [selectedAsset]);

  const columns = [
    { field: "assetCode", headerName: "Asset" },
    { field: "assetDesc", headerName: "Description" },
  ];

  const handleInspectAsset = (row) => {
    setSelectedAssetDetails(row);
    setOpenModal(true);
  };

  const handleFilterAsset = (event) => {
    setSelectedAssset(event.target.value)
  }

  const handleProcessScan = (codes) => {

    const normalizedCodes = codes.map(c => c.trim().toUpperCase());
    const scannedSet = new Set(normalizedCodes);

    let matched = 0;
    let missing = 0;
    let newAssets = 0;
    let returned = 0;

    const updatedAssets = tableData.map(asset => {

      const assetCode = asset.assetCode.trim().toUpperCase();

      // asset scanned
      if (scannedSet.has(assetCode)) {

        // previously missing → returned
        if (asset.status === "missing") {
          returned++;

          return {
            ...asset,
            status: "returned"
          };
        }

        matched++;

        return {
          ...asset,
          status: "matched"
        };
      }

      // asset NOT scanned
      missing++;

      return {
        ...asset,
        status: "missing"
      };
    });

    // detect new assets
    const newAssetRecords = [];

    normalizedCodes.forEach(code => {

      const exists = tableData.some(
        asset => asset.assetCode.trim().toUpperCase() === code
      );

      if (!exists) {

        newAssets++;

        newAssetRecords.push({
          id: `new-${code}`,
          assetCode: code,
          assetDesc: "Unknown Asset",
          parentAsset: "-",
          parentDescription: "-",
          lastUpdated: new Date().toISOString(),
          status: "new"
        });

      }

    });

    setTableData([...updatedAssets, ...newAssetRecords]);

    setStats({
      matched,
      missing,
      new: newAssets,
      returned
    });

    setOpenScanModal(false);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Perform Inventory Check
      </Typography>

      <InputLabel id="asset-filter">Location</InputLabel>
      <Select
        size="small"
        id="asset-filter"
        value={selectedAsset}
        onChange={handleFilterAsset}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="Summer Meeting Room">Summer Meeting Room (WO: 52645)</MenuItem>
        <MenuItem value="Winter Meeting Room">Winter Meeting Room (WO: 52646)</MenuItem>
      </Select>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#ff9317" }}
          onClick={() => setOpenScanModal(true)}
        >
          RFID Scan
        </Button>

        <Button size="small" variant="contained" sx={{ }}>
          Save Result
        </Button>
      </Box>

      <Box sx={{ mb: 1, mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Chip
          label={`Matched: ${stats.matched}`}
          style={{ backgroundColor: "#d6fdd9", color: "darkgreen", fontSize: 12 }}
          size="small"
        />
        <Chip
          label={`New: ${stats.new}`}
          style={{ backgroundColor: "#ffe5e5", color: "darkred", fontSize: 12 }}
          size="small"
        />
        <Chip
          label={`Missing: ${stats.missing}`}
          style={{ backgroundColor: "#fff8e1", color: "brown", fontSize: 12 }}
          size="small"
        />
        <Chip
          label={`Returned: ${stats.returned}`}
          style={{ backgroundColor: "lightblue", color: "darkblue", fontSize: 12 }}
          size="small"
        />
      </Box>

      <ExpandableTable
        columns={columns}
        data={tableData}
        isExpandable={false}
        isInspectable={true}
        onInspect={handleInspectAsset}
        getRowSx={(row) => ({
          backgroundColor:
            row.status === "matched"
              ? "#d6fdd9"
              : row.status === "missing"
              ? "#fff8e1"
              : row.status === "returned"
              ? "#d0f0ff"
              : row.status === "new"
              ? "#ffe5e5"
              : "inherit"
        })}
      />

      <AssetDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        asset={selectedAssetDetails}
      />

      <RfidScanModal
        open={openScanModal}
        onClose={() => setOpenScanModal(false)}
        onProcess={handleProcessScan}
      />
      
    </Box>
  );
}

export default PerformInventoryCheck