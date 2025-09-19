import React, { useState } from 'react';

const courses = [
  {
    id: 'CS201',
    name: 'Data Structures',
    faculty: 'Prof. S. Rao',
    semester: 3,
    lessonPlan: {
      firstMidterm: [
        { topic: 'Arrays & Linked Lists', hours: 8, plannedDate: '2025-09-25' },
        { topic: 'Stacks & Queues', hours: 6, plannedDate: '2025-10-02' },
      ],
      secondMidterm: [
        { topic: 'Trees', hours: 10, plannedDate: '2025-11-10' },
        { topic: 'Graphs', hours: 9, plannedDate: '2025-12-01' },
      ]
    }
  },
  {
    id: 'CS301',
    name: 'Computer Networks',
    faculty: 'Dr. L. Jain',
    semester: 4,
    lessonPlan: {
      firstMidterm: [
        { topic: 'Network Layers', hours: 7, plannedDate: '2025-09-26' },
        { topic: 'Signaling', hours: 7, plannedDate: '2025-10-05' },
      ],
      secondMidterm: [
        { topic: 'Routing Algorithms', hours: 8, plannedDate: '2025-11-15' },
        { topic: 'Wireless Networks', hours: 9, plannedDate: '2025-12-10' },
      ]
    }
  },
  {
    id: 'CS301',
    name: 'Computer Networks',
    faculty: 'Dr. L. Jain',
    semester: 4,
    lessonPlan: {
      firstMidterm: [
        { topic: 'Network Layers', hours: 7, plannedDate: '2025-09-26' },
        { topic: 'Signaling', hours: 7, plannedDate: '2025-10-05' },
      ],
      secondMidterm: [
        { topic: 'Routing Algorithms', hours: 8, plannedDate: '2025-11-15' },
        { topic: 'Wireless Networks', hours: 9, plannedDate: '2025-12-10' },
      ]
    }
  },
  {
    id: 'CS301',
    name: 'Computer Networks',
    faculty: 'Dr. L. Jain',
    semester: 4,
    lessonPlan: {
      firstMidterm: [
        { topic: 'Network Layers', hours: 7, plannedDate: '2025-09-26' },
        { topic: 'Signaling', hours: 7, plannedDate: '2025-10-05' },
      ],
      secondMidterm: [
        { topic: 'Routing Algorithms', hours: 8, plannedDate: '2025-11-15' },
        { topic: 'Wireless Networks', hours: 9, plannedDate: '2025-12-10' },
      ]
    }
  },
  {
    id: 'CS301',
    name: 'Computer Networks',
    faculty: 'Dr. L. Jain',
    semester: 4,
    lessonPlan: {
      firstMidterm: [
        { topic: 'Network Layers', hours: 7, plannedDate: '2025-09-26' },
        { topic: 'Signaling', hours: 7, plannedDate: '2025-10-05' },
      ],
      secondMidterm: [
        { topic: 'Routing Algorithms', hours: 8, plannedDate: '2025-11-15' },
        { topic: 'Wireless Networks', hours: 9, plannedDate: '2025-12-10' },
      ]
    }
  },
  {
    id: 'CS301',
    name: 'Computer Networks',
    faculty: 'Dr. L. Jain',
    semester: 4,
    lessonPlan: {
      firstMidterm: [
        { topic: 'Network Layers', hours: 7, plannedDate: '2025-09-26' },
        { topic: 'Signaling', hours: 7, plannedDate: '2025-10-05' },
      ],
      secondMidterm: [
        { topic: 'Routing Algorithms', hours: 8, plannedDate: '2025-11-15' },
        { topic: 'Wireless Networks', hours: 9, plannedDate: '2025-12-10' },
      ]
    }
  },
];

const facultyNames = Array.from(new Set(courses.map(c => c.faculty)));

export default function LessonPlanBySemester() {
  const [filters, setFilters] = useState({ faculty: '', course: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleFilterChange = (e) =>
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  const filteredCourses = courses.filter(
    (course) =>
      (filters.faculty ? course.faculty === filters.faculty : true) &&
      (filters.course
        ? course.name.toLowerCase().includes(filters.course.toLowerCase())
        : true)
  );

  const openModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedCourse(null);
    setShowModal(false);
  };

  return (
    <div className="">
      <header>
        <h1 className="text-3xl font-extrabold text-primary-800 dark:text-primary-200 mb-8">
          Syllabus & Lesson Plans by Semester
        </h1>
      </header>

      {/* Filters */}
      <section className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          name="course"
          placeholder="Filter by Course Name"
          value={filters.course}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 focus:ring-2 focus:ring-primary-400 flex-grow md:flex-grow-0 md:w-72"
          aria-label="Filter by course name"
        />
        <select
          name="faculty"
          value={filters.faculty}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 focus:ring-2 focus:ring-primary-400 w-72"
          aria-label="Filter by faculty"
        >
          <option value="">All Faculties</option>
          {facultyNames.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </section>

      {/* Courses Table */}
      <div className="shadow-xl rounded-2xl bg-primary-50 border border-primary-200 overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="bg-primary-100 text-primary-900">
              <th className="px-5 py-3 font-bold rounded-tl-2xl">Course Name</th>
              <th className="px-5 py-3 font-bold">Course ID</th>
              <th className="px-5 py-3 font-bold">Faculty</th>
              <th className="px-5 py-3 font-bold rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-7 text-center text-primary-400 dark:text-primary-500"
                >
                  No courses found.
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-primary-200 last:border-none bg-white dark:bg-gray-800"
                >
                  <td className="px-5 py-3">{course.name}</td>
                  <td className="px-5 py-3">{course.id}</td>
                  <td className="px-5 py-3">{course.faculty}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => openModal(course)}
                      className="px-4 py-1 rounded-md bg-primary-400 hover:bg-primary-500 text-white font-semibold transition"
                      aria-label={`View lesson plan for ${course.name}`}
                    >
                      View Lesson Plan
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lesson Plan Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-xl font-bold hover:bg-red-500 dark:hover:bg-red-600 transition"
              aria-label="Close lesson plan modal"
            >
              ×
            </button>

            <h2 className="text-2xl font-extrabold mb-4 text-primary-800 dark:text-primary-100">
              {selectedCourse.name} - Semester {selectedCourse.semester} Lesson Plan
            </h2>

            {/* First Midterm */}
            <section className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-primary-700 dark:text-primary-200">
                First Midterm
              </h3>
              <table className="min-w-full table-auto border border-primary-300 dark:border-primary-700 rounded-lg overflow-hidden">
                <thead className="bg-primary-100 dark:bg-primary-800">
                  <tr>
                    <th className="px-4 py-2 border-b border-primary-300 dark:border-primary-700 text-left">
                      Topic
                    </th>
                    <th className="px-4 py-2 border-b border-primary-300 dark:border-primary-700 text-left">
                      Hours Required
                    </th>
                    <th className="px-4 py-2 border-b border-primary-300 dark:border-primary-700 text-left">
                      Planned Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourse.lessonPlan.firstMidterm.map((lesson, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-primary-50 dark:even:bg-primary-800"
                    >
                      <td className="px-4 py-2 border-b border-primary-200 dark:border-primary-700">
                        {lesson.topic}
                      </td>
                      <td className="px-4 py-2 border-b border-primary-200 dark:border-primary-700">
                        {lesson.hours} hours
                      </td>
                      <td className="px-4 py-2 border-b border-primary-200 dark:border-primary-700">
                        {new Date(lesson.plannedDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Second Midterm */}
            <section>
              <h3 className="text-xl font-bold mb-2 text-primary-700 dark:text-primary-200">
                Second Midterm
              </h3>
              <table className="min-w-full table-auto border border-primary-300 dark:border-primary-700 rounded-lg overflow-hidden">
                <thead className="bg-primary-100 dark:bg-primary-800">
                  <tr>
                    <th className="px-4 py-2 border-b border-primary-300 dark:border-primary-700 text-left">
                      Topic
                    </th>
                    <th className="px-4 py-2 border-b border-primary-300 dark:border-primary-700 text-left">
                      Hours Required
                    </th>
                    <th className="px-4 py-2 border-b border-primary-300 dark:border-primary-700 text-left">
                      Planned Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourse.lessonPlan.secondMidterm.map((lesson, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-primary-50 dark:even:bg-primary-800"
                    >
                      <td className="px-4 py-2 border-b border-primary-200 dark:border-primary-700">
                        {lesson.topic}
                      </td>
                      <td className="px-4 py-2 border-b border-primary-200 dark:border-primary-700">
                        {lesson.hours} hours
                      </td>
                      <td className="px-4 py-2 border-b border-primary-200 dark:border-primary-700">
                        {new Date(lesson.plannedDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
