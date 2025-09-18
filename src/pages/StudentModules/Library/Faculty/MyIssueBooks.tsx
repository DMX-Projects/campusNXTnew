import React from "react";

interface IssuedBook {
  id: number;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
  status: "On Time" | "Overdue";
}

const issuedBooks: IssuedBook[] = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    issueDate: "2025-08-01",
    dueDate: "2025-09-01",
    status: "On Time",
  },
  {
    id: 2,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    issueDate: "2025-07-20",
    dueDate: "2025-08-20",
    status: "Overdue",
  },
  {
    id: 3,
    title: "Database System Concepts",
    author: "Henry F. Korth",
    issueDate: "2025-08-15",
    dueDate: "2025-09-15",
    status: "On Time",
  },
];

export default function MyIssuedBooks() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Issued Books</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Book Title</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Issue Date</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{book.title}</td>
                <td className="px-6 py-3">{book.author}</td>
                <td className="px-6 py-3">{book.issueDate}</td>
                <td className="px-6 py-3">{book.dueDate}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      book.status === "On Time"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
