import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --------- TYPES ----------
interface Lesson {
  id: number;
  title: string;
  topic: string;
  course: string;
  semester: string;
  type: "Video" | "Document" | "Quiz" | "Assignment";
  duration: string;
  status: "Draft" | "Published" | "Archived";
  tags: string[];
  updatedAt: string;
}

// --------- MOCK DATA ----------
const sampleLessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to Sorting",
    topic: "Data Structures",
    course: "B.Tech CSE",
    semester: "Semester 2",
    type: "Video",
    duration: "30 mins",
    status: "Published",
    tags: ["Sorting", "DSA"],
    updatedAt: "2025-08-20",
  },
  {
    id: 2,
    title: "Naive Bayes Classifier",
    topic: "Machine Learning Basics",
    course: "B.Tech AI",
    semester: "Semester 5",
    type: "Document",
    duration: "12 pages",
    status: "Draft",
    tags: ["AI", "ML", "Statistics"],
    updatedAt: "2025-08-25",
  },
];

export const LessonManager: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(sampleLessons);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const [formData, setFormData] = useState<Omit<Lesson, "id" | "updatedAt">>({
    title: "",
    topic: "",
    course: "",
    semester: "",
    type: "Video",
    duration: "",
    status: "Draft",
    tags: [],
  });

  // ---------- FILTER ----------
  const filteredLessons = lessons.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || l.type === filterType;
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // ---------- HANDLERS ----------
  const handleOpenModal = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        title: lesson.title,
        topic: lesson.topic,
        course: lesson.course,
        semester: lesson.semester,
        type: lesson.type,
        duration: lesson.duration,
        status: lesson.status,
        tags: lesson.tags,
      });
    } else {
      setEditingLesson(null);
      setFormData({
        title: "",
        topic: "",
        course: "",
        semester: "",
        type: "Video",
        duration: "",
        status: "Draft",
        tags: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveLesson = () => {
    if (editingLesson) {
      setLessons((prev) =>
        prev.map((l) =>
          l.id === editingLesson.id
            ? { ...l, ...formData, updatedAt: new Date().toISOString() }
            : l
        )
      );
    } else {
      const newLesson: Lesson = {
        id: Date.now(),
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      setLessons((prev) => [...prev, newLesson]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this lesson?")) {
      setLessons((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <BookOpen className="w-6 h-6" />
          Lessons Management
        </motion.h1>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow"
        >
          <Plus className="w-5 h-5" /> Add Lesson
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option>All</option>
          <option>Video</option>
          <option>Document</option>
          <option>Quiz</option>
          <option>Assignment</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option>All</option>
          <option>Draft</option>
          <option>Published</option>
          <option>Archived</option>
        </select>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              className="p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lesson.course} • {lesson.semester}
                </p>
                <p className="text-xs text-gray-400">Topic: {lesson.topic}</p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  {lesson.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full 
                  ${
                    lesson.status === "Published"
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : lesson.status === "Draft"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {lesson.status}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(lesson)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Edit className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Last updated:{" "}
                {new Date(lesson.updatedAt).toLocaleDateString("en-IN")}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {editingLesson ? "Edit Lesson" : "Add Lesson"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />
                <input
                  type="text"
                  placeholder="Topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />
                <input
                  type="text"
                  placeholder="Course"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />
                <input
                  type="text"
                  placeholder="Semester"
                  value={formData.semester}
                  onChange={(e) =>
                    setFormData({ ...formData, semester: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as Lesson["type"],
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                >
                  <option>Video</option>
                  <option>Document</option>
                  <option>Quiz</option>
                  <option>Assignment</option>
                </select>
                <input
                  type="text"
                  placeholder="Duration / Pages"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Lesson["status"],
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                >
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLesson}
                  className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


