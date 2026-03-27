export default function Sidebar({ setPage }) {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Control Panel</h1>
      {["dashboard","purchases","transfers","assignments"].map((item)=> (
        <button
          key={item}
          onClick={() => setPage(item)}
          className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}