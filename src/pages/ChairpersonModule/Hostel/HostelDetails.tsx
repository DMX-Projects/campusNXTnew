import React, { useState } from "react";
import { PlusCircle, Home, User } from "lucide-react";

// Hostel type definition
interface Hostel {
  id: number;
  name: string;
  location: string;
  capacity: number;
  warden: string;
}

const HostelDetails: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    warden: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.capacity) {
      alert("All fields are required!");
      return;
    }
    const newHostel: Hostel = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      capacity: Number(formData.capacity),
      warden: formData.warden,
    };
    setHostels([...hostels, newHostel]);
    setFormData({ name: "", location: "", capacity: "", warden: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-blue-800 mb-4 flex items-center gap-3">
        🏫 Hostel Management
      </h2>
      {/* Form Section */}
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-500" /> Add New Hostel
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="🏢 Hostel Name"
            onChange={handleChange}
            className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition outline-none bg-blue-50"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="📍 Location"
            onChange={handleChange}
            className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition outline-none bg-blue-50"
            required
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            placeholder="👥 Capacity"
            onChange={handleChange}
            className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition outline-none bg-blue-50"
            required
          />
          <input
            type="text"
            name="warden"
            value={formData.warden}
            placeholder="👨‍🏫 Warden Name"
            onChange={handleChange}
            className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition outline-none bg-blue-50"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
          >
            ➕ Add Hostel
          </button>
        </form>
      </div>
      {/* Hostel List */}
      <div className="w-full max-w-3xl mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <Home className="w-5 h-5 text-green-500" /> Hostel List
        </h3>
        {hostels.length === 0 ? (
          <p className="text-gray-500 italic text-center py-6 bg-white rounded-xl shadow">
            No hostel details available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {hostels.map((h) => (
              <div
                key={h.id}
                className="bg-gradient-to-r from-blue-100 to-green-100 shadow-md border border-gray-200 p-6 rounded-xl hover:shadow-xl transition"
              >
                <h4 className="text-xl font-bold text-blue-600 mb-2">
                  {h.name}
                </h4>
                <p className="text-gray-700 mb-1">📍 {h.location}</p>
                <p className="text-gray-700 mb-1">👥 Capacity: {h.capacity}</p>
                <p className="text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" /> 
                  {h.warden || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelDetails;
