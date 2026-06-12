import { useSearchParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BookCard from "../components/BookCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  const books = useSelector((state) => state.books || []);

  const filtered = q
    ? books.filter((b) => {
        const t = b.title.toLowerCase();
        const a = b.author.toLowerCase();
        const s = q.toLowerCase();
        return t.includes(s) || a.includes(s);
      })
    : [];

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-950">Search results</h1>
          <p className="mt-1 text-sm text-slate-500">
            {q ? (
              <span>
                Results for <strong className="text-slate-900">{q}</strong>
              </span>
            ) : (
              "Type a query in the navbar and press Enter."
            )}
          </p>
        </div>

        {q && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {q && filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
            No books match "{q}". Try another keyword.
          </div>
        )}

        {!q && (
          <div className="mt-6">
            <Link to="/" className="text-indigo-600 hover:underline">
              Return home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
