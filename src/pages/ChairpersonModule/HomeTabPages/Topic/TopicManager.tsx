import React, { useState } from "react";
import {
  Plus,
  BookOpen,
  Search,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- TYPES ----------
interface Topic {
  id: number;
  title: string;
  course: string;
  semester: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  updatedAt: string;
}

// ---------- MOCK DATA ----------
const sampleTopics: Topic[] = [
  {
    id: 1,
    title: "Introduction to Data Structures",
    course: "B.Tech CSE",
    semester: "Semester 2",
    difficulty: "Easy",
    tags: ["DSA", "Algorithms"],
    updatedAt: "2025-08-20",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    course: "B.Tech AI",
    semester: "Semester 5",
    difficulty: "Medium",
    tags: ["AI", "Maths", "Statistics"],
    updatedAt: "2025-08-25",
  },
];

// ---------- COMPONENT ----------
export const TopicManager: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>(sampleTopics);
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterSemester, setFilterSemester] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  // ---------- FORM STATE ----------
  const [formData, setFormData] = useState<Omit<Topic, "id" | "updatedAt">>({
    title: "",
    course: "",
    semester: "",
    difficulty: "Easy",
    tags: [],
  });

  // ---------- FILTERING ----------
  const filteredTopics = topics.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCourse =
      filterCourse === "All" || t.course === filterCourse;
    const matchesDifficulty =
      filterDifficulty === "All" || t.difficulty === filterDifficulty;
    const matchesSemester =
      filterSemester === "All" || t.semester === filterSemester;

    return matchesSearch && matchesCourse && matchesDifficulty && matchesSemester;
  });

  // ---------- HANDLERS ----------
  const handleOpenModal = (topic?: Topic) => {
    if (topic) {
      setEditingTopic(topic);
      setFormData({
        title: topic.title,
        course: topic.course,
        semester: topic.semester,
        difficulty: topic.difficulty,
        tags: topic.tags,
      });
    } else {
      setEditingTopic(null);
      setFormData({
        title: "",
        course: "",
        semester: "",
        difficulty: "Easy",
        tags: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTopic = () => {
    if (editingTopic) {
      // Update existing
      setTopics((prev) =>
        prev.map((t) =>
          t.id === editingTopic.id
            ? { ...t, ...formData, updatedAt: new Date().toISOString() }
            : t
        )
      );
    } else {
      // Add new
      const newTopic: Topic = {
        id: Date.now(),
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      setTopics((prev) => [...prev, newTopic]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this topic?")) {
      setTopics((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // ---------- RENDER ----------
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
          Topics Management
        </motion.h1>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow"
        >
          <Plus className="w-5 h-5" /> Add Topic
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary-400"
          />
        </div>

        {/* Filters */}
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option>All</option>
          <option>B.Tech CSE</option>
          <option>B.Tech AI</option>
        </select>

        <select
          value={filterSemester}
          onChange={(e) => setFilterSemester(e.target.value)}
          className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option>All</option>
          <option>Semester 2</option>
          <option>Semester 5</option>
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <motion.div
                key={topic.id}
                className="p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {topic.course} • {topic.semester}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {topic.tags.map((tag, i) => (
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
                        topic.difficulty === "Easy"
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          : topic.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                          : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                      }`}
                  >
                    {topic.difficulty}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(topic)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Edit className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(topic.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Last updated:{" "}
                  {new Date(topic.updatedAt).toLocaleDateString("en-IN")}
                </p>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🚀 No topics found. Start by adding your first topic.
            </motion.div>
          )}
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
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {editingTopic ? "Edit Topic" : "Add Topic"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Topic Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />

                <input
                  type="text"
                  placeholder="Course (e.g., B.Tech CSE)"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />

                <input
                  type="text"
                  placeholder="Semester (e.g., Semester 2)"
                  value={formData.semester}
                  onChange={(e) =>
                    setFormData({ ...formData, semester: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                />

                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value as "Easy" | "Medium" | "Hard",
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
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

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTopic}
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


