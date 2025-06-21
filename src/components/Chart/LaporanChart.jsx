import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";



const ChartLaporan = () => {
  const [chartData, setChartData] = useState([]);

useEffect(() => {
  const fetchChart = async () => {
    try {
      // Gak perlu pisah role sekarang, cukup pakai 1 endpoint
      const res = await axiosInstance.get("/api/laporan/chart-laporan");
      setChartData(res.data);
    } catch (err) {
      console.error("Gagal ambil data chart:", err);
    }
  };

  fetchChart();
}, []);


  return (
    <div className="bg-white mt-10 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-slate-700 mb-4">
        Statistik Laporan
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="jumlah" fill="#06b6d4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartLaporan;
