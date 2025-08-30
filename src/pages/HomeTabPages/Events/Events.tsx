import React, { useState } from "react";

interface EventTask {
  id: number;
  title: string;
  dueDate: string;
  dueDateDesc: string;
  path: string;
  module: string;
}

const Events: React.FC = () => {
  const [tasks, setTasks] = useState<EventTask[]>([]);
  const [showForm, setShowForm] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueDateDesc, setDueDateDesc] = useState("");
  const [path, setPath] = useState("");
  const [module, setModule] = useState("");

  const handleAddTask = () => {
    const newTask: EventTask = {
      id: tasks.length + 1,
      title,
      dueDate,
      dueDateDesc,
      path,
      module,
    };
    setTasks([...tasks, newTask]);
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setTitle("");
    setDueDate("");
    setDueDateDesc("");
    setPath("");
    setModule("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-purple-700">MANAGE TASKS</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        )}
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">* Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">* Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                * Due Date Description
              </label>
              <input
                value={dueDateDesc}
                onChange={(e) => setDueDateDesc(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter due date description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">* Path</label>
              <input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter task path"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">* Module Name</label>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select a module</option>
                <option value="Masters">Masters</option>
                <option value="Calendar">Calendar</option>
                <option value="Inbox">Inbox</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Due Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Path</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  No data
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="px-4 py-2">{task.id}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.dueDate}</td>
                  <td className="px-4 py-2">{task.path}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
