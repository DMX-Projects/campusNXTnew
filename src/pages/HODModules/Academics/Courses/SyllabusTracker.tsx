import React, { useState, useMemo } from 'react';

const courses = [
  {
    id: 'CS201',
    name: 'Data Structures',
    faculty: 'Prof. S. Rao',
    semester: 3,
    durationDays: 180, // semester length in days
    lessonPlan: [
      { topic: 'Arrays & Linked Lists', plannedDate: '2025-09-25', completed: true },
      { topic: 'Stacks & Queues', plannedDate: '2025-10-05', completed: false },
      { topic: 'Trees', plannedDate: '2025-10-20', completed: false },
      { topic: 'Graphs', plannedDate: '2025-11-05', completed: false },
      { topic: 'Hashing', plannedDate: '2025-11-20', completed: false },
      { topic: 'Sorting Algorithms', plannedDate: '2025-12-05', completed: true },
    ],
  },
  {
    id: 'CS301',
    name: 'Computer Networks',
    faculty: 'Dr. L. Jain',
    semester: 4,
    durationDays: 180,
    lessonPlan: [
      { topic: 'Network Layers', plannedDate: '2025-09-30', completed: true },
      { topic: 'Signaling', plannedDate: '2025-10-10', completed: true },
      { topic: 'Routing Algorithms', plannedDate: '2025-10-25', completed: false },
      { topic: 'Wireless Networks', plannedDate: '2025-11-10', completed: false },
      { topic: 'Network Security', plannedDate: '2025-11-25', completed: false },
    ],
  },
];

const facultyNames = Array.from(new Set(courses.map(c => c.faculty)));

function daysBetween(startDate, endDate) {
  const diff = new Date(endDate) - new Date(startDate);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function AdvancedSyllabusTracking() {
  const [filters, setFilters] = useState({ course: '', faculty: '' });
  const [expandedCourse, setExpandedCourse] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  // Calculate completion stats per course on the fly
  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      (filters.course ? course.name.toLowerCase().includes(filters.course.toLowerCase()) : true) &&
      (filters.faculty ? course.faculty === filters.faculty : true)
    );
  }, [filters]);

  const handleFilterChange = e =>
    setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  const toggleExpand = (courseId) =>
    setExpandedCourse(expandedCourse === courseId ? null : courseId);

  return (
    <div className="">
      <h1 className="text-3xl font-extrabold text-primary-900 dark:text-primary-100 mb-8">
        Syllabus Tracking & Progress
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-center justify-start max-w-full">
        <input
          type="text"
          placeholder="Filter by Course Name"
          name="course"
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
          {facultyNames.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Courses list */}
      <div className="flex flex-col gap-6">
        {filteredCourses.length === 0 ? (
          <div className="text-center text-primary-700 dark:text-primary-300 py-12">
            No courses match your filters.
          </div>
        ) : (
          filteredCourses.map(course => {
            const totalTopics = course.lessonPlan.length;
            const completedTopics = course.lessonPlan.filter(l => l.completed).length;
            const percentComplete = Math.round((completedTopics / totalTopics) * 100);
            const remainingTopics = totalTopics - completedTopics;

            // Calculate estimated days left to complete
            // Assume even distribution; more sophisticated logic possible.
            const daysPassed = daysBetween(
              course.lessonPlan[0].plannedDate,
              today
            );
            const daysLeft = Math.max(course.durationDays - daysPassed, 0);

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
              >
                {/* Header with summary */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(course.id)}
                  aria-expanded={expandedCourse === course.id}
                  aria-controls={`course-${course.id}-details`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleExpand(course.id);
                    }
                  }}
                >
                  <div>
                    <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100">
                      {course.name} ({course.id})
                    </h2>
                    <div className="text-primary-700 dark:text-primary-300">
                      Faculty: <span className="font-semibold">{course.faculty}</span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row gap-4 sm:items-center">
                    <div className="flex flex-col items-center sm:items-start mr-4">
                      <div className="text-sm text-primary-600 dark:text-primary-400">Completion</div>
                      <div className="font-semibold text-green-700 dark:text-green-400">{percentComplete}%</div>
                      <div className="w-48 h-4 bg-primary-200 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-4 bg-secondary-600 dark:bg-secondary-400"
                          style={{ width: `${percentComplete}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start mr-4">
                      <div className="text-sm text-primary-600 dark:text-primary-400">Remaining Topics</div>
                      <div className="font-semibold text-primary-900 dark:text-primary-100">
                        {remainingTopics}
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <div className="text-sm text-primary-600 dark:text-primary-400">Estimated Days Left</div>
                      <div className="font-semibold text-primary-900 dark:text-primary-100">{daysLeft}</div>
                    </div>
                    <div className="text-primary-600 dark:text-primary-400 text-sm italic">
                      (Click to toggle details)
                    </div>
                  </div>
                </div>

                {/* Details when expanded */}
                {expandedCourse === course.id && (
                  <div
                    id={`course-${course.id}-details`}
                    className="mt-6 border-t border-primary-200 dark:border-primary-700 pt-4 overflow-x-auto"
                  >
                    <table className="min-w-full text-left border-collapse table-auto whitespace-nowrap">
                      <thead className="bg-primary-100 dark:bg-primary-800 font-semibold text-primary-900 dark:text-primary-100 rounded-md">
                        <tr>
                          <th className="px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-tl-md">Topic</th>
                          <th className="px-4 py-2 border border-primary-300 dark:border-primary-700">Planned Date</th>
                          <th className="px-4 py-2 border border-primary-300 dark:border-primary-700">Completion Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.lessonPlan.map((lesson, idx) => (
                          <tr
                            key={idx}
                            className={`border border-primary-200 dark:border-primary-700 ${
                              idx % 2 === 0 ? 'bg-primary-50 dark:bg-primary-900' : 'bg-white dark:bg-gray-800'
                            }`}
                          >
                            <td className="px-4 py-2">{lesson.topic}</td>
                            <td className="px-4 py-2">{new Date(lesson.plannedDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">
                              {lesson.completed ? (
                                <span className="text-green-600 font-semibold">Completed</span>
                              ) : (
                                <span className="text-red-600 font-semibold">Pending</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
