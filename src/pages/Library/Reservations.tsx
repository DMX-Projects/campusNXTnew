import React, { useState } from 'react';
import { Calendar, User, Book, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { reservations, books, members } from './Data/mockData';

export default function Reservations() {
  const [activeTab, setActiveTab] = useState<'active' | 'fulfilled' | 'cancelled'>('active');

  const filterReservations = (status: string) => {
    return reservations.filter(reservation => reservation.status === status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Fulfilled': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Clock className="h-4 w-4" />;
      case 'Fulfilled': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const activeReservations = filterReservations('Active');
  const fulfilledReservations = filterReservations('Fulfilled');
  const cancelledReservations = filterReservations('Cancelled');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Book Reservations
          </h2>
          <p className="text-gray-600">Manage book reservations and waiting lists</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Book className="h-4 w-4" />
          New Reservation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Active</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">{activeReservations.length}</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Fulfilled</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">{fulfilledReservations.length}</p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-800">Cancelled</span>
          </div>
          <p className="text-2xl font-bold text-red-900 mt-1">{cancelledReservations.length}</p>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Avg Wait Time</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 mt-1">5.2 days</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'active'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Clock className="h-4 w-4" />
          Active ({activeReservations.length})
        </button>
        <button
          onClick={() => setActiveTab('fulfilled')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'fulfilled'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          Fulfilled ({fulfilledReservations.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'cancelled'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <XCircle className="h-4 w-4" />
          Cancelled ({cancelledReservations.length})
        </button>
      </div>

      {/* Reservations List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterReservations(activeTab === 'active' ? 'Active' : activeTab === 'fulfilled' ? 'Fulfilled' : 'Cancelled')
                .map((reservation) => {
                const book = books.find(b => b.id === reservation.bookId);
                const member = members.find(m => m.id === reservation.memberId);
                const daysSince = Math.ceil((Date.now() - new Date(reservation.reservationDate).getTime()) / (1000 * 60 * 60 * 24));

                return (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Book className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{book?.title}</div>
                          <div className="text-sm text-gray-500">by {book?.author}</div>
                          <div className="text-xs text-gray-400">ISBN: {book?.isbn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-6 w-6 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member?.name}</div>
                          <div className="text-sm text-gray-500">{member?.membershipType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(reservation.reservationDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {daysSince} days ago
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        #{reservation.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {activeTab === 'active' && (
                        <div className="flex items-center gap-2">
                          <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">
                            Fulfill
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">
                            Cancel
                          </button>
                        </div>
                      )}
                      {activeTab === 'fulfilled' && (
                        <span className="text-green-600">Completed</span>
                      )}
                      {activeTab === 'cancelled' && (
                        <span className="text-red-600">Cancelled</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Books for Reservation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Reserved Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.filter(book => book.availableCopies === 0).map((book) => (
            <div key={book.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{book.title}</h4>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500 mt-1">{book.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-red-600 font-medium">All copies issued</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  2 waiting
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}