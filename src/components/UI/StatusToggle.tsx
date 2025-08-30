import React from 'react';

interface StatusToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
  disabled?: boolean;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({
  isActive,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!isActive)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2
          ${isActive ? 'bg-purple-600' : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span className="sr-only">{isActive ? 'Deactivate' : 'Activate'}</span>
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${isActive ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      <span className={`ml-2 text-sm font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
};