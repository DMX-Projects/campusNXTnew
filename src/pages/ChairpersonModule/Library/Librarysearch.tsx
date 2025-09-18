import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";


type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
};

const booksData: Book[] = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic" },
  { id: 3, title: "1984", author: "George Orwell", category: "Dystopian" },
  { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming" },
  { id: 5, title: "Atomic Habits", author: "James Clear", category: "Self-help" },
];

const LibrarySearch: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6">
        📚 Library Book Search
      </h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg mb-8">
        <Search className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search by title, author, or category..."
          className="w-full pl-10 pr-4 py-2 rounded-2xl shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-2xl transition"
            >
              <h2 className="text-lg font-semibold text-indigo-700">
                {book.title}
              </h2>
              <p className="text-gray-600">👤 {book.author}</p>
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                {book.category}
              </span>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No books found 📕
          </p>
        )}
      </div>
    </div>
  );
};

export default LibrarySearch;
