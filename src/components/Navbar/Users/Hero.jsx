import React from "react";
import services from "../../../assets/services.png";

const HeroSection = () => {
  return (
    <div className="flex w-full max-w-screen-xl mx-auto py-2 px-10 items-center justify-between">
      {/* Kiri - Text & Aksi */}
      <div className="w-[640px] flex flex-col justify-between gap-10">
        <div>
          <h1 className="text-6xl font-bold leading-snug text-black font-poppins">
            Satu Laporan <br />
            <span className="text-cyan-400">Seribu Perubahan</span>
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-mf text-slate-700 font-poppins">
            Halaman ini merupakan website resmi <br />
            Dinas Pemberdayaan Masyarakat Kabupaten Banyumas <br />
            yang akan melayani anda.
          </p>

          <div className="flex items-center gap-6">
            <button className="px-6 py-2 bg-cyan-400 text-white rounded-lg font-poppins">
              Hubungi Kami
            </button>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full border border-cyan-400 bg-neutral-50 cursor-pointer hover:bg-neutral-200" />
              <p className="text-slate-700 text-base font-poppins">
                Tonton video <br />
                pengantar profil kami
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanan - Ilustrasi */}
      <div className="relative w-[500px] h-[540px] flex items-center justify-center mt-12">
        {/* Gambar utama */}
        <img
          src={services}
          alt="Hero"
          className="z-10 relative w-[452px] h-[517px]"
        />

        {/* Lingkaran latar belakang */}
        <div className="absolute w-80 h-80 bg-teal-50 rounded-full border-[6px] border-cyan-400 top-[40px] left-[95px] -z-10" />
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full top-0 left-15 -z-20" />




        
      </div>
    </div>
  );
};

export default HeroSection;
