import React, { useState, useMemo } from 'react';

interface Vendor {
  id: number;
  name: string;
  services: string;
  contact: string;
  contractStatus: 'Active' | 'Expired' | 'Pending';
  rating: number;
  companyInfo: string;
  contractDocs: string[];
  pastPerformance: string;
}

const initialVendors: Vendor[] = [
  {
    id: 1,
    name: 'ABC Contractors',
    services: 'Electrical, Plumbing',
    contact: 'abc@example.com',
    contractStatus: 'Active',
    rating: 4,
    companyInfo: 'Leading electrical and plumbing contractor.',
    contractDocs: ['contract1.pdf'],
    pastPerformance: 'Completed 50+ projects on time.',
  },
  {
    id: 2,
    name: 'XYZ Maintenance',
    services: 'Building Maintenance',
    contact: 'contact@xyzmaintenance.com',
    contractStatus: 'Active',
    rating: 3,
    companyInfo: 'Building maintenance with 10+ years experience.',
    contractDocs: ['contract_old.pdf', 'inspection_report.pdf'],
    pastPerformance: 'Reliable but slower delivery times.',
  },
  {
    id: 3,
    name: 'FreshFix Ltd.',
    services: 'Cleaning, Janitorial',
    contact: 'info@freshfix.com',
    contractStatus: 'Inactive',
    rating: 5,
    companyInfo: 'Top-notch cleaning services for college campuses.',
    contractDocs: [],
    pastPerformance: 'Highly rated and efficient.',
  },
];

export default function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [contractFilter, setContractFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | ''>('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const filteredVendors = useMemo(() => {
    return vendors.filter(v =>
      (contractFilter === '' || v.contractStatus === contractFilter) &&
      (ratingFilter === '' || v.rating === ratingFilter) &&
      v.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vendors, contractFilter, ratingFilter, searchTerm]);

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id));
      if (selectedVendor?.id === id) setSelectedVendor(null);
    }
  };

  const handleSave = (vendor: Vendor) => {
    if (vendor.id) {
      // Update existing
      setVendors(prev => prev.map(v => (v.id === vendor.id ? vendor : v)));
    } else {
      // Add new
      setVendors(prev => [...prev, { ...vendor, id: Date.now() }]);
    }
    setSelectedVendor(null);
    setIsAdding(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-primary-900 dark:text-primary-100">Vendor Management</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search vendors"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="rounded border border-primary-300 dark:border-primary-700 p-2 flex-grow min-w-[200px]"
        />
        <select
          value={contractFilter}
          onChange={e => setContractFilter(e.target.value)}
          className="rounded border border-primary-300 dark:border-primary-700 p-2"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Inactive</option>
         
        </select>
        
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded" onClick={() => { setSelectedVendor(null); setIsAdding(true); }}>
          + Add New
        </button>
      </div>

      <div className="overflow-x-auto rounded border border-primary-300 dark:border-primary-700 shadow">
        <table className="min-w-full divide-y divide-primary-200 dark:divide-primary-700">
          <thead className="bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-primary-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Services</th>
              <th className="px-6 py-3 text-left font-semibold">Contact</th>
              <th className="px-6 py-3 text-left font-semibold">Contract Status</th>
              <th className="px-6 py-3 text-left font-semibold">Rating</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-primary-900 divide-y divide-primary-200 dark:divide-primary-700">
            {filteredVendors.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-6 text-primary-700 dark:text-primary-300">No vendors found.</td>
              </tr>
            ) : filteredVendors.map(vendor => (
              <tr key={vendor.id} className="hover:bg-primary-50 dark:hover:bg-primary-800">
                <td className="px-6 py-4">{vendor.name}</td>
                <td className="px-6 py-4">{vendor.services}</td>
                <td className="px-6 py-4">{vendor.contact}</td>
                <td className="px-6 py-4">{vendor.contractStatus}</td>
                <td className="px-6 py-4">{vendor.rating} ⭐</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-3 py-1 bg-primary-600 text-white rounded" onClick={() => { setSelectedVendor(vendor); setIsAdding(false); }}>
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(vendor.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(selectedVendor || isAdding) && (
        <VendorForm
          initialData={selectedVendor}
          onCancel={() => { setSelectedVendor(null); setIsAdding(false); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

type VendorFormProps = {
  initialData?: Vendor | null;
  onCancel: () => void;
  onSave: (vendor: Vendor) => void;
};

function VendorForm({ initialData, onCancel, onSave }: VendorFormProps) {
  const [vendorData, setVendorData] = React.useState<Vendor>(
    initialData || {
      id: 0,
      name: '',
      services: '',
      contact: '',
      contractStatus: 'Pending',
      rating: 3,
      companyInfo: '',
      contractDocs: [],
      pastPerformance: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVendorData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorData.name || !vendorData.services || !vendorData.contact) {
      alert('Please fill required fields.');
      return;
    }
    onSave(vendorData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-3xl w-full overflow-auto max-h-[90vh] space-y-6">
        <h2 className="text-2xl font-semibold text-primary-900 dark:text-primary-100">{vendorData.id ? "Edit Vendor" : "Add New Vendor"}</h2>
        <div className="space-y-4">
          <label className="block font-medium text-primary-900 dark:text-primary-100">Name *</label>
          <input type="text" name="name" value={vendorData.name} onChange={handleChange} required className="w-full p-3 rounded border border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-100" />
        </div>
        <div className="space-y-4">
          <label className="block font-medium text-primary-900 dark:text-primary-100">Services *</label>
          <input type="text" name="services" value={vendorData.services} onChange={handleChange} required className="w-full p-3 rounded border border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-100" />
        </div>
        <div className="space-y-4">
          <label className="block font-medium text-primary-900 dark:text-primary-100">Contact *</label>
          <input type="text" name="contact" value={vendorData.contact} onChange={handleChange} required className="w-full p-3 rounded border border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-100" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block font-medium text-primary-900 dark:text-primary-100">Contract Status *</label>
            <select name="contractStatus" value={vendorData.contractStatus} onChange={handleChange} required className="w-full p-3 rounded border border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-100">
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="block font-medium text-primary-900 dark:text-primary-100">Rating *</label>
            <select name="rating" value={vendorData.rating} onChange={handleChange} className="w-full p-3 rounded border border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-100">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block font-medium text-primary-900 dark:text-primary-100">Company Info</label>
          <textarea name="companyInfo" value={vendorData.companyInfo} onChange={handleChange} rows={3} className="w-full p-3 rounded border border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-100"></textarea>
        </div>
        <div className="space-y-4">
          <label className="block font-medium text-primary-900 dark:text-primary-100">Past Performance</label>
          <textarea name="pastPerformance" value={vendorData.pastPerformance} onChange={handleChange} rows={3} className="w-full p-3 rounded border border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-100"></textarea>
        </div>
        <div className="flex justify-end gap-6">
          <button type="button" onClick={onCancel} className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-7 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600">Cancel</button>
          <button type="submit" className="bg-primary-600 text-white px-7 py-2 rounded hover:bg-primary-700">Save</button>
        </div>
      </form>
    </div>
  );
}
