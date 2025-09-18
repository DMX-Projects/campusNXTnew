import React, { useState, useEffect } from "react";

interface Faculty {
  id: number;
  name: string;
  facultyId: string;
  department: string;
  contact: string;
}

const HostelFacultyList: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    facultyId: "",
    department: "",
    contact: "",
  });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load faculties from localStorage on mount
  useEffect(() => {
    const savedFaculties = localStorage.getItem("hostelFaculties");
    if (savedFaculties) {
      try {
        setFaculties(JSON.parse(savedFaculties));
      } catch {
        setFaculties([]);
      }
    }
  }, []);

  // Save faculties to localStorage on update
  useEffect(() => {
    if (faculties.length > 0) {
      localStorage.setItem("hostelFaculties", JSON.stringify(faculties));
    } else {
      localStorage.removeItem("hostelFaculties");
    }
  }, [faculties]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.facultyId) {
      alert("Please fill required fields!");
      return;
    }

    if (editingId) {
      // Update existing faculty
      setFaculties((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? {
                ...f,
                name: formData.name.trim(),
                facultyId: formData.facultyId.trim(),
                department: formData.department.trim(),
                contact: formData.contact.trim(),
              }
            : f
        )
      );
      setEditingId(null);
    } else {
      // Add new faculty
      const newFaculty: Faculty = {
        id: Date.now(),
        name: formData.name.trim(),
        facultyId: formData.facultyId.trim(),
        department: formData.department.trim(),
        contact: formData.contact.trim(),
      };
      setFaculties((prev) => [...prev, newFaculty]);
    }

    setFormData({ name: "", facultyId: "", department: "", contact: "" });
  };

  const handleEdit = (faculty: Faculty) => {
    setFormData({
      name: faculty.name,
      facultyId: faculty.facultyId,
      department: faculty.department,
      contact: faculty.contact,
    });
    setEditingId(faculty.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      setFaculties((prev) => prev.filter((f) => f.id !== id));

      if (editingId === id) {
        setEditingId(null);
        setFormData({ name: "", facultyId: "", department: "", contact: "" });
      }
    }
  };

  const filteredFaculties = faculties.filter((f) =>
    [f.name, f.facultyId, f.department]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-800">👨‍🏫 Hostel Faculty List</h2>

      {/* Search Box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Name, Faculty ID, or Department..."
        className="w-full max-w-4xl p-3 rounded-lg border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-6"
      />

      {/* Add/Edit Faculty Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg grid gap-6 grid-cols-1 md:grid-cols-2"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Faculty Name *"
          className="p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 transition"
          required
        />
        <input
          type="text"
          name="facultyId"
          value={formData.facultyId}
          onChange={handleChange}
          placeholder="Faculty ID *"
          className="p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 transition"
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 transition"
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 transition"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow"
        >
          {editingId ? "✏️ Update Faculty" : "➕ Add Faculty"}
        </button>
      </form>

      {/* Faculty Table */}
      <div className="w-full max-w-4xl mt-10 bg-white shadow-lg rounded-2xl overflow-x-auto">
        <h3 className="text-xl font-bold text-blue-700 p-6 border-b border-blue-200">
          📋 Faculty Records
        </h3>
        {filteredFaculties.length === 0 ? (
          <p className="p-6 text-center text-gray-500 italic">No faculty found.</p>
        ) : (
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider border border-blue-300">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider border border-blue-300">
                  Faculty ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider border border-blue-300">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider border border-blue-300">
                  Contact
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-blue-600 uppercase tracking-wider border border-blue-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {filteredFaculties.map((f) => (
                <tr
                  key={f.id}
                  className="hover:bg-blue-50 transition"
                  title={`Faculty: ${f.name}`}
                >
                  <td className="px-6 py-4 font-medium text-blue-900">{f.name}</td>
                  <td className="px-6 py-4">{f.facultyId}</td>
                  <td className="px-6 py-4">{f.department}</td>
                  <td className="px-6 py-4">{f.contact}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(f)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HostelFacultyList;
