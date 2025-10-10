import React, { useState } from "react";
import { CheckCircle, Circle, X, Eye, TrendingUp, Clock, Calendar, BookOpen, User, ChevronDown, ChevronRight } from "lucide-react";

interface Topic {
  id: number;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedHours: number;
  actualHours: number;
  completed: boolean;
  completedDate: string | null;
  resources: { name: string; type: string; duration?: string }[];
  notes: string;
}

interface Unit {
  id: number;
  name: string;
  topics: Topic[];
  weight: number;
  status: "COMPLETED" | "IN PROGRESS" | "NOT STARTED";
  progress: number;
}

interface Subject {
  id: number;
  code: string;
  name: string;
  faculty: string;
  credits: number;
  semester: string;
  program: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  units: Unit[];
  examDate: string;
  updated: string;
  totalHours: number;
}

const SyllabusTracker: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      code: "CS301",
      name: "Data Structures & Algorithms",
      faculty: "Dr. Rajesh Kumar",
      credits: 4,
      semester: "Semester 5",
      program: "Computer Science",
      difficulty: "HARD",
      examDate: "15 Nov",
      updated: "27 Sept",
      totalHours: 27,
      units: [
        {
          id: 1,
          name: "Arrays and Linked Lists",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "Array Operations",
              description: "Basic array operations, traversal, insertion, deletion",
              difficulty: "easy",
              estimatedHours: 3,
              actualHours: 3.5,
              completed: true,
              completedDate: "18/8/2025",
              resources: [
                { name: "Array Basics Video", type: "video", duration: "45min" },
                { name: "Array Practice Problems", type: "practice" }
              ],
              notes: "Clear understanding of basic operations"
            },
            {
              id: 2,
              name: "Dynamic Arrays",
              description: "Vector implementation, resizing strategies",
              difficulty: "medium",
              estimatedHours: 2,
              actualHours: 2,
              completed: true,
              completedDate: "22/8/2025",
              resources: [{ name: "Dynamic Arrays PDF", type: "pdf" }],
              notes: "Good grasp of dynamic memory allocation"
            },
            {
              id: 3,
              name: "Singly Linked Lists",
              description: "Implementation of singly linked lists",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 4.5,
              completed: true,
              completedDate: "28/8/2025",
              resources: [
                { name: "Linked List Tutorial", type: "video", duration: "60min" },
                { name: "Implementation Guide", type: "pdf" }
              ],
              notes: "Need more practice with pointer manipulation"
            },
            {
              id: 4,
              name: "Doubly Linked Lists",
              description: "Implementation and operations",
              difficulty: "medium",
              estimatedHours: 3,
              actualHours: 3,
              completed: true,
              completedDate: "2/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 5,
              name: "Circular Linked Lists",
              description: "Circular list implementations",
              difficulty: "hard",
              estimatedHours: 2,
              actualHours: 2,
              completed: true,
              completedDate: "5/9/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 2,
          name: "Stacks and Queues",
          weight: 20,
          status: "IN PROGRESS",
          progress: 75,
          topics: [
            {
              id: 1,
              name: "Stack Implementation",
              description: "Array and linked list based stacks",
              difficulty: "easy",
              estimatedHours: 2,
              actualHours: 2,
              completed: true,
              completedDate: "8/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Queue Implementation",
              description: "Array and linked list based queues",
              difficulty: "easy",
              estimatedHours: 2,
              actualHours: 2,
              completed: true,
              completedDate: "12/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "Applications",
              description: "Expression evaluation, BFS",
              difficulty: "medium",
              estimatedHours: 3,
              actualHours: 3,
              completed: true,
              completedDate: "15/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 4,
              name: "Priority Queue",
              description: "Heap-based priority queue",
              difficulty: "hard",
              estimatedHours: 1,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 3,
          name: "Trees and Binary Trees",
          weight: 30,
          status: "IN PROGRESS",
          progress: 33,
          topics: [
            {
              id: 1,
              name: "Binary Tree Basics",
              description: "Tree terminology and traversals",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "20/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Binary Search Trees",
              description: "BST operations and properties",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 2,
              completed: true,
              completedDate: "25/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "AVL Trees",
              description: "Self-balancing BST",
              difficulty: "hard",
              estimatedHours: 3,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            },
            {
              id: 4,
              name: "Red-Black Trees",
              description: "Another self-balancing BST",
              difficulty: "hard",
              estimatedHours: 3,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 4,
          name: "Graphs and Advanced Topics",
          weight: 25,
          status: "NOT STARTED",
          progress: 0,
          topics: [
            {
              id: 1,
              name: "Graph Representation",
              description: "Adjacency matrix and list",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Graph Traversal",
              description: "DFS and BFS",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "Shortest Path",
              description: "Dijkstra and Bellman-Ford",
              difficulty: "hard",
              estimatedHours: 6,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            },
            {
              id: 4,
              name: "Minimum Spanning Tree",
              description: "Kruskal and Prim algorithms",
              difficulty: "hard",
              estimatedHours: 5,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        }
      ]
    },
    {
      id: 2,
      code: "CS302",
      name: "Database Management Systems",
      faculty: "Prof. Priya Sharma",
      credits: 3,
      semester: "Semester 5",
      program: "Computer Science",
      difficulty: "MEDIUM",
      examDate: "18 Nov",
      updated: "25 Sept",
      totalHours: 33,
      units: [
        {
          id: 1,
          name: "Introduction to DBMS",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "Database Concepts",
              description: "Data models, schemas, instances",
              difficulty: "easy",
              estimatedHours: 3,
              actualHours: 3,
              completed: true,
              completedDate: "15/8/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "ER Modeling",
              description: "Entity-Relationship diagrams",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "20/8/2025",
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "Relational Model",
              description: "Tables, keys, constraints",
              difficulty: "medium",
              estimatedHours: 3,
              actualHours: 3,
              completed: true,
              completedDate: "25/8/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 2,
          name: "SQL and Query Processing",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "Basic SQL",
              description: "SELECT, INSERT, UPDATE, DELETE",
              difficulty: "easy",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "1/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Advanced SQL",
              description: "Joins, subqueries, aggregates",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "8/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "Query Optimization",
              description: "Execution plans and indexes",
              difficulty: "hard",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "15/9/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 3,
          name: "Transactions and Concurrency",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "ACID Properties",
              description: "Transaction properties",
              difficulty: "medium",
              estimatedHours: 3,
              actualHours: 3,
              completed: true,
              completedDate: "20/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Concurrency Control",
              description: "Locking and isolation levels",
              difficulty: "hard",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "24/9/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 4,
          name: "Normalization",
          weight: 25,
          status: "IN PROGRESS",
          progress: 25,
          topics: [
            {
              id: 1,
              name: "Functional Dependencies",
              description: "FD concepts and closure",
              difficulty: "medium",
              estimatedHours: 3,
              actualHours: 3,
              completed: true,
              completedDate: "26/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Normal Forms",
              description: "1NF, 2NF, 3NF, BCNF",
              difficulty: "hard",
              estimatedHours: 0,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        }
      ]
    },
    {
      id: 3,
      code: "CS304",
      name: "Web Technologies",
      faculty: "Ms. Kavya Singh",
      credits: 3,
      semester: "Semester 5",
      program: "Computer Science",
      difficulty: "EASY",
      examDate: "25 Nov",
      updated: "26 Sept",
      totalHours: 45,
      units: [
        {
          id: 1,
          name: "HTML & CSS",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "HTML Fundamentals",
              description: "Tags, attributes, semantic HTML",
              difficulty: "easy",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "10/8/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "CSS Styling",
              description: "Selectors, box model, flexbox",
              difficulty: "easy",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "17/8/2025",
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "Responsive Design",
              description: "Media queries, mobile-first",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "24/8/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 2,
          name: "JavaScript",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "JS Basics",
              description: "Variables, functions, events",
              difficulty: "easy",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "1/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "DOM Manipulation",
              description: "Query selectors, event handling",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "8/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "Async JavaScript",
              description: "Promises, async/await, fetch",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "15/9/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 3,
          name: "Frontend Frameworks",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "React Basics",
              description: "Components, props, state",
              difficulty: "medium",
              estimatedHours: 6,
              actualHours: 6,
              completed: true,
              completedDate: "22/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "React Hooks",
              description: "useState, useEffect, custom hooks",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "27/9/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 4,
          name: "Backend Development",
          weight: 25,
          status: "IN PROGRESS",
          progress: 75,
          topics: [
            {
              id: 1,
              name: "Node.js Basics",
              description: "Modules, npm, express",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "30/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "RESTful APIs",
              description: "API design and implementation",
              difficulty: "medium",
              estimatedHours: 2,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        }
      ]
    },
    {
      id: 4,
      code: "CS305",
      name: "Operating Systems",
      faculty: "Dr. Anil Mehta",
      credits: 4,
      semester: "Semester 5",
      program: "Computer Science",
      difficulty: "HARD",
      examDate: "20 Nov",
      updated: "24 Sept",
      totalHours: 18,
      units: [
        {
          id: 1,
          name: "Process Management",
          weight: 25,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 1,
              name: "Process Concepts",
              description: "Process states, PCB",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "12/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Process Scheduling",
              description: "CPU scheduling algorithms",
              difficulty: "hard",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "18/9/2025",
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 2,
          name: "Synchronization",
          weight: 25,
          status: "IN PROGRESS",
          progress: 50,
          topics: [
            {
              id: 1,
              name: "Critical Section",
              description: "Race conditions, mutual exclusion",
              difficulty: "hard",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "22/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Semaphores",
              description: "Semaphore operations",
              difficulty: "hard",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "25/9/2025",
              resources: [],
              notes: ""
            },
            {
              id: 3,
              name: "Deadlocks",
              description: "Prevention, avoidance, detection",
              difficulty: "hard",
              estimatedHours: 0,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 3,
          name: "Memory Management",
          weight: 25,
          status: "NOT STARTED",
          progress: 0,
          topics: [
            {
              id: 1,
              name: "Paging",
              description: "Page tables, TLB",
              difficulty: "hard",
              estimatedHours: 0,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "Virtual Memory",
              description: "Demand paging, page replacement",
              difficulty: "hard",
              estimatedHours: 0,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        },
        {
          id: 4,
          name: "File Systems",
          weight: 25,
          status: "NOT STARTED",
          progress: 0,
          topics: [
            {
              id: 1,
              name: "File System Interface",
              description: "File operations, directory structure",
              difficulty: "medium",
              estimatedHours: 0,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            },
            {
              id: 2,
              name: "File System Implementation",
              description: "Allocation methods, free space",
              difficulty: "hard",
              estimatedHours: 0,
              actualHours: 0,
              completed: false,
              completedDate: null,
              resources: [],
              notes: ""
            }
          ]
        }
      ]
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    faculty: "All",
    program: "All",
    semester: "All",
    course: "All"
  });

  const calculateOverallProgress = (subject: Subject) => {
    const totalTopics = subject.units.reduce((sum, unit) => sum + unit.topics.length, 0);
    const completedTopics = subject.units.reduce(
      (sum, unit) => sum + unit.topics.filter(t => t.completed).length,
      0
    );
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const calculateUnitsCompleted = (subject: Subject) => {
    const completed = subject.units.filter(u => u.status === "COMPLETED").length;
    return `${completed}/${subject.units.length}`;
  };

  const calculateTotalStudyHours = (subject: Subject) => {
    return subject.units.reduce(
      (sum, unit) => sum + unit.topics.reduce((s, t) => s + t.actualHours, 0),
      0
    );
  };

  const toggleUnitExpanded = (unitId: number) => {
    setExpandedUnits(prev =>
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  const toggleTopicCompletion = (subjectId: number, unitId: number, topicId: number) => {
    setSubjects(prev =>
      prev.map(subj =>
        subj.id === subjectId
          ? {
              ...subj,
              units: subj.units.map(unit =>
                unit.id === unitId
                  ? {
                      ...unit,
                      topics: unit.topics.map(topic =>
                        topic.id === topicId
                          ? {
                              ...topic,
                              completed: !topic.completed,
                              completedDate: !topic.completed
                                ? new Date().toLocaleDateString("en-GB")
                                : null
                            }
                          : topic
                      )
                    }
                  : unit
              )
            }
          : subj
      )
    );
  };

  // Filter subjects
  const filteredSubjects = subjects.filter(subject => {
    if (filters.faculty !== "All" && subject.faculty !== filters.faculty) return false;
    if (filters.program !== "All" && subject.program !== filters.program) return false;
    if (filters.semester !== "All" && subject.semester !== filters.semester) return false;
    if (filters.course !== "All" && subject.name !== filters.course) return false;
    return true;
  });

  // Get unique values for filters
  const faculties = ["All", ...new Set(subjects.map(s => s.faculty))];
  const programs = ["All", ...new Set(subjects.map(s => s.program))];
  const semesters = ["All", ...new Set(subjects.map(s => s.semester))];
  const courses = ["All", ...new Set(subjects.map(s => s.name))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "IN PROGRESS":
        return "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200";
      case "NOT STARTED":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "";
    }
  };

  const getProgressBarColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 33) return "bg-blue-400";
    return "bg-red-400";
  };

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Unit Progress Details
            </h2>
            <button
              onClick={() => setSelectedSubject(null)}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
            >
              Close
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left side - Unit details */}
            <div className="lg:col-span-2 space-y-4">
              {selectedSubject.units.map((unit, idx) => {
                const completedTopics = unit.topics.filter(t => t.completed).length;
                const totalTopics = unit.topics.length;
                const totalEstHours = unit.topics.reduce((sum, t) => sum + t.estimatedHours, 0);
                const totalActualHours = unit.topics.reduce((sum, t) => sum + t.actualHours, 0);
                const isExpanded = expandedUnits.includes(unit.id);

                return (
                  <div
                    key={unit.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden transition-colors"
                  >
                    {/* Unit Header */}
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
                      onClick={() => toggleUnitExpanded(unit.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          {isExpanded ? (
                            <ChevronDown className="text-gray-600 dark:text-gray-400 mt-1" size={20} />
                          ) : (
                            <ChevronRight className="text-gray-600 dark:text-gray-400 mt-1" size={20} />
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              Unit {idx + 1}: {unit.name}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              unit.status
                            )}`}
                          >
                            {unit.status}
                          </span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            {unit.progress}%
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getProgressBarColor(
                              unit.progress
                            )}`}
                            style={{ width: `${unit.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Unit stats */}
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Topics: {completedTopics}/{totalTopics}</span>
                        <span>Hours: {totalActualHours}/{totalEstHours}</span>
                        <span>Weight: {unit.weight}%</span>
                      </div>
                    </div>

                    {/* Expanded Topics */}
                    {isExpanded && (
                      <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 space-y-3">
                        {unit.topics.map(topic => (
                          <div
                            key={topic.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {topic.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {topic.description}
                                  </p>
                                  {topic.notes && (
                                    <p className="text-sm italic text-blue-600 dark:text-blue-400 mt-2">
                                      Note: {topic.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 text-sm">
                              <div className="flex gap-4 text-gray-600 dark:text-gray-400">
                                <span>Est: {topic.estimatedHours}h</span>
                                <span>Actual: {topic.actualHours}h</span>
                                {topic.completedDate && (
                                  <span>Completed: {topic.completedDate}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right side - Subject overview */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-5 transition-colors">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
                  Subject Overview
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subject Code:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSubject.code}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Faculty:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSubject.faculty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Credits:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSubject.credits}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Semester:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSubject.semester}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Exam Date:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSubject.examDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-5 transition-colors">
                <h3 className="font-bold text-lg mb-4 text-blue-600 dark:text-blue-400">
                  Progress Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Overall Progress:</span>
                    <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
                      {calculateOverallProgress(selectedSubject)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Units Completed:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {calculateUnitsCompleted(selectedSubject)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Study Hours:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {calculateTotalStudyHours(selectedSubject)}h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSubject.updated}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Syllabus Progress Tracker
        </h1>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm border dark:border-gray-700 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Faculty
              </label>
              <select
                value={filters.faculty}
                onChange={(e) => setFilters({ ...filters, faculty: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {faculties.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Program
              </label>
              <select
                value={filters.program}
                onChange={(e) => setFilters({ ...filters, program: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {programs.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Semester
              </label>
              <select
                value={filters.semester}
                onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {semesters.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course
              </label>
              <select
                value={filters.course}
                onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {courses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map(subject => {
            const overallProgress = calculateOverallProgress(subject);
            const unitsCompleted = calculateUnitsCompleted(subject);
            const studyHours = calculateTotalStudyHours(subject);

            return (
              <div
                key={subject.id}
                className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Header */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>{subject.semester}</div>
                      <div className="font-semibold">{subject.credits} Credits</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {subject.code} • {subject.faculty}
                  </p>

                  {/* Overall Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Overall Progress
                      </span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {overallProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          overallProgress === 100
                            ? "bg-green-500"
                            : overallProgress >= 80
                            ? "bg-blue-500"
                            : overallProgress >= 50
                            ? "bg-yellow-500"
                            : "bg-red-400"
                        }`}
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="text-blue-500" size={16} />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Units</div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {unitsCompleted}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="text-green-500" size={16} />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Exam</div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {subject.examDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="text-purple-500" size={16} />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Updated</div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {subject.updated}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="text-orange-500" size={16} />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Hours</div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {studyHours}h
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unit Progress Bars */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Unit Progress:
                    </p>
                    <div className="space-y-2">
                      {subject.units.map((unit, idx) => (
                        <div key={unit.id} className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 dark:text-gray-400 w-8">
                            U{idx + 1}
                          </span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${getProgressBarColor(
                                unit.progress
                              )}`}
                              style={{ width: `${unit.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-10 text-right">
                            {unit.progress}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedSubject(subject);
                        setExpandedUnits([]);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No subjects found matching the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllabusTracker;