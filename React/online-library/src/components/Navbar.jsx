import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function submitSearch() {
    const q = query.trim();
    if (q.length === 0) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <nav className="border-b border-[#d3bfa8] bg-[#efe4d7] px-4 py-4 shadow-sm shadow-[#d8c0a8]/40 backdrop-blur-sm sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 text-[#443021]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#4f3a24] text-sm font-bold text-[#f6efe8]">
              OL
            </span>
            <div>
              <h1 className="text-lg font-semibold text-[#443021]">
                Library
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full bg-[#f7efe6] px-3 py-2 shadow-sm shadow-[#d8c0a8]/80 md:hidden">
            <span className="text-sm font-semibold text-[#5f4a3d]">Menu</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#5f4a3d] md:justify-center">
          <Link className="transition hover:text-[#443021]" to="/">
            Browse
          </Link>
          <Link className="transition hover:text-[#443021]" to="/books/Fiction">
            My Books
          </Link>
          <Link className="transition hover:text-[#443021]" to="/books/Non-Fiction">
            More
          </Link>
          <div className="hidden h-6 w-px bg-[#d3bfa8] md:block"></div>
          <span className="hidden rounded-full bg-[#f4ebe0] px-3 py-2 text-[#5f4a3d] md:inline-flex">
            All
          </span>
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              aria-label="Search library"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch();
              }}
              className="rounded-full border border-[#d3bfa8] bg-[#faf2e7] px-4 py-2 text-sm text-[#7b675a] placeholder:text-[#a38f83] shadow-sm outline-none transition focus:border-[#9a6a34] focus:ring-4 focus:ring-[#f0d8b4]"
            />
            <button
              onClick={submitSearch}
              aria-label="Submit search"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm text-[#7b675a] hover:bg-[#f0e6dc]"
            >
              🔍
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          {/* <Link className="rounded-full px-4 py-2 text-sm font-semibold text-[#5f4a3d] transition hover:text-[#443021]" to="/">
            Log In
          </Link> */}
          <Link className="rounded-full bg-[#9a6a34] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#7e5128]" to="/add-book">
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  );
}