export default function Card({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer"
    >
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}