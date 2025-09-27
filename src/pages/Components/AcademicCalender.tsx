import React, { useState, useMemo, useCallback } from 'react';
import { 
    Calendar, Download, FileText, Search, RefreshCw, GraduationCap, 
    Building, PartyPopper, FileCheck, CalendarX 
} from 'lucide-react';

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

const categoryStyles = {
    Academic: { 
        icon: GraduationCap, 
        borderColor: 'border-indigo-500', 
        textColor: 'text-indigo-600 dark:text-indigo-400'
    },
    Examination: { 
        icon: FileCheck, 
        borderColor: 'border-amber-500', 
        textColor: 'text-amber-600 dark:text-amber-400'
    },
    Holiday: { 
        icon: PartyPopper,
        borderColor: 'border-teal-500', 
        textColor: 'text-teal-600 dark:text-teal-400'
    },
    Event: { 
        icon: PartyPopper, 
        borderColor: 'border-pink-500', 
        textColor: 'text-pink-600 dark:text-pink-400'
    },
};

const styles = {
  page: "w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans",
  container: "w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8",
  
  header: "mb-8 pb-4 border-b border-gray-200 dark:border-gray-700",
  headerTitle: "text-4xl lg:text-5xl font-bold text-black dark:text-white",

  headerSubtitle: "text-lg text-gray-600 dark:text-gray-400 mt-2",
  
  section: "mb-12",
  sectionTitle: "text-2xl font-semibold mb-6 flex items-center gap-3",
  sectionTitleIcon: "w-7 h-7",

  // --- DARK MODE FIX: Re-added dark mode backgrounds for visibility ---
  filtersSection: "bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 mb-8 shadow-sm", 
  filterTitle: "text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300",
  filterInput: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all",
  filterSelect: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none",
  filterActions: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center",
  filterButtonContainer: "flex justify-start md:justify-end md:self-end h-full",

  button: "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonIcon: "w-4 h-4",
  buttonSecondary: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-500",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 transform hover:scale-105",

  // --- DARK MODE FIX: Re-added dark mode backgrounds for visibility ---
  tableContainer: "overflow-x-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl",
  table: "w-full min-w-[800px]",
  tableHeader: "p-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700",
  tableRow: "group hover:bg-gray-50 dark:hover:bg-gray-800/50",
  tableCell: "p-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 align-top",
  eventCell: "font-semibold text-gray-800 dark:text-gray-100",
  eventCellIcon: "w-5 h-5 shrink-0",
  eventApplicability: "text-xs text-gray-500 dark:text-gray-400 font-normal mt-1",
  dateCell: "text-gray-600 dark:text-gray-400",

  // --- DARK MODE FIX: Re-added dark mode backgrounds for visibility ---
  pdfList: "space-y-4",
  pdfItem: "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all",
  pdfInfo: "flex items-center gap-4",
  pdfIconContainer: "w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center shrink-0",
  pdfIcon: "w-5 h-5",
  pdfTitle: "font-semibold text-gray-900 dark:text-gray-100",
  pdfMeta: "text-xs text-gray-500 dark:text-gray-400",
  
  // --- DARK MODE FIX: Re-added dark mode backgrounds for visibility ---
  empty: "text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900",
  emptyIcon: "w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-600 dark:text-gray-400",
  emptySubtitle: "text-sm text-gray-500",
};

const SAMPLE_ACADEMIC_EVENTS: AcademicEvent[] = [
  { id: "univ-1", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "New Student Registration & Orientation Week", startDate: "2024-08-26", endDate: "2024-08-30", category: "Academic" },
  { id: "univ-2", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "First Day of Classes (Odd Semester)", startDate: "2024-09-02", category: "Academic" },
  { id: "univ-3", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Dussehra Holiday", startDate: "2024-10-12", category: "Holiday" },
  { id: "univ-6", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Semester End Examinations (Odd Semester)", startDate: "2025-01-15", endDate: "2025-02-15", category: "Examination" },
  { id: "univ-7", academicYear: "2024-25", department: "University-Wide", program: "All", semester: 0, description: "Annual Sports Meet 'Triumph 2025'", startDate: "2025-04-10", endDate: "2025-04-12", category: "Event" },
  { id: "dept-1", academicYear: "2024-25", department: "Engineering", program: "All", semester: 0, description: "Annual Technical Fest - 'TechnoVision'", startDate: "2024-11-15", endDate: "2024-11-17", category: "Event" },
  { id: "dept-3", academicYear: "2024-25", department: "Engineering", program: "B.Tech CSE", semester: 3, description: "First Mid-Term Examinations", startDate: "2024-10-15", endDate: "2024-10-25", category: "Examination" },
  { id: "dept-5", academicYear: "2024-25", department: "Engineering", program: "B.Tech Mechanical", semester: 5, description: "Workshop on 3D Printing", startDate: "2024-09-25", category: "Event" },
  { id: "as-2", academicYear: "2024-25", department: "Arts & Science", program: "B.Sc. Physics", semester: 5, description: "Lab Project Submissions Deadline", startDate: "2024-11-22", category: "Academic" },
  { id: "biz-5", academicYear: "2024-25", department: "Business Administration", program: "MBA", semester: 3, description: "Industry Interaction Summit", startDate: "2024-11-20", category: "Event" },
  { id: "biz-6", academicYear: "2024-25", department: "Business Administration", program: "MBA", semester: 3, description: "Final Internship Presentations", startDate: "2025-04-25", category: "Examination" },
];

const SAMPLE_CALENDAR_PDFS: AcademicCalendarPDF[] = [
    { id: "pdf-1", title: "Official Academic Calendar 2024-25", fileName: "Academic_Calendar_2024-25.pdf", filePath: "/Academic_Calendar_2024-25.pdf", uploadDate: "2024-08-01", academicYear: "2024-25" },
    { id: "pdf-2", title: "Engineering Examination Schedule (2024-25)", fileName: "Eng_Exam_Schedule_2024-25.pdf", filePath: "/Eng_Exam_Schedule_2024-25.pdf", uploadDate: "2024-09-05", academicYear: "2024-25" },
    { id: "pdf-3", title: "Student Handbook & Code of Conduct", fileName: "Student_Handbook_2024-25.pdf", filePath: "/Student_Handbook_2024-25.pdf", uploadDate: "2024-08-15", academicYear: "2024-25" },
];

const AcademicCalendar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedProg, setSelectedProg] = useState('All');
  const [selectedSem, setSelectedSem] = useState('All');

  const { departments, programs } = useMemo(() => {
    const uniqueDepts = [...new Set(SAMPLE_ACADEMIC_EVENTS.map(e => e.department))];
    const departments = ['All', ...uniqueDepts.filter(d => d !== 'University-Wide')];
    
    const relevantEvents = selectedDept === 'All' 
        ? SAMPLE_ACADEMIC_EVENTS 
        : SAMPLE_ACADEMIC_EVENTS.filter(e => e.department === selectedDept);
    
    const uniquePrograms = [...new Set(relevantEvents.map(e => e.program))];
    const programs = ['All', ...uniquePrograms.filter(p => p !== 'All')];
    
    return { departments, programs };
  }, [selectedDept]);
  
  const filteredEvents = useMemo(() => {
    let events = SAMPLE_ACADEMIC_EVENTS;

    events = events.filter(event => 
      event.academicYear === selectedYear &&
      (selectedDept === 'All' || event.department === selectedDept || event.department === 'University-Wide') &&
      (selectedProg === 'All' || event.program === selectedProg || event.program === 'All') &&
      (selectedSem === 'All' || event.semester.toString() === selectedSem || event.semester === 0)
    );

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      events = events.filter(event =>
        event.description.toLowerCase().includes(lowercasedTerm) ||
        event.category.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [searchTerm, selectedYear, selectedDept, selectedProg, selectedSem]);

  const filteredPDFs = useMemo(() => {
    return SAMPLE_CALENDAR_PDFS.filter(pdf => pdf.academicYear === selectedYear);
  }, [selectedYear]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedYear('2024-25');
    setSelectedDept('All');
    setSelectedProg('All');
    setSelectedSem('All');
  }, []);

  const downloadPDF = useCallback((pdf: AcademicCalendarPDF) => {
    const link = document.createElement('a');
    link.href = pdf.filePath;
    link.download = pdf.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: AcademicEvent[] } = { Academic: [], Examination: [], Holiday: [], Event: [] };
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
    return parts.join(' • ');
  };
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Academic Calendar</h2>
          <p className={styles.headerSubtitle}>Key dates and events for the {selectedYear} academic year.</p>
        </div>

        <div className={styles.filtersSection}>
           <h3 className={styles.filterTitle}>Refine Your View</h3>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
                <label htmlFor="year-filter" className={styles.filterLabel}>Academic Year</label>
                <select id="year-filter" className={styles.filterSelect} value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}><option value="2024-25">2024-25</option><option value="2023-24">2023-24</option></select>
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="dept-filter" className={styles.filterLabel}>Department</label>
                <select id="dept-filter" className={styles.filterSelect} value={selectedDept} onChange={(e) => { setSelectedDept(e.target.value); setSelectedProg('All'); }}>{departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}</select>
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="prog-filter" className={styles.filterLabel}>Program</label>
                <select id="prog-filter" className={styles.filterSelect} value={selectedProg} onChange={(e) => setSelectedProg(e.target.value)}>{programs.map(prog => <option key={prog} value={prog}>{prog}</option>)}</select>
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="sem-filter" className={styles.filterLabel}>Semester</label>
                <select id="sem-filter" className={styles.filterSelect} value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)}><option value="All">All Semesters</option>{[...Array(8)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}</select>
            </div>
          </div>
          <div className={styles.filterActions}>
            <div className={styles.filterGroup}>
                <label htmlFor="search-input" className={styles.filterLabel}>Search by keyword</label>
                <input id="search-input" className={styles.filterInput} placeholder="e.g., Examination, Fest, Holiday..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className={styles.filterButtonContainer}>
                <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}><RefreshCw className={styles.buttonIcon} /> Clear Filters</button>
            </div>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          Object.entries(groupedEvents).map(([category, events]) => {
            if (events.length === 0) return null;
            const CategoryIcon = categoryStyles[category as keyof typeof categoryStyles].icon;
            const categoryColor = categoryStyles[category as keyof typeof categoryStyles].textColor;
            
            return (
              <div key={category} className={styles.section}>
                <h2 className={`${styles.sectionTitle} ${categoryColor}`}>
                  <CategoryIcon className={styles.sectionTitleIcon} /> {category} Dates
                </h2>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={`${styles.tableHeader} w-3/5`}>Event</th>
                        <th className={`${styles.tableHeader} w-1/5`}>Start Date</th>
                        <th className={`${styles.tableHeader} w-1/5`}>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map(event => {
                        const style = categoryStyles[event.category];
                        const applicabilityInfo = getApplicabilityInfo(event);
                        return (
                          <tr key={event.id} className={styles.tableRow}>
                            <td className={`${styles.tableCell} ${styles.eventCell} border-l-4 ${style.borderColor}`}>
                                <div className="flex items-center gap-3">
                                    <CategoryIcon className={`${styles.eventCellIcon} ${style.textColor}`} />
                                    <div>
                                        <span>{event.description}</span>
                                        {applicabilityInfo && <p className={styles.eventApplicability}>{applicabilityInfo}</p>}
                                    </div>
                                </div>
                            </td>
                            <td className={`${styles.tableCell} ${styles.dateCell}`}>{formatDisplayDate(event.startDate)}</td>
                            <td className={`${styles.tableCell} ${styles.dateCell}`}>{formatDisplayDate(event.endDate)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.empty}>
            <CalendarX className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Matching Events Found</h3>
            <p className={styles.emptySubtitle}>Please try adjusting your search or filter criteria.</p>
          </div>
        )}

        <div className={styles.section}>
            <h2 className={`${styles.sectionTitle} text-red-600 dark:text-red-400`}><Download className={styles.sectionTitleIcon} /> Downloadable Documents</h2>
            {filteredPDFs.length > 0 ? (
                <div className={styles.pdfList}>
                    {filteredPDFs.map(pdf => (
                    <div key={pdf.id} className={styles.pdfItem}>
                        <div className={styles.pdfInfo}>
                            <div className={styles.pdfIconContainer}><FileText className={styles.pdfIcon} /></div>
                            <div>
                                <h3 className={styles.pdfTitle}>{pdf.title}</h3>
                                <p className={styles.pdfMeta}>Uploaded: {new Date(pdf.uploadDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button onClick={() => downloadPDF(pdf)} className={`${styles.button} ${styles.buttonPrimary}`}>
                            <Download className={styles.buttonIcon} /> Download
                        </button>
                    </div>))}
                </div>
            ) : (
                <p className={styles.emptySubtitle}>No downloadable documents for this academic year.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;