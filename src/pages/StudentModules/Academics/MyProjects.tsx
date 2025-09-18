import React, { useState } from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  course: string;
  status: string;
  submissionDate: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'React App',
    description: 'A simple react project.',
    course: 'Web Development',
    status: 'Submitted',
    submissionDate: '2025-01-12',
  },
];

const MyProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [form, setForm] = useState({
    title: '',
    description: '',
    course: '',
    status: 'Draft',
    submissionDate: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      ...form,
      id: projects.length + 1,
    };
    setProjects([...projects, newProject as Project]);
    setForm({
      title: '',
      description: '',
      course: '',
      status: 'Draft',
      submissionDate: '',
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
     <div className="w-full px-8 py-12">

        {/* Header and Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Projects</h1>
          <button
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setShowForm(true)}
          >
            Create New Project
          </button>
        </div>

        {/* Table Card */}
       <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
  <table className="min-w-full">
    <thead>
      <tr className="bg-gray-100 dark:bg-slate-700">
        <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">Project Title</th>
        <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">Description</th>
        <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">Course</th>
        <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">Status</th>
        <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">Submission Date</th>
      </tr>
    </thead>
    <tbody>
      {projects.map((proj) => (
        <tr
          key={proj.id}
          className="hover:bg-gray-50 dark:hover:bg-slate-700 transition"
        >
          <td className="py-4 px-6 text-gray-900 dark:text-gray-100 font-medium">{proj.title}</td>
          <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{proj.description}</td>
          <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{proj.course}</td>
          <td className="py-4 px-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                proj.status.toLowerCase() === "submitted"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {proj.status}
            </span>
          </td>
          <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{proj.submissionDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {/* Modal form (centered overlay) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-extrabold"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              ×
            </button>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">Create New Project</h2>
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={form.title}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={form.course}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={form.status}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="submissionDate"
                value={form.submissionDate}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-4 pt-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Add Project
                </button>
                <button
                  type="button"
                  className="bg-gray-300 dark:bg-slate-600 dark:text-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 hover:dark:bg-slate-500 transition font-medium"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;