import React, { useState } from 'react';
import DataTable from '../LMS/Components/common/DataTable';
import Modal from '../LMS/Components/common/Modal';
import BookForm from '../LMS/Components/library/BookForm';
import LibraryStats from '../LMS/Components/library/LibraryStats';
import { mockBooks } from '../LMS/data/mockData';

const LibraryManagement: React.FC = () => {
  const [books, setBooks] = useState(mockBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const columns = [
    { key: 'isbn', label: 'ISBN', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'author', label: 'Author', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'totalCopies', label: 'Total Copies', sortable: true },
    { key: 'availableCopies', label: 'Available', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Available' ? 'bg-emerald-100 text-emerald-800' :
          value === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const handleAdd = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = (book: any) => {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      setBooks(books.filter(b => b.id !== book.id));
    }
  };

  const handleSave = (bookData: any) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? { ...bookData, id: editingBook.id } : b));
    } else {
      setBooks([...books, { ...bookData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Library Management</h1>
        <p className="text-gray-600 mt-1">Manage books, digital resources, and borrowing system</p>
      </div>

      <LibraryStats />

      <DataTable
        title="Book Collection"
        columns={columns}
        data={books}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search books..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBook ? 'Edit Book' : 'Add New Book'}
        size="lg"
      >
        <BookForm
          book={editingBook}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default LibraryManagement;