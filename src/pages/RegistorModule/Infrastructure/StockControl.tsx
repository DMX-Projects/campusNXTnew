import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, Eye, X, Save, Calendar, User } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface StockItem {
  id: string;
  itemName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  location: string;
  lastUpdated: string;
  receivedDate: string;
  inChargeName: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<StockItem, 'id' | 'lastUpdated' | 'status'>) => void;
  isDark: boolean;
}

interface ViewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: StockItem | null;
  isDark: boolean;
}

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: StockItem | null;
  onEdit: (item: StockItem) => void;
  isDark: boolean;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAdd, isDark }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    location: '',
    receivedDate: '',
    inChargeName: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.itemName && formData.category && formData.location && formData.inChargeName) {
      onAdd(formData);
      setFormData({
        itemName: '',
        category: '',
        currentStock: 0,
        minStock: 0,
        maxStock: 0,
        location: '',
        receivedDate: '',
        inChargeName: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay with enhanced blur */}
        <div 
          className="fixed inset-0 bg-gray-900/75 transition-opacity" 
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Trick to center modal vertically */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div className={`relative inline-block align-bottom rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Add New Item
            </h2>
            <button
              onClick={onClose}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Medical Equipment">Medical Equipment</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Current Stock
                </label>
                <input
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="0"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Min Stock
                </label>
                <input
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="0"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Max Stock
                </label>
                <input
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => setFormData({ ...formData, maxStock: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Received Date
                </label>
                <input
                  type="date"
                  value={formData.receivedDate}
                  onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  In-Charge Name *
                </label>
                <input
                  type="text"
                  value={formData.inChargeName}
                  onChange={(e) => setFormData({ ...formData, inChargeName: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter in-charge name"
                  required
                />
              </div>
            </div>

            <div className={`flex justify-end space-x-3 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-sm font-medium rounded border ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ViewItemModal: React.FC<ViewItemModalProps> = ({ isOpen, onClose, item, isDark }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay with enhanced blur */}
        <div 
          className="fixed inset-0 bg-gray-900/75 transition-opacity" 
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
          onClick={onClose}
          aria-hidden="true"
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`relative inline-block align-bottom rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Item Details
            </h2>
            <button
              onClick={onClose}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Item Name</p>
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.itemName}</p>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Category</p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.category}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current</p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.currentStock}</p>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Minimum</p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.minStock}</p>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Maximum</p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.maxStock}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.location}</p>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Received Date</p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.receivedDate || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>In-Charge</p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.inChargeName}</p>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  item.status === 'In Stock' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : item.status === 'Low Stock'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, item, onEdit, isDark }) => {
  const [formData, setFormData] = useState<StockItem | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onEdit(formData);
      onClose();
    }
  };

  if (!isOpen || !item || !formData) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay with enhanced blur */}
        <div 
          className="fixed inset-0 bg-gray-900/75 transition-opacity" 
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
          onClick={onClose}
          aria-hidden="true"
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`relative inline-block align-bottom rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Edit Item
            </h2>
            <button
              onClick={onClose}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value="Furniture">Furniture</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Medical Equipment">Medical Equipment</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Current Stock
                </label>
                <input
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Min Stock
                </label>
                <input
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Max Stock
                </label>
                <input
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => setFormData({ ...formData, maxStock: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Received Date
                </label>
                <input
                  type="date"
                  value={formData.receivedDate}
                  onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  In-Charge Name *
                </label>
                <input
                  type="text"
                  value={formData.inChargeName}
                  onChange={(e) => setFormData({ ...formData, inChargeName: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>
            </div>

            <div className={`flex justify-end space-x-3 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-sm font-medium rounded border ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const initialMockData: StockItem[] = [
  {
    id: '001',
    itemName: 'Office Chairs',
    category: 'Furniture',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    location: 'Warehouse A',
    lastUpdated: '2024-01-15',
    receivedDate: '2024-01-10',
    inChargeName: 'John Smith',
    status: 'In Stock'
  },
  {
    id: '002',
    itemName: 'Laptops',
    category: 'Electronics',
    currentStock: 12,
    minStock: 15,
    maxStock: 50,
    location: 'IT Storage',
    lastUpdated: '2024-01-14',
    receivedDate: '2024-01-08',
    inChargeName: 'Sarah Johnson',
    status: 'Low Stock'
  },
  {
    id: '003',
    itemName: 'Projectors',
    category: 'Electronics',
    currentStock: 0,
    minStock: 5,
    maxStock: 20,
    location: 'Conference Room',
    lastUpdated: '2024-01-13',
    receivedDate: '2024-01-05',
    inChargeName: 'Mike Davis',
    status: 'Out of Stock'
  },
  {
    id: '004',
    itemName: 'Whiteboard',
    category: 'Office Supplies',
    currentStock: 25,
    minStock: 10,
    maxStock: 40,
    location: 'Supply Room',
    lastUpdated: '2024-01-12',
    receivedDate: '2024-01-07',
    inChargeName: 'Emily Wilson',
    status: 'In Stock'
  },
  {
    id: '005',
    itemName: 'Printers',
    category: 'Electronics',
    currentStock: 8,
    minStock: 10,
    maxStock: 25,
    location: 'IT Storage',
    lastUpdated: '2024-01-11',
    receivedDate: '2024-01-06',
    inChargeName: 'Sarah Johnson',
    status: 'Low Stock'
  },
  {
    id: '006',
    itemName: 'Desk Lamps',
    category: 'Furniture',
    currentStock: 30,
    minStock: 15,
    maxStock: 50,
    location: 'Warehouse B',
    lastUpdated: '2024-01-10',
    receivedDate: '2024-01-04',
    inChargeName: 'Robert Brown',
    status: 'In Stock'
  },
  {
    id: '007',
    itemName: 'Paper Supplies',
    category: 'Office Supplies',
    currentStock: 100,
    minStock: 50,
    maxStock: 200,
    location: 'Supply Room',
    lastUpdated: '2024-01-09',
    receivedDate: '2024-01-03',
    inChargeName: 'Emily Wilson',
    status: 'In Stock'
  },
  {
    id: '008',
    itemName: 'Conference Tables',
    category: 'Furniture',
    currentStock: 5,
    minStock: 8,
    maxStock: 15,
    location: 'Warehouse A',
    lastUpdated: '2024-01-08',
    receivedDate: '2024-01-02',
    inChargeName: 'John Smith',
    status: 'Low Stock'
  },
  {
    id: '009',
    itemName: 'Monitors',
    category: 'Electronics',
    currentStock: 22,
    minStock: 15,
    maxStock: 40,
    location: 'IT Storage',
    lastUpdated: '2024-01-07',
    receivedDate: '2024-01-01',
    inChargeName: 'Mike Davis',
    status: 'In Stock'
  },
  {
    id: '010',
    itemName: 'Filing Cabinets',
    category: 'Furniture',
    currentStock: 12,
    minStock: 8,
    maxStock: 25,
    location: 'Warehouse B',
    lastUpdated: '2024-01-06',
    receivedDate: '2023-12-28',
    inChargeName: 'Robert Brown',
    status: 'In Stock'
  },
  {
    id: '011',
    itemName: 'Keyboards',
    category: 'Electronics',
    currentStock: 0,
    minStock: 20,
    maxStock: 50,
    location: 'IT Storage',
    lastUpdated: '2024-01-05',
    receivedDate: '2023-12-25',
    inChargeName: 'Sarah Johnson',
    status: 'Out of Stock'
  },
  {
    id: '012',
    itemName: 'Ergonomic Chairs',
    category: 'Furniture',
    currentStock: 15,
    minStock: 12,
    maxStock: 30,
    location: 'Warehouse A',
    lastUpdated: '2024-01-04',
    receivedDate: '2023-12-22',
    inChargeName: 'John Smith',
    status: 'In Stock'
  }
];

export const StockControl: React.FC = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedInCharge, setSelectedInCharge] = useState('All');
  const [stockData, setStockData] = useState<StockItem[]>(initialMockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const itemsPerPage = 10;

  // Get unique in-charge names for filter dropdown
  const uniqueInChargeNames = ['All', ...Array.from(new Set(stockData.map(item => item.inChargeName)))];

  const getStockStatus = (currentStock: number, minStock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
    if (currentStock === 0) return 'Out of Stock';
    if (currentStock <= minStock) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filteredData = stockData.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesInCharge = selectedInCharge === 'All' || item.inChargeName === selectedInCharge;
    return matchesSearch && matchesCategory && matchesInCharge;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleAddItem = (newItemData: Omit<StockItem, 'id' | 'lastUpdated' | 'status'>) => {
    const newId = String(Math.max(...stockData.map(item => parseInt(item.id))) + 1).padStart(3, '0');
    const newItem: StockItem = {
      ...newItemData,
      id: newId,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: getStockStatus(newItemData.currentStock, newItemData.minStock)
    };
    setStockData([...stockData, newItem]);
    setCurrentPage(1);
  };

  const handleEditItem = (editedItem: StockItem) => {
    const updatedItem = {
      ...editedItem,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: getStockStatus(editedItem.currentStock, editedItem.minStock)
    };
    setStockData(stockData.map(item => 
      item.id === editedItem.id ? updatedItem : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setStockData(stockData.filter(item => item.id !== id));
    setShowDeleteConfirm(null);
    if (paginatedData.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewItem = (item: StockItem) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (item: StockItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Item Name', 'Category', 'Current Stock', 'Min Stock', 'Max Stock', 'Location', 'Received Date', 'In-Charge', 'Status', 'Last Updated'].join(','),
      ...filteredData.map(item => [
        item.id,
        item.itemName,
        item.category,
        item.currentStock,
        item.minStock,
        item.maxStock,
        item.location,
        item.receivedDate,
        item.inChargeName,
        item.status,
        item.lastUpdated
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stock-control.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Stock Control
            </h1>
            <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your inventory items and track stock levels
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </button>
            <button 
              onClick={exportToCSV}
              className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-colors ${
                isDark 
                  ? 'border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Eye className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="ml-3">
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Items</p>
                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stockData.length}</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`}></div>
              </div>
              <div className="ml-3">
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>In Stock</p>
                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stockData.filter(item => item.status === 'In Stock').length}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-yellow-600'}`}></div>
              </div>
              <div className="ml-3">
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Low Stock</p>
                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stockData.filter(item => item.status === 'Low Stock').length}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-red-900' : 'bg-red-100'}`}>
                <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'}`}></div>
              </div>
              <div className="ml-3">
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Out of Stock</p>
                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stockData.filter(item => item.status === 'Out of Stock').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`p-4 rounded-lg border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
            >
              <option value="All">All Categories</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="Laboratory">Laboratory</option>
            </select>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedInCharge}
                onChange={(e) => setSelectedInCharge(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                {uniqueInChargeNames.map(name => (
                  <option key={name} value={name}>
                    {name === 'All' ? 'All In-Charges' : name}
                  </option>
                ))}
              </select>
            </div>

            <button className={`inline-flex items-center justify-center px-4 py-2 text-sm border rounded-lg transition-colors ${
              isDark 
                ? 'border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}>
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={`rounded-lg border shadow-sm overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={isDark ? 'bg-gray-900' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    Item Details
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    Stock Levels
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    Location
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    Received Date
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    In-Charge
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {paginatedData.map((item) => (
                  <tr key={item.id} className={`transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.itemName}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.category} • ID: {item.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Current: {item.currentStock}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Min: {item.minStock} | Max: {item.maxStock}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                          {item.receivedDate || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                          {item.inChargeName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewItem(item)}
                          className="p-1 rounded text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          title="View Item"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditClick(item)}
                          className="p-1 rounded text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                          title="Edit Item"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="p-1 rounded text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className={`flex items-center justify-between px-4 py-3 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${
                currentPage === 1 
                  ? `${isDark ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`
                  : `${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : `${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${
                currentPage === totalPages 
                  ? `${isDark ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`
                  : `${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay with enhanced blur */}
            <div 
              className="fixed inset-0 bg-gray-900/75 transition-opacity" 
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
              onClick={() => setShowDeleteConfirm(null)}
              aria-hidden="true"
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className={`relative inline-block align-bottom rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="p-6">
                <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDark ? 'bg-red-900' : 'bg-red-100'
                }`}>
                  <Trash2 className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-lg font-semibold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Confirm Delete
                </h3>
                <p className={`text-center mb-6 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDeleteItem(showDeleteConfirm)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className={`flex-1 py-2 px-4 rounded text-sm font-medium border transition-colors ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
        isDark={isDark}
      />
      
      <ViewItemModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        item={selectedItem}
        isDark={isDark}
      />
      
      <EditItemModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={selectedItem}
        onEdit={handleEditItem}
        isDark={isDark}
      />
    </div>
  );
};
