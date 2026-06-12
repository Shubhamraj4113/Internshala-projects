import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useSelector } from "react-redux";

export default function Home() {
  const books = useSelector(
    state => state.books
  );

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Sci-Fi"
  ];

  const subjects = [
    { name: "Art", count: "44,216", icon: "🎨" },
    { name: "Fantasy", count: "9,820", icon: "🧙" },
    { name: "Biographies", count: "6,939", icon: "📘" },
    { name: "Science", count: "49,902", icon: "🔬" },
    { name: "Recipes", count: "5,304", icon: "🥘" },
    { name: "Romance", count: "15,858", icon: "🌹" }
  ];

  return (
    <div className="bg-[#f4efe2] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[28px] bg-white p-6 shadow-sm shadow-slate-200 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Browse by Subject
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                A smarter way to discover online library collections.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-600">
                Explore curated subjects, discover timeless books, and jump into a classic library experience built for browsing and reading.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/books/Fiction"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start browsing
                </Link>
                <Link
                  to="/add-book"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Add Book
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
                alt="Online library"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute left-6 bottom-6 rounded-3xl bg-white/95 p-5 shadow-lg shadow-slate-950/10 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                  Featured
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Classic Reads
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Curated titles from every genre.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[28px] bg-white p-6 shadow-sm shadow-slate-200 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Browse by Subject
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Find books by category and popular collections.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-stretch gap-4">
            {subjects.map(subject => (
              <button
                key={subject.name}
                type="button"
                className="flex min-w-[170px] flex-1 items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-slate-300 hover:bg-white"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                  {subject.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{subject.name}</p>
                  <p className="text-xs text-slate-500">{subject.count} Books</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[28px] bg-white p-6 shadow-sm shadow-slate-200 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#443021]">
                Classic Books
              </h2>
              <p className="mt-1 text-sm text-[#5f4a3d]">
                Timeless titles with a simple read button.
              </p>
            </div>
            <Link
              to="/books/Fiction"
              className="rounded-full border border-[#d3bfa8] bg-[#faf6ef] px-4 py-2 text-sm font-semibold text-[#5f4a3d] transition hover:bg-[#fffaf1]"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.slice(0, 8).map(book => (
              <div key={book.id} className="rounded-[24px] border border-[#d3bfa8] bg-[#faf6ef] p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="mx-auto mb-4 h-40 w-full rounded-3xl object-cover"
                />
                <p className="text-sm font-semibold text-[#443021]">{book.title}</p>
                <p className="mt-1 text-xs text-[#7b675a]">{book.author}</p>
                <Link
                  to={`/book/${book.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#9a6a34] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7e5128]"
                >
                  Read
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}