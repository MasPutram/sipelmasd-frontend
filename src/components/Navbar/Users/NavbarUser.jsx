import React from "react";
import { useNavigate } from "react-router-dom";
import logoBanyumas from "../../../assets/banyumas.png";
import { MessageCircleWarning, LogOut } from "lucide-react";

const NavbarUser = ({ scrollTo }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("auth"))?.user;

  const handleScroll = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const navItems = [
    { label: "Beranda", ref: scrollTo?.heroRef },
    { label: "News", ref: scrollTo?.trendingRef },
    { label: "Galeri", ref: scrollTo?.galeriRef },
    { label: "Lapor", ref: scrollTo?.reportRef }, // GANTI jadi scroll
  ];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        {/* Kiri - Logo */}
        <div className="flex items-center gap-4">
          <img className="w-16 h-16" src={logoBanyumas} alt="Logo" />
          <div>
            <p className="text-cyan-400 text-base font-bold tracking-wider font-['Poppins']">
              DISPERMADES
            </p>
            <p className="text-black text-base font-medium font-['Poppins']">
              Kabupaten Banyumas
            </p>
          </div>
        </div>

        {/* Tengah - Navigasi */}
        <nav className="hidden md:flex gap-12">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`${
                item.label === "Beranda"
                  ? "text-cyan-400 font-semibold"
                  : "text-gray-700"
              }`}
              onClick={() =>
                item.ref ? handleScroll(item.ref) : navigate(item.route)
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Kanan - Aksi */}
        <div className="flex gap-6 items-center">
          {/* Nama user */}
          {user && (
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="text-sm text-slate-700 font-medium hover:underline"
            >
              👤 {user.fullName}
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavbarUser;
