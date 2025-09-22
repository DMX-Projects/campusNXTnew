import React, { useState, useEffect, useMemo } from 'react';
import { Zap, ToggleLeft, ToggleRight, Clock, CheckCircle, UserPlus, BarChart, Info, Users, X, RefreshCw } from 'lucide-react';

// --- DATA TYPES (FCFS Specific) ---
type Vacancy = { course: string; seats: number };
type Candidate = {
  id: number;
  name: string;
  token: string;
  timestamp: Date;
  status: 'Pending' | 'Allotted';
  allottedCourse?: string;
};

// --- INITIAL MOCK DATA (More comprehensive) ---
const initialVacancies: Vacancy[] = [
  { course: 'B.A. History', seats: 2 },
  { course: 'B.Sc. Physics', seats: 1 },
  { course: 'B.Com Accounting', seats: 3 },
];

const initialCandidates: Candidate[] = [
    { id: 1758486600000, name: 'Rohan Verma', token: 'FCFS-1758486600000', timestamp: new Date('2025-09-22T10:00:00Z'), status: 'Allotted', allottedCourse: 'B.A. History' },
    { id: 1758486660000, name: 'Priya Singh', token: 'FCFS-1758486660000', timestamp: new Date('2025-09-22T10:01:00Z'), status: 'Pending' },
    { id: 1758486720000, name: 'Sameer Khan', token: 'FCFS-1758486720000', timestamp: new Date('2025-09-22T10:02:00Z'), status: 'Pending' },
    { id: 1758486780000, name: 'Ananya Gupta', token: 'FCFS-1758486780000', timestamp: new Date('2025-09-22T10:03:00Z'), status: 'Pending' },
];

const SpotAdmissionFCFS = () => {
  // --- STATE MANAGEMENT ---
  const [uiState, setUiState] = useState<'running' | 'finalized'>('running');
  const [vacancies] = useState<Vacancy[]>(initialVacancies);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [timer, setTimer] = useState(3600); // 1 hour countdown
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // --- DERIVED STATE & MEMOS ---
  const queue = useMemo(() => {
    return [...candidates].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }, [candidates]);

  const availableSeats = useMemo(() => {
    const allottedCounts = candidates
      .filter(c => c.status === 'Allotted' && c.allottedCourse)
      .reduce((acc, curr) => {
        acc[curr.allottedCourse!] = (acc[curr.allottedCourse!] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return vacancies.map(v => ({
      ...v,
      seats: v.seats - (allottedCounts[v.course] || 0)
    }));
  }, [candidates, vacancies]);

  const totalRemainingSeats = useMemo(() => availableSeats.reduce((sum, v) => sum + v.seats, 0), [availableSeats]);
  const nextPendingCandidateId = useMemo(() => queue.find(c => c.status === 'Pending')?.id, [queue]);

  // --- SIDE EFFECTS ---
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (isRegistrationOpen && timer > 0 && uiState === 'running') {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer <= 0 && isRegistrationOpen) {
      setIsRegistrationOpen(false);
      showToast("Registration time has ended.", "error");
    }
  }, [isRegistrationOpen, timer, uiState]);

  // --- HANDLERS ---
  const handleRegister = (name: string) => {
    const now = new Date();
    const newCandidate: Candidate = {
      id: now.getTime(), name, token: `FCFS-${now.getTime()}`, timestamp: now, status: 'Pending',
    };
    setCandidates(prev => [...prev, newCandidate]);
    showToast(`${name} has been added to the queue.`);
  };

  const handleAllot = (candidateId: number, course: string) => {
    if (candidateId !== nextPendingCandidateId) {
        showToast("Can only allot a seat to the first person in the queue.", "error");
        return;
    }
    const courseVacancy = availableSeats.find(v => v.course === course);
    if (courseVacancy && courseVacancy.seats > 0) {
      setCandidates(candidates.map(c =>
        c.id === candidateId ? { ...c, status: 'Allotted', allottedCourse: course } : c
      ));
      showToast(`Seat in ${course} allotted successfully.`, 'success');
    } else {
      showToast(`No seats left in ${course}.`, 'error');
    }
  };

  const handleCancelAllotment = (candidateId: number) => {
    setCandidates(candidates.map(c => 
        c.id === candidateId ? { ...c, status: 'Pending', allottedCourse: undefined } : c
    ));
    showToast('Allotment cancelled. The seat is now available.', 'info');
  };
  
  const handleFinalize = () => {
    setIsRegistrationOpen(false);
    setShowConfirmModal(false);
    setUiState('finalized');
    showToast("Admissions have been finalized!", "success");
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Spot Admission (First-Come-First-Serve)</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage rapid, time-sensitive FCFS admissions.</p>
      </header>
      
      {uiState === 'running' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <RegistrationControl isOpen={isRegistrationOpen} setIsOpen={setIsRegistrationOpen} timer={timer} formatTime={formatTime} onFinalize={() => setShowConfirmModal(true)} />
            <VacancyList availableSeats={availableSeats} />
            {isRegistrationOpen && <RegistrationForm onRegister={handleRegister} remainingSeats={totalRemainingSeats} />}
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500"/>FCFS Queue</h3><span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{candidates.length} Registered</span></div>
            <CandidateQueue candidates={queue} onAllot={handleAllot} onCancel={handleCancelAllotment} availableSeats={availableSeats} nextPendingId={nextPendingCandidateId} />
          </div>
        </div>
      ) : (
        <FinalizedReport allottedCandidates={queue.filter(c => c.status === 'Allotted')} remainingSeats={availableSeats} />
      )}
      
      {showConfirmModal && <ConfirmationModal onConfirm={handleFinalize} onClose={() => setShowConfirmModal(false)} />}
    </div>
  );
};

// --- Sub-components ---
const Toast = ({ message, type, onDismiss }: { message: string, type: 'success' | 'info' | 'error', onDismiss: () => void }) => {
    const colors = { success: 'bg-green-600', info: 'bg-blue-600', error: 'bg-red-600' };
    return (<div className={`fixed top-5 right-5 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${colors[type]}`}><Info className="w-6 h-6"/><p>{message}</p><button onClick={onDismiss}><X className="w-5 h-5" /></button></div>);
}

const RegistrationControl = ({ isOpen, setIsOpen, timer, formatTime, onFinalize }: any) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"><h3 className="text-lg font-semibold mb-4">Registration Control</h3><div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4"><span className={`font-bold ${isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{isOpen ? 'Registration OPEN' : 'Registration CLOSED'}</span><button onClick={() => setIsOpen(!isOpen)} disabled={timer <= 0}>{isOpen ? <ToggleRight className="w-10 h-10 text-green-500"/> : <ToggleLeft className="w-10 h-10 text-gray-400"/>}</button></div><div className="text-center"><p className="text-sm text-gray-500 dark:text-gray-400">Time Remaining</p><p className={`text-3xl font-mono font-bold tracking-widest ${timer < 60 ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>{formatTime(timer)}</p></div><button onClick={onFinalize} className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">Finalize Admissions</button></div>
);

const VacancyList = ({ availableSeats }: { availableSeats: Vacancy[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"><h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart className="w-5 h-5 text-blue-500"/> Live Seat Availability</h3><ul className="space-y-3">{availableSeats.map(v => (<li key={v.course} className="flex justify-between items-center text-sm font-medium"><span>{v.course}</span><span className={`px-3 py-1 rounded-full text-xs font-bold ${v.seats > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>{v.seats} Seats</span></li>))}</ul></div>
);

const RegistrationForm = ({ onRegister, remainingSeats }: any) => {
  const [name, setName] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (name && remainingSeats > 0) { onRegister(name); setName(''); } };
  return (<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"><h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5 text-purple-500"/> Register Applicant</h3><form onSubmit={handleSubmit} className="space-y-4"><div><label className="text-sm font-medium">Applicant Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/></div><button type="submit" disabled={remainingSeats <= 0} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">{remainingSeats > 0 ? 'Get Token' : 'All Seats Full'}</button></form></div>);
};

const CandidateQueue = ({ candidates, onAllot, onCancel, availableSeats, nextPendingId }: any) => (
  <div className="overflow-y-auto max-h-[600px] border dark:border-gray-700 rounded-lg"><ul className="divide-y dark:divide-gray-700">{candidates.map((candidate: Candidate, index: number) => (<li key={candidate.id} className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${candidate.status === 'Allotted' ? 'bg-green-50 dark:bg-green-900/20' : ''}`}><div className="flex items-center gap-4"><span className={`text-xl font-bold w-8 text-center ${candidate.id === nextPendingId ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`}>{index + 1}</span><div><p className="font-bold text-gray-900 dark:text-white">{candidate.name}</p><p className="text-xs text-gray-400">{candidate.timestamp.toLocaleTimeString()}</p></div></div><AllotmentControl candidate={candidate} onAllot={onAllot} onCancel={onCancel} availableSeats={availableSeats} isNextInQueue={candidate.id === nextPendingId} /></li>))}{candidates.length === 0 && <p className="p-8 text-center text-gray-500">Queue is empty. Open registration to accept applicants.</p>}</ul></div>
);

const AllotmentControl = ({ candidate, onAllot, onCancel, availableSeats, isNextInQueue }: any) => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const hasSeats = availableSeats.some((v: Vacancy) => v.seats > 0);

    if (candidate.status === 'Allotted') {
        return (<div className="flex items-center gap-2"><span className="text-sm font-semibold text-green-700 dark:text-green-300">Allotted: {candidate.allottedCourse}</span><button onClick={() => onCancel(candidate.id)} className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"><RefreshCw className="w-4 h-4 text-red-500"/></button></div>);
    }
    if (!hasSeats) { return <span className="text-sm font-semibold text-red-600 dark:text-red-400">No Seats Left</span> }
    
    return (<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto"><select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full sm:w-40 p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"><option value="">Select Course...</option>{availableSeats.filter((v: Vacancy) => v.seats > 0).map((v: Vacancy) => (<option key={v.course} value={v.course}>{v.course} ({v.seats})</option>))}</select><button onClick={() => onAllot(candidate.id, selectedCourse)} disabled={!selectedCourse || !isNextInQueue} className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 font-semibold whitespace-nowrap disabled:opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed"><CheckCircle className="w-4 h-4"/>Allot</button></div>);
};

const ConfirmationModal = ({ onConfirm, onClose }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 text-center"><div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 mb-4"><Info className="h-6 w-6 text-red-600 dark:text-red-300" /></div><h3 className="text-lg font-semibold text-gray-900 dark:text-white">Finalize Admissions?</h3><p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">This will close the registration process permanently. This action cannot be undone. Are you sure you want to proceed?</p><div className="flex justify-center gap-3"><button onClick={onClose} className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">Cancel</button><button onClick={onConfirm} className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">Yes, Finalize</button></div></div></div>
);

const FinalizedReport = ({ allottedCandidates, remainingSeats }: { allottedCandidates: Candidate[], remainingSeats: Vacancy[] }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 text-center"><div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-6"><CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" /></div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admissions Finalized</h2><p className="text-gray-500 dark:text-gray-400 mt-2">A total of <strong>{allottedCandidates.length}</strong> candidates have been successfully allotted seats.</p><div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"><div><h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Final Allotment List</h3><ul className="text-left space-y-2 text-sm border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">{allottedCandidates.map(c => (<li key={c.id} className="flex justify-between items-center p-2 rounded-md"><span><strong>{c.name}</strong></span><span className="font-semibold text-green-700 dark:text-green-300">{c.allottedCourse}</span></li>))}{allottedCandidates.length === 0 && <li className="text-center text-gray-500">No candidates were allotted.</li>}</ul></div><div><h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Remaining Vacancies</h3><ul className="text-left space-y-2 text-sm border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">{remainingSeats.map(v => (<li key={v.course} className="flex justify-between items-center p-2 rounded-md"><span>{v.course}</span><span className="font-bold">{v.seats}</span></li>))}</ul></div></div></div>
);


export default SpotAdmissionFCFS;

