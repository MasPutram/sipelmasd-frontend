import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = res.data;

      // Simpan token & user
      localStorage.setItem("auth", JSON.stringify({ token, user }));
      toast.success("Berhasil login!");


      // Redirect berdasarkan role
      switch (user.role) {
        case "admin":
          navigate("/dashboard-admin");
          break;
        case "petugas":
          navigate("/dashboard-admin"); // kalau petugas sharing layout admin
          break;
        default:
          navigate("/dashboard"); // masyarakat
      }
    } catch (err) {
      setMessage("Login gagal. Cek email atau password.");
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Kiri */}
      <div className="w-1/2 bg-gradient-to-b from-blue-700 to-blue-900 flex items-center justify-center text-white">
        <div className="text-center px-8">
          <h1 className="text-4xl font-bold mb-2">SiPelMasD</h1>
          <p className="text-lg mb-4">
            Sistem Pelaporan Masyarakat Desa Rawalo yang Terpercaya & Aman
          </p>
          <button className="bg-white text-blue-700 py-2 px-4 rounded-full hover:bg-gray-200">
            Tentang Aplikasi
          </button>
        </div>
      </div>

      {/* Kanan */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Hello Again!
            <br />
            Welcome Back
          </h2>

          {message && (
            <p className="text-red-500 text-sm text-center mb-4">{message}</p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-blue-600 text-center mt-4 hover:underline cursor-pointer">
            Lupa Password?
          </p>
          <p className="text-sm text-center mt-4">
            Belum punya akun?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Daftar Sekarang
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
