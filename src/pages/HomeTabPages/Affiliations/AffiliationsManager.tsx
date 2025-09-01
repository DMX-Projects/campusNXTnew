import React, { useState } from "react";
import { Building, Plus, Edit, Trash2, Search, FileText, Upload, X, Clock } from "lucide-react";
import { motion } from "framer-motion";

// ---------- TYPES ----------
interface Affiliation {
  id: number;
  name: string;
  institution: string;
  type: "University" | "Accreditation" | "Government Council" | "Board";
  code: string;
  grade?: string;
  validFrom: string;
  validTo: string;
  status: "Active" | "Expired" | "Pending Renewal";
  certificate?: string;
}

// ---------- SAMPLE DATA ----------
const sampleAffiliations: Affiliation[] = [
  {
    id: 1,
    name: "AICTE",
    institution: "Tech Institute of India",
    type: "Government Council",
    code: "AICTE-2021-789",
    grade: "-",
    validFrom: "2021-07-01",
    validTo: "2026-06-30",
    status: "Active",
    certificate: "https://via.placeholder.com/300x200.png?text=AICTE+Certificate",
  },
  {
    id: 2,
    name: "NAAC",
    institution: "Tech Institute of India",
    type: "Accreditation",
    code: "NAAC-2020-567",
    grade: "A++",
    validFrom: "2020-01-01",
    validTo: "2025-10-15", // near expiry
    status: "Pending Renewal",
    certificate: "https://via.placeholder.com/300x200.png?text=NAAC+Certificate",
  },
];

// ---------- HELPER ----------
function daysLeft(validTo: string) {
  const expiryDate = new Date(validTo);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ---------- COMPONENT ----------
export const AffiliationsManager: React.FC = () => {
  const [affiliations, setAffiliations] = useState<Affiliation[]>(sampleAffiliations);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Affiliation | null>(null);
  const [formData, setFormData] = useState<Omit<Affiliation, "id">>({
    name: "",
    institution: "",
    type: "University",
    code: "",
    grade: "",
    validFrom: "",
    validTo: "",
    status: "Active",
    certificate: "",
  });

  // ---------- FILTER ----------
  const filteredAffiliations = affiliations.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || a.type === filterType;
    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // ---------- HANDLERS ----------
  const handleOpenModal = (aff?: Affiliation) => {
    if (aff) {
      setEditing(aff);
      setFormData({ ...aff });
    } else {
      setEditing(null);
      setFormData({
        name: "",
        institution: "",
        type: "University",
        code: "",
        grade: "",
        validFrom: "",
        validTo: "",
        status: "Active",
        certificate: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setAffiliations((prev) =>
        prev.map((a) => (a.id === editing.id ? { ...a, ...formData } : a))
      );
    } else {
      const newAff: Affiliation = { id: Date.now(), ...formData };
      setAffiliations((prev) => [...prev, newAff]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this affiliation?")) {
      setAffiliations((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Building className="w-6 h-6" />
          Affiliations Management
        </motion.h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow"
        >
          <Plus className="w-5 h-5" /> Add Affiliation
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search affiliations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option>All</option>
          <option>University</option>
          <option>Accreditation</option>
          <option>Government Council</option>
          <option>Board</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option>All</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Pending Renewal</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAffiliations.map((a) => {
          const days = daysLeft(a.validTo);
          const isExpiringSoon = days > 0 && days <= 90;
          const isExpired = days <= 0;

          return (
            <motion.div
              key={a.id}
              className="rounded-xl p-5 border dark:border-gray-700 bg-white dark:bg-gray-900 shadow hover:shadow-lg flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {a.name} ({a.type})
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{a.institution}</p>
                <p className="text-sm mt-1">Code: {a.code}</p>
                {a.grade && (
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Grade: {a.grade}
                  </p>
                )}
                <p className="text-sm">
                  Valid: {a.validFrom} → {a.validTo}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded-lg ${
                    a.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : a.status === "Pending Renewal"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                      : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                  }`}
                >
                  {a.status}
                </span>

                {/* Renewal Reminder */}
                {isExpired ? (
                  <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-xs">
                    <Clock className="w-4 h-4" /> Expired ({Math.abs(days)} days ago)
                  </div>
                ) : isExpiringSoon ? (
                  <div className="flex items-center gap-2 mt-2 text-yellow-600 dark:text-yellow-400 text-xs">
                    <Clock className="w-4 h-4" /> Renewal due in {days} days
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-2 text-green-600 dark:text-green-400 text-xs">
                    <Clock className="w-4 h-4" /> Valid ({days} days left)
                  </div>
                )}

                {/* Certificate Preview */}
                {a.certificate && (
                  <img
                    src={a.certificate}
                    alt={`${a.name} Certificate`}
                    className="mt-3 w-full h-32 object-cover rounded-lg border dark:border-gray-700"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleOpenModal(a)}
                  className="p-2 rounded-lg bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-white hover:bg-primary-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-700 text-red-700 dark:text-white hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
       {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">
              {editing ? "Edit Affiliation" : "Add Affiliation"}
            </h2>

            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Affiliation Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
              />
              <input
                type="text"
                placeholder="Institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
              >
                <option>University</option>
                <option>Accreditation</option>
                <option>Government Council</option>
                <option>Board</option>
              </select>
              <input
                type="text"
                placeholder="Affiliation Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
              />
              <input
                type="text"
                placeholder="Grade (if any, e.g. A++)"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
              />
              <div className="flex gap-3">
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
                />
                <input
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
                />
              </div>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-3 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-200"
              >
                <option>Active</option>
                <option>Expired</option>
                <option>Pending Renewal</option>
              </select>

              {/* File Upload */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 dark:text-gray-200">
                  <Upload className="w-4 h-4" />
                  Upload Certificate
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certificate: e.target.files?.[0]
                          ? URL.createObjectURL(e.target.files[0])
                          : "",
                      })
                    }
                    hidden
                  />
                </label>
                {formData.certificate && (
                  <FileText className="w-5 h-5 text-primary-500" />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border dark:border-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white"
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


