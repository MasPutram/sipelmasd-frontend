import { useEffect, useState, useCallback } from "react";
import AdminSidebar from "./NavbarAdmin";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import LaporanDetailModal from "../../Modal/ModalDetailLaporan";
import getGraphQLClient from "../../../utils/graphClient";
import { gql } from "graphql-request";
import axiosInstance from "../../../utils/axiosInstance";



const LAPORAN_QUERY = gql`
  query {
    laporan {
      id
      judul
      kategori
      isi
      lokasi
      gambar
      status
      createdAt
    }
  }
`;

const AllLaporan = () => {
  const [laporan, setLaporan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusEdit, setStatusEdit] = useState("");

  const fetchLaporan = useCallback(async () => {
    try {
      const client = getGraphQLClient();
      const data = await client.request(LAPORAN_QUERY);
      setLaporan(data.laporan);
      setFiltered(data.laporan);
    } catch (err) {
      console.error("Gagal ambil laporan:", err);
    }
  }, []);

  useEffect(() => {
    fetchLaporan();
  }, [fetchLaporan]);

  useEffect(() => {
    let filteredData = [...laporan];

    if (statusFilter) {
      filteredData = filteredData.filter((item) => item.status === statusFilter);
    }

    if (dateFilter) {
      filteredData = filteredData.filter(
        (item) => dayjs(item.createdAt).format("YYYY-MM-DD") === dateFilter
      );
    }

    if (searchText) {
      filteredData = filteredData.filter((item) =>
        item.judul.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFiltered(filteredData);
  }, [statusFilter, dateFilter, searchText, laporan]);

  const handleDetail = (laporan) => {
    setSelectedLaporan(laporan);
    setStatusEdit(laporan.status);
    setModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const csrf = await axiosInstance.get("/api/csrf-token");
      await axiosInstance.patch(
        `/api/laporan/update-status/${selectedLaporan.id}`,
        { status: statusEdit },
        {
          headers: { "X-CSRF-Token": csrf.data.csrfToken },
        }
      );
      toast.success("Status berhasil diperbarui");
      setModalOpen(false);
      fetchLaporan();
    } catch (err) {
      console.error("Gagal update status:", err);
      toast.error("Gagal update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus laporan ini?")) return;
    try {
      const csrf = await axiosInstance.get("/api/csrf-token");
      await axiosInstance.delete(`/api/laporan/delete/${selectedLaporan.id}`, {
        headers: { "X-CSRF-Token": csrf.data.csrfToken },
      });
      toast.success("Laporan berhasil dihapus");
      setModalOpen(false);
      fetchLaporan();
    } catch (err) {
      console.error("Gagal hapus laporan:", err);
      toast.error("Gagal menghapus laporan");
    }
  };

  const columns = [
    {
      name: "Judul",
      selector: (row) => row.judul,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === "terkirim" ? "Terkirim (belum diproses)" : row.status,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => dayjs(row.createdAt).format("DD/MM/YYYY"),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <button
          onClick={() => handleDetail(row)}
          className="text-sm text-cyan-600 hover:underline"
        >
          Detail
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Semua Laporan
        </h1>

        {/* Card Ringkasan Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {["terkirim", "diproses", "ditolak", "selesai"].map((status) => (
            <div key={status} className="bg-white p-4 rounded shadow">
              <h2 className="text-sm font-semibold text-slate-700 capitalize">
                Status: {status}
              </h2>
              <p className="text-lg font-bold text-cyan-500">
                {laporan.filter((l) => l.status === status).length} laporan
              </p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="border p-2 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Semua Status</option>
            <option value="terkirim">Terkirim</option>
            <option value="diproses">Diproses</option>
            <option value="ditolak">Ditolak</option>
            <option value="selesai">Selesai</option>
          </select>

          <input
            type="date"
            className="border p-2 rounded"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <input
            type="text"
            placeholder="Cari judul laporan..."
            className="border p-2 rounded"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filtered}
          pagination
          responsive
          highlightOnHover
          striped
          noDataComponent={<p>Tidak ada data ditemukan.</p>}
        />

        {/* Modal Detail & Edit */}
        <LaporanDetailModal
          laporan={selectedLaporan}
          open={modalOpen}
          setOpen={setModalOpen}
          statusEdit={statusEdit}
          setStatusEdit={setStatusEdit}
          onUpdate={handleUpdateStatus}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AllLaporan;
