import React from "react";
import galeri1 from "../../../assets/galeri1.jpg";
import galeri2 from "../../../assets/galeri2.jpg";
import galeri3 from "../../../assets/galeri3.jpg";
import galeri4 from "../../../assets/galeri4.jpg";

const GallerySection = () => {
  return (
    <section className="w-full max-w-[1280px] mx-auto py-10 px-6 bg-neutral-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-slate-700">
          <span className="text-cyan-400">Galeri</span> Kami
        </h2>
        <p className="text-sm text-slate-700 mt-2">
          Beberapa galeri/foto yang ditampilkan untuk setiap kegiatan dan aktivitas yang <br />
          telah dilaksanakan oleh Dinas Pemberdayaan Masyarakat Desa Kabupaten Banyumas
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 justify-center mb-6">
        <button className="px-5 py-2 bg-slate-700 text-white rounded-2xl shadow-md border-2 border-white">
          Galeri Foto (20)
        </button>
        <button className="px-5 py-2 bg-white text-slate-700 rounded-2xl border border-cyan-400">
          Galeri Video (120)
        </button>
      </div>

      {/* Gallery Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <img src={galeri1} alt="galeri1" className="rounded-[30px] h-52 object-cover p-2" />
        <img src={galeri2} alt="galeri2" className="rounded-[30px] h-52 object-cover p-2 border-4 border-teal-500" />
        <img src={galeri3} alt="galeri3" className="rounded-[30px] h-52 object-cover p-2" />
        <img src={galeri4} alt="galeri4" className="rounded-[30px] h-52 object-cover p-2" />
      </div>
    </section>
  );
};

export default GallerySection;
