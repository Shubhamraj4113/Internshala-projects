import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"
      />
    </div>
  );
}