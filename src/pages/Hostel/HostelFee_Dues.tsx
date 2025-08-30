import React, { useState, useEffect } from "react";

interface FeeRecord {
  id: number;
  name: string;
  rollNo: string;
  roomNo: string;
  totalFee: number;
  paidFee: number;
  dueFee: number;
}

const HostelFee_Dues: React.FC = () => {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    roomNo: "",
    totalFee: "",
    paidFee: "",
  });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedFees = localStorage.getItem("hostelFees");
    if (savedFees) {
      try {
        setFees(JSON.parse(savedFees));
      } catch {
        setFees([]);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (fees.length > 0) {
      localStorage.setItem("hostelFees", JSON.stringify(fees));
    } else {
      localStorage.removeItem("hostelFees");
    }
  }, [fees]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.rollNo || !formData.roomNo) {
      alert("Please fill required fields!");
      return;
    }

    const total = parseFloat(formData.totalFee) || 0;
    const paid = parseFloat(formData.paidFee) || 0;
    const due = total - paid;

    if (editingId) {
      setFees((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? {
                ...f,
                name: formData.name.trim(),
                rollNo: formData.rollNo.trim(),
                roomNo: formData.roomNo.trim(),
                totalFee: total,
                paidFee: paid,
                dueFee: due,
              }
            : f
        )
      );
      setEditingId(null);
    } else {
      const newRecord: FeeRecord = {
        id: Date.now(),
        name: formData.name.trim(),
        rollNo: formData.rollNo.trim(),
        roomNo: formData.roomNo.trim(),
        totalFee: total,
        paidFee: paid,
        dueFee: due,
      };
      setFees((prev) => [...prev, newRecord]);
    }

    setFormData({
      name: "",
      rollNo: "",
      roomNo: "",
      totalFee: "",
      paidFee: "",
    });
  };

  const handleEdit = (fee: FeeRecord) => {
    setFormData({
      name: fee.name,
      rollNo: fee.rollNo,
      roomNo: fee.roomNo,
      totalFee: fee.totalFee.toString(),
      paidFee: fee.paidFee.toString(),
    });
    setEditingId(fee.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this fee record?")) {
      setFees((prev) => prev.filter((f) => f.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({
          name: "",
          rollNo: "",
          roomNo: "",
          totalFee: "",
          paidFee: "",
        });
      }
    }
  };

  const filteredFees = fees.filter((f) =>
    [f.name, f.rollNo, f.roomNo].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white flex flex-col items-center">
      {/* Header and Search on same line */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-green-800">
          💰 Hostel Fee Details / Dues
        </h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-48 p-2 rounded-lg border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
      </div>

      {/* Add/Edit Fee Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg grid gap-6 grid-cols-1 md:grid-cols-2"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Student Name *"
          className="p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-green-50 transition"
          required
        />
        <input
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          placeholder="Roll Number *"
          className="p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-green-50 transition"
          required
        />
        <input
          type="text"
          name="roomNo"
          value={formData.roomNo}
          onChange={handleChange}
          placeholder="Room Number *"
          className="p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-green-50 transition"
          required
        />
        <input
          type="number"
          name="totalFee"
          value={formData.totalFee}
          onChange={handleChange}
          placeholder="Total Fee"
          className="p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-green-50 transition"
          min={0}
        />
        <input
          type="number"
          name="paidFee"
          value={formData.paidFee}
          onChange={handleChange}
          placeholder="Paid Fee"
          className="p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-green-50 transition"
          min={0}
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow"
        >
          {editingId ? "✏️ Update Fee Record" : "➕ Add Fee Record"}
        </button>
      </form>

      {/* Fee Records Table */}
      <div className="w-full max-w-4xl mt-10 bg-white shadow-lg rounded-2xl overflow-x-auto">
        <h3 className="text-xl font-bold text-green-700 p-6 border-b border-green-200">
          📋 Fee Records
        </h3>
        {filteredFees.length === 0 ? (
          <p className="p-6 text-center text-gray-500 italic">No records found.</p>
        ) : (
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-green-100">
              <tr>
                {[
                  "Name",
                  "Roll No",
                  "Room No",
                  "Total Fee",
                  "Paid Fee",
                  "Due Fee",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-semibold text-green-600 uppercase tracking-wider border border-green-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {filteredFees.map((f) => (
                <tr
                  key={f.id}
                  className="hover:bg-green-50 transition cursor-pointer"
                  title={`Student: ${f.name}`}
                >
                  <td className="px-6 py-4 font-medium text-green-900">{f.name}</td>
                  <td className="px-6 py-4">{f.rollNo}</td>
                  <td className="px-6 py-4">{f.roomNo}</td>
                  <td className="px-6 py-4">₹{f.totalFee}</td>
                  <td className="px-6 py-4">₹{f.paidFee}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      f.dueFee > 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    ₹{f.dueFee}
                  </td>
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

export default HostelFee_Dues;
