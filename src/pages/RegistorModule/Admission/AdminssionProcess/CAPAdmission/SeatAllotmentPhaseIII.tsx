// src/components/SeatAllotmentPhaseIII.tsx

import React from 'react';
import { BarChart, Users, Zap, Check, FileOutput } from 'lucide-react';

// Mock Data
const finalVacantSeats = [
    { course: 'B.Tech CSE', count: 2 },
    { course: 'B.Tech ECE', count: 1 },
    { course: 'B.Com', count: 5 },
];

const waitlistedCandidates = [
    { id: 'WAIT001', name: 'Arjun Nair', score: 89.5, preferred: ['B.Tech CSE', 'B.Tech ECE'] },
    { id: 'WAIT002', name: 'Kavya Mishra', score: 88.1, preferred: ['B.Tech ECE', 'B.Tech IT'] },
    { id: 'WAIT003', name: 'Riya Sharma', score: 85.0, preferred: ['B.Com'] },
    { id: 'WAIT004', name: 'Sameer Khan', score: 84.5, preferred: ['B.Com'] },
];

const SeatAllotmentPhaseIII = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Seat Allotment - Final Round</h1>
        <p className="text-gray-600 dark:text-gray-400">Finalize admissions by allotting remaining vacant seats.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Vacant Seats & Actions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart className="w-5 h-5 text-red-500"/> Final Vacant Seats</h3>
            <ul className="space-y-3">
              {finalVacantSeats.map(s => (
                <li key={s.course} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{s.course}</span>
                  <span className="px-2.5 py-0.5 font-semibold text-red-800 bg-red-100 dark:text-red-200 dark:bg-red-900/50 rounded-full">{s.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
             <h3 className="text-lg font-semibold mb-4">Finalize Allotments</h3>
             <div className="space-y-4">
                 <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">
                    <Zap className="w-5 h-5"/> Auto-Allot by Merit
                 </button>
                 <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors">
                    <Check className="w-5 h-5"/> Confirm Final Allotments
                 </button>
                 <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold transition-colors">
                    <FileOutput className="w-5 h-5"/> Generate Allotment Orders
                 </button>
             </div>
          </div>
        </div>

        {/* Right Side: Waitlisted Candidates */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md">
           <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
             <h3 className="text-lg font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-purple-500"/> Eligible Waitlisted Candidates</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
                 <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Score</th>
                    <th scope="col" className="px-6 py-3">Preferences</th>
                    <th scope="col" className="px-6 py-3">Assign To</th>
                 </tr>
               </thead>
               <tbody>
                 {waitlistedCandidates.map((c) => (
                   <tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                     <td className="px-6 py-4 font-medium">{c.name}</td>
                     <td className="px-6 py-4">{c.score}</td>
                     <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {c.preferred.map(p => <span key={p} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{p}</span>)}
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                           <option>Select Course...</option>
                           {finalVacantSeats.map(s => <option key={s.course} value={s.course}>{s.course} ({s.count})</option>)}
                        </select>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SeatAllotmentPhaseIII;