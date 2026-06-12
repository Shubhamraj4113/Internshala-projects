import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import BookCard from "../components/BookCard";

export default function BrowseBooks() {
  const { category } = useParams();

  const books = useSelector(
    state => state.books
  );

  const [search, setSearch] =
    useState("");

  const filteredBooks = books.filter(
    book =>
      book.category === category &&
      (
        book.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        book.author
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  );

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">
              Category
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-950">
              {category} Books
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Browse all titles in this category and filter instantly.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <input
              className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              placeholder="Search by title or author"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
            No books match your search. Try another keyword.
          </div>
        )}
      </div>
    </div>
  );
}