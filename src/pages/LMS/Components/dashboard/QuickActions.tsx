import React, { useState, useRef } from 'react';
import { Plus, Upload } from 'lucide-react';
import StudentForm from '../students/StudentForm';

const QuickActions: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      alert(`File "${file.name}" uploaded successfully!`);
      // 👉 Later we can parse and send to backend
    }
  };

  const actions = [
    { 
      icon: Plus, 
      label: 'Add Student', 
      color: 'bg-blue-500 hover:bg-blue-600', 
      onClick: () => setOpenForm(true) 
    },
    { 
      icon: Upload, 
      label: 'Import Data', 
      color: 'bg-emerald-500 hover:bg-emerald-600', 
      onClick: () => fileInputRef.current?.click() 
    },
  ];

  const handleSave = (student: any) => {
    console.log('Student saved:', student);
    setOpenForm(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white transition-colors ${action.color}`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hidden File Input for Import */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".csv,.xlsx,.xls" 
        onChange={handleFileChange} 
      />

      {/* Modal for Add Student */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl relative">
            <h2 className="text-lg font-semibold mb-4">Add Student</h2>
            <StudentForm 
              onSave={handleSave} 
              onCancel={() => setOpenForm(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
