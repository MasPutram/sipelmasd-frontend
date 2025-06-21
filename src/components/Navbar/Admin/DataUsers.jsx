// pages/DashboardAdminPengguna.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import AdminSidebar from "./NavbarAdmin";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

const DashboardAdminPengguna = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    setRole(auth?.user?.role || "");

    const fetchUsers = async () => {
      try {
        const endpoint =
          auth?.user?.role === "petugas"
            ? "/api/users/masyarakat-only"
            : "/api/users";
        const res = await axiosInstance.get(endpoint);
        setUsers(res.data);
      } catch (err) {
        console.error("Gagal ambil data pengguna:", err);
        toast.error("Gagal mengambil data pengguna");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus akun ini?")) return;
    try {
      const csrf = await axiosInstance.get("/api/csrf-token");
      await axiosInstance.delete(`/api/users/${id}`, {
        headers: {
          "X-CSRF-Token": csrf.data.csrfToken,
        },
      });
      toast.success("Akun berhasil dihapus");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Gagal hapus pengguna:", err);
      toast.error("Gagal menghapus pengguna");
    }
  };

const filteredUsers = users
  .filter((user) =>
    user.fullName.toLowerCase().includes(searchText.toLowerCase())
  )
  .filter((user) => {
    // Kalau admin login, jangan tampilkan user dengan role admin
    if (role === "admin") return user.role !== "admin";
    return true; 
  });


  const petugasCount = users.filter((user) => user.role === "petugas").length;

  const baseColumns = [
  {
    name: "Nama Lengkap",
    selector: (row) => row.fullName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Role",
    selector: (row) => row.role,
  },
];



const columns = role === "admin"
  ? [
      ...baseColumns,
      {
        name: "Aksi",
        cell: (row) => (
          <button
            onClick={() => handleDelete(row._id)}
            className="text-sm text-red-500 hover:underline"
          >
            Hapus
          </button>
        ),
      },
    ]
  : baseColumns; // Kalau petugas, gak ada tombol hapus

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Manajemen Pengguna
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm font-semibold text-slate-700">
              Semua Pengguna
            </h2>
            <p className="text-lg font-bold text-cyan-500">
              {users.length} akun
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm font-semibold text-slate-700">
              Jumlah Petugas
            </h2>
            <p className="text-lg font-bold text-cyan-500">
              {petugasCount} akun
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari nama pengguna..."
            className="border p-2 rounded w-full md:w-1/3"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          responsive
          highlightOnHover
          striped
          noDataComponent={<p>Data pengguna tidak ditemukan.</p>}
        />
      </div>
    </div>
  );
};

export default DashboardAdminPengguna;
