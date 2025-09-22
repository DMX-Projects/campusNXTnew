import React, { useState, useMemo } from "react";

interface Purchase {
  id: number;
  assetName: string;
  purchaseDate: string;
  vendorName: string;
  department: string;
  cost: number;
}

const mockPurchases: Purchase[] = [
  {
    id: 1,
    assetName: "Laptop",
    purchaseDate: "2023-12-01",
    vendorName: "Dell Supplies",
    department: "IT",
    cost: 60000,
  },
  {
    id: 2,
    assetName: "Projector",
    purchaseDate: "2023-11-15",
    vendorName: "AV World",
    department: "ECE",
    cost: 25000,
  },
  {
    id: 3,
    assetName: "Desk Chairs",
    purchaseDate: "2023-10-02",
    vendorName: "Furniture Co.",
    department: "Admin",
    cost: 8500,
  },
  {
    id: 4,
    assetName: "Air Conditioner",
    purchaseDate: "2023-10-20",
    vendorName: "Cooling Inc.",
    department: "Maintenance",
    cost: 45000,
  },
  {
    id: 5,
    assetName: "Microscopes",
    purchaseDate: "2023-08-25",
    vendorName: "Lab Supplies Ltd",
    department: "Biotech",
    cost: 120000,
  },
];

// Modal Component
function DetailsModal({ open, onClose, purchase }: { open: boolean; onClose: () => void; purchase: Purchase | null }) {
  if (!open || !purchase) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full mx-3 p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close details modal"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-3 text-primary-700 dark:text-primary-100">Purchase Details</h2>
        <div className="space-y-2 text-base">
          <div>
            <span className="font-medium">Asset:</span> {purchase.assetName}
          </div>
          <div>
            <span className="font-medium">Purchased On:</span> {purchase.purchaseDate}
          </div>
          <div>
            <span className="font-medium">Vendor:</span> {purchase.vendorName}
          </div>
          <div>
            <span className="font-medium">Department:</span> {purchase.department}
          </div>
          <div>
            <span className="font-medium">Cost:</span> ₹{purchase.cost}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PurchaseManagement() {
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [vendorFilter, setVendorFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [modalPurchase, setModalPurchase] = useState<Purchase | null>(null);

  const uniqueVendors = useMemo(() => {
    return Array.from(new Set(purchases.map((p) => p.vendorName)));
  }, [purchases]);

  const uniqueDepartments = useMemo(() => {
    return Array.from(new Set(purchases.map((p) => p.department)));
  }, [purchases]);

  const filteredPurchases = useMemo(() => {
    return purchases.filter(
      (p) =>
        (vendorFilter === "" || p.vendorName === vendorFilter) &&
        (departmentFilter === "" || p.department === departmentFilter)
    );
  }, [purchases, vendorFilter, departmentFilter]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this purchase record?")) {
      setPurchases((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-primary-900 dark:text-primary-100">
        Purchase Management
      </h1>
      <div className="flex flex-col sm:flex-row gap-5 mb-6">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border rounded px-4 py-2 bg-white dark:bg-gray-900 dark:text-gray-100"
        >
          <option value="">Filter by Department</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          value={vendorFilter}
          onChange={(e) => setVendorFilter(e.target.value)}
          className="border rounded px-4 py-2 bg-white dark:bg-gray-900 dark:text-gray-100"
        >
          <option value="">Filter by Vendor</option>
          {uniqueVendors.map((vendor) => (
            <option key={vendor} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg border shadow">
        <table className="min-w-full divide-y divide-primary-200 dark:divide-primary-700">
          <thead className="bg-primary-100 dark:bg-primary-800">
            <tr>
              {[
                "Asset Name",
                "Purchase Date",
                "Vendor Name",
                "Department",
                "Cost",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-primary-200 dark:divide-primary-700">
            {filteredPurchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-primary-50 dark:hover:bg-primary-900">
                <td className="px-6 py-4 max-w-xs">{purchase.assetName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.purchaseDate}</td>
                <td className="px-6 py-4">{purchase.vendorName}</td>
                <td className="px-6 py-4">{purchase.department}</td>
                <td className="px-6 py-4">₹{purchase.cost}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => setModalPurchase(purchase)}
                    className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                    aria-label={`View details of ${purchase.assetName}`}
                  >
                    View
                  </button>
                  
                </td>
              </tr>
            ))}
            {filteredPurchases.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-center text-primary-600" colSpan={6}>
                  No Purchase Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DetailsModal
        open={!!modalPurchase}
        onClose={() => setModalPurchase(null)}
        purchase={modalPurchase}
      />
    </div>
  );
}
