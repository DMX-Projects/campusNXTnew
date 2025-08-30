import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-800 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-purple-700 font-bold text-lg">AI</span>
              </div>
            </div>
            <div>
              <h1 className="text-white text-xl font-semibold">
                AI POWERED CAMPUS AUTOMATION SYSTEM
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm">
              Welcome, Administrator
            </div>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};