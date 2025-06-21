import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Home from "./pages/dashboard/Home";
import ProfileUser from "./pages/dashboard/ProfileUser";
import UserProtect from "./context/UserProtect";
import Unauthorized from "./pages/Unauthorized";

// ✅ Lazy Loaded Pages
const DashboardAdmin = lazy(() => import("./components/Navbar/Admin/Dashboard"));
const AllLaporan = lazy(() => import("./components/Navbar/Admin/AllLaporan"));
const AllUsers = lazy(() => import("./components/Navbar/Admin/DataUsers"));

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          {/* Redirect awal */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Role: masyarakat */}
          <Route element={<UserProtect allowedRoles={["masyarakat"]} />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/profile" element={<ProfileUser />} />
          </Route>

          {/* Role: admin dan petugas */}
          <Route element={<UserProtect allowedRoles={["admin", "petugas"]} />}>
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
            <Route path="/dashboard-admin/laporan" element={<AllLaporan />} />
            <Route path="/dashboard-admin/pengguna" element={<AllUsers />} />
          </Route>

          {/* Unauthorized fallback */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </>
  );
}
