import React, { useState } from "react";
import { Book, Calendar, Clock, CheckCircle, AlertCircle, BookOpen } from "lucide-react";

interface BookType {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

interface Reservation {
  bookId: number;
  bookTitle: string;
  reservationDate: string;
  returnDate: string;
  status: "Pending" | "Reserved" | "Returned";
  facultyName: string;
  department: string;
  email: string;
  purpose: string;
}

const availableBooks: BookType[] = [
  { id: 1, title: "Artificial Intelligence", author: "Stuart Russell", available: true },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", available: true },
  { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", available: false },
  { id: 4, title: "Design Patterns", author: "Gang of Four", available: true },
  { id: 5, title: "The Pragmatic Programmer", author: "David Thomas", available: false },
];

export default function BookReservation() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [reservationDate, setReservationDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [status, setStatus] = useState<"Pending" | "Reserved" | "Returned">("Pending");
  const [facultyName, setFacultyName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleReservation = () => {
    // Check if all fields are filled
    if (!selectedBook || !reservationDate || !returnDate || !facultyName || !department || !email || !purpose) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check email format
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    // Check if return date is after reservation date
    if (new Date(returnDate) <= new Date(reservationDate)) {
      alert("Return date must be after reservation date.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const book = availableBooks.find((b) => b.id === selectedBook);
      if (!book) {
        setIsSubmitting(false);
        return;
      }

      const newReservation: Reservation = {
        bookId: book.id,
        bookTitle: book.title,
        reservationDate,
        returnDate,
        status,
        facultyName,
        department,
        email,
        purpose,
      };

      setReservations([...reservations, newReservation]);
      
      // Reset form
      setSelectedBook(null);
      setReservationDate("");
      setReturnDate("");
      setStatus("Pending");
      setFacultyName("");
      setDepartment("");
      setEmail("");
      setPurpose("");
      setEmailError("");
      setIsSubmitting(false);
      
      alert("Book reservation successful!");
    }, 1000);
  };

  const getStatusColor = (status: "Pending" | "Reserved" | "Returned") => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Reserved": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Returned": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: "Pending" | "Reserved" | "Returned") => {
    switch (status) {
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Reserved": return <AlertCircle className="w-4 h-4" />;
      case "Returned": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Reservation System</h1>
          <p className="text-gray-600">Reserve books for your academic needs</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reservation Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Make a Reservation</h2>
            </div>

            <div className="space-y-6">
              {/* Faculty Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faculty Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter your department"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Validate email format
                    if (e.target.value && !validateEmail(e.target.value)) {
                      setEmailError("Please enter a valid email address (e.g., user@example.com)");
                    } else {
                      setEmailError("");
                    }
                  }}
                  placeholder="Enter your email address (e.g., john@university.edu)"
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    emailError 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500'
                  }`}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Enter purpose of reservation"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              {/* Book Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Book <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedBook ?? ""}
                    onChange={(e) => setSelectedBook(Number(e.target.value))}
                    className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    <option value="">Choose a book...</option>
                    {availableBooks.map((book) => (
                      <option key={book.id} value={book.id} disabled={!book.available}>
                        {book.title} — {book.author} {book.available ? "" : "(Unavailable)"}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reservation Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={reservationDate || new Date().toISOString().split('T')[0]}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleReservation}
                disabled={isSubmitting || !!emailError}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Reserve Book"
                )}
              </button>
            </div>
          </div>

          {/* Reservations List */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">My Reservations</h2>
              </div>
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {reservations.length} total
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {reservations.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No reservations yet</p>
                  <p className="text-gray-400 text-sm">Your reservations will appear here</p>
                </div>
              ) : (
                reservations.map((res, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{res.bookTitle}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-1 sm:gap-4">
                          <span>Faculty: {res.facultyName}</span>
                          <span>Dept: {res.department}</span>
                          <span>Email: {res.email}</span>
                          <span>Purpose: {res.purpose}</span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(res.reservationDate).toLocaleDateString()} → {new Date(res.returnDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end mt-2 sm:mt-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(res.status)}`}>
                          {getStatusIcon(res.status)}
                          <span className="ml-1">{res.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Available Books */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Book className="w-5 h-5 text-indigo-600 mr-2" />
            Available Books
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBooks.map((book) => (
              <div
                key={book.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  book.available
                    ? "border-green-200 bg-green-50/50 hover:shadow-md"
                    : "border-red-200 bg-red-50/50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm leading-tight">{book.title}</h3>
                  <div className={`w-3 h-3 rounded-full ${book.available ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  book.available 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}