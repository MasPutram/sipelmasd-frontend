// components/Modal/AddPetugasModal.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const AddPetugasModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    profileImageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const csrf = await axiosInstance.get("/api/csrf-token");

      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (image) {
        formData.append("profileImage", image); // pakai nama field yg sesuai di backend
      }

      const res = await axiosInstance.post(
        "/api/users/register-petugas",
        formData,
        {
          headers: {
            "X-CSRF-Token": csrf.data.csrfToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message || "Petugas berhasil ditambahkan");
      onClose();
      onSuccess();
    } catch (err) {
      console.error("Gagal tambah petugas:", err);
      toast.error(err.response?.data?.message || "Gagal menambahkan petugas");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tambah Petugas</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Nama Lengkap"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:underline"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetugasModal;
