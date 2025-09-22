import React, { useState, useEffect } from 'react';
import { BarChart, UserPlus, CheckCircle, Award } from 'lucide-react';

type Vacancy = { course: string; seats: number };
type RegisteredCandidate = { id: number; name: string; score: number; status: 'Pending' | 'Allotted' };

const initialVacancies: Vacancy[] = [
    { course: 'Select Course', seats: 0 },
  { course: 'B.Tech CSE', seats: 3 },
  { course: 'B.Com', seats: 8 },
  { course: 'MBA', seats: 2 },
  { course: 'B.Tech ECE', seats: 4 },
  { course: 'B.Sc Physics', seats: 5 },
];

const initialCandidates: RegisteredCandidate[] = [
  { id: 1, name: 'Aarav Sharma', score: 95.6, status: 'Pending' },
  { id: 2, name: 'Diya Patel', score: 88.4, status: 'Pending' },
  { id: 3, name: 'Rohan Verma', score: 91.2, status: 'Allotted' },
  { id: 4, name: 'Priya Singh', score: 85.7, status: 'Pending' },
  { id: 5, name: 'Aditya Kumar', score: 89.9, status: 'Pending' },
  { id: 6, name: 'Ananya Gupta', score: 82.5, status: 'Pending' },
  { id: 7, name: 'Kabir Das', score: 90.1, status: 'Pending' },
  { id: 8, name: 'Ishaan Reddy', score: 78.3, status: 'Allotted' },
  { id: 9, name: 'Meera Iyer', score: 84.7, status: 'Pending' },
  { id: 10, name: 'Arjun Menon', score: 86.9, status: 'Pending' },
];

const SpotAdmissionMerit = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);
  const [candidates, setCandidates] = useState<RegisteredCandidate[]>(initialCandidates);
  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Record<number, string>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newScore && !isNaN(parseFloat(newScore))) {
      const newCandidate: RegisteredCandidate = {
        id: Date.now(),
        name: newName.trim(),
        score: parseFloat(newScore),
        status: 'Pending',
      };
      const updated = [...candidates, newCandidate].sort((a, b) => b.score - a.score);
      setCandidates(updated);
      setNewName('');
      setNewScore('');
    }
  };

  const handleSelectCourse = (id: number, course: string) => {
    setSelectedCourses((prev) => ({ ...prev, [id]: course }));
  };

  const handleAllot = (id: number) => {
    const course = selectedCourses[id];
    if (!course) {
      setToast({ message: 'Please select a course before allotting.', type: 'error' });
      return;
    }
    const vacancy = vacancies.find((v) => v.course === course);
    if (vacancy && vacancy.seats > 0) {
      setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: 'Allotted' } : c)));
      setVacancies(
        vacancies.map((v) => (v.course === course ? { ...v, seats: v.seats - 1 } : v))
      );
      setToast({ message: `Seat allotted to candidate in ${course}`, type: 'success' });
    } else {
      setToast({ message: `No seats available in ${course} to allot.`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 p-4 rounded shadow-lg text-white ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}
      <header className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Spot Admission (Merit-Based)</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-lg">
          Fill last-minute vacancies by ranking walk-in candidates and allotting seats accordingly.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <section className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-blue-500" />
              Live Vacancy Count
            </h2>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[240px] overflow-y-auto">
              {vacancies.map(({ course, seats }) => (
                <li
                  key={course}
                  className="flex justify-between items-center py-2 px-1 text-sm font-medium"
                >
                  <span>{course}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      seats > 0
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}
                  >
                    {seats} Seat{seats !== 1 ? 's' : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-purple-500" />
              Register Walk-in Candidate
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="candidateName" className="text-sm font-medium">
                  Candidate Name
                </label>
                <input
                  id="candidateName"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="candidateScore" className="text-sm font-medium">
                  Qualifying Score / %
                </label>
                <input
                  id="candidateScore"
                  type="number"
                  step="0.01"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  placeholder="e.g., 92.5"
                  required
                  className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                aria-label="Add candidate to ranking list"
              >
                Add to Ranking List
              </button>
            </form>
          </div>
        </section>

        <section className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col max-h-[700px]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Auto-Ranking List
          </h2>
          <div className="overflow-y-auto flex-grow border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-3">
            {candidates.length === 0 && (
              <p className="p-8 text-center text-gray-500 dark:text-gray-400">No candidates registered yet.</p>
            )}
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {candidates.map((candidate, index) => (
                <li
                  key={candidate.id}
                  className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-3 rounded-md ${
                    candidate.status === 'Allotted'
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xl font-bold text-gray-400 dark:text-gray-500 w-8 text-center"
                      aria-label={`Rank ${index + 1}`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{candidate.name}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Score: {candidate.score}</p>
                    </div>
                  </div>
                  {candidate.status === 'Pending' ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        aria-label={`Select course for candidate ${candidate.name}`}
                        value={selectedCourses[candidate.id] ?? vacancies[0].course}
                        onChange={(e) => setSelectedCourses((prev) => ({ ...prev, [candidate.id]: e.target.value }))}
                        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-1.5 text-sm"
                      >
                        {vacancies.map(({ course, seats }) => (
                          <option key={course} value={course} disabled={seats <= 0}>
                            {course} {seats <= 0 ? '(No seats)' : ''}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          const course = selectedCourses[candidate.id];
                          if (!course) {
                            setToast({ message: 'Please select a course before allotting.', type: 'error' });
                            return;
                          }
                          const vacancy = vacancies.find((v) => v.course === course);
                          if (vacancy && vacancy.seats > 0) {
                            setCandidates((prev) =>
                              prev.map((c) => (c.id === candidate.id ? { ...c, status: 'Allotted' } : c))
                            );
                            setVacancies((prev) =>
                              prev.map((v) => (v.course === course ? { ...v, seats: v.seats - 1 } : v))
                            );
                            setToast({ message: `Seat allotted to candidate in ${course}`, type: 'success' });
                          } else {
                            setToast({ message: `No seats available in ${course} to allot.`, type: 'error' });
                          }
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 font-semibold whitespace-nowrap"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Allot Seat
                      </button>
                    </div>
                  ) : (
                    <span
                      className="text-sm font-semibold text-green-700 dark:text-green-300 whitespace-nowrap"
                      aria-label={`${candidate.name} has been allotted a seat`}
                    >
                      Allotted
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SpotAdmissionMerit;
