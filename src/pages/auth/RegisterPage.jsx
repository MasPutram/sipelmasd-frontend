import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


import { API_PATH } from "../../utils/apiPath";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.image) formData.append("profileImage", form.image); // sesuai backend

      const res = await axiosInstance.post(API_PATH.AUTH.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        
      toast.success("Berhasil register! Silahkan Login 👋");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setMessage("Gagal register. Email mungkin sudah digunakan.");
    }
  };

  return (
    <div className="w-screen h-screen bg-white relative font-poppins overflow-hidden flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 h-full bg-gradient-to-b from-sky-600 via-blue-900 to-blue-950 relative flex items-center justify-center text-white">
        {/* Lingkaran */}
        <div className="absolute w-[557px] h-[557px] rounded-full border border-sky-600 top-[70%] left-[-15%]"></div>
        <div className="absolute w-[557px] h-[557px] rounded-full border border-sky-600 top-[68%] left-[-25%]"></div>

        <div className="flex flex-col gap-6 z-10">
          <h1 className="text-4xl font-bold">SiPelMasD</h1>
          <p className="text-lg font-medium">
            Sistem Pelaporan Masyarakat Desa Rawalo
          </p>
          <button className="bg-white text-blue-700 py-2 px-6 rounded-full hover:bg-gray-200 text-sm">
            Tentang Aplikasi
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 h-full flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleRegister}
          className="bg-white rounded shadow p-6 w-[22rem] flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-zinc-800 text-center">
            Hello! 👋
          </h2>
          <p className="text-lg text-zinc-800 text-center mb-4">
            Sign Up to Get Started
          </p>

          {message && (
            <p className="text-sm text-red-500 text-center">{message}</p>
          )}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full px-6 py-3 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-6 py-3 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-6 py-3 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Upload Gambar (opsional) */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Upload Gambar (Opsional)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-cyan-400 hover:file:bg-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
          >
            Register
          </button>

          <p className="text-sm text-center mt-2">
            Sudah punya akun?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login sekarang
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
