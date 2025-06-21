
import { Home, FileText, Users, Settings, BookText } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { MessageCircleWarning, LogOut } from "lucide-react";

const AdminSidebar = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-800 text-white p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard-admin" className="hover:text-cyan-400 flex items-center gap-2">
          <Home size={20} /> Dashboard
        </Link>
        <Link to="/dashboard-admin/laporan" className="hover:text-cyan-400 flex items-center gap-2">
          <FileText size={20} /> Semua Laporan
        </Link>
        <Link to="/dashboard-admin/pengguna" className="hover:text-cyan-400 flex items-center gap-2">
          <Users size={20} /> Data Pengguna
        </Link>
      
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
          >
            <LogOut size={20} />
            Logout
          </button>

      </nav>
    </div>
  );
};

export default AdminSidebar;
