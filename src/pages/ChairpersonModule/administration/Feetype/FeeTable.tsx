import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { FeeStructure } from '../types/fee';

interface FeeTableProps {
  data: FeeStructure[];
  onEdit: (fee: FeeStructure) => void;
  onDelete: (feeId: string) => void;
}

const FeeTable: React.FC<FeeTableProps> = ({ data, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No Fee Structures Found</h3>
          <p className="text-slate-500">No fee structures match your current filters. Try adjusting the filters or add a new fee structure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-slate-100 border-b border-slate-200">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
            Fee Type
          </th>
          <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
            Year
          </th>
          <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
            Semester
          </th>
          <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {data.map((fee) => (
          <tr key={fee.id} className="hover:bg-slate-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-slate-700">{fee.feeType}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-bold text-green-600">{formatAmount(fee.amount)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-700">{fee.year}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-700">Semester {fee.semester}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                  fee.status
                )}`}
              >
                {fee.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(fee)}
                  className="p-2 text-blue-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(fee.id)}
                  className="p-2 text-red-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete"
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

    
  );
};

export default FeeTable;