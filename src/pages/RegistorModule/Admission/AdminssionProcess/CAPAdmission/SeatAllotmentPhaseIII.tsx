import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Users, Zap, Check, FileOutput, Loader2, X, Info, RefreshCcw } from 'lucide-react';

// --- DATA TYPES ---
type Vacancy = { course: string; count: number };
type Candidate = { id: string; name: string; avatar: string; score: number; preferred: string[] };
type AllotmentMap = Map<string, string | null>; // Candidate ID -> Course Name or null

// --- MOCK DATA ---
const initialVacantSeats: Vacancy[] = [
  { course: 'B.Tech CSE', count: 2 },
  { course: 'B.Tech ECE', count: 1 },
  { course: 'B.Com', count: 5 },
  { course: 'B.Tech IT', count: 1},
];

const waitlistedCandidates: Candidate[] = [
  { id: 'WAIT001', name: 'Arjun Nair', avatar: 'AN', score: 89.5, preferred: ['B.Tech CSE', 'B.Tech ECE'] },
  { id: 'WAIT002', name: 'Kavya Mishra', avatar: 'KM', score: 88.1, preferred: ['B.Tech ECE', 'B.Tech IT'] },
  { id: 'WAIT003', name: 'Riya Sharma', avatar: 'RS', score: 85.0, preferred: ['B.Com'] },
  { id: 'WAIT004', name: 'Sameer Khan', avatar: 'SK', score: 84.5, preferred: ['B.Com', 'BBA'] },
  { id: 'WAIT005', name: 'Priya Singh', avatar: 'PS', score: 91.2, preferred: ['B.Tech CSE'] },
  { id: 'WAIT006', name: 'Rohan Verma', avatar: 'RV', score: 84.9, preferred: ['B.Com'] },
];

const SeatAllotmentPhaseIII: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [allotments, setAllotments] = useState<AllotmentMap>(new Map());
  const [uiState, setUiState] = useState<'idle' | 'review' | 'finalizing' | 'finalized'>('idle');
  const [isAutoAllotting, setIsAutoAllotting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string; type: 'success' | 'info' } | null>(null);

  // --- DERIVED STATE & MEMOIZED CALCULATIONS ---
  const currentVacancies = useMemo(() => {
    const vacancies = new Map(initialVacantSeats.map(s => [s.course, s.count]));
    allotments.forEach(course => {
      if (course && vacancies.has(course)) {
        vacancies.set(course, vacancies.get(course)! - 1);
      }
    });
    return Object.fromEntries(vacancies.entries());
  }, [allotments]);

  const sortedCandidates = useMemo(() => [...waitlistedCandidates].sort((a, b) => b.score - a.score), []);
  const allottedCount = useMemo(() => Array.from(allotments.values()).filter(Boolean).length, [allotments]);

  // --- SIDE EFFECTS ---
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- HANDLERS ---
  const handleAutoAllot = () => {
    setIsAutoAllotting(true);
    setTimeout(() => {
      const newAllotments: AllotmentMap = new Map();
      const tempVacancies = new Map(initialVacantSeats.map(s => [s.course, s.count]));

      sortedCandidates.forEach(candidate => {
        let isAllotted = false;
        for (const pref of candidate.preferred) {
          if ((tempVacancies.get(pref) ?? 0) > 0) {
            newAllotments.set(candidate.id, pref);
            tempVacancies.set(pref, tempVacancies.get(pref)! - 1);
            isAllotted = true;
            break;
          }
        }
        if (!isAllotted) newAllotments.set(candidate.id, null);
      });
      
      setAllotments(newAllotments);
      setUiState('review');
      setIsAutoAllotting(false);
      setToast({ id: Date.now(), message: 'Auto-allotment successful. Review assignments.', type: 'info' });
    }, 1500);
  };
  
  const handleManualAllotment = (candidateId: string, course: string) => {
    const newAllotments = new Map(allotments);
    const oldCourse = newAllotments.get(candidateId);
    
    // Check if the new course has vacancies before assigning
    const currentCount = currentVacancies[course] ?? 0;
    if (currentCount > 0 || course === oldCourse) {
        newAllotments.set(candidateId, course === 'NONE' ? null : course);
        setAllotments(newAllotments);
        if(uiState === 'idle') setUiState('review');
    } else {
        setToast({ id: Date.now(), message: `No vacancies left in ${course}.`, type: 'info' });
    }
  };

  const handleReset = () => {
    setAllotments(new Map());
    setUiState('idle');
  };

  const handleConfirm = () => {
    setUiState('finalizing');
    setTimeout(() => {
      setUiState('finalized');
      setShowConfirmModal(false);
      setToast({ id: Date.now(), message: 'Final allotments have been confirmed!', type: 'success' });
    }, 1500);
  };
  
  const handleGenerateOrders = () => {
    setToast({ id: Date.now(), message: 'Generating allotment orders...', type: 'info' });
  };
  
  // --- UI RENDER ---
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}>
          {toast.type === 'success' ? <Check className="w-6 h-6"/> : <Info className="w-6 h-6"/>}
          <p>{toast.message}</p>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Seat Allotment - Final Round</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Finalize admissions by allotting remaining vacant seats to waitlisted candidates.</p>
      </header>
      
      {uiState !== 'finalized' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart className="w-5 h-5 text-red-500"/> Current Vacant Seats</h3>
              <ul className="space-y-3">
                {initialVacantSeats.map(s => (
                  <li key={s.course} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{s.course}</span>
                    <span className={`px-2.5 py-0.5 font-semibold rounded-full ${currentVacancies[s.course] > 0 ? 'text-red-800 bg-red-100 dark:text-red-200 dark:bg-red-900/50' : 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700'}`}>{currentVacancies[s.course] ?? 0}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button onClick={handleAutoAllot} disabled={isAutoAllotting || uiState !== 'idle'} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isAutoAllotting ? <Loader2 className="w-5 h-5 animate-spin"/> : <Zap className="w-5 h-5"/>}
                  {isAutoAllotting ? 'Allotting...' : 'Auto-Allot by Merit'}
                </button>
                <button onClick={() => setShowConfirmModal(true)} disabled={uiState !== 'review'} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Check className="w-5 h-5"/> Confirm Final Allotments
                </button>
                 <button onClick={handleReset} disabled={uiState === 'idle'} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <RefreshCcw className="w-5 h-5"/> Reset Allotments
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-purple-500"/> Eligible Waitlisted Candidates ({sortedCandidates.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Candidate</th>
                    <th scope="col" className="px-6 py-3 text-center">Score</th>
                    <th scope="col" className="px-6 py-3">Preferences</th>
                    <th scope="col" className="px-6 py-3">Assign To</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCandidates.map((c) => {
                    const allottedCourse = allotments.get(c.id);
                    return (
                      <tr key={c.id} className={`border-b dark:border-gray-700 transition-colors ${allottedCourse ? 'bg-green-50 dark:bg-green-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                        <td className="px-6 py-4 font-medium flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${allottedCourse ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700'}`}>{c.avatar}</div>
                          {c.name}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold">{c.score.toFixed(1)}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {c.preferred.map(p => <span key={p} className={`text-xs px-2 py-1 rounded-full ${allottedCourse === p ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 font-semibold' : 'bg-gray-200 dark:bg-gray-600'}`}>{p}</span>)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={allottedCourse || 'NONE'} 
                            onChange={(e) => handleManualAllotment(c.id, e.target.value)}
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            aria-label={`Assign course for ${c.name}`}
                          >
                            <option value="NONE">Not Allotted</option>
                            {initialVacantSeats.map(s => <option key={s.course} value={s.course}>{s.course} ({currentVacancies[s.course] ?? 0})</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-6">
                <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Allotment Process Finalized</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">A total of <strong>{allottedCount}</strong> candidates have been successfully allotted seats.</p>
            <div className="mt-8 max-w-lg mx-auto">
                <h3 className="font-semibold mb-3">Final Allotment List</h3>
                <ul className="text-left space-y-2 text-sm border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
                    {sortedCandidates.map(c => {
                        const course = allotments.get(c.id);
                        if (!course) return null;
                        return <li key={c.id} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50"><span><strong>{c.name}</strong> (Score: {c.score.toFixed(1)})</span><span className="font-semibold text-green-700 dark:text-green-300">{course}</span></li>
                    }).filter(Boolean)}
                </ul>
            </div>
            <button onClick={handleGenerateOrders} className="mt-8 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors">
                <FileOutput className="w-5 h-5"/> Generate Allotment Orders
            </button>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 mb-4">
                    <Info className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Finalization</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                    You are about to finalize <strong>{allottedCount} allotments</strong>. This action cannot be undone. Are you sure you want to proceed?
                </p>
                <div className="flex justify-center gap-3">
                    <button onClick={() => setShowConfirmModal(false)} className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">Cancel</button>
                    <button onClick={handleConfirm} disabled={uiState === 'finalizing'} className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 flex items-center gap-2 text-sm font-medium">
                        {uiState === 'finalizing' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        {uiState === 'finalizing' ? 'Confirming…' : 'Yes, Confirm'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SeatAllotmentPhaseIII;
