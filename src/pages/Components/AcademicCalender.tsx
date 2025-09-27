import React, { useState, useMemo, useCallback, ElementType } from 'react';
import { 
    Calendar, Download, FileText, Search, RefreshCw, GraduationCap, 
    PartyPopper, FileCheck, CalendarX, Plus, Upload, Edit, Trash2, X 
} from 'lucide-react';
import { useAuth } from '../../../src/contexts/AuthContext';

// --- TYPES ---
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

// --- STYLING & ICONS ---
const categoryStyles: { [key in AcademicEvent['category']]: { icon: ElementType; textColor: string; } } = {
    Academic: { icon: GraduationCap, textColor: 'text-indigo-600 dark:text-indigo-400' },
    Examination: { icon: FileCheck, textColor: 'text-amber-600 dark:text-amber-400' },
    Holiday: { icon: PartyPopper, textColor: 'text-teal-600 dark:text-teal-400' },
    Event: { icon: PartyPopper, textColor: 'text-pink-600 dark:text-pink-400' },
};

// --- MOCK DATA ---
const SAMPLE_ACADEMIC_EVENTS: AcademicEvent[] = [
  // 2024-25 Academic Year
  { id: "univ-1-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "New Student Registration & Orientation", startDate: "2024-08-26", endDate: "2024-08-30", category: "Academic" },
  { id: "univ-2-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Commencement of Classes (Odd Semesters)", startDate: "2024-09-02", category: "Academic" },
  { id: "univ-3-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Dussehra Holiday", startDate: "2024-10-12", category: "Holiday" },
  { id: "univ-4-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Diwali Holidays", startDate: "2024-11-01", endDate: "2024-11-03", category: "Holiday" },
  { id: "univ-5-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Last Day of Classes (Odd Semesters)", startDate: "2024-12-20", category: "Academic" },
  { id: "univ-6-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Christmas Vacation", startDate: "2024-12-21", endDate: "2025-01-01", category: "Holiday" },
  { id: "univ-7-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Semester End Theory Examinations", startDate: "2025-01-15", endDate: "2025-02-15", category: "Examination" },
  { id: "univ-8-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Republic Day", startDate: "2025-01-26", category: "Holiday" },
  { id: "univ-9-24", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Commencement of Classes (Even Semesters)", startDate: "2025-02-20", category: "Academic" },
  
  { id: "dept-1-24", academicYear: "2024-25", department: "Engineering", program: "All", semester: 0, description: "Annual Technical Fest - 'TechnoVision 2024'", startDate: "2024-11-15", endDate: "2024-11-17", category: "Event" },
  { id: "dept-2-24", academicYear: "2024-25", department: "Engineering", program: "B.Tech CSE", semester: 3, description: "Internal Assessment I", startDate: "2024-10-15", endDate: "2024-10-25", category: "Examination" },
  { id: "dept-3-24", academicYear: "2024-25", department: "Engineering", program: "B.Tech Mechanical", semester: 5, description: "Industrial Visit to BHEL", startDate: "2024-10-05", category: "Event" },
  
  { id: "biz-1-24", academicYear: "2024-25", department: "Business Administration", program: "MBA", semester: 3, description: "Final Internship Presentations", startDate: "2025-04-25", category: "Examination" },

  // 2023-24 Academic Year
  { id: "univ-1-23", academicYear: "2023-24", department: "University-Wide", program: "All", semester: 0, description: "Convocation Ceremony 2024", startDate: "2024-05-18", category: "Event" },
  { id: "univ-2-23", academicYear: "2023-24", department: "University-Wide", program: "All", semester: 0, description: "Semester End Examinations (Even Semester)", startDate: "2024-05-25", endDate: "2024-06-25", category: "Examination" },
  { id: "dept-1-23", academicYear: "2023-24", department: "Arts & Science", program: "B.Sc. Physics", semester: 6, description: "Final Year Project Submission Deadline", startDate: "2024-04-30", category: "Academic" },
];

const SAMPLE_CALENDAR_PDFS: AcademicCalendarPDF[] = [
    { id: "pdf-1-24", title: "Official Academic Calendar 2024-25", fileName: "Academic_Calendar_2024-25.pdf", filePath: "/Academic_Calendar_2024-25.pdf", uploadDate: "2024-08-01", academicYear: "2024-25" },
    { id: "pdf-2-24", title: "Engineering Examination Schedule (Odd Sem, 2024-25)", fileName: "Eng_Exam_Schedule_Odd_2024-25.pdf", filePath: "/Eng_Exam_Schedule_Odd_2024-25.pdf", uploadDate: "2024-12-10", academicYear: "2024-25" },
    { id: "pdf-3-24", title: "University Holiday List 2024-25", fileName: "Holiday_List_2024-25.pdf", filePath: "/Holiday_List_2024-25.pdf", uploadDate: "2024-08-15", academicYear: "2024-25" },
    { id: "pdf-1-23", title: "Official Academic Calendar 2023-24", fileName: "Academic_Calendar_2023-24.pdf", filePath: "/Academic_Calendar_2023-24.pdf", uploadDate: "2023-08-01", academicYear: "2023-24" },
];

const AcademicCalendar: React.FC = () => { // <-- 2. Removed userRole prop
  const { user } = useAuth(); // <-- 3. Get user from Auth Context
  const [events, setEvents] = useState<AcademicEvent[]>(SAMPLE_ACADEMIC_EVENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedProg, setSelectedProg] = useState('All');
  const [selectedSem, setSelectedSem] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AcademicEvent | null>(null);

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
          {/* --- 4. Conditional Rendering based on user role --- */}
          {user?.role === 'Principal' && (
            <div className="flex items-center gap-3 self-end sm:self-center">
                <button onClick={() => alert('Import events modal would open.')} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"><Upload size={16}/> Import</button>
                <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"><Plus size={16}/> Create Event</button>
            </div>
          )}
        </header>

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
                                {user?.role === 'Principal' && <th className="p-4 w-1/5 text-center text-xs font-semibold uppercase text-gray-500 tracking-wider">Actions</th>}
                            </tr>
                        </thead>
                        {Object.entries(groupedEvents).map(([category, events]) => {
                            if (events.length === 0) return null;
                            const style = categoryStyles[category as keyof typeof categoryStyles];
                            return (
                                <tbody key={category}>
                                    <tr><td colSpan={user?.role === 'Principal' ? 4 : 3} className="p-2 bg-gray-100 dark:bg-gray-900/50"><div className={`flex items-center gap-2 font-bold text-sm ${style.textColor}`}><style.icon size={18}/> {category}</div></td></tr>
                                    {events.map(event => (
                                        <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                                            <td className="p-4"><p className="font-semibold text-gray-800 dark:text-gray-100">{event.description}</p></td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400 font-medium">{formatDisplayDate(event.startDate)}{event.endDate && ` - ${formatDisplayDate(event.endDate)}`}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{getApplicabilityInfo(event)}</td>
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

// Event Modal Component
const EventModal = ({ event, onSave, onClose }: { event: AcademicEvent | null; onSave: (data: AcademicEvent) => void; onClose: () => void; }) => {
    const [formData, setFormData] = useState<AcademicEvent>(event || {
        id: '', academicYear: '2024-25', department: 'University-Wide', program: 'All', semester: 0,
        description: '', startDate: '', endDate: '', category: 'Academic'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'semester' ? parseInt(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">{event ? 'Edit Event' : 'Create New Event'}</h2>
                        <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X/></button>
                    </div>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div><label className="text-sm font-medium">Description</label><textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Start Date</label><input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/></div>
                            <div><label className="text-sm font-medium">End Date (Optional)</label><input type="date" name="endDate" value={formData.endDate || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Category</label><select name="category" value={formData.category} onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">{Object.keys(categoryStyles).map(cat => <option key={cat}>{cat}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Academic Year</label><select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><option>2024-25</option><option>2023-24</option></select></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Department</label><select name="department" value={formData.department} onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><option>University-Wide</option><option>Engineering</option><option>Arts & Science</option><option>Business Administration</option></select></div>
                            <div><label className="text-sm font-medium">Program</label><input name="program" value={formData.program} onChange={handleChange} placeholder="e.g., All or B.Tech CSE" className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/></div>
                        </div>
                        <div><label className="text-sm font-medium">Semester (0 for All)</label><input type="number" name="semester" value={formData.semester} onChange={handleChange} min="0" max="8" className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"/></div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 rounded-b-2xl">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AcademicCalendar;