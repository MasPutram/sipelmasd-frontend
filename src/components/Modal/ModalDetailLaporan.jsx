// components/LaporanDetailModal.jsx
import dayjs from "dayjs";

const LaporanDetailModal = ({
  laporan,
  open,
  setOpen,
  statusEdit,
  setStatusEdit,
  onUpdate,
  onDelete,
}) => {
  if (!open || !laporan) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>

                {/* Gambar */}
        {laporan.gambar && (
          <img
            src={`http://localhost:5000${laporan.gambar}`}
            alt="Gambar Laporan"
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <p><strong>Judul:</strong> {laporan.judul}</p>
        <p><strong>Kategori:</strong> {laporan.kategori}</p>
        <p><strong>Isi:</strong> {laporan.isi}</p>
        <p><strong>Lokasi:</strong> {laporan.lokasi}</p>
        <p><strong>Tanggal:</strong> {dayjs(laporan.createdAt).format("DD/MM/YYYY")}</p>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={statusEdit}
            onChange={(e) => setStatusEdit(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="terkirim">Terkirim</option>
            <option value="diproses">Diproses</option>
            <option value="ditolak">Ditolak</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-slate-600 hover:underline"
          >
            Batal
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Hapus
          </button>
          <button
            onClick={onUpdate}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaporanDetailModal;
