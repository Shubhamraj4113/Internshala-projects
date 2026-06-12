import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg">
          {book.category}
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-950 mb-2">
          {book.title}
        </h2>

        <p className="mb-4 text-sm leading-6 text-slate-500 max-h-16 overflow-hidden">
          {book.description}
        </p>

        <div className="flex items-center justify-between gap-3 text-sm text-slate-500 mb-5">
          <span className="font-medium text-slate-700">
            {book.author}
          </span>
          <span className="font-semibold text-indigo-600">
            ${book.price?.toFixed(2) ?? "0.00"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/book/${book.id}`}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View Details
          </Link>

          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <span>⭐</span>
            <span>{book.rating ?? "4.5"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}