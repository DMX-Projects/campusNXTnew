import React, { useState } from 'react';
import { DollarSign, Search, Filter, Calendar, Fuel, Wrench, Users, Plus, X, Edit, Trash2 } from 'lucide-react';

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
    setNewExpense({ description: '', category: 'fuel', amount: '', date: '', busNumber: '' });
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
    setNewExpense({ description: '', category: 'fuel', amount: '', date: '', busNumber: '' });
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const ExpenseModal = ({ isOpen, onClose, onSubmit, title, submitText }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                required
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="Enter expense description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              >
                <option value="fuel">Fuel</option>
                <option value="maintenance">Maintenance</option>
                <option value="salary">Salary</option>
                <option value="insurance">Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number (Optional)</label>
              <input
                type="text"
                value={newExpense.busNumber}
                onChange={(e) => setNewExpense({...newExpense, busNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="e.g., DL-01-AB-1234"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Cancel
              </button>
              <button type="button" onClick={onSubmit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800"></h3>
          <p className="text-xs sm:text-sm text-gray-600"></p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <div>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString('en-IN')}</p>
            <p className="text-xs sm:text-sm text-gray-600">Total Expenses ({filteredExpenses.length} items)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            >
              <option value="all">All</option>
              <option value="fuel">Fuel</option>
              <option value="maintenance">Maintenance</option>
              <option value="salary">Salary</option>
              <option value="insurance">Insurance</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
              <p className="text-sm">No expenses found</p>
            </div>
          ) : (
            filteredExpenses.map((expense) => {
              const CategoryIcon = categoryIcons[expense.category];
              
              return (
                <div key={expense.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${categoryColors[expense.category]}`}>
                        <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">{expense.description}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize ${categoryColors[expense.category]}`}>
                            {expense.category}
                          </span>
                          {expense.busNumber && (
                            <span className="text-xs sm:text-sm text-gray-600">Bus: {expense.busNumber}</span>
                          )}
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {expense.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <p className="text-base sm:text-xl font-bold text-gray-900">₹{expense.amount.toLocaleString('en-IN')}</p>
                      <div className="flex flex-wrap sm:flex-nowrap space-x-2 mt-1 sm:mt-2 text-xs sm:text-sm">
                        <button 
                          onClick={() => handleEditExpense(expense)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-800 font-medium flex items-center space-x-1"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
      </div>

      {/* Add Expense Modal */}
      <ExpenseModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setNewExpense({ description: '', category: 'fuel', amount: '', date: '', busNumber: '' });
        }}
        onSubmit={handleAddExpense}
        title="Add New Expense"
        submitText="Add Expense"
      />

      {/* Edit Expense Modal */}
      <ExpenseModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingExpense(null);
          setNewExpense({ description: '', category: 'fuel', amount: '', date: '', busNumber: '' });
        }}
        onSubmit={handleUpdateExpense}
        title="Edit Expense"

        submitText="Update Expense"
      />
    </div>
  );
}