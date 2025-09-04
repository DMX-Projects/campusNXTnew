import React, { useState } from 'react';

interface InventoryItem {
  id: string;
  category: string;
  subCategory: string;
  itemName: string;
  itemCode: string;
  quantityAvailable: number;
  quantityConsumed: number;
  thresholdLevel: number;
  unitPrice: number;
  totalValue: number;
  lastPurchasedDate: string;
  lastConsumedDate: string;
  supplierInfo: string;
  storageLocation: string;
  condition: 'Good' | 'Damaged' | 'Under Maintenance' | 'Needs Replacement';
  purchaseOrderNumber?: string;
  warrantyExpiry?: string;
  remarks?: string;
}

interface PurchaseRecord {
  id: string;
  itemId: string;
  purchaseDate: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  supplier: string;
  billNumber: string;
  authorizedBy: string;
}

interface ConsumptionRecord {
  id: string;
  itemId: string;
  consumptionDate: string;
  quantity: number;
  purpose: string;
  authorizedBy: string;
  location: string;
}

interface NewItemForm {
  category: string;
  subCategory: string;
  itemName: string;
  itemCode: string;
  quantityAvailable: number;
  thresholdLevel: number;
  unitPrice: number;
  supplierInfo: string;
  storageLocation: string;
  condition: 'Good' | 'Damaged' | 'Under Maintenance' | 'Needs Replacement';
  purchaseOrderNumber: string;
  warrantyExpiry: string;
  remarks: string;
}

interface UpdateStockForm {
  newQuantity: number;
  reason: string;
  authorizedBy: string;
}

interface PurchaseForm {
  itemId: string;
  purchaseDate: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
  billNumber: string;
  authorizedBy: string;
}

interface ConsumptionForm {
  itemId: string;
  consumptionDate: string;
  quantity: number;
  purpose: string;
  authorizedBy: string;
  location: string;
}

interface PurchaseRequestForm {
  suggestedQuantity: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  justification: string;
  requestedBy: string;
}

const InventoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'purchases' | 'consumption' | 'reports'>('inventory');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'low-stock' | 'damaged' | 'maintenance'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal states
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showConsumptionModal, setShowConsumptionModal] = useState(false);
  const [showPurchaseRequestModal, setShowPurchaseRequestModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [updateStockItem, setUpdateStockItem] = useState<InventoryItem | null>(null);

  // Form states
  const [newItemForm, setNewItemForm] = useState<NewItemForm>({
    category: '',
    subCategory: '',
    itemName: '',
    itemCode: '',
    quantityAvailable: 0,
    thresholdLevel: 0,
    unitPrice: 0,
    supplierInfo: '',
    storageLocation: '',
    condition: 'Good',
    purchaseOrderNumber: '',
    warrantyExpiry: '',
    remarks: ''
  });

  const [updateStockForm, setUpdateStockForm] = useState<UpdateStockForm>({
    newQuantity: 0,
    reason: '',
    authorizedBy: ''
  });

  const [purchaseForm, setPurchaseForm] = useState<PurchaseForm>({
    itemId: '',
    purchaseDate: '',
    quantity: 0,
    unitPrice: 0,
    supplier: '',
    billNumber: '',
    authorizedBy: ''
  });

  const [consumptionForm, setConsumptionForm] = useState<ConsumptionForm>({
    itemId: '',
    consumptionDate: '',
    quantity: 0,
    purpose: '',
    authorizedBy: '',
    location: ''
  });

  const [editItemForm, setEditItemForm] = useState<NewItemForm>({
    category: '',
    subCategory: '',
    itemName: '',
    itemCode: '',
    quantityAvailable: 0,
    thresholdLevel: 0,
    unitPrice: 0,
    supplierInfo: '',
    storageLocation: '',
    condition: 'Good',
    purchaseOrderNumber: '',
    warrantyExpiry: '',
    remarks: ''
  });

  const [purchaseRequestForm, setPurchaseRequestForm] = useState<PurchaseRequestForm>({
    suggestedQuantity: 0,
    priority: 'medium',
    justification: '',
    requestedBy: ''
  });

  // Sample inventory data
  const inventoryData: InventoryItem[] = [
    {
      id: 'INV001', category: 'Furniture', subCategory: 'Beds', itemName: 'Single Bed Frame',
      itemCode: 'FUR-BED-001', quantityAvailable: 120, quantityConsumed: 100, thresholdLevel: 20,
      unitPrice: 7500, totalValue: 900000, lastPurchasedDate: '2024-12-15', lastConsumedDate: '2025-06-10',
      supplierInfo: 'XYZ Furniture Co., Bangalore', storageLocation: 'A Block Storage Room',
      condition: 'Good', purchaseOrderNumber: 'PO/2024/001', warrantyExpiry: '2026-12-15'
    },
    {
      id: 'INV002', category: 'Furniture', subCategory: 'Study Tables', itemName: 'Wooden Study Table',
      itemCode: 'FUR-TAB-001', quantityAvailable: 15, quantityConsumed: 85, thresholdLevel: 20,
      unitPrice: 4500, totalValue: 67500, lastPurchasedDate: '2024-11-20', lastConsumedDate: '2025-07-15',
      supplierInfo: 'Study Solutions Pvt Ltd., Mysore', storageLocation: 'A Block Storage Room',
      condition: 'Good', purchaseOrderNumber: 'PO/2024/015'
    },
    {
      id: 'INV003', category: 'Appliances', subCategory: 'Fans', itemName: 'Ceiling Fan',
      itemCode: 'APP-FAN-001', quantityAvailable: 8, quantityConsumed: 195, thresholdLevel: 15,
      unitPrice: 3500, totalValue: 28000, lastPurchasedDate: '2025-03-01', lastConsumedDate: '2025-07-10',
      supplierInfo: 'Cooling Solutions Ltd., Bangalore', storageLocation: 'Maintenance Room',
      condition: 'Good', purchaseOrderNumber: 'PO/2025/003', warrantyExpiry: '2027-03-01'
    },
    {
      id: 'INV004', category: 'Appliances', subCategory: 'Refrigerators', itemName: 'Double Door Refrigerator',
      itemCode: 'APP-REF-001', quantityAvailable: 2, quantityConsumed: 8, thresholdLevel: 3,
      unitPrice: 48000, totalValue: 96000, lastPurchasedDate: '2025-01-15', lastConsumedDate: '2025-06-20',
      supplierInfo: 'ElectroCool Pvt Ltd., Bangalore', storageLocation: 'Kitchen Storage',
      condition: 'Good', purchaseOrderNumber: 'PO/2025/001', warrantyExpiry: '2028-01-15'
    },
    {
      id: 'INV005', category: 'Kitchenware', subCategory: 'Cutlery', itemName: 'Stainless Steel Spoon',
      itemCode: 'KIT-CUT-001', quantityAvailable: 1000, quantityConsumed: 850, thresholdLevel: 200,
      unitPrice: 25, totalValue: 25000, lastPurchasedDate: '2025-06-01', lastConsumedDate: '2025-08-15',
      supplierInfo: 'Kitchen Essentials Co., Mumbai', storageLocation: 'Kitchen Store Room',
      condition: 'Good', purchaseOrderNumber: 'PO/2025/006'
    },
    {
      id: 'INV006', category: 'Kitchenware', subCategory: 'Plates', itemName: 'Melamine Plate',
      itemCode: 'KIT-PLA-001', quantityAvailable: 45, quantityConsumed: 480, thresholdLevel: 100,
      unitPrice: 40, totalValue: 1800, lastPurchasedDate: '2025-05-15', lastConsumedDate: '2025-08-10',
      supplierInfo: 'Crockery Wholesale, Chennai', storageLocation: 'Kitchen Store Room',
      condition: 'Good', purchaseOrderNumber: 'PO/2025/005'
    },
    {
      id: 'INV007', category: 'Maintenance', subCategory: 'Electrical', itemName: 'LED Tube Light (18W)',
      itemCode: 'MAI-ELE-001', quantityAvailable: 25, quantityConsumed: 130, thresholdLevel: 50,
      unitPrice: 200, totalValue: 5000, lastPurchasedDate: '2025-04-25', lastConsumedDate: '2025-08-05',
      supplierInfo: 'Lightmart Pvt Ltd., Bangalore', storageLocation: 'Maintenance Store Room',
      condition: 'Good', purchaseOrderNumber: 'PO/2025/004', warrantyExpiry: '2027-04-25'
    },
    {
      id: 'INV008', category: 'Maintenance', subCategory: 'Plumbing', itemName: 'Water Tap',
      itemCode: 'MAI-PLU-001', quantityAvailable: 3, quantityConsumed: 42, thresholdLevel: 10,
      unitPrice: 850, totalValue: 2550, lastPurchasedDate: '2025-03-10', lastConsumedDate: '2025-07-20',
      supplierInfo: 'Plumbing Solutions, Bangalore', storageLocation: 'Maintenance Store Room',
      condition: 'Damaged', purchaseOrderNumber: 'PO/2025/002', remarks: '2 units damaged during installation'
    },
    {
      id: 'INV009', category: 'Textiles', subCategory: 'Bedding', itemName: 'Bed Sheet Set',
      itemCode: 'TEX-BED-001', quantityAvailable: 80, quantityConsumed: 220, thresholdLevel: 50,
      unitPrice: 450, totalValue: 36000, lastPurchasedDate: '2025-02-28', lastConsumedDate: '2025-08-20',
      supplierInfo: 'Textile Hub, Coimbatore', storageLocation: 'Laundry Room',
      condition: 'Good', purchaseOrderNumber: 'PO/2025/007'
    },
    {
      id: 'INV010', category: 'Security', subCategory: 'Access Control', itemName: 'Digital Door Lock',
      itemCode: 'SEC-LOC-001', quantityAvailable: 1, quantityConsumed: 15, thresholdLevel: 3,
      unitPrice: 12000, totalValue: 12000, lastPurchasedDate: '2025-01-05', lastConsumedDate: '2025-08-12',
      supplierInfo: 'SecureTech Systems, Bangalore', storageLocation: 'Security Office',
      condition: 'Under Maintenance', purchaseOrderNumber: 'PO/2025/008', warrantyExpiry: '2027-01-05',
      remarks: 'Malfunctioning, sent for repair'
    }
  ];

  // Sample purchase records
  const purchaseRecords: PurchaseRecord[] = [
    {
      id: 'PUR001', itemId: 'INV001', purchaseDate: '2024-12-15', quantity: 50, unitPrice: 7500,
      totalCost: 375000, supplier: 'XYZ Furniture Co.', billNumber: 'BILL/2024/001', authorizedBy: 'Principal'
    },
    {
      id: 'PUR002', itemId: 'INV003', purchaseDate: '2025-03-01', quantity: 25, unitPrice: 3500,
      totalCost: 87500, supplier: 'Cooling Solutions Ltd.', billNumber: 'BILL/2025/003', authorizedBy: 'Chairman'
    }
  ];

  // Sample consumption records
  const consumptionRecords: ConsumptionRecord[] = [
    {
      id: 'CON001', itemId: 'INV001', consumptionDate: '2025-06-10', quantity: 20,
      purpose: 'New room setup - A Block', authorizedBy: 'Warden', location: 'A Block Rooms 301-320'
    },
    {
      id: 'CON002', itemId: 'INV005', consumptionDate: '2025-08-15', quantity: 50,
      purpose: 'Mess hall replacement', authorizedBy: 'Mess Manager', location: 'Main Mess Hall'
    }
  ];

  const filteredInventory = inventoryData.filter(item => {
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'low-stock' && item.quantityAvailable <= item.thresholdLevel) ||
      (selectedFilter === 'damaged' && item.condition === 'Damaged') ||
      (selectedFilter === 'maintenance' && item.condition === 'Under Maintenance');

    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Event handlers
  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateStock = (item: InventoryItem) => {
    setUpdateStockItem(item);
    setUpdateStockForm({
      newQuantity: item.quantityAvailable,
      reason: '',
      authorizedBy: ''
    });
    setShowUpdateStockModal(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const closeAllModals = () => {
    setShowAddItemModal(false);
    setShowUpdateStockModal(false);
    setShowPurchaseModal(false);
    setShowConsumptionModal(false);
    setShowPurchaseRequestModal(false);
    setShowEditItemModal(false);
    setUpdateStockItem(null);
  };

  const handleAddNewItem = () => {
    // Add new item logic here
    console.log('Adding new item:', newItemForm);
    alert('New item added successfully!');
    setNewItemForm({
      category: '',
      subCategory: '',
      itemName: '',
      itemCode: '',
      quantityAvailable: 0,
      thresholdLevel: 0,
      unitPrice: 0,
      supplierInfo: '',
      storageLocation: '',
      condition: 'Good',
      purchaseOrderNumber: '',
      warrantyExpiry: '',
      remarks: ''
    });
    closeAllModals();
  };

  const handleUpdateStockSubmit = () => {
    // Update stock logic here
    console.log('Updating stock for:', updateStockItem?.itemName, updateStockForm);
    alert('Stock updated successfully!');
    closeAllModals();
  };

  const handleAddPurchaseRecord = () => {
    // Add purchase record logic here
    console.log('Adding purchase record:', purchaseForm);
    alert('Purchase record added successfully!');
    setPurchaseForm({
      itemId: '',
      purchaseDate: '',
      quantity: 0,
      unitPrice: 0,
      supplier: '',
      billNumber: '',
      authorizedBy: ''
    });
    closeAllModals();
  };

  const handleRecordConsumption = () => {
    // Record consumption logic here
    console.log('Recording consumption:', consumptionForm);
    alert('Consumption recorded successfully!');
    setConsumptionForm({
      itemId: '',
      consumptionDate: '',
      quantity: 0,
      purpose: '',
      authorizedBy: '',
      location: ''
    });
    closeAllModals();
  };

  const handleGeneratePurchaseRequest = () => {
    // Generate purchase request logic here
    const requiredQuantity = selectedItem?.thresholdLevel ? 
      (selectedItem.thresholdLevel * 2) - selectedItem.quantityAvailable : 
      selectedItem?.quantityAvailable || 0;
    
    console.log('Generating purchase request for:', {
      item: selectedItem?.itemName,
      currentStock: selectedItem?.quantityAvailable,
      suggestedQuantity: purchaseRequestForm.suggestedQuantity,
      priority: purchaseRequestForm.priority,
      justification: purchaseRequestForm.justification,
      requestedBy: purchaseRequestForm.requestedBy,
      supplier: selectedItem?.supplierInfo
    });
    
    alert(`Purchase request generated for ${selectedItem?.itemName}!\nQuantity: ${purchaseRequestForm.suggestedQuantity}\nPriority: ${purchaseRequestForm.priority}`);
    setPurchaseRequestForm({
      suggestedQuantity: 0,
      priority: 'medium',
      justification: '',
      requestedBy: ''
    });
    closeAllModals();
  };

  const handleEditItemSubmit = () => {
    // Edit item logic here
    console.log('Updating item details:', editItemForm);
    alert('Item details updated successfully!');
    closeAllModals();
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Good': return 'bg-green-500 text-white';
      case 'Damaged': return 'bg-red-500 text-white';
      case 'Under Maintenance': return 'bg-yellow-500 text-white';
      case 'Needs Replacement': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Analytics data
  const totalItems = inventoryData.length;
  const totalValue = inventoryData.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventoryData.filter(item => item.quantityAvailable <= item.thresholdLevel).length;
  const damagedItems = inventoryData.filter(item => item.condition === 'Damaged' || item.condition === 'Under Maintenance').length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {[
            { key: 'inventory', label: 'Inventory Overview' },
            { key: 'purchases', label: 'Purchase Records' },
            { key: 'consumption', label: 'Consumption Tracking' },
            { key: 'reports', label: 'Reports & Analytics' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Inventory Overview Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Items</h3>
                <p className="text-3xl font-bold text-blue-600">{totalItems}</p>
                <p className="text-sm text-gray-600">Different inventory items</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Value</h3>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
                <p className="text-sm text-gray-600">Current inventory worth</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Low Stock Alert</h3>
                <p className="text-3xl font-bold text-yellow-600">{lowStockItems}</p>
                <p className="text-sm text-gray-600">Items need restocking</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Maintenance Required</h3>
                <p className="text-3xl font-bold text-red-600">{damagedItems}</p>
                <p className="text-sm text-gray-600">Items need attention</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search by item name, code, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All Items' },
                    { key: 'low-stock', label: 'Low Stock' },
                    { key: 'damaged', label: 'Damaged' },
                    { key: 'maintenance', label: 'Maintenance' },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedFilter === filter.key
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
                      }`}
                      onClick={() => setSelectedFilter(filter.key as any)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowAddItemModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  Add New Item
                </button>
              </div>

              {/* Inventory Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className={`hover:bg-gray-50 transition-colors duration-200 ${item.quantityAvailable <= item.thresholdLevel ? 'bg-red-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                            <div className="text-sm text-gray-500">{item.itemCode}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.category}</div>
                          <div className="text-sm text-gray-500">{item.subCategory}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Available: {item.quantityAvailable}</div>
                          <div className="text-sm text-gray-500">Threshold: {item.thresholdLevel}</div>
                          {item.quantityAvailable <= item.thresholdLevel && (
                            <div className="text-xs text-red-600 font-semibold">⚠️ Low Stock</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Unit: {formatCurrency(item.unitPrice)}</div>
                          <div className="text-sm font-semibold text-blue-600">Total: {formatCurrency(item.totalValue)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.storageLocation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => handleViewItem(item)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleUpdateStock(item)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                            >
                              Update Stock
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Purchase Records Tab */}
        {activeTab === 'purchases' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Purchase Records</h2>
              <button 
                onClick={() => setShowPurchaseModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              >
                Add Purchase Record
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purchase Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authorized By</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchaseRecords.map((record) => {
                    const item = inventoryData.find(i => i.id === record.itemId);
                    return (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{record.purchaseDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item?.itemName || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.quantity}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(record.unitPrice)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-blue-600">{formatCurrency(record.totalCost)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.supplier}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.authorizedBy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Consumption Tracking Tab */}
        {activeTab === 'consumption' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Consumption Records</h2>
              <button 
                onClick={() => setShowConsumptionModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              >
                Record Consumption
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Used</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authorized By</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consumptionRecords.map((record) => {
                    const item = inventoryData.find(i => i.id === record.itemId);
                    return (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{record.consumptionDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item?.itemName || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.quantity}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.purpose}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.authorizedBy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports & Analytics Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Category-wise Distribution</h3>
                <div className="space-y-3">
                  {Array.from(new Set(inventoryData.map(item => item.category))).map((category) => {
                    const categoryItems = inventoryData.filter(item => item.category === category);
                    const categoryValue = categoryItems.reduce((sum, item) => sum + item.totalValue, 0);
                    return (
                      <div key={category}>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{category}:</span>
                          <span className="font-medium">{formatCurrency(categoryValue)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(categoryValue / totalValue) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Status Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Good Condition:</span>
                    <span className="font-medium text-green-600">
                      {inventoryData.filter(item => item.condition === 'Good').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Low Stock Items:</span>
                    <span className="font-medium text-yellow-600">{lowStockItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Damaged Items:</span>
                    <span className="font-medium text-red-600">
                      {inventoryData.filter(item => item.condition === 'Damaged').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Under Maintenance:</span>
                    <span className="font-medium text-orange-600">
                      {inventoryData.filter(item => item.condition === 'Under Maintenance').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Suppliers</h3>
                <div className="space-y-2">
                  {Array.from(new Set(purchaseRecords.map(record => record.supplier))).slice(0, 5).map((supplier) => {
                    const supplierRecords = purchaseRecords.filter(record => record.supplier === supplier);
                    const totalSpent = supplierRecords.reduce((sum, record) => sum + record.totalCost, 0);
                    return (
                      <div key={supplier} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate">{supplier}:</span>
                        <span className="font-medium">{formatCurrency(totalSpent)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Report Generation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Generate Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Inventory Summary Report', desc: 'Complete inventory overview' },
                  { title: 'Low Stock Alert Report', desc: 'Items requiring restocking' },
                  { title: 'Purchase Analysis Report', desc: 'Procurement trends and costs' },
                  { title: 'Consumption Pattern Report', desc: 'Usage analytics by category' }
                ].map((report, index) => (
                  <button
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{report.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{report.desc}</p>
                    <div className="bg-blue-600 text-white text-center py-2 rounded text-sm">
                      Generate PDF
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add New Item Modal */}
        {showAddItemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-800">Add New Item</h2>
                <button onClick={closeAllModals} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                      <input
                        type="text"
                        value={newItemForm.itemName}
                        onChange={(e) => setNewItemForm({...newItemForm, itemName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter item name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Code</label>
                      <input
                        type="text"
                        value={newItemForm.itemCode}
                        onChange={(e) => setNewItemForm({...newItemForm, itemCode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter item code"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={newItemForm.category}
                          onChange={(e) => setNewItemForm({...newItemForm, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Category</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Appliances">Appliances</option>
                          <option value="Kitchenware">Kitchenware</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Textiles">Textiles</option>
                          <option value="Security">Security</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                        <input
                          type="text"
                          value={newItemForm.subCategory}
                          onChange={(e) => setNewItemForm({...newItemForm, subCategory: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter sub category"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Available</label>
                        <input
                          type="number"
                          value={newItemForm.quantityAvailable}
                          onChange={(e) => setNewItemForm({...newItemForm, quantityAvailable: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Threshold Level</label>
                        <input
                          type="number"
                          value={newItemForm.thresholdLevel}
                          onChange={(e) => setNewItemForm({...newItemForm, thresholdLevel: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price (₹)</label>
                      <input
                        type="number"
                        value={newItemForm.unitPrice}
                        onChange={(e) => setNewItemForm({...newItemForm, unitPrice: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Information</label>
                      <textarea
                        value={newItemForm.supplierInfo}
                        onChange={(e) => setNewItemForm({...newItemForm, supplierInfo: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter supplier details"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                      <input
                        type="text"
                        value={newItemForm.storageLocation}
                        onChange={(e) => setNewItemForm({...newItemForm, storageLocation: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter storage location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                      <select
                        value={newItemForm.condition}
                        onChange={(e) => setNewItemForm({...newItemForm, condition: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Good">Good</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Order Number</label>
                      <input
                        type="text"
                        value={newItemForm.purchaseOrderNumber}
                        onChange={(e) => setNewItemForm({...newItemForm, purchaseOrderNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter PO number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Expiry</label>
                      <input
                        type="date"
                        value={newItemForm.warrantyExpiry}
                        onChange={(e) => setNewItemForm({...newItemForm, warrantyExpiry: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                      <textarea
                        value={newItemForm.remarks}
                        onChange={(e) => setNewItemForm({...newItemForm, remarks: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter any remarks"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleAddNewItem}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={closeAllModals}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Stock Modal */}
        {showUpdateStockModal && updateStockItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Update Stock - {updateStockItem.itemName}</h2>
                <button onClick={closeAllModals} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Current Stock: <span className="font-medium text-gray-800">{updateStockItem.quantityAvailable}</span></p>
                  <p className="text-sm text-gray-600">Threshold Level: <span className="font-medium text-gray-800">{updateStockItem.thresholdLevel}</span></p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Quantity</label>
                  <input
                    type="number"
                    value={updateStockForm.newQuantity}
                    onChange={(e) => setUpdateStockForm({...updateStockForm, newQuantity: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Update</label>
                  <textarea
                    value={updateStockForm.reason}
                    onChange={(e) => setUpdateStockForm({...updateStockForm, reason: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter reason for stock update"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Authorized By</label>
                  <input
                    type="text"
                    value={updateStockForm.authorizedBy}
                    onChange={(e) => setUpdateStockForm({...updateStockForm, authorizedBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter authorizing person"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdateStockSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Update Stock
                  </button>
                  <button
                    onClick={closeAllModals}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Purchase Record Modal */}
        {showPurchaseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-800">Add Purchase Record</h2>
                <button onClick={closeAllModals} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Item</label>
                  <select
                    value={purchaseForm.itemId}
                    onChange={(e) => setPurchaseForm({...purchaseForm, itemId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an item</option>
                    {inventoryData.map((item) => (
                      <option key={item.id} value={item.id}>{item.itemName} ({item.itemCode})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                    <input
                      type="date"
                      value={purchaseForm.purchaseDate}
                      onChange={(e) => setPurchaseForm({...purchaseForm, purchaseDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={purchaseForm.quantity}
                      onChange={(e) => setPurchaseForm({...purchaseForm, quantity: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={purchaseForm.unitPrice}
                    onChange={(e) => setPurchaseForm({...purchaseForm, unitPrice: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter unit price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Cost</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                    {formatCurrency(purchaseForm.quantity * purchaseForm.unitPrice)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <input
                    type="text"
                    value={purchaseForm.supplier}
                    onChange={(e) => setPurchaseForm({...purchaseForm, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter supplier name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bill Number</label>
                    <input
                      type="text"
                      value={purchaseForm.billNumber}
                      onChange={(e) => setPurchaseForm({...purchaseForm, billNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter bill number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authorized By</label>
                    <input
                      type="text"
                      value={purchaseForm.authorizedBy}
                      onChange={(e) => setPurchaseForm({...purchaseForm, authorizedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter authorizing person"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddPurchaseRecord}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Add Purchase Record
                  </button>
                  <button
                    onClick={closeAllModals}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Record Consumption Modal */}
        {showConsumptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-800">Record Consumption</h2>
                <button onClick={closeAllModals} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Item</label>
                  <select
                    value={consumptionForm.itemId}
                    onChange={(e) => setConsumptionForm({...consumptionForm, itemId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an item</option>
                    {inventoryData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.itemName} ({item.itemCode}) - Available: {item.quantityAvailable}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consumption Date</label>
                    <input
                      type="date"
                      value={consumptionForm.consumptionDate}
                      onChange={(e) => setConsumptionForm({...consumptionForm, consumptionDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Used</label>
                    <input
                      type="number"
                      value={consumptionForm.quantity}
                      onChange={(e) => setConsumptionForm({...consumptionForm, quantity: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter quantity used"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                  <textarea
                    value={consumptionForm.purpose}
                    onChange={(e) => setConsumptionForm({...consumptionForm, purpose: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter purpose of consumption"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={consumptionForm.location}
                    onChange={(e) => setConsumptionForm({...consumptionForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter location where items were used"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Authorized By</label>
                  <input
                    type="text"
                    value={consumptionForm.authorizedBy}
                    onChange={(e) => setConsumptionForm({...consumptionForm, authorizedBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter authorizing person"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleRecordConsumption}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Record Consumption
                  </button>
                  <button
                    onClick={closeAllModals}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Purchase Request Modal */}
        {showPurchaseRequestModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-800">Generate Purchase Request</h2>
                <button onClick={closeAllModals} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Item Details</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Item:</span> {selectedItem.itemName}</p>
                    <p><span className="text-gray-600">Current Stock:</span> {selectedItem.quantityAvailable}</p>
                    <p><span className="text-gray-600">Threshold Level:</span> {selectedItem.thresholdLevel}</p>
                    <p><span className="text-gray-600">Supplier:</span> {selectedItem.supplierInfo}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suggested Quantity to Purchase</label>
                  <input
                    type="number"
                    value={purchaseRequestForm.suggestedQuantity}
                    onChange={(e) => setPurchaseRequestForm({...purchaseRequestForm, suggestedQuantity: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={Math.max(0, (selectedItem.thresholdLevel * 2) - selectedItem.quantityAvailable).toString()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select
                    value={purchaseRequestForm.priority}
                    onChange={(e) => setPurchaseRequestForm({...purchaseRequestForm, priority: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Justification</label>
                  <textarea
                    value={purchaseRequestForm.justification}
                    onChange={(e) => setPurchaseRequestForm({...purchaseRequestForm, justification: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder={selectedItem.quantityAvailable <= selectedItem.thresholdLevel ? 
                      "Stock level has fallen below threshold. Immediate restocking required." : 
                      "Regular inventory replenishment request."
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requested By</label>
                  <input
                    type="text"
                    value={purchaseRequestForm.requestedBy}
                    onChange={(e) => setPurchaseRequestForm({...purchaseRequestForm, requestedBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleGeneratePurchaseRequest}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Generate Request
                  </button>
                  <button
                    onClick={closeAllModals}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Item Details Modal */}
        {showEditItemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-800">Edit Item Details</h2>
                <button onClick={closeAllModals} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                      <input
                        type="text"
                        value={editItemForm.itemName}
                        onChange={(e) => setEditItemForm({...editItemForm, itemName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Code</label>
                      <input
                        type="text"
                        value={editItemForm.itemCode}
                        onChange={(e) => setEditItemForm({...editItemForm, itemCode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={editItemForm.category}
                          onChange={(e) => setEditItemForm({...editItemForm, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Furniture">Furniture</option>
                          <option value="Appliances">Appliances</option>
                          <option value="Kitchenware">Kitchenware</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Textiles">Textiles</option>
                          <option value="Security">Security</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                        <input
                          type="text"
                          value={editItemForm.subCategory}
                          onChange={(e) => setEditItemForm({...editItemForm, subCategory: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Threshold Level</label>
                        <input
                          type="number"
                          value={editItemForm.thresholdLevel}
                          onChange={(e) => setEditItemForm({...editItemForm, thresholdLevel: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price (₹)</label>
                        <input
                          type="number"
                          value={editItemForm.unitPrice}
                          onChange={(e) => setEditItemForm({...editItemForm, unitPrice: parseFloat(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Information</label>
                      <textarea
                        value={editItemForm.supplierInfo}
                        onChange={(e) => setEditItemForm({...editItemForm, supplierInfo: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                      <input
                        type="text"
                        value={editItemForm.storageLocation}
                        onChange={(e) => setEditItemForm({...editItemForm, storageLocation: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                      <select
                        value={editItemForm.condition}
                        onChange={(e) => setEditItemForm({...editItemForm, condition: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Good">Good</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Order Number</label>
                      <input
                        type="text"
                        value={editItemForm.purchaseOrderNumber}
                        onChange={(e) => setEditItemForm({...editItemForm, purchaseOrderNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Expiry</label>
                      <input
                        type="date"
                        value={editItemForm.warrantyExpiry}
                        onChange={(e) => setEditItemForm({...editItemForm, warrantyExpiry: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                      <textarea
                        value={editItemForm.remarks}
                        onChange={(e) => setEditItemForm({...editItemForm, remarks: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleEditItemSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={closeAllModals}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Item Detail Modal */}
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedItem.itemName}</h2>
                  <p className="text-gray-600">{selectedItem.itemCode} • {selectedItem.category}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Item Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Item Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{selectedItem.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sub Category:</span>
                          <span className="font-medium">{selectedItem.subCategory}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Item Code:</span>
                          <span className="font-medium">{selectedItem.itemCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Storage Location:</span>
                          <span className="font-medium">{selectedItem.storageLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Supplier:</span>
                          <span className="font-medium">{selectedItem.supplierInfo}</span>
                        </div>
                        {selectedItem.purchaseOrderNumber && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">PO Number:</span>
                            <span className="font-medium">{selectedItem.purchaseOrderNumber}</span>
                          </div>
                        )}
                        {selectedItem.warrantyExpiry && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Warranty Expires:</span>
                            <span className="font-medium">{selectedItem.warrantyExpiry}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity Available:</span>
                          <span className="font-medium text-lg">{selectedItem.quantityAvailable}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity Consumed:</span>
                          <span className="font-medium">{selectedItem.quantityConsumed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Threshold Level:</span>
                          <span className="font-medium">{selectedItem.thresholdLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Condition:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(selectedItem.condition)}`}>
                            {selectedItem.condition}
                          </span>
                        </div>
                        {selectedItem.quantityAvailable <= selectedItem.thresholdLevel && (
                          <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                            <p className="text-red-700 text-sm font-semibold">⚠️ Low Stock Alert</p>
                            <p className="text-red-600 text-xs">This item requires immediate restocking</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Financial & History */}
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Unit Price:</span>
                          <span className="font-medium">{formatCurrency(selectedItem.unitPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Value:</span>
                          <span className="text-xl font-bold text-green-600">{formatCurrency(selectedItem.totalValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Purchase Date:</span>
                          <span className="font-medium">{selectedItem.lastPurchasedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Consumed Date:</span>
                          <span className="font-medium">{selectedItem.lastConsumedDate}</span>
                        </div>
                      </div>
                    </div>

                    {selectedItem.remarks && (
                      <div className="bg-yellow-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Remarks</h3>
                        <p className="text-sm text-gray-700">{selectedItem.remarks}</p>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button 
                          onClick={() => {
                            closeModal();
                            handleUpdateStock(selectedItem);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Update Stock Quantity
                        </button>
                        <button 
                          onClick={() => {
                            closeModal();
                            setConsumptionForm({...consumptionForm, itemId: selectedItem.id});
                            setShowConsumptionModal(true);
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Record Consumption
                        </button>
                        <button 
                          onClick={() => {
                            closeModal();
                            setPurchaseRequestForm({
                              suggestedQuantity: Math.max(0, (selectedItem.thresholdLevel * 2) - selectedItem.quantityAvailable),
                              priority: selectedItem.quantityAvailable <= selectedItem.thresholdLevel ? 'medium' : 'low',
                              justification: selectedItem.quantityAvailable <= selectedItem.thresholdLevel ? 
                                "Stock level has fallen below threshold. Immediate restocking required." : 
                                "Regular inventory replenishment request.",
                              requestedBy: ''
                            });
                            setShowPurchaseRequestModal(true);
                          }}
                          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Generate Purchase Request
                        </button>
                        <button 
                          onClick={() => {
                            closeModal();
                            setEditItemForm({
                              category: selectedItem.category,
                              subCategory: selectedItem.subCategory,
                              itemName: selectedItem.itemName,
                              itemCode: selectedItem.itemCode,
                              quantityAvailable: selectedItem.quantityAvailable,
                              thresholdLevel: selectedItem.thresholdLevel,
                              unitPrice: selectedItem.unitPrice,
                              supplierInfo: selectedItem.supplierInfo,
                              storageLocation: selectedItem.storageLocation,
                              condition: selectedItem.condition,
                              purchaseOrderNumber: selectedItem.purchaseOrderNumber || '',
                              warrantyExpiry: selectedItem.warrantyExpiry || '',
                              remarks: selectedItem.remarks || ''
                            });
                            setShowEditItemModal(true);
                          }}
                          className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                        >
                          Edit Item Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
