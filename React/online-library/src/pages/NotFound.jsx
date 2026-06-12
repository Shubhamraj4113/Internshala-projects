import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 px-6 py-16">
      <div className="max-w-xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.32em] text-indigo-600">
          Page not found
        </p>
        <h1 className="mt-4 text-6xl font-semibold text-slate-950">
          404
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          No route exists for <span className="font-medium text-slate-900">{location.pathname}</span>. Return to the library home screen.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}