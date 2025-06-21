import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

import { toast } from "react-toastify";
import DOMPurify from "dompurify"; 

const ReportSection = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    judul: "",
    kategori: "",
    isi: "",
    lokasi: "",
    gambar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Sanitize input text
      const sanitizedForm = {
        ...form,
        judul: DOMPurify.sanitize(form.judul),
        isi: DOMPurify.sanitize(form.isi),
        lokasi: DOMPurify.sanitize(form.lokasi),
      };

      const formData = new FormData();
      Object.entries(sanitizedForm).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const csrfRes = await axiosInstance.get("/api/csrf-token");
      const csrfToken = csrfRes.data.csrfToken;

      await axiosInstance.post("/api/laporan/buat", formData, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });

      toast.success("Laporan berhasil dikirim! 🎉");
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Gagal kirim laporan:", error);
      toast.error("Gagal mengirim laporan. Silakan coba lagi.");
    }
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto py-16 px-6 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-slate-700">
          <span className="text-cyan-400">Kirim </span>Laporan Anda
        </h2>
        <p className="text-slate-600 mt-2">
          Sampaikan aspirasi atau pengaduan anda kepada kami melalui form di bawah ini.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-50 p-6 rounded-xl shadow-md space-y-6"
      >
        <InputField
          label="Judul Laporan"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          placeholder="Contoh: Jalan rusak di RT 3 RW 4"
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Kategori
          </label>
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Pilih Kategori</option>
            <option value="infrastruktur">Infrastruktur</option>
            <option value="lingkungan">Lingkungan</option>
            <option value="kesehatan">Kesehatan</option>
            <option value="keamanan">Keamanan</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <InputField
          label="Lokasi"
          name="lokasi"
          value={form.lokasi}
          onChange={handleChange}
          placeholder="Contoh: RT 3 RW 4 , Pos Ronda , Rumah Budi"
        />

        <InputField
          label="Isi Laporan"
          name="isi"
          value={form.isi}
          onChange={handleChange}
          isTextarea
          placeholder="Tulis laporan lengkap anda di sini..."
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Upload Gambar (Opsional)
          </label>
          <input
            type="file"
            name="gambar"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-cyan-400 hover:file:bg-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Kirim Laporan
        </button>
      </form>
    </section>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  isTextarea,
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-slate-700">
      {label}
    </label>
    {isTextarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="5"
        required
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder={placeholder}
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder={placeholder}
      />
    )}
  </div>
);

export default ReportSection;
