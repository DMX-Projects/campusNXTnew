import React, { useState, useRef } from 'react';
import { Edit, Plus, Trash2, Save, X, Check, Download, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

type Period = { start: string; end: string };
type CalEvent = {
  id?: number;
  description: string;
  period: Period;
  semester?: 'odd' | 'even';
};

const EditEventModal: React.FC<{
  event: CalEvent | null;
  onSave: (e: CalEvent) => void;
  onClose: () => void;
}> = ({ event, onSave, onClose }) => {
  const [description, setDescription] = useState(event?.description || '');
  const [startDate, setStartDate] = useState(event?.period?.start || '');
  const [endDate, setEndDate] = useState(event?.period?.end || '');

  const handleSave = () => {
    if (!event?.semester) return;
    onSave({ ...event, description, period: { start: startDate, end: endDate } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {event?.id ? 'Edit Academic Event' : 'Add New Academic Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 transition"
              rows={3}
              placeholder="e.g., First Mid Semester Examination"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
              <span className="text-gray-500 dark:text-gray-400">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-transform transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-transform transform hover:scale-105 shadow-lg"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AcademicCalendarView() {
  const { user, loading } = useAuth();
  const isMasterAdmin = user?.role === 'Master Admin';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalEvent | null>(null);

  const [oddSemesterData, setOddSemesterData] = useState<CalEvent[]>([
    { id: 1, description: '#Orientation Program for 2025 Batch', period: { start: '2025-07-23', end: '2025-08-20' } },
    { id: 2, description: 'Commencement of Session for Batch 2025-26', period: { start: '2025-08-14', end: '2025-08-14' } },
    { id: 3, description: 'Commencement of Session for all Batches (Except 2025-26)', period: { start: '2025-07-28', end: '2025-07-28' } },
    { id: 4, description: 'First Mid Semester Examination', period: { start: '2025-09-22', end: '2025-09-26' } },
    { id: 5, description: 'Second Mid Semester Examination', period: { start: '2025-11-03', end: '2025-11-07' } },
    { id: 6, description: 'Preparatory Holidays', period: { start: '2025-11-08', end: '2025-11-16' } },
    { id: 7, description: 'End Semester Examination*', period: { start: '2025-11-17', end: '' } },
    { id: 8, description: 'Winter Vacations**', period: { start: '2025-12-22', end: '2026-01-04' } },
  ]);

  const [evenSemesterData, setEvenSemesterData] = useState<CalEvent[]>([
    { id: 9, description: 'Commencement of Session (All Batches)', period: { start: '2026-01-05', end: '2026-01-05' } },
    { id: 10, description: 'First Mid Semester Examination', period: { start: '2026-02-16', end: '2026-02-20' } },
    { id: 11, description: 'Second Mid Semester Examination', period: { start: '2026-04-13', end: '2026-04-17' } },
    { id: 12, description: 'Preparatory Holidays', period: { start: '2026-04-20', end: '2026-04-25' } },
    { id: 13, description: 'End Semester Examination*', period: { start: '2026-04-27', end: '' } },
    { id: 14, description: 'Summer Vacations#', period: { start: '2026-06-01', end: '2026-07-19' } },
  ]);

  const handleSaveEvent = (eventToSave: CalEvent) => {
    const isOdd = eventToSave.semester === 'odd';
    const target = isOdd ? oddSemesterData : evenSemesterData;
    const setter = isOdd ? setOddSemesterData : setEvenSemesterData;

    if (eventToSave.id) {
      setter(target.map((e) => (e.id === eventToSave.id ? { ...e, ...eventToSave } : e)));
    } else {
      const newEvent = { ...eventToSave, id: Date.now() };
      setter([...target, newEvent]);
    }
  };

  const handleDeleteEvent = (semester: 'odd' | 'even', id: number | undefined) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this event?')) {
      if (semester === 'odd') {
        setOddSemesterData(oddSemesterData.filter((e) => e.id !== id));
      } else {
        setEvenSemesterData(evenSemesterData.filter((e) => e.id !== id));
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      alert(`File "${file.name}" has been selected. Add your processing logic here.`);
    }
  };

  const handleDownload = () => {
    let content = `Academic Calendar ${academicYear}\n\n`;
    content += 'ODD SEMESTER\n';
    content += 'Sr. No., Description, Period\n';
    oddSemesterData.forEach((item, index) => {
      const period = `${formatDate(item.period.start)} ${
        item.period.end && item.period.start !== item.period.end ? `to ${formatDate(item.period.end)}` : ''
      }`;
      content += `${index + 1}, "${item.description}", "${period}"\n`;
    });

    content += '\nEVEN SEMESTER\n';
    content += 'Sr. No., Description, Period\n';
    evenSemesterData.forEach((item, index) => {
      const period = `${formatDate(item.period.start)} ${
        item.period.end && item.period.start !== item.period.end ? `to ${formatDate(item.period.end)}` : ''
      }`;
      content += `${index + 1}, "${item.description}", "${period}"\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AcademicCalendar-${academicYear}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderTable = (title: string, data: CalEvent[], semesterType: 'odd' | 'even') => (
    <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        {isMasterAdmin && (
          <button
            onClick={() => setEditingEvent({ semester: semesterType, description: '', period: { start: '', end: '' } })}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <Plus size={16} /> Add Event
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">
                Sr. No.
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Period
              </th>
              {isMasterAdmin && (
                <th scope="col" className="px-6 py-3 text-center rounded-r-lg">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id ?? `${semesterType}-${index}`}
                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.description}</td>
                <td className="px-6 py-4">
                  {formatDate(item.period.start)}{' '}
                  {item.period.end && item.period.start !== item.period.end
                    ? `to ${formatDate(item.period.end)}`
                    : item.period.end
                    ? ''
                    : 'onwards'}
                </td>
                {isMasterAdmin && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => setEditingEvent({ ...item, semester: semesterType })}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-transform transform hover:scale-125"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(semesterType, item.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-transform transform hover:scale-125"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Academic Calendar</h1>
              {isMasterAdmin && isEditingYear ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingYear(false)}
                    className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-bold bg-white dark:bg-gray-800 border-b-2 border-indigo-500 focus:outline-none w-36 px-1"
                  />
                  <button
                    onClick={() => setIsEditingYear(false)}
                    className="text-green-500 hover:text-green-700 transition-transform transform hover:scale-125"
                  >
                    <Check size={24} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl md:text-3xl text-gray-500 dark:text-gray-400">{academicYear}</span>
                  {isMasterAdmin && (
                    <button
                      onClick={() => setIsEditingYear(true)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isMasterAdmin ? (
                <button
                  onClick={handleUploadClick}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <Upload size={16} /> Upload
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <Download size={16} /> Download
                </button>
              )}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-2 text-center sm:text-left">
            {isMasterAdmin
              ? 'Technical University - Master Admin Control'
              : 'Technical University'}
          </p>
        </header>

        <main className="space-y-8">
          {renderTable('Odd Semester', oddSemesterData, 'odd')}
          {renderTable('Even Semester', evenSemesterData, 'even')}
        </main>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />

        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400 space-y-2">
          <p>*End Semester Practical Examination will be notified separately.</p>
          <p>**This will be applicable for faculty and students.</p>
          <p>#Full day (till 13th August 2025) and there after along with the classes.</p>
        </footer>
      </div>

      {editingEvent && isMasterAdmin && (
        <EditEventModal event={editingEvent} onSave={handleSaveEvent} onClose={() => setEditingEvent(null)} />
      )}
    </div>
  );
}
