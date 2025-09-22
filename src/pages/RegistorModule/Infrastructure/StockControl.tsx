import React from 'react';

type InventoryItem = {
  name: string;
  quantity: number;
  receivedDate: string;
  incharge: string;
};

const inventoryData: InventoryItem[] = [
  { name: 'Breadboard Kit', quantity: 35, receivedDate: '2025-08-20', incharge: 'Mr. Arun' },
  { name: 'Digital Multimeter', quantity: 20, receivedDate: '2025-09-05', incharge: 'Ms. Pooja' },
  { name: 'Soldering Station', quantity: 15, receivedDate: '2025-08-25', incharge: 'Mr. Samir' },
  { name: 'Projector', quantity: 8, receivedDate: '2025-09-01', incharge: 'Ms. Priya' },
  { name: 'LAN Cable (10m)', quantity: 25, receivedDate: '2025-08-21', incharge: 'Mr. Manoj' },
  { name: 'File Folder (A4)', quantity: 60, receivedDate: '2025-08-14', incharge: 'Mr. Rakesh' },
  { name: 'Scientific Calculator', quantity: 40, receivedDate: '2025-08-19', incharge: 'Ms. Nisha' },
  { name: 'UPS (1 kVA)', quantity: 10, receivedDate: '2025-08-27', incharge: 'Ms. Geeta' },
  { name: 'MATLAB License Key', quantity: 30, receivedDate: '2025-09-09', incharge: 'Mr. Suresh' },
  { name: 'Desktop PC', quantity: 28, receivedDate: '2025-08-30', incharge: 'Ms. Kavita' },
];

export default function InventoryTable() {
  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-primary-50 dark:bg-primary-900 rounded-2xl shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed rounded-xl bg-white dark:bg-primary-900">
          <thead>
            <tr className="bg-primary-300 dark:bg-primary-800 sticky top-0">
              <th className="w-3/12 px-10 py-6 text-left text-lg font-semibold text-primary-900 dark:text-primary-100">Item Name</th>
              <th className="w-2/12 px-10 py-6 text-left text-lg font-semibold text-primary-900 dark:text-primary-100">Quantity</th>
              <th className="w-3/12 px-10 py-6 text-left text-lg font-semibold text-primary-900 dark:text-primary-100">Received Date</th>
              <th className="w-4/12 px-10 py-6 text-left text-lg font-semibold text-primary-900 dark:text-primary-100">Incharge</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, idx) => (
              <tr
                key={item.name}
                className={
                  idx % 2 === 0
                    ? "bg-white dark:bg-primary-900"
                    : "bg-primary-100 dark:bg-primary-950"
                }
              >
                <td className="px-10 py-5 text-primary-900 dark:text-primary-100 whitespace-nowrap text-lg">{item.name}</td>
                <td className="px-10 py-5 text-primary-900 dark:text-primary-100 whitespace-nowrap text-lg">{item.quantity}</td>
                <td className="px-10 py-5 text-primary-900 dark:text-primary-100 whitespace-nowrap text-lg">{item.receivedDate}</td>
                <td className="px-10 py-5 text-primary-900 dark:text-primary-100 whitespace-nowrap text-lg">{item.incharge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
