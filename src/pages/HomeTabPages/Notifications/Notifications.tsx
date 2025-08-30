import React, { useState } from "react";

interface Notification {
  id: number;
  description: string;
  actionDate: string;
  actionDateDescription: string;
  issuedBy: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Notification, "id">>({
    description: "",
    actionDate: "",
    actionDateDescription: "",
    issuedBy: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(notifications.length / recordsPerPage);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotification: Notification = {
      id: notifications.length + 1,
      ...formData,
    };
    setNotifications([...notifications, newNotification]);
    setFormData({
      description: "",
      actionDate: "",
      actionDateDescription: "",
      issuedBy: "",
    });
    setShowForm(false);
  };

  // Paginated notifications
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = notifications.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-purple-700 font-semibold">Manage Notifications</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {showForm ? "Cancel" : "Add Notification"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Action Date</label>
            <input
              type="date"
              name="actionDate"
              value={formData.actionDate}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Action Date Description</label>
            <input
              type="text"
              name="actionDateDescription"
              value={formData.actionDateDescription}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Issued By</label>
            <input
              type="text"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div className="col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add Notification
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Notification ID</th>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Issued By</th>
            <th className="border px-3 py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((n) => (
              <tr key={n.id}>
                <td className="border px-3 py-2">{n.id}</td>
                <td className="border px-3 py-2">{n.description}</td>
                <td className="border px-3 py-2">{n.issuedBy}</td>
                <td className="border px-3 py-2">
                  {n.actionDateDescription} {n.actionDate}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="border px-3 py-6 text-center text-gray-400"
              >
                No Notifications
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {notifications.length > recordsPerPage && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
