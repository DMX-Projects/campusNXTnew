import React, { useMemo, useState, useEffect, ElementType } from 'react';
import { Users, BarChart3, GitMerge, Check, Eye, Loader2, ArrowRight, X, Info, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, FileSpreadsheet, ArrowUp, ArrowDown } from 'lucide-react';

// --- DATA TYPES (No changes) ---
type Status = 'Accepted' | 'Pending' | 'Rejected' | 'Confirmed';
type Vacancy = { course: string; count: number };
type UpgradeCandidate = { id: string; name: string; avatar: string; rank: number; currentCourse: string; preferences: string[] };
type ProposedAllotment = { id: string; name: string; rank: number; oldCourse: string; newCourse: string };

// --- MOCK DATA (No changes) ---
const vacantSeats: Vacancy[] = [
  { course: 'B.Tech CSE', count: 12 }, { course: 'B.Tech ECE', count: 8 },
  { course: 'B.Com', count: 25 }, { course: 'MBA', count: 5 }, { course: 'B.Sc Physics', count: 10 },
];
const upgradeCandidates: UpgradeCandidate[] = [
  { id: 'UPG001', name: 'Ishan Mehra', avatar: 'IM', rank: 215, currentCourse: 'B.Tech ECE', preferences: ['B.Tech CSE'] },
  { id: 'UPG002', name: 'Sneha Reddy', avatar: 'SR', rank: 480, currentCourse: 'B.Com', preferences: ['MBA', 'BBA'] },
  { id: 'UPG003', name: 'Vikram Rao', avatar: 'VR', rank: 325, currentCourse: 'B.Tech IT', preferences: ['B.Tech CSE', 'B.Tech ECE'] },
  { id: 'UPG004', name: 'Alia Bhatt', avatar: 'AB', rank: 180, currentCourse: 'B.Tech ECE', preferences: ['B.Tech CSE'] },
  { id: 'UPG005', name: 'Ranbir Kapoor', avatar: 'RK', rank: 550, currentCourse: 'BBA', preferences: ['MBA'] },
];
const proposedAllotments: ProposedAllotment[] = [
  { id: 'UPG004', name: 'Alia Bhatt', rank: 180, newCourse: 'B.Tech CSE', oldCourse: 'B.Tech ECE' },
  { id: 'UPG001', name: 'Ishan Mehra', rank: 215, newCourse: 'B.Tech CSE', oldCourse: 'B.Tech ECE' },
  { id: 'UPG003', name: 'Vikram Rao', rank: 325, newCourse: 'B.Tech ECE', oldCourse: 'B.Tech IT' },
  { id: 'UPG002', name: 'Sneha Reddy', rank: 480, newCourse: 'MBA', oldCourse: 'B.Com' },
];

const SeatAllotmentPhaseII: React.FC = () => {
  // --- STATE MANAGEMENT (No major changes, added activeTab state) ---
  const [showProposed, setShowProposed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upgraded' | 'notUpgraded'>('upgraded');

  // --- MEMOIZED COMPUTATIONS (No changes) ---
  const candidatesById = useMemo(() => new Map(upgradeCandidates.map(c => [c.id, c])), []);
  const proposedById = useMemo(() => new Map(proposedAllotments.map(p => [p.id, p])), []);
  const totalVacant = useMemo(() => vacantSeats.reduce((s, v) => s + v.count, 0), []);

  const seatDeltaByCourse = useMemo(() => {
    const map = new Map<string, number>();
    const allCourses = new Set([
        ...vacantSeats.map(v => v.course),
        ...proposedAllotments.map(p => p.oldCourse),
        ...proposedAllotments.map(p => p.newCourse)
    ]);

    allCourses.forEach(course => {
        const initialCount = vacantSeats.find(v => v.course === course)?.count ?? 0;
        const freedUp = proposedAllotments.filter(p => p.oldCourse === course).length;
        const filled = proposedAllotments.filter(p => p.newCourse === course).length;
        map.set(course, initialCount + freedUp - filled);
    });
    return map;
  }, []); 


  const totalVacantAfter = useMemo(() => Array.from(seatDeltaByCourse.values()).reduce((s, v) => s + v, 0), [seatDeltaByCourse]);
  const notUpgradedCandidates = useMemo(() => upgradeCandidates.filter(c => !proposedById.has(c.id)), [proposedById]);

  // --- ASYNC HANDLERS (No changes) ---
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);
  
  const handleRunAlgorithm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowProposed(true);
      setToast({ message: 'Upgradation algorithm run successfully. Review proposed changes.', type: 'info' });
    }, 1600);
  };

  const handleFinalize = async () => {
    setIsFinalizing(true);
    await new Promise(res => setTimeout(res, 1200));
    setIsFinalizing(false);
    setConfirmOpen(false);
    setShowProposed(false);
    setToast({ message: 'Phase 2 allotments finalized and notifications sent.', type: 'success' });
  };

  // --- UI COMPONENTS & DATA ---
  const kpiStats = [
    { title: "Total Vacant Seats", value: totalVacant, icon: FileSpreadsheet, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50" },
    { title: "Upgradation Requests", value: upgradeCandidates.length, icon: Users, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
    { title: "Successful Upgrades", value: showProposed ? proposedAllotments.length : <span className="text-gray-400">--</span>, icon: ThumbsUp, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50" },
    { title: "Vacancies After Upgrade", value: showProposed ? totalVacantAfter : <span className="text-gray-400">--</span>, icon: BarChart3, color: "text-teal-500", bgColor: "bg-teal-100 dark:bg-teal-900/50" },
  ];

  const PreferenceBadge: React.FC<{ prefs: string[]; newCourse?: string }> = ({ prefs, newCourse }) => (
    <div className="flex flex-wrap items-center gap-1.5">
      {prefs.map((pref, idx) => (
        <span key={idx} className={`px-2 py-0.5 text-xs font-medium rounded-full ${newCourse === pref ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 ring-1 ring-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
          {pref}
        </span>
      ))}
    </div>
  );

  const VacancyTable: React.FC = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase">
            <tr>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3 text-center">Before</th>
                <th className="px-6 py-3 text-center">{showProposed ? 'Final Count' : 'Projected Count'}</th>
                <th className="px-6 py-3 text-center">{showProposed ? 'Final Change' : 'Projected Change'}</th>
            </tr>
        </thead>
        <tbody>
          {Array.from(seatDeltaByCourse.entries()).sort().map(([course, afterCount]) => {
            const beforeCount = vacantSeats.find(v => v.course === course)?.count ?? 0;
            const delta = afterCount - beforeCount;
            const deltaColor = delta > 0 ? 'text-green-600 dark:text-green-400' : delta < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500';
            
            const projectedStyle = !showProposed ? 'text-gray-400 dark:text-gray-500 italic' : '';

            return (
              <tr key={course} className="border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium">{course} {beforeCount === 0 && <span className="text-xs text-blue-500">(New Vacancy)</span>}</td>
                <td className="px-6 py-4 font-bold text-center">{beforeCount}</td>
                <td className={`px-6 py-4 font-bold text-center ${projectedStyle}`}>
                  {afterCount}
                </td>
                <td className={`px-6 py-4 font-semibold text-center flex items-center justify-center gap-1 ${projectedStyle || deltaColor}`}>
                  {delta !== 0 ? (
                      <>
                          {delta > 0 ? <ArrowUp className="w-4 h-4"/> : <ArrowDown className="w-4 h-4"/>}
                          {delta > 0 ? `+${delta}` : delta}
                      </>
                  ) : '0'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );


  // --- MAIN RENDER FUNCTION (Heavily Refactored for better UX) ---
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}>
          {toast.type === 'success' ? <Check className="w-6 h-6"/> : <Info className="w-6 h-6"/>}
          {toast.message}
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Seat Allotment - Phase 2 (Upgradation)</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and finalize seat upgradations based on candidate preferences and vacant seats.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiStats.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${item.bgColor}`}><item.icon className={`w-6 h-6 ${item.color}`} /></div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p>
            </div>
            <div className="mt-4"><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p></div>
          </div>
        ))}
      </div>

      <div className={`space-y-8 transition-opacity duration-300 ${isProcessing || isFinalizing ? 'opacity-40 pointer-events-none' : ''}`}>

        {!showProposed && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold flex items-center gap-3 text-gray-900 dark:text-white"><GitMerge className="w-6 h-6 text-purple-500" /> Pre-Computation Summary</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review current vacancies and the list of candidates who have opted for upgradation.</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-px bg-gray-200 dark:bg-gray-700">
                <div className="bg-white dark:bg-gray-800 p-6"><h4 className="font-semibold mb-3">Vacant Seats ({totalVacant})</h4><VacancyTable /></div>
                <div className="bg-white dark:bg-gray-800 p-6">
                    <h4 className="font-semibold mb-3">Upgradation Requests ({upgradeCandidates.length})</h4>
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase sticky top-0"><tr><th className="px-6 py-3">Candidate (Rank)</th><th className="px-6 py-3">Current Course</th><th className="px-6 py-3">Preferences</th></tr></thead>
                            <tbody>
                                {upgradeCandidates.sort((a,b)=>a.rank-b.rank).map(c => (
                                    <tr key={c.id} className="border-b dark:border-gray-700"><td className="px-6 py-4 font-medium flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-xs">{c.avatar}</div><div>{c.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">Rank: {c.rank}</p></div></td><td className="px-6 py-4">{c.currentCourse}</td><td className="px-6 py-4"><PreferenceBadge prefs={c.preferences} /></td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="p-6 text-center bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
                <button onClick={handleRunAlgorithm} disabled={isProcessing} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto mx-auto">
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <GitMerge className="w-5 h-5" />}
                    {isProcessing ? 'Processing Allotments...' : 'Run Upgradation Algorithm'}
                </button>
            </div>
          </div>
        )}

        {showProposed && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold flex items-center gap-3 text-gray-900 dark:text-white"><Eye className="w-6 h-6 text-green-500" /> Review Proposed Changes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The algorithm has finished. Review the proposed upgrades and their impact on seat vacancies before finalizing.</p>
                
                <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex -mb-px gap-6">
                        <button onClick={() => setActiveTab('upgraded')} className={`py-3 px-1 border-b-2 font-semibold flex items-center gap-2 ${activeTab === 'upgraded' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><ThumbsUp className="w-5 h-5" /> Successful Upgrades ({proposedAllotments.length})</button>
                        <button onClick={() => setActiveTab('notUpgraded')} className={`py-3 px-1 border-b-2 font-semibold flex items-center gap-2 ${activeTab === 'notUpgraded' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><ThumbsDown className="w-5 h-5" /> Not Upgraded ({notUpgradedCandidates.length})</button>
                    </nav>
                </div>

                <div className="mt-6">
                    {activeTab === 'upgraded' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase"><tr><th className="px-6 py-3">Candidate (Rank)</th><th className="px-6 py-3">Change</th><th className="px-6 py-3">Preferences</th></tr></thead>
                                <tbody>
                                    {proposedAllotments.sort((a,b)=>a.rank-b.rank).map(p => (
                                        <tr key={p.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium">{p.name} <span className="text-gray-500 dark:text-gray-400">({p.rank})</span></td>
                                            <td className="px-6 py-4 flex items-center gap-2"><span className="text-gray-500 line-through">{p.oldCourse}</span> <ArrowRight className="w-4 h-4 text-green-500 shrink-0"/> <span className="font-semibold text-green-600 dark:text-green-400">{p.newCourse}</span></td>
                                            <td className="px-6 py-4">{candidatesById.get(p.id) ? <PreferenceBadge prefs={candidatesById.get(p.id)!.preferences} newCourse={p.newCourse} /> : 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'notUpgraded' && (
                        <div className="overflow-x-auto">
                           <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase"><tr><th className="px-6 py-3">Candidate (Rank)</th><th className="px-6 py-3">Current Course</th><th className="px-6 py-3">Reason</th></tr></thead>
                                <tbody>
                                    {notUpgradedCandidates.sort((a,b)=>a.rank-b.rank).map(c => (
                                        <tr key={c.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium">{c.name} <span className="text-gray-500 dark:text-gray-400">({c.rank})</span></td>
                                            <td className="px-6 py-4">{c.currentCourse}</td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs italic">No vacancy in preferred courses</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <h4 className="font-semibold mb-3 text-lg">Updated Vacancy Projection</h4>
                    <VacancyTable />
                </div>

                <div className="mt-8 pt-6 border-t dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
                    <button onClick={() => setShowProposed(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 font-medium"><X className="w-4 h-4" /> Go Back & Re-run</button>
                    <button onClick={() => setConfirmOpen(true)} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Finalize & Notify All</button>
                </div>
            </div>
        )}
      </div>

      {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 mb-4">
                      <Info className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Finalization</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                      You are about to finalize all <strong>{proposedAllotments.length} proposed upgrades</strong> and send notifications to all candidates. This action is irreversible.
                  </p>
                  <div className="flex justify-center gap-3">
                      <button onClick={() => setConfirmOpen(false)} className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">Cancel</button>
                      <button onClick={handleFinalize} disabled={isFinalizing} className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 flex items-center gap-2 text-sm font-medium">
                          {isFinalizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                          {isFinalizing ? 'Finalizing…' : 'Yes, Confirm & Notify'}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default SeatAllotmentPhaseII;

