import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, InputLabel, MenuItem, Select, Typography, Chip, FormControl} from "@mui/material";
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
  const locations = [...new Set(assetsDetails.map(a => a.parentDesc))];

  const [tableData, setTableData] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(locations.length ? locations[0] : "")
  const [selectedAssetDetails, setSelectedAssetDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openScanModal, setOpenScanModal] = useState(false);

  const stats = useMemo(() => {
    let matched = 0;
    let missing = 0;
    let newAssets = 0;
    let returned = 0;

    tableData.forEach(asset => {
      if (asset.status === "matched") matched++;
      if (asset.status === "missing") missing++;
      if (asset.status === "new") newAssets++;
      if (asset.status === "returned") returned++;
    });

    return {
      matched,
      missing,
      new: newAssets,
      returned
    };
  }, [tableData]);

  const calculateStats = (data) => {
    let matched = 0;
    let missing = 0;
    let newAssets = 0;
    let returned = 0;

    data.forEach(asset => {
      if (asset.status === "matched") matched++;
      if (asset.status === "missing") missing++;
      if (asset.status === "new") newAssets++;
      if (asset.status === "returned") returned++;
    });

    setStats({
      matched,
      missing,
      new: newAssets,
      returned
    });
  };

  useEffect(() => {
    if (!selectedAsset) return;

    const data = assetsDetails.filter(
      x => x.parentDesc === selectedAsset
    );

    setTableData(data);
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
    setSelectedAsset(event.target.value)
  }

  const handleProcessScan = (codes) => {

    const normalizedCodes = codes.map(c => c.trim().toUpperCase());
    const scannedSet = new Set(normalizedCodes);

    const assetMap = new Map(
      tableData.map(asset => [
        asset.assetCode.trim().toUpperCase(),
        asset
      ])
    );

    const updatedAssets = tableData.map(asset => {
      const code = asset.assetCode.trim().toUpperCase();

      if (scannedSet.has(code)) {

        if (asset.status === "missing") {
          return { ...asset, status: "returned" };
        }

        return { ...asset, status: "matched" };
      }

      return { ...asset, status: "missing" };
    });

    const newAssets = normalizedCodes
      .filter(code => !assetMap.has(code))
      .map(code => ({
        id: `new-${code}`,
        assetCode: code,
        assetDesc: "Unknown Asset",
        parentAsset: "-",
        parentDescription: "-",
        lastUpdated: new Date().toISOString(),
        status: "new"
      }));

    setTableData([...updatedAssets, ...newAssets]);

    setOpenScanModal(false);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Perform Inventory Check
      </Typography>

      <FormControl size="small" fullWidth>
        <InputLabel>Location</InputLabel>

        <Select
          value={selectedAsset}
          id="asset-filter"
          label="Location"
          onChange={handleFilterAsset}
          sx={{ mb:2 }}
        >
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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