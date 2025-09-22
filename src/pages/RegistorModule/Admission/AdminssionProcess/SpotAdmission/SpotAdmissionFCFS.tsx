// src/components/SpotAdmissionFCFS.tsx

import React, { useState, useEffect } from 'react';
import { BarChart, UserPlus, ToggleLeft, ToggleRight, Clock, CheckCircle } from 'lucide-react';

// Mock Data & Types
type VacancyFCFS = { course: string, seats: number };
type FCFS_Candidate = { id: number, name: string, token: string, timestamp: Date, status: 'Pending' | 'Allotted' };

const initialVacanciesFCFS: VacancyFCFS[] = [
    { course: 'B.A. History', seats: 5 },
    { course: 'B.Sc. Physics', seats: 3 },
];

const SpotAdmissionFCFS = () => {
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [candidates, setCandidates] = useState<FCFS_Candidate[]>([]);
    const [newName, setNewName] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if(newName) {
            const now = new Date();
            const newCandidate: FCFS_Candidate = {
                id: now.getTime(),
                name: newName,
                token: `FCFS-${now.getTime()}`,
                timestamp: now,
                status: 'Pending',
            };
            setCandidates(prev => [...prev, newCandidate]);
            setNewName('');
        }
    };
    
    // Simple logic to disable allotment if all seats are full
    const totalSeats = initialVacanciesFCFS.reduce((sum, v) => sum + v.seats, 0);
    const allottedCount = candidates.filter(c => c.status === 'Allotted').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Spot Admission (First-Come-First-Serve)</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage rapid, time-sensitive admissions.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Controls & Registration */}
        <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Registration Control</h3>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <span className={`font-bold ${isRegistrationOpen ? 'text-green-600' : 'text-red-600'}`}>
                        {isRegistrationOpen ? 'Registration is OPEN' : 'Registration is CLOSED'}
                    </span>
                    <button onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}>
                        {isRegistrationOpen ? 
                            <ToggleRight className="w-10 h-10 text-green-500"/> : 
                            <ToggleLeft className="w-10 h-10 text-gray-400"/>
                        }
                    </button>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart className="w-5 h-5 text-blue-500"/> Available Seats</h3>
                <ul className="space-y-3">
                {initialVacanciesFCFS.map(v => (
                    <li key={v.course} className="flex justify-between items-center text-sm font-medium">
                        <span>{v.course}</span>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-bold">{v.seats} Seats</span>
                    </li>
                ))}
                </ul>
            </div>
            
            {/* Registration Form (Conditional) */}
            {isRegistrationOpen && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5 text-purple-500"/> Register Applicant</h3>
                 <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Applicant Name</label>
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full Name" required
                         className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                       Get Token
                    </button>
                 </form>
              </div>
            )}
        </div>

        {/* Right Column: Applicant Queue */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500"/> Applicant Queue (First-Come-First-Serve)</h3>
            <div className="overflow-y-auto h-[500px] border dark:border-gray-700 rounded-lg">
                <ul className="divide-y dark:divide-gray-700">
                    {candidates.map((candidate, index) => (
                        <li key={candidate.id} className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${candidate.status === 'Allotted' ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                           <div className="flex items-center gap-4">
                               <span className="text-xl font-bold text-gray-400 dark:text-gray-500 w-8 text-center">{index + 1}</span>
                               <div>
                                   <p className="font-bold">{candidate.name}</p>
                                   <p className="text-sm text-gray-500 dark:text-gray-400">Token: {candidate.token}</p>
                                   <p className="text-xs text-gray-400">{candidate.timestamp.toLocaleTimeString()}</p>
                               </div>
                           </div>
                           {candidate.status === 'Pending' ? (
                               <button 
                                onClick={() => setCandidates(candidates.map(c => c.id === candidate.id ? {...c, status: 'Allotted'} : c))}
                                disabled={allottedCount >= totalSeats}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 font-semibold whitespace-nowrap disabled:opacity-50 disabled:bg-gray-500">
                                <CheckCircle className="w-4 h-4"/>Allot Seat
                                </button>
                           ) : (
                                <span className="text-sm font-semibold text-green-700 dark:text-green-300">Allotted</span>
                           )}
                        </li>
                    ))}
                    {candidates.length === 0 && <p className="p-8 text-center text-gray-500">Queue is empty. Open registration to accept applicants.</p>}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpotAdmissionFCFS;