import React, { useState } from 'react';

const initialCourses = [
  { id: 1, name: 'Data Structures', code: 'CS201', faculty: 'Prof. S. Rao', semester: '3', status: 'Allocated' },
  { id: 2, name: 'Discrete Mathematics', code: 'MA204', faculty: 'VIKRAM', semester: '3', status: 'Unassigned' },
  { id: 3, name: 'Operating Systems', code: 'CS225', faculty: 'Prof. S. Rao', semester: '4', status: 'Allocated' },
  { id: 4, name: 'Software Engineering', code: 'CS301', faculty: 'Dr. L. Jain', semester: '4', status: 'Allocated' },
];

const facultyNames = ['Prof. S. Rao', 'Dr. L. Jain', 'Unassigned'];
const semesters = ['3', '4'];

export default function CourseFacultyAllocation() {
  const [courses, setCourses] = useState(initialCourses);
  const [filters, setFilters] = useState({ course: '', faculty: '', semester: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' | 'edit' | 'delete'
  const [editData, setEditData] = useState(null);

  // Modal form state
  const [form, setForm] = useState({
    name: '',
    code: '',
    faculty: '',
    semester: '',
    status: 'Allocated',
  });

  React.useEffect(() => {
    if ((modalType === 'edit' || modalType === 'delete') && editData) {
      setForm(editData);
    } else if (modalType === 'create') {
      setForm({ name: '', code: '', faculty: '', semester: '', status: 'Allocated' });
    }
  }, [modalType, showModal, editData]);

  // Filtering logic
  const handleFilterChange = (e) => setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  const displayedCourses = courses.filter(row =>
    (filters.course ? row.name.toLowerCase().includes(filters.course.toLowerCase()) : true) &&
    (filters.faculty ? row.faculty === filters.faculty : true) &&
    (filters.semester ? row.semester === filters.semester : true)
  );

  // Modal logic
  const openModal = (type, data = null) => { setEditData(data); setModalType(type); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  // Actions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'create') {
      setCourses(prev => ([...prev, { ...form, id: prev.length + 1, status: form.faculty && form.faculty !== 'Unassigned' ? 'Allocated' : 'Unassigned' }]));
    } else if (modalType === 'edit') {
      setCourses(prev => prev.map(row => row.id === editData.id ? { ...form, id: row.id, status: form.faculty && form.faculty !== 'Unassigned' ? 'Allocated' : 'Unassigned' } : row));
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setCourses(prev => prev.filter(row => row.id !== editData.id));
    setShowModal(false);
  };

  return (
    <div className="min-h-screen px-4 md:px-12 py-10 font-sans transition-colors">

      <header>
        <h2 className="text-3xl font-extrabold text-primary-800 dark:text-primary-200 mb-6">Course Faculty Allocation</h2>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <input
          className="px-3 py-2 rounded-lg border border-primary-300 bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 focus:ring-2 focus:ring-primary-400"
          type="text"
          name="course"
          placeholder="Search Course Name"
          value={filters.course}
          onChange={handleFilterChange}
        />
        <select
          className="px-3 py-2 rounded-lg border border-primary-300 bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100"
          name="faculty"
          value={filters.faculty}
          onChange={handleFilterChange}
        >
          <option value="">All Faculties</option>
          {facultyNames.map(name => (<option key={name} value={name}>{name}</option>))}
        </select>
        <select
          className="px-3 py-2 rounded-lg border border-primary-300 bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100"
          name="semester"
          value={filters.semester}
          onChange={handleFilterChange}
        >
          <option value="">All Semesters</option>
          {semesters.map(s => (<option key={s} value={s}>Semester {s}</option>))}
        </select>
        <button
          className="ml-auto px-5 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold shadow-lg transition"
          onClick={() => openModal('create')}
        >
          New Allocation
        </button>
      </div>

      {/* Table */}
      <div className="shadow-xl rounded-2xl bg-primary-50 border border-primary-200 overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="bg-primary-100 text-primary-900">
              <th className="px-5 py-3 font-bold rounded-tl-2xl">Course Name</th>
              <th className="px-5 py-3 font-bold">Course Code</th>
              <th className="px-5 py-3 font-bold">Faculty</th>
              <th className="px-5 py-3 font-bold">Semester</th>
              <th className="px-5 py-3 font-bold">Status</th>
              <th className="px-5 py-3 font-bold rounded-tr-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedCourses.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-7 text-center text-primary-400 dark:text-primary-500">No courses found for these filters.</td>
              </tr>
            )}
            {displayedCourses.map(row => (
              <tr key={row.id} className="border-b border-primary-200 last:border-none bg-white dark:bg-gray-800">
                <td className="px-5 py-3">{row.name}</td>
                <td className="px-5 py-3">{row.code}</td>
                <td className="px-5 py-3">{row.faculty}</td>
                <td className="px-5 py-3">Sem {row.semester}</td>
                <td className="px-5 py-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-semibold 
                      ${row.status === 'Allocated'
                        ? 'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-100'
                        : 'bg-accent-100 text-accent-700 dark:bg-accent-700 dark:text-accent-100'}
                    `}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 flex gap-3">
                  <button
                    className="px-4 py-1 rounded-md bg-primary-400 hover:bg-primary-500 text-white font-semibold focus:outline-none transition"
                    onClick={() => openModal('edit', row)}
                    aria-label={`Edit allocation for ${row.name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-1 rounded-md bg-accent-500 hover:bg-accent-600 text-white font-semibold focus:outline-none transition"
                    onClick={() => openModal('delete', row)}
                    aria-label={`Delete allocation for ${row.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit */}
      {(showModal && modalType !== 'delete') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              type="button"
              className="absolute top-4 right-4 p-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-primary-300 dark:hover:bg-primary-800 focus:outline-none"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-extrabold mb-5 text-primary-900 dark:text-primary-100">
              {modalType === 'create' ? 'Create New Allocation' : 'Edit Allocation'}
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100"
                placeholder="Course Name"
                value={form.name}
                onChange={e => setForm(val => ({ ...val, name: e.target.value }))}
                required
              />
              <input
                type="text"
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100"
                placeholder="Course Code"
                value={form.code}
                onChange={e => setForm(val => ({ ...val, code: e.target.value }))}
                required
              />
              <select
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100"
                value={form.faculty}
                onChange={e => setForm(val => ({ ...val, faculty: e.target.value }))}
                required
              >
                <option value="">Select Faculty</option>
                {facultyNames.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
              <select
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100"
                value={form.semester}
                onChange={e => setForm(val => ({ ...val, semester: e.target.value }))}
                required
              >
                <option value="">Select Semester</option>
                {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold transition"
              >
                {modalType === 'create' ? 'Create Allocation' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Delete */}
      {(showModal && modalType === 'delete') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative text-center">
            <button
              type="button"
              className="absolute top-4 right-4 p-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-red-700 dark:hover:bg-red-900 focus:outline-none"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-3 text-red-700 dark:text-red-500">Delete Allocation?</h3>
            <p className="mb-6 text-primary-900 dark:text-primary-100">
              This will remove <strong>{form.name}</strong> from the table. Are you sure?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-primary-900 dark:text-primary-100"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
