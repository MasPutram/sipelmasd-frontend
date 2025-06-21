import React from "react";
import { Mail, Globe, PhoneCall, Instagram } from "lucide-react";
import kominfoLogo from "../../assets/kominfo.png";
import logoBanyumas from "../../assets/banyumas.png";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-700 text-white rounded-t-[50px] shadow-[-1px_-20px_30px_0px_rgba(0,0,0,0.2)] mt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Left */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="flex items-center gap-3">
            <img src={logoBanyumas} alt="logo" className="w-12 h-12" />
            <p className="text-lg font-bold leading-tight">
              DISPERMADES <br /> Kabupaten Banyumas
            </p>
          </div>
          <p className="text-sm leading-relaxed">
            Website ini merupakan website resmi Dinas Pemberdayaan Desa Kabupaten Banyumas. Silahkan hubungi kami melalui alamat email:
            <br />
            <span className="font-bold">dinsospermasdes@gmail.com</span>
          </p>
          <div className="flex gap-3 mt-2">
            <div className="p-2 bg-white rounded-full">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <Instagram className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <PhoneCall className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <Mail className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="w-full md:w-1/3">
          <h4 className="font-bold mb-3">Menu Bantuan</h4>
          <ul className="text-yellow-400 space-y-1 text-sm">
            <li>Profile</li>
            <li>Berita</li>
            <li>UPT Dinas</li>
            <li>Struktur Organisasi</li>
            <li>Sarana & Prasarana</li>
            <li>PPID</li>
            <li>Tugas Pokok & Fungsi</li>
            <li>Download Dokumen</li>
          </ul>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/3 flex flex-col gap-5">
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="text-yellow-400 space-y-1 text-sm">
              <li>Kebijakan & Privasi</li>
              <li>Syarat & Ketentuan</li>
            </ul>
          </div>
          <div className="flex items-center bg-cyan-400 rounded-2xl px-5 py-3 gap-3">
            <img src={kominfoLogo} alt="Kominfo" className="w-16 h-16 object-contain" />
            <p className="text-white font-bold text-sm">
              Kementerian Komunikasi &<br /> Informatika
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 py-4">
        All Rights Reserved • Copyright Dinas Permberdayaan Masyarakat Kab. Banyumas by Putra Ram 2025 in Rawalo-Banyumas
      </div>
    </footer>
  );
};

export default Footer;
