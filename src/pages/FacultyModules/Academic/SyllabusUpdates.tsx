import React, { useState } from "react";
import {
  CheckCircle,
  Circle,
  X,
  Eye,
  TrendingUp,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Edit2,
  Save,
  Moon,
  Sun,
  Plus,
  Trash2
} from "lucide-react";

interface Topic {
  id: number;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedHours: number;
  actualHours: number;
  completed: boolean;
  completedDate: string | null;
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
}

const FacultySyllabusTracker: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
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
      examDate: "15 Nov 2025",
      updated: "27 Sept 2025",
      units: [
        {
          id: 1,
          name: "Arrays and Linked Lists",
          weight: 50,
          status: "IN PROGRESS",
          progress: 50,
          topics: [
            {
              id: 1,
              name: "Array Operations",
              description: "Basic array operations, traversal, insertion, deletion",
              difficulty: "easy",
              estimatedHours: 3,
              actualHours: 3.5,
              completed: true,
              completedDate: "18/08/2025",
              notes: "Students grasped concepts well"
            },
            {
              id: 2,
              name: "Linked Lists Implementation",
              description: "Singly and doubly linked lists",
              difficulty: "medium",
              estimatedHours: 4,
              actualHours: 0,
              completed: false,
              completedDate: null,
              notes: ""
            }
          ]
        },
        {
          id: 2,
          name: "Trees and Graphs",
          weight: 50,
          status: "NOT STARTED",
          progress: 0,
          topics: [
            {
              id: 3,
              name: "Binary Trees",
              description: "Tree traversals and operations",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 0,
              completed: false,
              completedDate: null,
              notes: ""
            },
            {
              id: 4,
              name: "Graph Algorithms",
              description: "BFS, DFS, shortest path",
              difficulty: "hard",
              estimatedHours: 6,
              actualHours: 0,
              completed: false,
              completedDate: null,
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
      examDate: "18 Nov 2025",
      updated: "25 Sept 2025",
      units: [
        {
          id: 3,
          name: "SQL and Relational Algebra",
          weight: 50,
          status: "COMPLETED",
          progress: 100,
          topics: [
            {
              id: 5,
              name: "Basic SQL Queries",
              description: "SELECT, INSERT, UPDATE, DELETE operations",
              difficulty: "easy",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "15/09/2025",
              notes: "Good practical session"
            },
            {
              id: 6,
              name: "Advanced SQL",
              description: "Joins, subqueries, aggregates",
              difficulty: "medium",
              estimatedHours: 5,
              actualHours: 5,
              completed: true,
              completedDate: "20/09/2025",
              notes: "Need more practice on subqueries"
            }
          ]
        },
        {
          id: 4,
          name: "Normalization and Transactions",
          weight: 50,
          status: "IN PROGRESS",
          progress: 50,
          topics: [
            {
              id: 7,
              name: "Normal Forms",
              description: "1NF, 2NF, 3NF, BCNF",
              difficulty: "hard",
              estimatedHours: 4,
              actualHours: 4,
              completed: true,
              completedDate: "24/09/2025",
              notes: "Complex topic, covered with examples"
            },
            {
              id: 8,
              name: "ACID Properties",
              description: "Transaction management concepts",
              difficulty: "medium",
              estimatedHours: 3,
              actualHours: 0,
              completed: false,
              completedDate: null,
              notes: ""
            }
          ]
        }
      ]
    }
  ]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<number[]>([]);
  const [editingTopic, setEditingTopic] = useState<number | null>(null);
  const [topicForm, setTopicForm] = useState<Partial<Topic>>({});
  const [showAddTopicModal, setShowAddTopicModal] = useState<{ unitId: number } | null>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const calculateOverallProgress = (subject: Subject) => {
    const totalTopics = subject.units.reduce((sum, unit) => sum + unit.topics.length, 0);
    const completedTopics = subject.units.reduce((sum, unit) => sum + unit.topics.filter((t) => t.completed).length, 0);
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  };

  const calculateUnitProgress = (unit: Unit) => {
    if (unit.topics.length === 0) return 0;
    const completed = unit.topics.filter((t) => t.completed).length;
    return Math.round((completed / unit.topics.length) * 100);
  };

  const updateUnitStatus = (unit: Unit) => {
    const progress = calculateUnitProgress(unit);
    if (progress === 100) return "COMPLETED";
    if (progress > 0) return "IN PROGRESS";
    return "NOT STARTED";
  };

  const toggleTopicCompletion = (subjectId: number, unitId: number, topicId: number) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              units: s.units.map((u) => {
                if (u.id === unitId) {
                  const updatedTopics = u.topics.map((t) =>
                    t.id === topicId
                      ? {
                          ...t,
                          completed: !t.completed,
                          completedDate: !t.completed ? new Date().toLocaleDateString("en-GB") : null,
                          actualHours: !t.completed ? t.estimatedHours : t.actualHours
                        }
                      : t
                  );
                  const progress = calculateUnitProgress({ ...u, topics: updatedTopics });
                  return {
                    ...u,
                    topics: updatedTopics,
                    progress,
                    status: updateUnitStatus({ ...u, topics: updatedTopics, progress })
                  };
                }
                return u;
              }),
              updated: new Date().toLocaleDateString("en-GB")
            }
          : s
      )
    );
    if (selectedSubject?.id === subjectId) {
      const updatedSubject = subjects.find((s) => s.id === subjectId);
      if (updatedSubject) {
        setSelectedSubject({
          ...updatedSubject,
          units: updatedSubject.units.map((u) => {
            if (u.id === unitId) {
              const updatedTopics = u.topics.map((t) =>
                t.id === topicId
                  ? {
                      ...t,
                      completed: !t.completed,
                      completedDate: !t.completed ? new Date().toLocaleDateString("en-GB") : null,
                      actualHours: !t.completed ? t.estimatedHours : t.actualHours
                    }
                  : t
              );
              const progress = calculateUnitProgress({ ...u, topics: updatedTopics });
              return {
                ...u,
                topics: updatedTopics,
                progress,
                status: updateUnitStatus({ ...u, topics: updatedTopics, progress })
              };
            }
            return u;
          })
        });
      }
    }
  };

  const updateTopic = (subjectId: number, unitId: number, topicId: number) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              units: s.units.map((u) => {
                if (u.id === unitId) {
                  return {
                    ...u,
                    topics: u.topics.map((t) => (t.id === topicId ? { ...t, ...topicForm } : t))
                  };
                }
                return u;
              }),
              updated: new Date().toLocaleDateString("en-GB")
            }
          : s
      )
    );
    if (selectedSubject?.id === subjectId) {
      setSelectedSubject({
        ...selectedSubject,
        units: selectedSubject.units.map((u) => {
          if (u.id === unitId) {
            return {
              ...u,
              topics: u.topics.map((t) => (t.id === topicId ? { ...t, ...topicForm } : t))
            };
          }
          return u;
        })
      });
    }
    setEditingTopic(null);
    setTopicForm({});
  };

  const addTopic = (subjectId: number, unitId: number) => {
    const newTopic: Topic = {
      id: Date.now(),
      name: topicForm.name || "",
      description: topicForm.description || "",
      difficulty: topicForm.difficulty || "medium",
      estimatedHours: topicForm.estimatedHours || 2,
      actualHours: 0,
      completed: false,
      completedDate: null,
      notes: ""
    };
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              units: s.units.map((u) => {
                if (u.id === unitId) {
                  const updatedTopics = [...u.topics, newTopic];
                  const progress = calculateUnitProgress({ ...u, topics: updatedTopics });
                  return {
                    ...u,
                    topics: updatedTopics,
                    progress,
                    status: updateUnitStatus({ ...u, topics: updatedTopics, progress })
                  };
                }
                return u;
              }),
              updated: new Date().toLocaleDateString("en-GB")
            }
          : s
      )
    );
    if (selectedSubject?.id === subjectId) {
      setSelectedSubject({
        ...selectedSubject,
        units: selectedSubject.units.map((u) => {
          if (u.id === unitId) {
            const updatedTopics = [...u.topics, newTopic];
            const progress = calculateUnitProgress({ ...u, topics: updatedTopics });
            return {
              ...u,
              topics: updatedTopics,
              progress,
              status: updateUnitStatus({ ...u, topics: updatedTopics, progress })
            };
          }
          return u;
        })
      });
    }
    setShowAddTopicModal(null);
    setTopicForm({});
  };

  const deleteTopic = (subjectId: number, unitId: number, topicId: number) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      setSubjects(
        subjects.map((s) =>
          s.id === subjectId
            ? {
                ...s,
                units: s.units.map((u) => {
                  if (u.id === unitId) {
                    const updatedTopics = u.topics.filter((t) => t.id !== topicId);
                    const progress = calculateUnitProgress({ ...u, topics: updatedTopics });
                    return {
                      ...u,
                      topics: updatedTopics,
                      progress,
                      status: updateUnitStatus({ ...u, topics: updatedTopics, progress })
                    };
                  }
                  return u;
                })
              }
            : s
        )
      );
      if (selectedSubject?.id === subjectId) {
        setSelectedSubject({
          ...selectedSubject,
          units: selectedSubject.units.map((u) => {
            if (u.id === unitId) {
              const updatedTopics = u.topics.filter((t) => t.id !== topicId);
              const progress = calculateUnitProgress({ ...u, topics: updatedTopics });
              return {
                ...u,
                topics: updatedTopics,
                progress,
                status: updateUnitStatus({ ...u, topics: updatedTopics, progress })
              };
            }
            return u;
          })
        });
      }
    }
  };

  const toggleUnitExpanded = (unitId: number) => {
    setExpandedUnits((prev) => (prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]));
  };

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      case "hard":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      default:
        return "";
    }
  };

  const Modal: React.FC<{ onClose: () => void; children: React.ReactNode; title: string }> = ({
    onClose,
    children,
    title
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  if (selectedSubject) {
    return (
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedSubject.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedSubject.code} • {selectedSubject.faculty}
                </p>
              </div>
              <div className="flex gap-3">
                
                
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
                >
                  Back
                </button>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {selectedSubject.units.map((unit, idx) => {
                  const isExpanded = expandedUnits.includes(unit.id);
                  return (
                    <div key={unit.id} className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden shadow-sm">
                      <div
                        className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                        onClick={() => toggleUnitExpanded(unit.id)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            {isExpanded ? (
                              <ChevronDown className="text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" size={20} />
                            ) : (
                              <ChevronRight className="text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" size={20} />
                            )}
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                Unit {idx + 1}: {unit.name}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
                              {unit.status}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">{unit.progress}%</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${getProgressBarColor(unit.progress)}`}
                              style={{ width: `${unit.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            Topics: {unit.topics.filter((t) => t.completed).length}/{unit.topics.length}
                          </span>
                          <span>Weight: {unit.weight}%</span>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 space-y-3">
                          <div className="flex justify-end mb-3">
                            <button
                              onClick={() => setShowAddTopicModal({ unitId: unit.id })}
                              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 text-sm transition"
                            >
                              <Plus size={16} />
                              Add Topic
                            </button>
                          </div>
                          {unit.topics.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              No topics added yet. Click "Add Topic" to get started.
                            </div>
                          ) : (
                            unit.topics.map((topic) => {
                              const isEditing = editingTopic === topic.id;
                              return (
                                <div
                                  key={topic.id}
                                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700 shadow-sm"
                                >
                                  {isEditing ? (
                                    <div className="space-y-3">
                                      <input
                                        type="text"
                                        value={topicForm.name}
                                        onChange={(e) => setTopicForm({ ...topicForm, name: e.target.value })}
                                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Topic Name"
                                      />
                                      <textarea
                                        value={topicForm.description}
                                        onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })}
                                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Description"
                                        rows={2}
                                      />
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <select
                                          value={topicForm.difficulty}
                                          onChange={(e) =>
                                            setTopicForm({ ...topicForm, difficulty: e.target.value as any })
                                          }
                                          className="px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                        >
                                          <option value="easy">Easy</option>
                                          <option value="medium">Medium</option>
                                          <option value="hard">Hard</option>
                                        </select>
                                        <input
                                          type="number"
                                          value={topicForm.estimatedHours}
                                          onChange={(e) => setTopicForm({ ...topicForm, estimatedHours: Number(e.target.value) })}
                                          className="px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                          placeholder="Est. Hours"
                                        />
                                        <input
                                          type="number"
                                          value={topicForm.actualHours}
                                          onChange={(e) => setTopicForm({ ...topicForm, actualHours: Number(e.target.value) })}
                                          className="px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                          placeholder="Actual Hours"
                                        />
                                      </div>
                                      <textarea
                                        value={topicForm.notes}
                                        onChange={(e) => setTopicForm({ ...topicForm, notes: e.target.value })}
                                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Notes (teaching observations, student feedback, etc.)"
                                        rows={2}
                                      />
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => updateTopic(selectedSubject.id, unit.id, topic.id)}
                                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition"
                                        >
                                          <Save size={16} />
                                          Save
                                        </button>
                                        <button
                                          onClick={() => {
                                            setEditingTopic(null);
                                            setTopicForm({});
                                          }}
                                          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-start gap-3 flex-1">
                                          <button
                                            onClick={() => toggleTopicCompletion(selectedSubject.id, unit.id, topic.id)}
                                            className="mt-1 flex-shrink-0"
                                          >
                                            {topic.completed ? (
                                              <CheckCircle className="text-green-500" size={20} />
                                            ) : (
                                              <Circle className="text-gray-400" size={20} />
                                            )}
                                          </button>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{topic.name}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{topic.description}</p>
                                            {topic.notes && (
                                              <p className="text-sm italic text-blue-600 dark:text-blue-400 mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                                 {topic.notes}
                                              </p>
                                            )}
                                          </div>
                                          <div className="flex gap-2 flex-shrink-0">
                                            <button
                                              onClick={() => {
                                                setEditingTopic(topic.id);
                                                setTopicForm({
                                                  name: topic.name,
                                                  description: topic.description,
                                                  difficulty: topic.difficulty,
                                                  estimatedHours: topic.estimatedHours,
                                                  actualHours: topic.actualHours,
                                                  notes: topic.notes
                                                });
                                              }}
                                              className="text-blue-500 hover:text-blue-600 transition"
                                            >
                                              <Edit2 size={16} />
                                            </button>
                                            <button
                                              onClick={() => deleteTopic(selectedSubject.id, unit.id, topic.id)}
                                              className="text-red-500 hover:text-red-600 transition"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                                        
                                        <span className="text-gray-600 dark:text-gray-400">Est: {topic.estimatedHours}h</span>
                                        {topic.actualHours > 0 && (
                                          <span className="text-gray-600 dark:text-gray-400">Actual: {topic.actualHours}h</span>
                                        )}
                                        {topic.completedDate && (
                                          <span className="text-green-600 dark:text-green-400 font-medium">
                                            ✓ {topic.completedDate}
                                          </span>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-blue-500" />
                    Subject Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Code</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.code}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Credits</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.credits}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Semester</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.semester}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Program</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.program}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Difficulty</p>
                      
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-500" />
                    Progress Overview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{calculateOverallProgress(selectedSubject)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${getProgressBarColor(
                            calculateOverallProgress(selectedSubject)
                          )}`}
                          style={{ width: `${calculateOverallProgress(selectedSubject)}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-3 border-t dark:border-gray-700 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Units</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.units.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Topics</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {selectedSubject.units.reduce((sum, u) => sum + u.topics.length, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Completed</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {selectedSubject.units.reduce((sum, u) => sum + u.topics.filter((t) => t.completed).length, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-purple-500" />
                    Important Dates
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Exam Date</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.examDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Last Updated</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedSubject.updated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showAddTopicModal && (
            <Modal
              title="Add New Topic"
              onClose={() => {
                setShowAddTopicModal(null);
                setTopicForm({});
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic Name *</label>
                  <input
                    type="text"
                    value={topicForm.name || ""}
                    onChange={(e) => setTopicForm({ ...topicForm, name: e.target.value })}
                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Binary Search Trees"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    value={topicForm.description || ""}
                    onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })}
                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the topic"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                    <select
                      value={topicForm.difficulty || "medium"}
                      onChange={(e) => setTopicForm({ ...topicForm, difficulty: e.target.value as any })}
                      className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Hours</label>
                    <input
                      type="number"
                      value={topicForm.estimatedHours || 2}
                      onChange={(e) => setTopicForm({ ...topicForm, estimatedHours: Number(e.target.value) })}
                      className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                      min="0.5"
                      step="0.5"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => addTopic(selectedSubject.id, showAddTopicModal.unitId)}
                    disabled={!topicForm.name}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
                  >
                    Add Topic
                  </button>
                  <button
                    onClick={() => {
                      setShowAddTopicModal(null);
                      setTopicForm({});
                    }}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Faculty Syllabus Tracker</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Track and manage your course syllabus coverage</p>
            </div>
            
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const progress = calculateOverallProgress(subject);
              const completedUnits = subject.units.filter((u) => u.status === "COMPLETED").length;
              return (
                <div
                  key={subject.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedSubject(subject)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{subject.code}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subject.name}</p>
                      </div>
                      
                    </div>
                    <div className="mb-4 pb-4 border-b dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{subject.faculty}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{subject.semester}</span>
                        <span>•</span>
                        <span>{subject.credits} Credits</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full transition-all ${getProgressBarColor(progress)}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <BookOpen size={16} />
                          <span>
                            {completedUnits}/{subject.units.length} Units
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar size={16} />
                          <span>{subject.examDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 px-5 py-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Updated: {subject.updated}</span>
                    <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm font-medium transition">
                      View Details
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultySyllabusTracker;