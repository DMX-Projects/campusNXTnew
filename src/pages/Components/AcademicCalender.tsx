import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, Download, FileText, Search, RefreshCw, BookOpen, Award, GraduationCap, Building } from 'lucide-react';

// Simplified Academic Event Interface
interface AcademicEvent {
  id: string;
  semester: 'Odd' | 'Even';
  dates: string;
  description: string;
  course?: string;
  department?: string;
}

// PDF Interface (can remain the same)
interface AcademicCalendarPDF {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  uploadDate: string;
  academicYear: string;
  course?: string;
}

const styles = {
  page: "w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans",
  container: "w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8",

  // Header
  header: "mb-8 pb-4 border-b border-gray-200 dark:border-gray-700",
  headerTitle: "text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100",
  headerSubtitle: "text-lg text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2",

  // Section
  section: "mb-12",
  sectionTitle: "text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-6 pb-2 border-b-2 border-indigo-200 dark:border-indigo-800 flex items-center gap-3",

  // Filters
  filtersSection: "bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 mb-8 shadow-sm",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300",
  input: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all",
  select: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none",
  button: "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonSecondary: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-500",

  // Calendar Table
  calendarTable: "w-full border-collapse",
  calendarRow: "border-b border-gray-200 dark:border-gray-700",
  calendarCellDate: "w-1/3 sm:w-1/4 p-4 text-sm font-medium text-gray-600 dark:text-gray-400 align-top",
  calendarCellDesc: "p-4 text-sm text-gray-800 dark:text-gray-200",

  // PDF List
  pdfList: "space-y-4",
  pdfItem: "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all",
  pdfInfo: "flex items-center gap-4",
  pdfIcon: "w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center shrink-0",
  pdfTitle: "font-semibold text-gray-900 dark:text-gray-100",
  pdfMeta: "text-xs text-gray-500 dark:text-gray-400",

  // Empty State
  empty: "text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl",
  emptyIcon: "w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-500 dark:text-gray-500",
};

// New Sample Data
const SAMPLE_ACADEMIC_EVENTS: AcademicEvent[] = [
  // Odd Semester
  { id: "odd-1", semester: "Odd", dates: "Sep 01, 2024", description: "Academic Year Commencement & Orientation", course: "All Courses" },
  { id: "odd-2", semester: "Odd", dates: "Sep 02, 2024", description: "Start of Instructional Days for Odd Semester" },
  { id: "odd-3", semester: "Odd", dates: "Oct 15 - Oct 25, 2024", description: "First Mid-Term Examinations", course: "All Courses" },
  { id: "odd-4", semester: "Odd", dates: "Oct 12 - Oct 14, 2024", description: "Dussehra Holidays" },
  { id: "odd-5", semester: "Odd", dates: "Nov 15 - Nov 17, 2024", description: "Annual Technical Fest - TechnoVision 2024" },
  { id: "odd-6", semester: "Odd", dates: "Dec 10 - Dec 20, 2024", description: "Second Mid-Term Examinations", course: "All Courses" },
  { id: "odd-7", semester: "Odd", dates: "Dec 21, 2024", description: "Last Instructional Day for Odd Semester" },
  { id: "odd-8", semester: "Odd", dates: "Dec 22, 2024 - Jan 05, 2025", description: "Winter Break" },

  // Even Semester
  { id: "even-1", semester: "Even", dates: "Jan 06, 2025", description: "Start of Instructional Days for Even Semester" },
  { id: "even-2", semester: "Even", dates: "Jan 15 - Feb 15, 2025", description: "Semester End Examinations (for previous Odd Sem)", course: "All Courses" },
  { id: "even-3", semester: "Even", dates: "Feb 20 - Mar 05, 2025", description: "Practical Examinations", department: "Engineering" },
  { id: "even-4", semester: "Even", dates: "Mar 15, 2025", description: "Results Declaration - Odd Semester", course: "All Courses" },
  { id: "even-5", semester: "Even", dates: "Mar 20 - Mar 30, 2025", description: "First Mid-Term Examinations (Even Sem)" },
  { id: "even-6", semester: "Even", dates: "Apr 10 - Apr 12, 2025", description: "Annual Sports Meet" },
  { id: "even-7", semester: "Even", dates: "May 15 - May 25, 2025", description: "Second Mid-Term Examinations (Even Sem)" },
  { id: "even-8", semester: "Even", dates: "May 26, 2025", description: "Last Instructional Day for Even Semester" },
  { id: "even-9", semester: "Even", dates: "May 27 - Jun 15, 2025", description: "Study Leave" },
  { id: "even-10", semester: "Even", dates: "Jun 16 - Jul 15, 2025", description: "Semester End Examinations (Even Sem)" },
  { id: "even-11", semester: "Even", dates: "Jul 16 - Aug 31, 2025", description: "Summer Vacation" },
];

const SAMPLE_CALENDAR_PDFS: AcademicCalendarPDF[] = [
    { id: "pdf-1", title: "Official Academic Calendar 2024-25 (All Courses)", fileName: "Academic_Calendar_2024-25.pdf", filePath: "/Academic_Calendar_2024-25.pdf", uploadDate: "2024-08-01", academicYear: "2024-25", course: "All Courses" },
    { id: "pdf-2", title: "B.Tech Examination Schedule (2024-25)", fileName: "BTech_Exam_Schedule_2024-25.pdf", filePath: "/BTech_Exam_Schedule_2024-25.pdf", uploadDate: "2024-09-05", academicYear: "2024-25", course: "B.Tech" },
    { id: "pdf-3", title: "Postgraduate Programs Calendar (2024-25)", fileName: "PG_Calendar_2024-25.pdf", filePath: "/PG_Calendar_2024-25.pdf", uploadDate: "2024-08-10", academicYear: "2024-25", course: "M.Tech & Ph.D" },
    { id: "pdf-4", title: "List of Holidays 2024-25", fileName: "Holiday_List_2024-25.pdf", filePath: "/Holiday_List_2024-25.pdf", uploadDate: "2024-07-20", academicYear: "2024-25" },
];


const AcademicCalendar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedSemester, setSelectedSemester] = useState<'All' | 'Odd' | 'Even'>('All');

  const filteredEvents = useMemo(() => {
    let events = SAMPLE_ACADEMIC_EVENTS;

    if (selectedSemester !== 'All') {
      events = events.filter(event => event.semester === selectedSemester);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      events = events.filter(event =>
        event.description.toLowerCase().includes(lowercasedTerm) ||
        event.course?.toLowerCase().includes(lowercasedTerm) ||
        event.department?.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    // Note: Year filtering would apply here if the data spanned multiple years
    // For this sample data, it's implicitly filtered by the data set itself.

    return events;
  }, [searchTerm, selectedSemester]);
  
  const filteredPDFs = useMemo(() => {
      // For now, it just filters by year. Can be expanded.
      return SAMPLE_CALENDAR_PDFS.filter(pdf => pdf.academicYear === selectedYear);
  }, [selectedYear]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedSemester('All');
    setSelectedYear('2024-25');
  }, []);
  
  const downloadPDF = useCallback((pdf: AcademicCalendarPDF) => {
    const link = document.createElement('a');
    link.href = pdf.filePath;
    link.download = pdf.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`Downloaded: ${pdf.fileName}`);
  }, []);
  
  const renderSemesterEvents = (semester: 'Odd' | 'Even', title: string, dateRange: string) => {
      const events = filteredEvents.filter(e => e.semester === semester);
      if (events.length === 0 && selectedSemester !== 'All') return null;

      return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                <Calendar className="w-7 h-7" />
                <div>
                    {title}
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{dateRange}</div>
                </div>
            </h2>
            {events.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
                    <table className={styles.calendarTable}>
                        <tbody>
                            {events.map(event => (
                                <tr key={event.id} className={styles.calendarRow}>
                                    <td className={styles.calendarCellDate}>{event.dates}</td>
                                    <td className={styles.calendarCellDesc}>
                                        {event.description}
                                        {(event.course || event.department) && (
                                            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                                {event.course && `Applicable for: ${event.course}`}
                                                {event.department && `Applicable for: ${event.department}`}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                 <div className={styles.empty}>
                    <Calendar className={styles.emptyIcon} />
                    <h3 className={styles.emptyTitle}>No events found for this semester.</h3>
                </div>
            )}
          </div>
      );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Academic Calendar</h1>
          <p className={styles.headerSubtitle}>
            Key dates and events for the academic year {selectedYear}
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersGrid}>
            <div className={`${styles.filterGroup} lg:col-span-2`}>
              <label className={styles.filterLabel}>Search Events</label>
              <input
                className={styles.input}
                placeholder="e.g., Examination, Technical Fest..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Academic Year</label>
              <select
                className={styles.select}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
                <option value="2025-26">2025-26</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Semester</label>
              <select
                className={styles.select}
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value as any)}
              >
                <option value="All">All Semesters</option>
                <option value="Odd">Odd Semester</option>
                <option value="Even">Even Semester</option>
              </select>
            </div>
          </div>
           <div className="mt-4 flex justify-end">
                <button
                    onClick={clearFilters}
                    className={`${styles.button} ${styles.buttonSecondary}`}
                >
                    <RefreshCw className="w-4 h-4" />
                    Clear Filters
                </button>
            </div>
        </div>

        {/* Calendar Events */}
        {(selectedSemester === 'All' || selectedSemester === 'Odd') && renderSemesterEvents('Odd', 'Odd Semester', 'September 2024 - January 2025')}
        {(selectedSemester === 'All' || selectedSemester === 'Even') && renderSemesterEvents('Even', 'Even Semester', 'January 2025 - July 2025')}
        
        {filteredEvents.length === 0 && (
             <div className={styles.empty}>
                <Search className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No Matching Events</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
        )}

        {/* PDF Documents */}
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                <Download className="w-7 h-7" />
                Downloadable Documents
            </h2>
            <div className={styles.pdfList}>
                {filteredPDFs.map(pdf => (
                    <div key={pdf.id} className={styles.pdfItem}>
                        <div className={styles.pdfInfo}>
                            <div className={styles.pdfIcon}>
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className={styles.pdfTitle}>{pdf.title}</h3>
                                <p className={styles.pdfMeta}>Uploaded on: {new Date(pdf.uploadDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => downloadPDF(pdf)}
                            className={`${styles.button} bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 mt-3 sm:mt-0`}
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;