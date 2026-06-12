import { useState } from "react";
import { addBook } from "../redux/bookSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const fields = [
  { name: "title", label: "Book Title", type: "text" },
  { name: "author", label: "Author", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "rating", label: "Rating", type: "number" }
];

export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      author: "",
      category: "",
      description: "",
      rating: ""
    });

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.author ||
      !form.category ||
      !form.description ||
      !form.rating
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    dispatch(
      addBook({
        id: Date.now(),
        ...form
      })
    );

    navigate(`/books/${form.category}`);
  };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-indigo-600">
            Add new book
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Create a book entry
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Fill the details below to make the book available in the library.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="grid gap-6"
        >
          {fields.map(field => (
            <label
              key={field.name}
              className="block text-sm font-medium text-slate-700"
            >
              <span className="mb-2 block text-sm font-semibold text-slate-900">
                {field.label}
              </span>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field.name]: e.target.value
                  })
                }
                className="mt-1 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </label>
          ))}

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}