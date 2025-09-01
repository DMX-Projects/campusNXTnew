import React from 'react';

interface Column {
  key: string;
  label: string | React.ReactNode; // allow JSX
  sortable?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
  className?: string; // <-- allow passing className
}


export const Table: React.FC<TableProps> = ({ columns, data, actions, className  }) => {
  return (
  <div className={`overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg ${className ?? ''}`}>

      <table className="min-w-full divide-y divide-gray-300 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {data.map((row, index) => (
            <tr 
              key={row.id || index}
              className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[150px]">
                  {row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};