import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookDetails() {
  const { id } = useParams();

  const books = useSelector(
    state => state.books
  );

  const book = books.find(
    b => b.id === Number(id)
  );

  if (!book) {
    return (
      <div className="px-6 py-10 text-center">
        <h1 className="text-3xl font-semibold text-slate-950">
          Book not found
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          The requested book does not exist or was removed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">
              Book Details
            </p>
            <h1 className="text-4xl font-semibold text-slate-950">
              {book.title}
            </h1>
            <p className="text-base leading-7 text-slate-600">
              {book.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Author</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{book.author}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Published</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{book.publishedDate}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Pages</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{book.pages}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Rating</p>
              <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-slate-950">
                ⭐ {book.rating ?? "4.5"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-indigo-600">Category: {book.category}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/books/${book.category}`}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to {book.category}
              </Link>
              <Link
                to="/"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}