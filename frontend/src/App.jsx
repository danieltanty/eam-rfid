import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AssetManagement from "./pages/AssetManagement";
import DatabaseSync from "./pages/DatabaseSync";
import PMSchedules from "./pages/PMSchedules";
import InventoryCheck from "./pages/InventoryCheck";
import PerformInventoryCheck from "./pages/PerformInventoryCheck";
import InventorySummary from "./pages/InventorySummary";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import GlobalLoading from "./components/GlobalLoading";
import GlobalSnackbar from "./components/GlobalSnackbar";

function App() {
  return (
    <BrowserRouter>
      <GlobalLoading />
      <GlobalSnackbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/sync" element={<DatabaseSync />} />
          <Route element={<Layout />}>
            <Route path="/assets" element={<AssetManagement />} />
            <Route path="/pm" element={<PMSchedules />} />
            <Route path="/inventory" element={<InventoryCheck />} />
            <Route path="/inventory/perform" element={<PerformInventoryCheck />} />
            <Route path="/inventory/summary" element={<InventorySummary />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;