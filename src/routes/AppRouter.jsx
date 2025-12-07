import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomeDashboard from "../pages/HomeDashboard";
import BotStatusPage from "../pages/BotStatusPage";
import TaskAllocationPage from "../pages/TaskAllocationPage";
import TaskQueuePage from "../pages/TaskQueuePage";
import AnalyticsPage from "../pages/AnalyticsPage";
import MapPage from "../pages/MapPage";

function AppRouter() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ✅ Protected Routes */}
      <Route
        path="/home"
        element={isAuthenticated ? <HomeDashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/bots"
        element={isAuthenticated ? <BotStatusPage /> : <Navigate to="/" />}
      />
      <Route
        path="/tasks"
        element={isAuthenticated ? <TaskAllocationPage /> : <Navigate to="/" />}
      />
      <Route
        path="/queue"
        element={isAuthenticated ? <TaskQueuePage /> : <Navigate to="/" />}
      />
      <Route
        path="/analytics"
        element={isAuthenticated ? <AnalyticsPage /> : <Navigate to="/" />}
      />
      <Route
        path="/map"
        element={isAuthenticated ? <MapPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default AppRouter;
