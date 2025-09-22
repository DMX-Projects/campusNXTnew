// src/components/SeatAllotmentPhaseII.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Users, BarChart3, GitMerge, Check, Eye, Loader2, ArrowRight, X, Info, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, FileSpreadsheet, ArrowUp, ArrowDown } from 'lucide-react';

type Vacancy = { course: string; count: number };
type UpgradeCandidate = { id: string; name: string; avatar: string; rank: number; currentCourse: string; preferences: string[] };
type ProposedAllotment = { id: string; name: string; rank: number; oldCourse: string; newCourse: string };

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
  const [showProposed, setShowProposed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [showVacantSeats, setShowVacantSeats] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const candidatesById = useMemo(() => {
    const map = new Map<string, UpgradeCandidate>();
    upgradeCandidates.forEach(c => map.set(c.id, c));
    return map;
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const seatDeltaByCourse = useMemo(() => {
    const map = new Map<string, number>();
    vacantSeats.forEach(v => map.set(v.course, v.count));
    proposedAllotments.forEach(p => {
      map.set(p.oldCourse, (map.get(p.oldCourse) ?? 0) + 1);
      map.set(p.newCourse, (map.get(p.newCourse) ?? 0) - 1);
    });
    return map;
  }, [vacantSeats, proposedAllotments, showProposed]);

  const totalVacant = useMemo(() => vacantSeats.reduce((s, v) => s + v.count, 0), [vacantSeats]);
  const totalVacantAfter = useMemo(() => Array.from(seatDeltaByCourse.values()).reduce((s, v) => s + v, 0), [seatDeltaByCourse]);
  
  const proposedById = useMemo(() => {
    const m = new Map<string, ProposedAllotment>();
    proposedAllotments.forEach(p => m.set(p.id, p));
    return m;
  }, [proposedAllotments]);

  const notUpgradedCandidates = useMemo(() => {
    if (!showProposed) return [];
    return upgradeCandidates.filter(c => !proposedById.has(c.id));
  }, [showProposed, proposedById, upgradeCandidates]);

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
  
  const kpiStats = [
    { title: "Total Vacant Seats", value: totalVacant, icon: FileSpreadsheet, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50" },
    { title: "Upgradation Requests", value: upgradeCandidates.length, icon: Users, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
    { title: "Successful Upgrades", value: showProposed ? proposedAllotments.length : <span className="text-gray-400">--</span>, icon: ThumbsUp, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50" },
    { title: "Vacancies After Upgrade", value: showProposed ? totalVacantAfter : <span className="text-gray-400">--</span>, icon: BarChart3, color: "text-teal-500", bgColor: "bg-teal-100 dark:bg-teal-900/50" },
  ];

  const PreferenceBadge: React.FC<{ prefs: string[]; newCourse?: string }> = ({ prefs, newCourse }) => (
    <div className="flex flex-wrap gap-1">
      {prefs.map((pref, idx) => (
        <span
          key={idx}
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            newCourse === pref
              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {pref}
        </span>
      ))}
    </div>
  );

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
        {kpiStats.map((item, index) => ( <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300"><div className="flex items-start justify-between"><div className={`p-3 rounded-lg ${item.bgColor}`}><item.icon className={`w-6 h-6 ${item.color}`} /></div><p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p></div><div className="mt-4"><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p></div></div> ))}
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-opacity duration-300 ${isProcessing ? 'opacity-40 pointer-events-none' : ''}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white"><FileSpreadsheet className="w-5 h-5 text-blue-500" /> Vacant Seats Analysis</h3>
            <button onClick={() => setShowVacantSeats(!showVacantSeats)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">{showVacantSeats ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />} </button>
          </div>
          {showVacantSeats && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase"><tr><th className="px-6 py-3">Course</th><th className="px-6 py-3 text-center">Before</th><th className="px-6 py-3 text-center">After</th><th className="px-6 py-3 text-center">Delta</th></tr></thead>
                <tbody>
                  {/* FIX: Iterate over all courses in the delta map to include newly vacated ones */}
                  {Array.from(seatDeltaByCourse.entries()).sort().map(([course, afterCount]) => {
                    const beforeCount = vacantSeats.find(v => v.course === course)?.count ?? 0;
                    const delta = afterCount - beforeCount;
                    const deltaColor = delta > 0 ? 'text-green-600 dark:text-green-400' : delta < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500';
                    return (
                      <tr key={course} className="border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{course} {beforeCount === 0 && <span className="text-xs text-blue-500">(New)</span>}</td>
                        <td className="px-6 py-4 font-bold text-center">{beforeCount}</td>
                        <td className="px-6 py-4 font-bold text-center">{showProposed ? afterCount : '—'}</td>
                        <td className={`px-6 py-4 font-semibold text-center flex items-center justify-center gap-1 ${showProposed ? deltaColor : 'text-gray-400'}`}>
                          {showProposed ? (
                            <>
                              {delta > 0 && <ArrowUp className="w-4 h-4"/>}
                              {delta < 0 && <ArrowDown className="w-4 h-4"/>}
                              {delta > 0 ? `+${delta}` : delta}
                            </>
                          ) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          {!showProposed ? (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white"><GitMerge className="w-5 h-5 text-purple-500" /> Candidates Opting for Upgradation ({upgradeCandidates.length})</h3>
              </div>
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3">Candidate (Rank)</th>
                      <th className="px-6 py-3">Current Course</th>
                      <th className="px-6 py-3">Preferences</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upgradeCandidates.sort((a, b) => a.rank - b.rank).map(c => (
                      <tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-xs">{c.avatar}</div>
                          <div>
                            {c.name}
                            <p className="text-xs font-mono text-gray-500 dark:text-gray-400">Rank: {c.rank}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">{c.currentCourse}</td>
                        <td className="px-6 py-4"><PreferenceBadge prefs={c.preferences} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleRunAlgorithm}
                  disabled={isProcessing}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitMerge className="w-4 h-4" />}
                  {isProcessing ? 'Processing...' : 'Run Upgradation Algorithm'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white"><Eye className="w-5 h-5 text-green-500" /> Review Proposed Changes</h3>
              </div>
              
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5" /> Successful Upgrades ({proposedAllotments.length})
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700/30 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3">Candidate (Rank)</th>
                      <th className="px-6 py-3">Old Course</th>
                      <th className="px-6 py-3">New Course</th>
                      <th className="px-6 py-3">Preferences</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposedAllotments.sort((a, b) => a.rank - b.rank).map(p => {
                      const candidate = candidatesById.get(p.id);
                      return (
                        <tr key={p.id} className="border-b dark:border-gray-700">
                          <td className="px-6 py-4 font-medium">{p.name} <span className="text-gray-500">({p.rank})</span></td>
                          <td className="px-6 py-4">{p.oldCourse}</td>
                          <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-400">{p.newCourse}</td>
                          <td className="px-6 py-4">{candidate ? <PreferenceBadge prefs={candidate.preferences} newCourse={p.newCourse} /> : 'N/A'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {notUpgradedCandidates.length > 0 && (
                <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg mt-6">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5" /> Not Upgraded ({notUpgradedCandidates.length})
                  </div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 dark:bg-gray-700/30 text-xs uppercase"><tr><th className="px-6 py-3">Candidate (Rank)</th><th className="px-6 py-3">Current Course</th><th className="px-6 py-3">Reason</th></tr></thead>
                    <tbody>
                      {notUpgradedCandidates.sort((a, b) => a.rank - b.rank).map(c => (
                          <tr key={c.id} className="border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium">{c.name} <span className="text-gray-500">({c.rank})</span></td>
                            <td className="px-6 py-4">{c.currentCourse}</td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs italic">No vacancy in preferred courses</td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button onClick={() => setShowProposed(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 font-medium"><X className="w-4 h-4" /> Cancel Review</button>
                <button onClick={() => setConfirmOpen(true)} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Finalize & Notify</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 mb-4">
                      <Info className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Finalization</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                      This will finalize all {proposedAllotments.length} proposed upgrades and send notifications to the candidates. This action cannot be undone. Are you sure you want to continue?
                  </p>
                  <div className="flex justify-center gap-3">
                      <button onClick={() => setConfirmOpen(false)} className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">Cancel</button>
                      <button onClick={handleFinalize} disabled={isFinalizing} className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 flex items-center gap-2 text-sm font-medium">
                          {isFinalizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                          {isFinalizing ? 'Finalizing…' : 'Yes, Confirm'}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default SeatAllotmentPhaseII;