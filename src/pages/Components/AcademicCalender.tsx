import React, { useState, useMemo, useCallback, ElementType } from 'react';
import { 
    Calendar, Download, FileText, Search, RefreshCw, GraduationCap, 
    PartyPopper, FileCheck, CalendarX, Plus, Upload, Edit, Trash2, X 
} from 'lucide-react';
import { useAuth } from '../../../src/contexts/AuthContext';

// --- TYPES (No changes here) ---
interface AcademicEvent {
  id: string;
  academicYear: string;
  department: string;
  program: string;
  semester: number;
  description: string;
  startDate: string;
  endDate?: string;
  category: 'Holiday' | 'Examination' | 'Event' | 'Academic';
}

interface AcademicCalendarPDF {
  id: string;
  title: string;
  fileName:string;
  filePath: string;
  uploadDate: string;
  academicYear: string;
}

// --- STYLING & ICONS (No changes here) ---
const categoryStyles: { [key in AcademicEvent['category']]: { icon: ElementType; textColor: string; } } = {
    Academic: { icon: GraduationCap, textColor: 'text-indigo-600 dark:text-indigo-400' },
    Examination: { icon: FileCheck, textColor: 'text-amber-600 dark:text-amber-400' },
    Holiday: { icon: PartyPopper, textColor: 'text-teal-600 dark:text-teal-400' },
    Event: { icon: PartyPopper, textColor: 'text-pink-600 dark:text-pink-400' },
};

// --- MOCK DATA (No changes here) ---
const SAMPLE_ACADEMIC_EVENTS: AcademicEvent[] = [
  // ... data remains the same
];

const SAMPLE_CALENDAR_PDFS: AcademicCalendarPDF[] = [
  // ... data remains the same
];

const AcademicCalendar: React.FC = () => { 
  const { user } = useAuth(); 
  const [events, setEvents] = useState<AcademicEvent[]>(SAMPLE_ACADEMIC_EVENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedProg, setSelectedProg] = useState('All');
  const [selectedSem, setSelectedSem] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AcademicEvent | null>(null);

  // All hooks (useMemo, useCallback) and functions (handleDelete, etc.) remain the same...
  // ...

  const { departments, programs, academicYears } = useMemo(() => {
    const allEvents = SAMPLE_ACADEMIC_EVENTS;
    const uniqueDepts = [...new Set(allEvents.map(e => e.department))];
    const departments = ['All', ...uniqueDepts.filter(d => d !== 'University-Wide')];
    
    const relevantEvents = selectedDept === 'All' 
        ? allEvents 
        : allEvents.filter(e => e.department === selectedDept || e.department === 'University-Wide');
    
    const uniquePrograms = [...new Set(relevantEvents.map(e => e.program))];
    const programs = ['All', ...uniquePrograms.filter(p => p !== 'All')];
    
    const academicYears = [...new Set(allEvents.map(e => e.academicYear))].sort((a, b) => b.localeCompare(a));

    return { departments, programs, academicYears };
  }, [selectedDept]);
  
  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => 
      (selectedDept === 'All' || event.department === selectedDept || event.department === 'University-Wide') &&
      (selectedProg === 'All' || event.program === selectedProg || event.program === 'All') &&
      (selectedSem === 'All' || event.semester.toString() === selectedSem || event.semester === 0) &&
      event.academicYear === selectedYear
    );
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(event => event.description.toLowerCase().includes(lowercasedTerm));
    }
    return filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [searchTerm, selectedYear, selectedDept, selectedProg, selectedSem, events]);

  const filteredPDFs = useMemo(() => {
    return SAMPLE_CALENDAR_PDFS.filter(pdf => pdf.academicYear === selectedYear);
  }, [selectedYear]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedDept('All');
    setSelectedProg('All');
    setSelectedSem('All');
    setSelectedYear(academicYears[0] || '2024-25');
  }, [academicYears]);

  const downloadPDF = useCallback((pdf: AcademicCalendarPDF) => {
    const dummyContent = `This is a dummy file for the document: ${pdf.title}\n\nFile Name: ${pdf.fileName}\nAcademic Year: ${pdf.academicYear}`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pdf.fileName.replace(/\.[^/.]+$/, ".txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);
  
  const handleCreateNew = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: AcademicEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
        setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const handleSave = (eventData: AcademicEvent) => {
    if (editingEvent) {
        setEvents(prev => prev.map(e => e.id === editingEvent.id ? {...e, ...eventData} : e));
    } else {
        setEvents(prev => [...prev, { ...eventData, id: `evt-${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: AcademicEvent[] } = {};
    for (const category of Object.keys(categoryStyles)) {
        groups[category] = [];
    }
    filteredEvents.forEach(event => {
      if (groups[event.category]) {
        groups[event.category].push(event);
      }
    });
    return groups;
  }, [filteredEvents]);

  const formatDisplayDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr + 'T00:00:00'); 
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' });
  };
  
  const getApplicabilityInfo = (event: AcademicEvent) => {
    const parts = [];
    if (event.department !== 'University-Wide') parts.push(event.department);
    if (event.program !== 'All') parts.push(event.program);
    if (event.semester !== 0) parts.push(`Sem ${event.semester}`);
    return parts.length > 0 ? parts.join(' • ') : 'University-Wide';
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Academic Calendar</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Key dates for the {selectedYear} academic year.</p>
          </div>
          {/* --- CHANGE 1 --- */}
          {user?.role === 'Principal' && (
            <div className="flex items-center gap-3 self-end sm:self-center">
                <button onClick={() => alert('Import events modal would open.')} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"><Upload size={16}/> Import</button>
                <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"><Plus size={16}/> Create Event</button>
            </div>
          )}
        </header>

        {/* Filters section remains the same */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-1"><label className="text-sm font-medium">Department</label><select value={selectedDept} onChange={(e) => { setSelectedDept(e.target.value); setSelectedProg('All'); }} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><option value="All">All Departments</option>{departments.filter(d => d !== 'All').map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                <div className="lg:col-span-1"><label className="text-sm font-medium">Program</label><select value={selectedProg} onChange={e => setSelectedProg(e.target.value)} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><option value="All">All Programs</option>{programs.filter(p => p !== 'All').map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                <div className="lg:col-span-1"><label className="text-sm font-medium">Semester</label><select value={selectedSem} onChange={e => setSelectedSem(e.target.value)} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><option value="All">All Semesters</option>{[...Array(8)].map((_,i) => <option key={i+1} value={i+1}>{i+1}</option>)}</select></div>
                <div className="lg:col-span-1"><label className="text-sm font-medium">Academic Year</label><select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">{academicYears.map(y => <option key={y} value={y}>{y}</option>)}</select></div>
                <div className="lg:col-span-1 grid grid-cols-1 gap-4 pt-4">
                    <div className="flex items-end"> <button onClick={clearFilters} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"><RefreshCw size={16}/> Clear</button> </div>
                </div>
            </div>
        </div>

        <div className="space-y-12">
            {filteredEvents.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="p-4 w-2/5 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">Event</th>
                                <th className="p-4 w-1/5 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">Dates</th>
                                <th className="p-4 w-1/5 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">Applicability</th>
                                {/* --- CHANGE 2 --- */}
                                {user?.role === 'Principal' && <th className="p-4 w-1/5 text-center text-xs font-semibold uppercase text-gray-500 tracking-wider">Actions</th>}
                            </tr>
                        </thead>
                        {Object.entries(groupedEvents).map(([category, events]) => {
                            if (events.length === 0) return null;
                            const style = categoryStyles[category as keyof typeof categoryStyles];
                            return (
                                <tbody key={category}>
                                    {/* --- CHANGE 3 --- */}
                                    <tr><td colSpan={user?.role === 'Principal' ? 4 : 3} className="p-2 bg-gray-100 dark:bg-gray-900/50"><div className={`flex items-center gap-2 font-bold text-sm ${style.textColor}`}><style.icon size={18}/> {category}</div></td></tr>
                                    {events.map(event => (
                                        <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                                            <td className="p-4"><p className="font-semibold text-gray-800 dark:text-gray-100">{event.description}</p></td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400 font-medium">{formatDisplayDate(event.startDate)}{event.endDate && ` - ${formatDisplayDate(event.endDate)}`}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{getApplicabilityInfo(event)}</td>
                                            {/* --- CHANGE 4 --- */}
                                            {user?.role === 'Principal' && (
                                                <td className="p-4">
                                                    <div className="flex justify-center items-center gap-2">
                                                        <button onClick={() => handleEdit(event)} className="p-2 text-gray-500 hover:text-indigo-600"><Edit size={16}/></button>
                                                        <button onClick={() => handleDelete(event.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={16}/></button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"><CalendarX className="w-16 h-16 text-gray-400 mx-auto mb-4" /><h3 className="text-xl font-semibold">No Matching Events Found</h3><p>Please adjust your filter criteria.</p></div>
            )}
        </div>
        {isModalOpen && <EventModal event={editingEvent} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

// Event Modal Component remains the same
const EventModal = ({ event, onSave, onClose }: { event: AcademicEvent | null; onSave: (data: AcademicEvent) => void; onClose: () => void; }) => {
    // ... modal code is unchanged
};

export default AcademicCalendar;