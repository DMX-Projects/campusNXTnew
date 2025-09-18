
import React, { useMemo, useState } from "react";
import { Search, SortAsc, SortDesc, User, Book, Calendar, XCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Install with `npm i framer-motion`

export type OverdueBook = {
  id: string;
  title: string;
  author: string;
  borrower: string;
  borrowerEmail?: string;
  borrowerPhone?: string;
  borrowedDate: string; // ISO date
  dueDate: string; // ISO date
  coverUrl?: string;
};

type Props = {
  books?: OverdueBook[];
};

const sampleData: OverdueBook[] = [
  {
    id: "B-1001",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    borrower: "Asha Patel",
    borrowerEmail: "asha.patel@example.com",
    borrowerPhone: "+91 98765 43210",
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
    borrowerPhone: "+91 87654 32109",
    borrowedDate: "2025-07-01",
    dueDate: "2025-07-21",
  },
  {
    id: "B-1003",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gamma, Helm, Johnson, Vlissides",
    borrower: "Neha Sharma",
    borrowerEmail: "neha.sharma@example.com",
    borrowerPhone: "+91 76543 21098",
    borrowedDate: "2025-06-15",
    dueDate: "2025-07-05",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    id: "B-1004",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    borrower: "Priya Singh",
    borrowerEmail: "priya.singh@example.com",
    borrowerPhone: "+91 99887 76655",
    borrowedDate: "2025-07-01",
    dueDate: "2025-07-25",
  },
  {
    id: "B-1005",
    title: "Code Complete: A Practical Handbook of Software Construction",
    author: "Steve McConnell",
    borrower: "Arjun Desai",
    borrowerEmail: "arjun.desai@example.com",
    borrowedDate: "2025-06-10",
    dueDate: "2025-07-10",
  },
];

// Reusable Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-800 bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
          >
            {children}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition"
              aria-label="Close modal"
            >
              <XCircle size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function daysOverdue(dueDateIso: string) {
  const now = new Date();
  const due = new Date(dueDateIso + "T23:59:59");
  const diff = Math.ceil((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function OverDues({ books = sampleData }: Props) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"overdue" | "dueDate" | "borrower" | "title" | "author">("overdue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [internalBooks, setInternalBooks] = useState(books);
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState<OverdueBook | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return internalBooks
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
        if (sortBy === "title") cmp = a.title.localeCompare(b.title);
        if (sortBy === "author") cmp = a.author.localeCompare(b.author);
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [internalBooks, query, sortBy, sortDir]);

  const handleReturnBook = (id: string) => {
    setInternalBooks(currentBooks => currentBooks.filter(b => b.id !== id));
    setShowToast({ message: `Book ID ${id} has been returned.`, type: "success" });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard?.writeText(id);
    setShowToast({ message: `Book ID ${id} copied!`, type: "info" });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleOpenModal = (book: OverdueBook) => {
    setSelectedBorrower(book);
    setModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-slate-800">Overdue Books</h2>
          <span className="text-sm text-slate-500">(Currently {filtered.length} overdue)</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <label className="relative flex items-center w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 text-slate-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, borrower or id"
              className="pl-10 pr-3 py-2 w-full rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm"
            />
          </label>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
            >
              <option value="overdue">Days Overdue</option>
              <option value="dueDate">Due Date</option>
              <option value="borrower">Borrower</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>

            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              title="Toggle sort direction"
              className="p-2 rounded-lg border border-slate-200 bg-white shadow-sm text-slate-500 hover:bg-slate-50"
            >
              {sortDir === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-8 text-center"
        >
          <p className="text-slate-600">No overdue books found. All clear! 🥳</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((b) => (
              <motion.article
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
                className="flex flex-col h-full rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-200">
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
                    <h3 className="text-lg font-semibold text-slate-900 truncate">{b.title}</h3>
                    <p className="text-sm text-slate-500 truncate">{b.author}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                      <button
                        onClick={() => handleOpenModal(b)}
                        className="flex items-center gap-1.5 hover:text-indigo-600 transition truncate"
                        title="View borrower details"
                      >
                        <User size={14} className="text-slate-400" />
                        <span className="font-medium">{b.borrower}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        <span title={`Due ${formatDate(b.dueDate)}`} className="text-slate-500">
                          Due {formatDate(b.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-2 text-right">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
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

                <div className="mt-4 pt-4 border-t border-dashed border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-400">Borrowed: {formatDate(b.borrowedDate)}</div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReturnBook(b.id)}
                      className="text-xs py-1 px-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                    >
                      Return
                    </button>
                    <a
                      href={`mailto:${b.borrowerEmail ?? ""}?subject=Overdue book: ${encodeURIComponent(
                        b.title
                      )}`}
                      className="text-xs py-1 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                    >
                      Remind
                    </a>
                    <button
                      onClick={() => handleCopyId(b.id)}
                      className="text-xs py-1 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                      title="Copy Book ID"
                    >
                      Copy ID
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-xl z-50 transition-colors ${
              showToast.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
            }`}
          >
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Borrower Details Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedBorrower && (
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <User size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{selectedBorrower.borrower}</h3>
            <p className="text-sm text-slate-500 mb-4">Borrower Details</p>
            <div className="space-y-2 text-sm text-left w-full">
              {selectedBorrower.borrowerEmail && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  <a href={`mailto:${selectedBorrower.borrowerEmail}`} className="hover:underline">
                    {selectedBorrower.borrowerEmail}
                  </a>
                </div>
              )}
              {selectedBorrower.borrowerPhone && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  <a href={`tel:${selectedBorrower.borrowerPhone}`} className="hover:underline">
                    {selectedBorrower.borrowerPhone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-600">
                <Book size={16} className="text-slate-400" />
                <span>Borrowed: {selectedBorrower.title}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <footer className="mt-6 text-sm text-slate-400 text-center">
        Tip: Click on a borrower's name to view their contact details.
      </footer>
    </div>
  );
}