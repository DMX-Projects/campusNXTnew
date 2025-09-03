import React, { useState } from 'react';
import { DollarSign, Search, Filter, Calendar, Fuel, Wrench, Users, Plus, X, Edit, Trash2, Menu } from 'lucide-react';

// Mock data for expenses
const initialExpenses = [
  { id: 1, description: 'Bus Fuel', category: 'fuel', amount: 2500, date: '2024-01-15', busNumber: 'DL-01-AB-1234' },
  { id: 2, description: 'Engine Repair', category: 'maintenance', amount: 15000, date: '2024-01-10', busNumber: 'DL-02-CD-5678' },
  { id: 3, description: 'Driver monthly salary - January', category: 'salary', amount: 25000, date: '2024-01-31', busNumber: null },
];

export default function Expenses() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    category: 'fuel',
    amount: '',
    date: '',
    busNumber: ''
  });

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (expense.busNumber && expense.busNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryColors = {
    fuel: 'text-blue-600 bg-blue-50',
    maintenance: 'text-yellow-600 bg-yellow-50',
    salary: 'text-green-600 bg-green-50',
    insurance: 'text-purple-600 bg-purple-50',
    other: 'text-gray-600 bg-gray-50',
  };

  const categoryIcons = {
    fuel: Fuel,
    maintenance: Wrench,
    salary: Users,
    insurance: DollarSign,
    other: DollarSign,
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    const expense = {
      id: Date.now(),
      description: newExpense.description,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date,
      busNumber: newExpense.busNumber || null
    };
    setExpenses([...expenses, expense]);
    resetForm();
    setShowAddModal(false);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setNewExpense({
      description: expense.description,
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      busNumber: expense.busNumber || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    const updatedExpenses = expenses.map(expense => 
      expense.id === editingExpense.id 
        ? {
            ...expense,
            description: newExpense.description,
            category: newExpense.category,
            amount: parseFloat(newExpense.amount),
            date: newExpense.date,
            busNumber: newExpense.busNumber || null
          }
        : expense
    );
    setExpenses(updatedExpenses);
    setShowEditModal(false);
    setEditingExpense(null);
    resetForm();
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const resetForm = () => {
    setNewExpense({
      description: '',
      category: 'fuel',
      amount: '',
      date: '',
      busNumber: ''
    });
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingExpense(null);
    resetForm();
  };

  // Add effect to prevent body scroll when modal is open
  React.useEffect(() => {
    if (showAddModal || showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddModal, showEditModal]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Expenses</h1>
              <p className="text-sm text-gray-600">{filteredExpenses.length} items</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar - Always Visible on Mobile */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-12 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Collapsible Filter */}
          {showFilters && (
            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
              >
                <option value="all">All Categories</option>
                <option value="fuel">Fuel</option>
                <option value="maintenance">Maintenance</option>
                <option value="salary">Salary</option>
                <option value="insurance">Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Summary Card - Mobile Optimized */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">Total Expenses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses List - Mobile Cards */}
      <div className="mx-4 mt-4 space-y-3">
        {filteredExpenses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">No expenses found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => {
            const CategoryIcon = categoryIcons[expense.category];
            
            return (
              <div key={expense.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[expense.category]} flex-shrink-0`}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">{expense.description}</h3>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${categoryColors[expense.category]}`}>
                        {expense.category}
                      </span>
                      {expense.busNumber && (
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                          {expense.busNumber}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(expense.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <p className="text-xl font-bold text-gray-900">₹{expense.amount.toLocaleString('en-IN')}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => handleEditExpense(expense)}
                        className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Mobile Modal Overlay */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
          {/* Mobile Modal - Slides up from bottom */}
          <div 
            className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl sm:w-full sm:max-w-md sm:max-h-[80vh] transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {showAddModal ? 'Add Expense' : 'Edit Expense'}
                </h2>
              </div>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Form */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  required
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  placeholder="Enter expense description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                >
                  <option value="fuel">Fuel</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="salary">Salary</option>
                  <option value="insurance">Insurance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bus Number (Optional)
                </label>
                <input
                  type="text"
                  value={newExpense.busNumber}
                  onChange={(e) => setNewExpense({...newExpense, busNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  placeholder="e.g., DL-01-AB-1234"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={showAddModal ? handleAddExpense : handleUpdateExpense}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base flex items-center justify-center space-x-2"
                >
                  <DollarSign className="w-5 h-5" />
                  <span>{showAddModal ? 'Add' : 'Update'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}