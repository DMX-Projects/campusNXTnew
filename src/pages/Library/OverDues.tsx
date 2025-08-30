import React, { useMemo, useState } from "react";

// OverdueBooks.tsx
// A responsive, attractive TypeScript React component for listing overdue library books.
// Uses Tailwind CSS for styling and lucide-react for icons (install with `npm i lucide-react`).

import { Search, SortAsc, SortDesc, User, Book, Calendar } from "lucide-react";

export type OverdueBook = {
  id: string;
  title: string;
  author: string;
  borrower: string;
  borrowerEmail?: string;
  borrowedDate: string; // ISO date
  dueDate: string; // ISO date
  coverUrl?: string; // optional cover image
};

type Props = {
  books?: OverdueBook[]; // if omitted, sample data will be used
};

const sampleData: OverdueBook[] = [
  {
    id: "B-1001",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    borrower: "Asha Patel",
    borrowerEmail: "asha.patel@example.com",
    borrowedDate: "2025-06-20",
    dueDate: "2025-07-20",
    coverUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
  },
  {
    id: "B-1002",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    borrower: "Rajat Kumar",
    borrowerEmail: "rajat.kumar@example.com",
    borrowedDate: "2025-07-01",
    dueDate: "2025-07-21",
  },
  {
    id: "B-1003",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gamma, Helm, Johnson, Vlissides",
    borrower: "Neha Sharma",
    borrowerEmail: "neha.sharma@example.com",
    borrowedDate: "2025-06-15",
    dueDate: "2025-07-05",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
];

function daysOverdue(dueDateIso: string) {
  const now = new Date();
  const due = new Date(dueDateIso + "T23:59:59");
  const diff = Math.ceil((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString();
}

export default function OverDues({ books = sampleData }: Props) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"overdue" | "dueDate" | "borrower">("overdue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (books || [])
      .map((b) => ({ ...b, overdueDays: daysOverdue(b.dueDate) }))
      .filter((b) => b.overdueDays > 0)
      .filter((b) => {
        if (!q) return true;
        return (
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.borrower.toLowerCase().includes(q) ||
          (b.id && b.id.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortBy === "overdue") cmp = a.overdueDays - b.overdueDays;
        if (sortBy === "dueDate") cmp = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (sortBy === "borrower") cmp = a.borrower.localeCompare(b.borrower);
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [books, query, sortBy, sortDir]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">Overdue Books</h2>
          <span className="text-sm text-slate-500">(Currently {filtered.length} overdue)</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <label className="relative flex items-center w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, borrower or id"
              className="pl-10 pr-3 py-2 w-full rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none"
            >
              <option value="overdue">Sort: Days Overdue</option>
              <option value="dueDate">Sort: Due Date</option>
              <option value="borrower">Sort: Borrower</option>
            </select>

            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              title="Toggle sort direction"
              className="p-2 rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              {sortDir === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center">
          <p className="text-slate-600">No overdue books found. Nice work!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((b) => (
            <article
              key={b.id}
              className="flex flex-col h-full rounded-2xl border border-slate-100 bg-white p-4 shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
                  {b.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.coverUrl} alt={b.title} className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-slate-300">
                      <Book size={28} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium truncate">{b.title}</h3>
                  <p className="text-sm text-slate-500 truncate">{b.author}</p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span className="truncate">{b.borrower}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span title={`Due ${formatDate(b.dueDate)}`}>Due {formatDate(b.dueDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-2 text-right">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      daysOverdue(b.dueDate) > 14
                        ? "bg-red-100 text-red-700"
                        : daysOverdue(b.dueDate) > 7
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {daysOverdue(b.dueDate)}d
                  </div>

                  <div className="text-xs text-slate-400 mt-2">ID: {b.id}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-sm text-slate-500">Borrowed: {formatDate(b.borrowedDate)}</div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${b.borrowerEmail ?? ""}?subject=Overdue book: ${encodeURIComponent(
                      b.title
                    )}`}
                    className="text-sm py-1 px-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                  >
                    Remind
                  </a>

                  <button
                    onClick={() => navigator.clipboard?.writeText(b.id)}
                    className="text-sm py-1 px-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                    title="Copy Book ID"
                  >
                    Copy ID
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <footer className="mt-6 text-sm text-slate-400 text-center">Tip: Click "Remind" to open your mail client with a quick overdue notice.</footer>
    </div>
  );
}
