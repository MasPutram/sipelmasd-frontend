import React from "react";
import { useNavigate } from "react-router-dom";
import logoBanyumas from "../../../assets/banyumas.png";

const NavbarLaporan = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        {/* Logo */}
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

        {/* Tombol Beranda */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
        >
          Beranda
        </button>
      </div>
    </header>
  );
};

export default NavbarLaporan;
