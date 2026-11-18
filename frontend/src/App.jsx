
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOtp";

import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import CreateReport from "./pages/CreateReport";
import SubmitComplaint from "./pages/SubmitComplaint";
import Profile from "./pages/Profile";
import MyReports from "./pages/MyReports";
import MyComplaints from "./pages/MyComplaints";
import BrowseLostItems from "./pages/BrowseLostItems";
import BrowseFoundItems from "./pages/BrowseFoundItems";
import ReportDetails from "./pages/ReportDetails";
import ComplaintDetails from "./pages/ComplaintDetails";
import About from "./pages/About";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp/:id" element={<VerifyOTP />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create-report" element={<CreateReport />} />
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/browse-lost" element={<BrowseLostItems />} />
          <Route path="/browse-found" element={<BrowseFoundItems />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
