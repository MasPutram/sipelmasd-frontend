import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import DOMPurify from "dompurify";

const ModalEditProfile = ({ isOpen, setIsOpen, user, setUser }) => {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Sync ulang data tiap modal dibuka
  useEffect(() => {
    if (isOpen && user) {
      setFullName(user.fullName);
      setImage(null);
    }
  }, [isOpen, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", DOMPurify.sanitize(fullName));
      if (image) formData.append("profileImage", image);

      // Update ke server
      await axiosInstance.patch("/api/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Fetch ulang user baru
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const { data } = await axiosInstance.get("/api/auth/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local & state
      setUser(data.user);
      localStorage.setItem("auth", JSON.stringify({ token, user: data.user }));

      toast.success("Profil berhasil diperbarui 🎉");
      setIsOpen(false);
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Gagal memperbarui profil 😓");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
              <Dialog.Title className="text-lg font-bold text-slate-800 mb-4">
                Edit Profil
              </Dialog.Title>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Full Name */}
                <Input
                  label="Nama Lengkap"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                {/* Profile Image */}
                <Input
                  label="Gambar Profil (Opsional)"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm text-slate-500 hover:underline"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

// ✅ Komponen input reusable
const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      {...props}
      className="w-full text-sm text-slate-600 border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-cyan-400 hover:file:bg-cyan-500"
    />
  </div>
);

export default ModalEditProfile;
