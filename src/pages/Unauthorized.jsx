export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl text-red-600 font-bold">
        ⛔ Akses ditolak - Kamu tidak memiliki izin ke halaman ini
      </h2>
    </div>
  );
}
