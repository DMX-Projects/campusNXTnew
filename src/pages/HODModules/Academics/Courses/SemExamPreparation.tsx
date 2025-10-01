import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// ====================================================================
// 1. TYPE DEFINITIONS & INTERFACES
// ====================================================================

export type Theme = 'light' | 'dark';

// Core data model for a single submitted question paper
export interface QuestionPaperSubmission {
  paperId: string;
  courseCode: string; // e.g., "CS-301"
  courseName: string; // e.g., "Database Management Systems"
  facultyName: string; // Faculty who submitted the paper
  submissionDate: Date;
  status: 'Draft' | 'Submitted' | 'Reviewed' | 'Approved' | 'Rejected';
  syllabusCoverage: number; // Percentage, for HOD quick check
  difficultyDistribution: {
    easy: number; // Count of easy questions
    medium: number;
    hard: number;
  };
}

// Data model for HOD's quick-view analytics
export interface DepartmentExamAnalytics {
  totalPapersSubmitted: number;
  awaitingApproval: number;
  rejectedLast7Days: number;
  averagePassRate: number; // Overall pass rate for the department
  facultyComplianceRate: number; // % of faculty who met all deadlines
}

// Theme Context Definition
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// ====================================================================
// 2. MOCK DATA
// ====================================================================

const mockAnalytics: DepartmentExamAnalytics = {
  totalPapersSubmitted: 15,
  awaitingApproval: 3,
  rejectedLast7Days: 1,
  averagePassRate: 78.5,
  facultyComplianceRate: 92,
};

const mockSubmissions: QuestionPaperSubmission[] = [
  { paperId: 'P001', courseCode: 'EE-205', courseName: 'Circuit Analysis', facultyName: 'Dr. A. Sharma', submissionDate: new Date(), status: 'Submitted', syllabusCoverage: 90, difficultyDistribution: { easy: 5, medium: 10, hard: 5 } },
  { paperId: 'P002', courseCode: 'ME-410', courseName: 'Fluid Mechanics', facultyName: 'Prof. S. Khan', submissionDate: new Date('2025-09-28'), status: 'Approved', syllabusCoverage: 100, difficultyDistribution: { easy: 7, medium: 11, hard: 2 } },
  { paperId: 'P003', courseCode: 'CS-401', courseName: 'AI & ML', facultyName: 'Dr. Z. Huq', submissionDate: new Date('2025-09-29'), status: 'Rejected', syllabusCoverage: 75, difficultyDistribution: { easy: 2, medium: 8, hard: 10 } },
  { paperId: 'P004', courseCode: 'CE-302', courseName: 'Structural Design', facultyName: 'Prof. J. Kaur', submissionDate: new Date('2025-10-01'), status: 'Submitted', syllabusCoverage: 88, difficultyDistribution: { easy: 4, medium: 12, hard: 4 } },
];


// ====================================================================
// 3. THEME CONTEXT AND HOOKS
// ====================================================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use a state for theme, checking local storage for persistence
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('erp-theme') as Theme) || 'light'
  );

  const toggleTheme = () => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('erp-theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ====================================================================
// 4. PRESENTATION COMPONENTS
// ====================================================================

const PaperCard: React.FC<{ paper: QuestionPaperSubmission, theme: Theme }> = ({ paper, theme }) => (
  <div style={{ padding: '15px', borderRadius: '8px', marginBottom: '10px', boxShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : '0 1px 5px rgba(255, 255, 255, 0.1)', backgroundColor: theme === 'light' ? 'white' : '#1f2937' }}>
    <h4 style={{ margin: '0 0 5px 0', color: '#3b82f6' }}>{paper.courseCode} - {paper.courseName}</h4>
    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>**Submitted by:** {paper.facultyName}</p>
    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Status: {paper.status}</p>
    {paper.status === 'Submitted' && (
      <button style={{ padding: '8px 15px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Review/Approve
      </button>
    )}
  </div>
);

// ====================================================================
// 5. THE HOD DASHBOARD COMPONENT (MAIN EXPORT)
// ====================================================================

const HodExamDashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [submissions, setSubmissions] = useState<QuestionPaperSubmission[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Simulate data fetching
  useEffect(() => {
    setSubmissions(mockSubmissions);
  }, []);

  // Handle responsiveness via window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Base styles (for single component structure)
  const baseStyles = {
    // Colors for theming
    light: {
      backgroundColor: '#f4f7fa',
      textColor: '#1f2937',
      surfaceColor: '#ffffff',
    },
    dark: {
      backgroundColor: '#121212',
      textColor: '#f3f4f6',
      surfaceColor: '#1f2937',
    },
    primaryColor: '#3b82f6',
    
    // Layout and common styles
    dashboard: {
      padding: '20px',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
    },
    statsContainer: {
      display: 'flex',
      gap: '20px',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      marginBottom: '30px',
    },
    statCard: {
      flex: isMobile ? '1 1 100%' : '1',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center' as const,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '20px',
      display: isMobile ? 'none' : 'table', // Responsiveness: Hide table on mobile
    },
    cardList: {
      display: isMobile ? 'block' : 'none', // Responsiveness: Show cards on mobile
    },
    button: {
      padding: '10px 18px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold' as const,
    },
    statusSubmitted: { color: '#f59e0b', fontWeight: 'bold' as const },
    statusApproved: { color: '#10b981', fontWeight: 'bold' as const },
    statusRejected: { color: '#ef4444', fontWeight: 'bold' as const },
    statusDraft: { color: '#6b7280', fontWeight: 'bold' as const },
  };

  const currentThemeStyles = baseStyles[theme];

  const handleApprove = (paperId: string) => {
    alert(`HOD approved paper ${paperId}. (Implementation required)`);
    // In a real app: API call to update status, then update 'submissions' state
  };

  return (
    <div style={{ ...baseStyles.dashboard, backgroundColor: currentThemeStyles.backgroundColor, color: currentThemeStyles.textColor }}>
      <header style={baseStyles.header}>
        <h1 style={{ margin: 0, fontSize: isMobile ? '24px' : '32px' }}>HOD Exam Preparation Oversight 🧠</h1>
        <button 
          onClick={toggleTheme} 
          style={{ ...baseStyles.button, backgroundColor: baseStyles.primaryColor, color: 'white' }}
        >
          Switch to {theme === 'light' ? 'Dark 🌙' : 'Light ☀️'}
        </button>
      </header>

      <h2>Department Exam Analytics</h2>
      <div style={baseStyles.statsContainer}>
        {/* Stat Card 1: Awaiting Approval */}
        <div style={{ ...baseStyles.statCard, backgroundColor: currentThemeStyles.surfaceColor }}>
          <h3 style={{ margin: 0, fontSize: '36px', color: baseStyles.primaryColor }}>{mockAnalytics.awaitingApproval}</h3>
          <p style={{ margin: '5px 0 0 0' }}>Papers Awaiting Review</p>
        </div>
        
        {/* Stat Card 2: Avg. Pass Rate */}
        <div style={{ ...baseStyles.statCard, backgroundColor: currentThemeStyles.surfaceColor }}>
          <h3 style={{ margin: 0, fontSize: '36px', color: baseStyles.statusApproved.color }}>{mockAnalytics.averagePassRate}%</h3>
          <p style={{ margin: '5px 0 0 0' }}>Avg. Expected Pass Rate</p>
        </div>
        
        {/* Stat Card 3: Faculty Compliance */}
        <div style={{ ...baseStyles.statCard, backgroundColor: currentThemeStyles.surfaceColor }}>
          <h3 style={{ margin: 0, fontSize: '36px', color: baseStyles.statusSubmitted.color }}>{mockAnalytics.facultyComplianceRate}%</h3>
          <p style={{ margin: '5px 0 0 0' }}>Faculty Compliance Rate</p>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* Question Paper Approval Queue (The core table/card view) */}
      {/* ==================================================================== */}
      
      <h2>Question Paper Approval Queue</h2>

      {/* 5.1 MOBILE/CARD VIEW (RESPONSIVE) */}
      <div style={baseStyles.cardList}>
        {submissions.map(paper => <PaperCard key={paper.paperId} paper={paper} theme={theme} />)}
      </div>

      {/* 5.2 DESKTOP/TABLE VIEW */}
      <table style={{...baseStyles.table, backgroundColor: currentThemeStyles.surfaceColor, border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`, color: currentThemeStyles.textColor }}>
        <thead>
          <tr style={{ backgroundColor: theme === 'light' ? '#f3f4f6' : '#374151' }}>
            {/* FIX APPLIED HERE: Removed the trailing ' from the template literal */}
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>Course</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>Faculty</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>Coverage %</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>Status</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(paper => (
            <tr key={paper.paperId}>
              {/* FIX APPLIED HERE: Removed the trailing ' from the template literal */}
              <td style={{ padding: '12px', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>{paper.courseCode}</td>
              <td style={{ padding: '12px', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>{paper.facultyName}</td>
              <td style={{ padding: '12px', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>{paper.syllabusCoverage}</td>
              <td style={{ padding: '12px', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>
                <span style={baseStyles[`status${paper.status}` as keyof typeof baseStyles]}>
                  {paper.status}
                </span>
              </td>
              <td style={{ padding: '12px', borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}` }}>
                {paper.status === 'Submitted' && (
                  <button 
                    onClick={() => handleApprove(paper.paperId)}
                    style={{ ...baseStyles.button, padding: '6px 12px', backgroundColor: baseStyles.primaryColor, color: 'white' }}
                  >
                    Review & Approve
                  </button>
                )}
                {paper.status === 'Approved' && <span style={{ color: baseStyles.statusApproved.color }}>Audit Trail</span>}
                {paper.status === 'Rejected' && <span style={{ color: baseStyles.statusRejected.color }}>View Feedback</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ====================================================================
// WRAPPER FOR USAGE
// ====================================================================

export const AppWrapper: React.FC = () => (
  <ThemeProvider>
    <HodExamDashboard />
  </ThemeProvider>
);

export default AppWrapper;