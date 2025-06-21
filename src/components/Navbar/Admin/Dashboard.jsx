import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";


import AdminSidebar from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
import ChartLaporan from "../../Chart/LaporanChart";
import AddPetugasModal from "../../Modal/ModalAddPetugas";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    totalLaporan: 0,
    totalUser: 0,
    laporanPerluDiproses: 0,
  });

  const [adminName, setAdminName] = useState("Admin");
  const [authRole, setAuthRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/api/admin/dashboard-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Gagal ambil statistik:", err);
      }
    };

    const auth = JSON.parse(localStorage.getItem("auth"));
    setAdminName(auth?.user?.fullName || "Admin");
    setAuthRole(auth?.user?.role || null);
    setUser(auth?.user);

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">
          Selamat datang, {adminName}
        </h1>
        <p className="text-slate-600 mb-6">
          Panel admin untuk mengelola laporan, pengguna, dan pengaturan sistem.
        </p>

        {/* Profile Card */}
        <section className="max-w-[1280px] mx-auto py-4 ">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 px-[3px]">Profil Saya</h2>

          {user && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-8 flex items-center gap-6">
              <img
                src={
                  user.profileImageUrl
                    ? `https://sipelmasd-production.up.railway.app${user.profileImageUrl}`
                    : "https://placehold.co/100x100"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />

              <div>
                <p className="text-lg font-semibold text-slate-800">
                  {user.fullName}
                </p>
                <p className="text-sm text-slate-600">{user.email}</p>
                <button
                  className="mt-3 text-sm text-cyan-500 underline hover:text-cyan-600"
                  onClick={() => alert("Edit profil belum tersedia")}
                >
                  Edit Profil
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Laporan"
            value={stats.totalLaporan}
            onClick={() => navigate("/dashboard-admin/laporan")}
          />
          <StatCard
            title="Pengguna Terdaftar"
            value={stats.totalUser}
            onClick={() => navigate("/dashboard-admin/pengguna")}
          />
          <StatCard
            title="Laporan Perlu Diproses"
            value={stats.laporanPerluDiproses}
            onClick={() =>
              navigate("/dashboard-admin/laporan?filter=terkirim")
            }
          />
          {authRole === "admin" && (
            <StatCard
              title="Tambah Petugas"
              value="➕"
              onClick={() => setModalOpen(true)}
            />
          )}
        </div>

        <AddPetugasModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => window.location.reload()}
        />

        <ChartLaporan />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, onClick }) => (
  <div
    onClick={onClick}
    className="p-6 bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition"
  >
    <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
    <p className="text-3xl font-bold text-cyan-500 mt-1">
      {typeof value === "number" ? value : <span>{value}</span>}
    </p>
  </div>
);

export default DashboardAdmin;
