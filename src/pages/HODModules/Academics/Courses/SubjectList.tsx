import React, { useState } from "react";

interface Subject {
  id: number;
  code: string;
  name: string;
  credits: number;
  semester: number;
  department: string;
  status: "Active" | "Inactive";
}

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      code: "CSE101",
      name: "Introduction to Programming",
      credits: 4,
      semester: 1,
      department: "CSE",
      status: "Active",
    },
    {
      id: 2,
      code: "CSE202",
      name: "Data Structures",
      credits: 3,
      semester: 2,
      department: "CSE",
      status: "Active",
    },
  ]);

  const [newSubject, setNewSubject] = useState<Omit<Subject, "id">>({
    code: "",
    name: "",
    credits: 0,
    semester: 1,
    department: "CSE",
    status: "Active",
  });

  const [showModal, setShowModal] = useState(false);

  const addSubject = () => {
    const newId = subjects.length + 1;
    setSubjects([...subjects, { id: newId, ...newSubject }]);
    setNewSubject({
      code: "",
      name: "",
      credits: 0,
      semester: 1,
      department: "CSE",
      status: "Active",
    });
    setShowModal(false);
  };

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Subject List</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add Subject
        </button>
      </div>

      {/* Subject Table */}
      <div className="overflow-x-auto">
        <table className="w-full border dark:border-gray-700 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-3 border dark:border-gray-600">Code</th>
              <th className="p-3 border dark:border-gray-600">Subject Name</th>
              <th className="p-3 border dark:border-gray-600">Credits</th>
              <th className="p-3 border dark:border-gray-600">Semester</th>
              <th className="p-3 border dark:border-gray-600">Status</th>
              <th className="p-3 border dark:border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subj) => (
              <tr
                key={subj.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="border p-3 dark:border-gray-600">{subj.code}</td>
                <td className="border p-3 dark:border-gray-600">{subj.name}</td>
                <td className="border p-3 dark:border-gray-600">
                  {subj.credits}
                </td>
                <td className="border p-3 dark:border-gray-600">
                  {subj.semester}
                </td>
                <td
                  className={`border p-3 dark:border-gray-600 ${
                    subj.status === "Active"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {subj.status}
                </td>
                <td className="border p-3 dark:border-gray-600">
                  <button
                    onClick={() => deleteSubject(subj.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {subjects.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-3 text-gray-500 dark:text-gray-400"
                >
                  No subjects added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <h3 className="text-xl font-bold mb-6">Add New Subject</h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium">Subject Code</label>
                <input
                  type="text"
                  value={newSubject.code}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, code: e.target.value })
                  }
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Subject Name</label>
                <input
                  type="text"
                  value={newSubject.name}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, name: e.target.value })
                  }
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Credits</label>
                <input
                  type="number"
                  value={newSubject.credits}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      credits: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Semester</label>
                <input
                  type="number"
                  value={newSubject.semester}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      semester: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Status</label>
                <select
                  value={newSubject.status}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={addSubject}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectList;
