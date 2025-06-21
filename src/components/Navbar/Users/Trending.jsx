import React from "react";
import news1 from "../../../assets/news-1.jpg";
import news2 from "../../../assets/news-2.jpg"; // Tambahkan gambar kedua
import news3 from "../../../assets/news-3.jpeg";

const TrendingSection = () => {
  const rightCards = [
    {
      image: news2,
      kategori: "Finance",
      days: "3 Hari yang lalu",
      title: "Pasar Eropa dan Kanada\nOmzet Kopi Ratusan Juta Per Hari ...",
      rating: "⭐ 4.8",
      comment: "💬 1k",
      views : "👁️ 66k"
    },
    {
      image: news3,
      kategori: "Olahraga",
      days: "1 Hari yang lalu",
      title: "Unsoed Jadi Tuan Rumah Pomprov Jateng 2025, Siap Gelar 6 Cabang Olahrga ...",
      rating : "⭐ 4.9",
      comment: "💬 50k",
      views : "👁️ 562k"
    },
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto py-10 px-6 bg-white relative">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-slate-700">
          <span className="text-cyan-400">Trending </span>Topik
        </h2>
        <p className="text-sm text-slate-700 mt-2">
          Informasi dan berita hangat yang sedang menjadi sorotan
          <br /> masyarakat Kabupaten Nias Selatan ditampilkan di sini.
        </p>
      </div>


  {/* Content */}
      <div className="flex flex-wrap justify-between gap-6">
        {/* Left Big Card */}
        <div className="w-full lg:w-[680px] h-100 relative rounded-[30px] overflow-hidden shadow-lg">
          <img
            src={news1}
            alt="news-left"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-[30px]"
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start text-white">
              <span className="text-xl font-medium">Ketertiban</span>
              <span className="text-base">2 Hari yang lalu</span>
            </div>
            <p className="text-xl font-semibold text-white mt-35 shadow-lg">
              Banyumas Dijuluki Kota Sejuta Parkir <br />
              Pemkab Gandeng TNI-Polri Bikin Satgas Parkir...
            </p>
            <div className="flex justify-between items-end text-xs text-white">
              <span>⭐ 4.8</span>
              <div className="flex items-center gap-4">
                <span>💬 20</span>
                <span>👁️ 415</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Small Cards */}
        <div className="flex flex-col gap-4 w-full lg:w-[480px]">
          {rightCards.map((item, i) => (
            <div key={i} className="flex bg-neutral-50 rounded-[10px] shadow-sm overflow-hidden">
              <img
                src={item.image}
                alt={`trending-${i}`}
                className="w-44 h-48 object-cover"
              />
              <div className="flex flex-col justify-between p-4 w-full">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{item.kategori}</span>
                  <span className="text-base">{item.days}</span>
                </div>
                <p className="text-neutral-700 text-lg font-bold">
                  {item.title}
                </p>
                <div className="flex justify-between text-xs text-slate-700">
                  <span>{item.rating}</span>
                  <div className="flex items-center gap-4">
                    <span>{item.comment}</span>
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
