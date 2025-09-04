 // FacultySubjectsSyllabus.tsx
import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  CheckCircle, 
  Clock, 
  BarChart3,
  FileText,
  Calendar,
  Users,
  Target,
  TrendingUp,
  AlertCircle,
  Printer,
  Upload
} from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  semester: string;
  section: string;
  type: 'Theory' | 'Practical' | 'Tutorial';
  credits: number;
  totalUnits: number;
  completedUnits: number;
  syllabus: SyllabusUnit[];
  description: string;
  prerequisites?: string[];
  outcomes: string[];
  textbooks: string[];
  references: string[];
}

interface SyllabusUnit {
  unitNumber: number;
  title: string;
  topics: string[];
  hoursAllocated: number;
  hoursCompleted: number;
  isCompleted: boolean;
  completedDate?: string;
  notes?: string;
}

interface SyllabusProgress {
  subjectId: string;
  unitNumber: number;
  hoursCompleted: number;
  completedTopics: string[];
  lastUpdated: string;
  notes: string;
}

const FacultySubjectsSyllabus: React.FC = () => {
  // Faculty information
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    employeeId: 'FAC001',
    department: 'Computer Science Engineering',
    designation: 'Associate Professor'
  };

  // Faculty's assigned subjects (read-only data from backend)
  const [subjects] = useState<Subject[]>([
    {
      id: 'sub1',
      name: 'Data Structures and Algorithms',
      code: 'CS301',
      department: 'Computer Science Engineering',
      semester: '3rd Semester',
      section: 'A',
      type: 'Theory',
      credits: 4,
      totalUnits: 5,
      completedUnits: 3,
      description: 'This course covers fundamental data structures and algorithms essential for computer science students.',
      prerequisites: ['Programming Fundamentals', 'Object Oriented Programming'],
      outcomes: [
        'Understand various data structures and their applications',
        'Implement algorithms for searching and sorting',
        'Analyze time and space complexity of algorithms',
        'Design efficient algorithms for problem solving'
      ],
      textbooks: [
        'Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein',
        'Data Structures and Algorithms in Java by Robert Lafore'
      ],
      references: [
        'Algorithms by Robert Sedgewick',
        'Data Structures Using C by Reema Thareja'
      ],
      syllabus: [
        {
          unitNumber: 1,
          title: 'Introduction to Data Structures',
          topics: ['Arrays', 'Linked Lists', 'Memory Management', 'Abstract Data Types'],
          hoursAllocated: 12,
          hoursCompleted: 12,
          isCompleted: true,
          completedDate: '2025-08-25',
          notes: 'Covered all topics with practical examples'
        },
        {
          unitNumber: 2,
          title: 'Stacks and Queues',
          topics: ['Stack Implementation', 'Queue Types', 'Applications', 'Expression Evaluation'],
          hoursAllocated: 10,
          hoursCompleted: 10,
          isCompleted: true,
          completedDate: '2025-09-10',
          notes: 'Students showed good understanding in lab sessions'
        },
        {
          unitNumber: 3,
          title: 'Trees and Binary Trees',
          topics: ['Tree Terminology', 'Binary Trees', 'Tree Traversals', 'Binary Search Trees'],
          hoursAllocated: 15,
          hoursCompleted: 8,
          isCompleted: false,
          notes: 'Currently covering BST operations'
        },
        {
          unitNumber: 4,
          title: 'Graphs',
          topics: ['Graph Representation', 'BFS and DFS', 'Shortest Path', 'Minimum Spanning Tree'],
          hoursAllocated: 18,
          hoursCompleted: 0,
          isCompleted: false
        },
        {
          unitNumber: 5,
          title: 'Sorting and Searching',
          topics: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Binary Search', 'Hashing'],
          hoursAllocated: 15,
          hoursCompleted: 0,
          isCompleted: false
        }
      ]
    },
    {
      id: 'sub2',
      name: 'Database Management Systems',
      code: 'CS302',
      department: 'Computer Science Engineering',
      semester: '3rd Semester',
      section: 'A',
      type: 'Theory',
      credits: 3,
      totalUnits: 4,
      completedUnits: 2,
      description: 'Comprehensive study of database concepts, design, and implementation.',
      prerequisites: ['Data Structures'],
      outcomes: [
        'Design efficient database schemas',
        'Write complex SQL queries',
        'Understand transaction management',
        'Implement database security measures'
      ],
      textbooks: [
        'Database System Concepts by Silberschatz, Korth, and Sudarshan',
        'Fundamentals of Database Systems by Elmasri and Navathe'
      ],
      references: [
        'Database Management Systems by Raghu Ramakrishnan',
        'SQL: The Complete Reference by James Groff'
      ],
      syllabus: [
        {
          unitNumber: 1,
          title: 'Introduction to DBMS',
          topics: ['Database Concepts', 'DBMS Architecture', 'Data Models', 'Database Languages'],
          hoursAllocated: 12,
          hoursCompleted: 12,
          isCompleted: true,
          completedDate: '2025-08-30'
        },
        {
          unitNumber: 2,
          title: 'Relational Model',
          topics: ['Relational Algebra', 'SQL Basics', 'Joins', 'Nested Queries'],
          hoursAllocated: 15,
          hoursCompleted: 15,
          isCompleted: true,
          completedDate: '2025-09-15'
        },
        {
          unitNumber: 3,
          title: 'Database Design',
          topics: ['ER Model', 'Normalization', 'Functional Dependencies', 'Schema Design'],
          hoursAllocated: 18,
          hoursCompleted: 5,
          isCompleted: false,
          notes: 'Currently teaching normalization concepts'
        },
        {
          unitNumber: 4,
          title: 'Transaction Management',
          topics: ['ACID Properties', 'Concurrency Control', 'Recovery', 'Locking'],
          hoursAllocated: 15,
          hoursCompleted: 0,
          isCompleted: false
        }
      ]
    },
    {
      id: 'sub3',
      name: 'Data Structures Lab',
      code: 'CS301L',
      department: 'Computer Science Engineering',
      semester: '3rd Semester',
      section: 'A',
      type: 'Practical',
      credits: 2,
      totalUnits: 6,
      completedUnits: 4,
      description: 'Hands-on implementation of data structures and algorithms.',
      prerequisites: ['Programming Fundamentals Lab'],
      outcomes: [
        'Implement various data structures in C/C++',
        'Debug and optimize code',
        'Analyze algorithm performance',
        'Document code effectively'
      ],
      textbooks: [
        'Data Structures Lab Manual - Department of CSE'
      ],
      references: [
        'C Programming Language by Kernighan and Ritchie'
      ],
      syllabus: [
        {
          unitNumber: 1,
          title: 'Array Operations',
          topics: ['Array Implementation', 'Searching', 'Sorting', 'Matrix Operations'],
          hoursAllocated: 6,
          hoursCompleted: 6,
          isCompleted: true,
          completedDate: '2025-08-20'
        },
        {
          unitNumber: 2,
          title: 'Linked List Implementation',
          topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Lists', 'Applications'],
          hoursAllocated: 8,
          hoursCompleted: 8,
          isCompleted: true,
          completedDate: '2025-09-05'
        },
        {
          unitNumber: 3,
          title: 'Stack and Queue Programs',
          topics: ['Stack using Arrays', 'Stack using Linked List', 'Infix to Postfix', 'Queue Implementation'],
          hoursAllocated: 6,
          hoursCompleted: 6,
          isCompleted: true,
          completedDate: '2025-09-12'
        },
        {
          unitNumber: 4,
          title: 'Tree Programs',
          topics: ['Binary Tree Creation', 'Tree Traversals', 'BST Operations', 'Expression Trees'],
          hoursAllocated: 8,
          hoursCompleted: 6,
          isCompleted: false,
          notes: 'Students working on BST deletion'
        },
        {
          unitNumber: 5,
          title: 'Graph Programs',
          topics: ['Graph Representation', 'BFS Implementation', 'DFS Implementation', 'Shortest Path'],
          hoursAllocated: 8,
          hoursCompleted: 0,
          isCompleted: false
        },
        {
          unitNumber: 6,
          title: 'Sorting Algorithms',
          topics: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort'],
          hoursAllocated: 6,
          hoursCompleted: 0,
          isCompleted: false
        }
      ]
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | string>('all');
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressForm, setProgressForm] = useState<SyllabusProgress>({
    subjectId: '',
    unitNumber: 0,
    hoursCompleted: 0,
    completedTopics: [],
    lastUpdated: '',
    notes: ''
  });

  // Filter subjects based on search and type
  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subject.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || subject.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [subjects, searchTerm, filterType]);

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    const totalSubjects = subjects.length;
    const totalUnits = subjects.reduce((sum, subject) => sum + subject.totalUnits, 0);
    const completedUnits = subjects.reduce((sum, subject) => sum + subject.completedUnits, 0);
    const completionPercentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
    
    const totalHours = subjects.reduce((sum, subject) => 
      sum + subject.syllabus.reduce((unitSum, unit) => unitSum + unit.hoursAllocated, 0), 0
    );
    
    const completedHours = subjects.reduce((sum, subject) => 
      sum + subject.syllabus.reduce((unitSum, unit) => unitSum + unit.hoursCompleted, 0), 0
    );

    return {
      totalSubjects,
      totalUnits,
      completedUnits,
      completionPercentage,
      totalHours,
      completedHours
    };
  }, [subjects]);

  // Update syllabus progress
  const updateSyllabusProgress = (subjectId: string, unitNumber: number, progress: Partial<SyllabusProgress>) => {
    // This would typically make an API call to update progress
    console.log('Updating syllabus progress:', { subjectId, unitNumber, progress });
    alert('Syllabus progress updated successfully!');
    setShowProgressModal(false);
  };

  // Export syllabus data
  const exportSyllabus = (format: 'pdf' | 'csv', subjectId?: string) => {
    const dataToExport = subjectId 
      ? subjects.filter(s => s.id === subjectId)
      : subjects;

    if (format === 'csv') {
      const csvData = dataToExport.flatMap(subject =>
        subject.syllabus.map(unit => ({
          'Subject Code': subject.code,
          'Subject Name': subject.name,
          'Unit Number': unit.unitNumber,
          'Unit Title': unit.title,
          'Topics': unit.topics.join('; '),
          'Hours Allocated': unit.hoursAllocated,
          'Hours Completed': unit.hoursCompleted,
          'Status': unit.isCompleted ? 'Completed' : 'In Progress',
          'Completion Date': unit.completedDate || 'N/A',
          'Notes': unit.notes || 'N/A'
        }))
      );

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `syllabus_${subjectId || 'all'}_${facultyInfo.employeeId}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Get progress color based on completion percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-blue-600 bg-blue-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subjects & Syllabus</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Employee ID: {facultyInfo.employeeId}</p>
            <p className="text-sm text-blue-600 font-medium">{subjects.length} Assigned Subjects</p>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{overallStats.totalSubjects}</div>
              <div className="text-sm text-gray-600">Total Subjects</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {overallStats.completedUnits}/{overallStats.totalUnits}
              </div>
              <div className="text-sm text-gray-600">Units Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {overallStats.completedHours}/{overallStats.totalHours}
              </div>
              <div className="text-sm text-gray-600">Hours Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-600">{overallStats.completionPercentage}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects, codes, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
            <option value="Tutorial">Tutorial</option>
          </select>

          <button
            onClick={() => exportSyllabus('csv')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subjects List */}
        <div className="space-y-6">
          {filteredSubjects.map(subject => {
            const completionPercentage = Math.round((subject.completedUnits / subject.totalUnits) * 100);
            const totalHours = subject.syllabus.reduce((sum, unit) => sum + unit.hoursAllocated, 0);
            const completedHours = subject.syllabus.reduce((sum, unit) => sum + unit.hoursCompleted, 0);

            return (
              <div key={subject.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{subject.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                          {subject.code}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {subject.type}
                        </span>
                        <span>{subject.credits} Credits</span>
                        <span>{subject.semester} - Section {subject.section}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold mb-1 ${getProgressColor(completionPercentage)}`}>
                        {completionPercentage}%
                      </div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">{subject.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress: {subject.completedUnits}/{subject.totalUnits} units</span>
                      <span>{completedHours}/{totalHours} hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Units Overview */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Units Status:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.syllabus.map(unit => (
                        <div
                          key={unit.unitNumber}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            unit.isCompleted
                              ? 'bg-green-100 text-green-800'
                              : unit.hoursCompleted > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Unit {unit.unitNumber}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedSubject(subject)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setProgressForm({
                          subjectId: subject.id,
                          unitNumber: 1,
                          hoursCompleted: 0,
                          completedTopics: [],
                          lastUpdated: new Date().toISOString(),
                          notes: ''
                        });
                        setShowProgressModal(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Update Progress
                    </button>
                    <button
                      onClick={() => exportSyllabus('csv', subject.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subject Details Panel */}
        <div className="sticky top-6">
          {selectedSubject ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedSubject.name}</h2>
                    <p className="text-gray-600">{selectedSubject.code} • {selectedSubject.type}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                {/* Course Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Credits:</strong> {selectedSubject.credits}</div>
                    <div><strong>Semester:</strong> {selectedSubject.semester}</div>
                    <div><strong>Section:</strong> {selectedSubject.section}</div>
                    <div><strong>Department:</strong> {selectedSubject.department}</div>
                  </div>
                </div>

                {/* Prerequisites */}
                {selectedSubject.prerequisites && selectedSubject.prerequisites.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {selectedSubject.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Learning Outcomes */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Outcomes</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {selectedSubject.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Syllabus */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Syllabus</h3>
                  <div className="space-y-4">
                    {selectedSubject.syllabus.map(unit => (
                      <div key={unit.unitNumber} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">
                            Unit {unit.unitNumber}: {unit.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              unit.isCompleted
                                ? 'bg-green-100 text-green-800'
                                : unit.hoursCompleted > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {unit.hoursCompleted}/{unit.hoursAllocated} hrs
                            </span>
                            {unit.isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-700 mb-2">
                          <strong>Topics:</strong> {unit.topics.join(', ')}
                        </div>
                        
                        {unit.isCompleted && unit.completedDate && (
                          <div className="text-xs text-green-600">
                            Completed on: {new Date(unit.completedDate).toLocaleDateString()}
                          </div>
                        )}
                        
                        {unit.notes && (
                          <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                            <strong>Notes:</strong> {unit.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Textbooks and References */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Textbooks</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {selectedSubject.textbooks.map((book, index) => (
                        <li key={index}>{book}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">References</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {selectedSubject.references.map((ref, index) => (
                        <li key={index}>{ref}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a subject to view detailed syllabus</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Update Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Update Syllabus Progress</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  value={progressForm.subjectId}
                  onChange={(e) => setProgressForm(prev => ({ ...prev, subjectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={progressForm.unitNumber}
                  onChange={(e) => setProgressForm(prev => ({ ...prev, unitNumber: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {progressForm.subjectId && subjects.find(s => s.id === progressForm.subjectId)?.syllabus.map(unit => (
                    <option key={unit.unitNumber} value={unit.unitNumber}>
                      Unit {unit.unitNumber}: {unit.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours Completed</label>
                <input
                  type="number"
                  value={progressForm.hoursCompleted}
                  onChange={(e) => setProgressForm(prev => ({ ...prev, hoursCompleted: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Progress Notes</label>
                <textarea
                  value={progressForm.notes}
                  onChange={(e) => setProgressForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add notes about progress, student performance, etc."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowProgressModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => updateSyllabusProgress(progressForm.subjectId, progressForm.unitNumber, progressForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultySubjectsSyllabus;
