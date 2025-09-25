import React, { useState } from "react";

const steps = [
  { label: "Admission Form" },
  { label: "Upload Documents" },
  { label: "Review & Submit" },
];

const programs = ["B.Tech", "M.Tech"];
const departments = ["CSE", "CSE-AI", "Civil", "ECE", "Mechanical", "Electrical"];
const categories = ["OC", "BC", "SC", "ST", "Minority", "Other"];
const docs = [
  { key: "doc10", label: "10th Certificate" },
  { key: "doc12", label: "12th Certificate" },
  { key: "docTC", label: "Transfer Certificate" },
  { key: "docID", label: "ID Proof (Aadhar/Passport)" },
  { key: "docPhoto", label: "Recent Photograph" },
];

export default function AdmissionForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", dob: "", gender: "",
    phone: "", parentName: "", address: "",
    category: "", program: "", department: ""
  });
  const [files, setFiles] = useState({});
  const [toast, setToast] = useState("");
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0] });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setToast("Form submitted successfully!");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-16 bg-white dark:bg-black rounded-xl shadow-xl font-sans min-h-[90vh]">
      {/* Progress Bar */}
      <div className="flex items-center mb-10 space-x-8 justify-center">
        {steps.map((s, idx) => (
          <div key={s.label} className="flex flex-col items-center w-44">
            <div className={`h-10 w-10 flex items-center justify-center rounded-full text-white
                ${step === idx
                  ? "bg-primary-500"
                  : step > idx
                  ? "bg-secondary-500"
                  : "bg-accent-200 dark:bg-accent-900"
                }`}
            >
              {idx + 1}
            </div>
            <span className="mt-2 text-base font-medium text-gray-700 dark:text-gray-100">{s.label}</span>
          </div>
        ))}
      </div>
      {/* Form Steps */}
      <form onSubmit={handleSubmit}>
        {/* Step 1 */}
        {step === 0 && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 animate-fade-in">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            />
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              required
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
              placeholder="Date of Birth"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            >
              <option value="" disabled>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Mobile Number"
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            />
            <input
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              required
              placeholder="Parent/Guardian Name"
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            >
              <option value="" disabled>Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Residential Address"
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            />
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              required
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            >
              <option value="" disabled>Choose Program</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="col-span-1 p-3 border rounded bg-accent-50 dark:bg-secondary-800 text-gray-800 dark:text-gray-200"
            >
              <option value="" disabled>Choose Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}
        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            {docs.map((doc) => (
              <div key={doc.key} className="flex items-center space-x-4">
                <label className="w-64 text-md font-medium text-gray-700 dark:text-gray-200">{doc.label}:</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleFile(e, doc.key)}
                  className="block w-full file:bg-primary-100 dark:file:bg-secondary-700 file:text-primary-700 dark:file:text-secondary-100 text-gray-700 dark:text-gray-200"
                />
                {files[doc.key] && (
                  <span className="ml-2 px-3 py-1 rounded bg-secondary-100 dark:bg-secondary-800 text-xs font-medium text-secondary-800 dark:text-secondary-100">
                    {files[doc.key]?.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Step 3 */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="font-semibold text-primary-600 dark:text-primary-200 text-xl mb-2">Review Details</h3>
            <div className="space-y-1 text-lg">
              <div><span className="font-medium">Name:</span> {form.name}</div>
              <div><span className="font-medium">DOB:</span> {form.dob}</div>
              <div><span className="font-medium">Gender:</span> {form.gender}</div>
              <div><span className="font-medium">Parent/Guardian:</span> {form.parentName}</div>
              <div><span className="font-medium">Mobile:</span> {form.phone}</div>
              <div><span className="font-medium">Email:</span> {form.email}</div>
              <div><span className="font-medium">Address:</span> {form.address}</div>
              <div><span className="font-medium">Category:</span> {form.category}</div>
              <div><span className="font-medium">Program:</span> {form.program}</div>
              <div><span className="font-medium">Department:</span> {form.department}</div>
              <div className="font-medium mt-2">Documents:</div>
              <ul className="ml-6 list-disc">
                {docs.map(doc => (
                  <li key={doc.key}>
                    {doc.label}: {files[doc.key]?.name || <span className="text-red-500">Not uploaded</span>}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-3 rounded bg-primary-600 hover:bg-primary-700 text-white font-semibold transition"
            >
              Submit Application
            </button>
          </div>
        )}
      </form>
      {/* Controls */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className={`px-6 py-2 rounded font-medium bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100 border transition ${step === 0 && "opacity-50 cursor-not-allowed"}`}
        >
          Back
        </button>
        {step < steps.length - 1 && (
          <button
            onClick={next}
            className="px-6 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white font-semibold transition"
          >
            Next
          </button>
        )}
      </div>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-accent-500 text-white py-2 px-6 rounded shadow-xl animate-fade-in z-50 font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}
