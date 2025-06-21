import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

import NavbarLaporan from "../../components/Navbar/Users/NavbarLaporan"; // ganti sesuai path folder lo
import ModalEditProfile from "../../components/Modal/ModalEditProfile.jsx";

const ProfileSaya = () => {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resLaporan = await axiosInstance.get("/api/laporan/saya");
        setLaporan(resLaporan.data);

        const authData = JSON.parse(localStorage.getItem("auth"));
        setUser(authData?.user || null);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarLaporan />

      <section className="max-w-[1280px] mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Profil Saya</h2>

        {user && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-10 flex items-center gap-6">
            <img
              src={
                user.profileImageUrl
                  ? `http://localhost:5000${user.profileImageUrl}`
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
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profil
              </button>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Laporan Saya</h2>

        {loading ? (
          <p>Loading...</p>
        ) : laporan.length === 0 ? (
          <p className="text-slate-600">Belum ada laporan yang kamu kirim.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {laporan.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-lg shadow border border-slate-100"
              >
                <h3 className="text-lg font-bold text-cyan-600">
                  {item.judul}
                </h3>
                <p className="text-sm text-slate-500 mb-2">
                  Kategori: {item.kategori}
                </p>
                <p className="text-sm text-slate-700 mb-2">{item.isi}</p>

                {item.lokasi && (
                  <p className="text-sm text-slate-500 mb-2">
                    📍 Lokasi: {item.lokasi}
                  </p>
                )}

                {item.gambar && (
                  <img
                    src={`http://localhost:5000${item.gambar}`}
                    alt="lampiran"
                    className="mt-2 rounded-lg max-h-48 object-cover"
                  />
                )}

                <span
                  className={`inline-block mt-4 px-3 py-1 text-xs rounded-full font-semibold ${
                    item.status === "terkirim"
                      ? "bg-yellow-100 text-yellow-600"
                      : item.status === "diproses"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  Status: {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
        <ModalEditProfile
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          user={user}
          setUser={setUser}
        />
      </section>
    </>
  );
};

export default ProfileSaya;
