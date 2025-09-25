import React, { useState } from "react";

// Mock Data
const candidates = [
  { id: 1, name: "John Doe", course: "B.Sc", admission: "Regular", admissionNo: "A1001", feePaid: true, verified: true },
  { id: 2, name: "Jane Smith", course: "B.Com", admission: "Lateral Entry", admissionNo: "A1002", feePaid: true, verified: true },
  { id: 3, name: "Sam Lee", course: "B.Tech", admission: "Regular", admissionNo: "A1003", feePaid: true, verified: true }
];

const courses = ["B.Sc", "B.Com", "B.Tech"];
const admissionTypes = ["Regular", "Lateral Entry"];

const AllotmentOrderGeneration: React.FC = () => {
  const [filterCourse, setFilterCourse] = useState("");
  const [filterAdmission, setFilterAdmission] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? filteredCandidates.map((c) => c.id) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelected(prev => checked ? [...prev, id] : prev.filter(s => s !== id));
  };
const handleDownload = async (selectedCandidates) => {
  // Replace this with your PDF URL or obtain dynamically
  const pdfUrl = selectedCandidates[0].pdfUrl; // adjust for your data structure
  const response = await fetch(pdfUrl);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = 'SelectedCandidate.pdf'; // Change the filename as needed
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url); // Clean-up
};
const handleSendToCandidate = (selectedCandidates) => {
   alert(`Sending allotment letters to: ${selectedCandidates.map(c => c.name).join(", ")}`);
  alert('Email sent successfully!');
  // Implement actual email sending logic here
}
  const filteredCandidates = candidates.filter(c =>
    (filterCourse ? c.course === filterCourse : true) &&
    (filterAdmission ? c.admission === filterAdmission : true) &&
    (search ? c.name.toLowerCase().includes(search.toLowerCase()) : true)
  );

  const selectedCandidates = candidates.filter(c => selected.includes(c.id));

  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <div className="bg-gradient-to-tr from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center p-4 py-10 min-h-screen">
        
        {/* Container */}
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-colors">
          {/* Header with Theme Toggle */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300">
              Allotment Order Generation
            </h2>
          </div>

          {/* Filter and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-7">
            <input
              type="text"
              placeholder="Search by name..."
              className="border rounded-md p-2 flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={filterAdmission}
              onChange={(e) => setFilterAdmission(e.target.value)}
            >
              <option value="">All Admission Types</option>
              {admissionTypes.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border dark:border-gray-600">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-50 text-blue-800 dark:bg-gray-700 dark:text-gray-200">
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={filteredCandidates.length > 0 && selected.length === filteredCandidates.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Admission Type</th>
                  <th className="p-3 text-left">Admission No.</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map(c => (
                  <tr key={c.id} className="hover:bg-teal-50 dark:hover:bg-gray-700">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(c.id)}
                        onChange={(e) => handleSelect(c.id, e.target.checked)}
                      />
                    </td>
                    <td className="p-3 dark:text-gray-200">{c.name}</td>
                    <td className="p-3 dark:text-gray-200">{c.course}</td>
                    <td className="p-3 dark:text-gray-200">{c.admission}</td>
                    <td className="p-3 dark:text-gray-200">{c.admissionNo}</td>
                  </tr>
                ))}
                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-6 text-gray-400 dark:text-gray-500">
                      No candidates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
            <div className="text-gray-500 text-sm dark:text-gray-400">
              {selected.length} candidate(s) selected
            </div>
            <button
              className={`px-8 py-3 rounded-lg text-lg font-bold shadow hover:scale-105 transition-all ${
                selected.length > 0
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:bg-green-600"
                  : "bg-gray-400 text-gray-100 cursor-not-allowed"
              }`}
              disabled={selected.length === 0}
              onClick={() => setShowPreview(true)}
            >
              Generate Order
            </button>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl relative transition-colors">
              <button className="absolute right-3 top-3 text-gray-500 dark:text-gray-300" onClick={() => setShowPreview(false)}>✕</button>
              <h3 className="text-xl font-semibold mb-4 text-teal-700 dark:text-teal-300">Allotment Letter Preview</h3>
              {selectedCandidates.map(candidate => (
                <div key={candidate.id} className="mb-5 border rounded p-3 shadow dark:border-gray-600">
                  <div className="dark:text-gray-200"><b>Name:</b> {candidate.name}</div>
                  <div className="dark:text-gray-200"><b>Course:</b> {candidate.course}</div>
                  <div className="dark:text-gray-200"><b>Admission No.:</b> {candidate.admissionNo}</div>
                  <div className="dark:text-gray-200"><b>Admission Type:</b> {candidate.admission}</div>
                  <hr className="my-2 dark:border-gray-600" />
                  <p className="dark:text-gray-300">
                    <span className="text-gray-600 dark:text-gray-400">Dear</span> <b>{candidate.name}</b>,
                    <br />
                    Congratulations! You have been admitted to <b>{candidate.course}</b> under <b>{candidate.admission}</b> (Admission No. <b>{candidate.admissionNo}</b>).
                  </p>
                </div>
              ))}
              <div className="flex gap-3 justify-end mt-6">
               <button onClick={() => handleDownload(selectedCandidates)} className="py-2 px-5 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all">
                  Download PDF(s)
                </button>
                <button onClick={() => handleSendToCandidate(selectedCandidates)} className="py-2 px-5 rounded bg-green-500 hover:bg-green-600 text-white font-bold transition-all">
                  Send to Candidate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllotmentOrderGeneration;
