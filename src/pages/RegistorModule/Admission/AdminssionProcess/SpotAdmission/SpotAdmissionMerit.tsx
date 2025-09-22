// src/components/SpotAdmissionMerit.tsx

import React, { useState } from 'react';
import { BarChart, UserPlus, CheckCircle, Award } from 'lucide-react';

// Mock Data & Types
type Vacancy = { course: string, seats: number };
type RegisteredCandidate = { id: number, name: string, score: number, status: 'Pending' | 'Allotted' };

const initialVacancies: Vacancy[] = [
    { course: 'B.Tech CSE', seats: 3 },
    { course: 'B.Com', seats: 8 },
    { course: 'MBA', seats: 2 },
];

const SpotAdmissionMerit = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);
    const [candidates, setCandidates] = useState<RegisteredCandidate[]>([]);
    const [newName, setNewName] = useState('');
    const [newScore, setNewScore] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if(newName && newScore) {
            const newCandidate: RegisteredCandidate = {
                id: Date.now(),
                name: newName,
                score: parseFloat(newScore),
                status: 'Pending',
            };
            const updatedCandidates = [...candidates, newCandidate].sort((a, b) => b.score - a.score);
            setCandidates(updatedCandidates);
            setNewName('');
            setNewScore('');
        }
    };
    
    const handleAllot = (id: number, course: string) => {
        // Find the candidate and update their status
        setCandidates(candidates.map(c => c.id === id ? {...c, status: 'Allotted'} : c));
        // Find the course and decrement the seat count
        setVacancies(vacancies.map(v => v.course === course ? {...v, seats: v.seats > 0 ? v.seats - 1 : 0} : v));
    };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Spot Admission (Merit-Based)</h1>
        <p className="text-gray-600 dark:text-gray-400">Fill last-minute vacancies by ranking walk-in candidates.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Registration & Vacancies */}
        <div className="lg:col-span-2 space-y-8">
            {/* Vacancy Count */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart className="w-5 h-5 text-blue-500"/> Live Vacancy Count</h3>
                <ul className="space-y-3">
                {vacancies.map(v => (
                    <li key={v.course} className="flex justify-between items-center text-sm font-medium">
                        <span>{v.course}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${v.seats > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                            {v.seats} Seats
                        </span>
                    </li>
                ))}
                </ul>
            </div>
            
            {/* Registration Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5 text-purple-500"/> Register Walk-in Candidate</h3>
                 <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Candidate Name</label>
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full Name" required
                         className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Qualifying Score / %</label>
                        <input type="number" step="0.01" value={newScore} onChange={e => setNewScore(e.target.value)} placeholder="e.g., 92.5" required
                         className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                       Add to Ranking List
                    </button>
                 </form>
            </div>
        </div>

        {/* Right Column: Auto-Ranking List */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-amber-500"/> Auto-Ranking List</h3>
            <div className="overflow-y-auto h-[500px] border dark:border-gray-700 rounded-lg">
                <ul className="divide-y dark:divide-gray-700">
                    {candidates.map((candidate, index) => (
                        <li key={candidate.id} className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${candidate.status === 'Allotted' ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                           <div className="flex items-center gap-4">
                               <span className="text-xl font-bold text-gray-400 dark:text-gray-500 w-8 text-center">{index + 1}</span>
                               <div>
                                   <p className="font-bold">{candidate.name}</p>
                                   <p className="text-sm text-blue-600 dark:text-blue-400">Score: {candidate.score}</p>
                               </div>
                           </div>
                           {candidate.status === 'Pending' ? (
                               <button 
                                onClick={() => handleAllot(candidate.id, 'B.Tech CSE')} // In real app, a course selection would be here
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 font-semibold whitespace-nowrap">
                                <CheckCircle className="w-4 h-4"/>Allot Seat
                                </button>
                           ) : (
                                <span className="text-sm font-semibold text-green-700 dark:text-green-300">Allotted</span>
                           )}
                        </li>
                    ))}
                    {candidates.length === 0 && <p className="p-8 text-center text-gray-500">No candidates registered yet.</p>}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpotAdmissionMerit;