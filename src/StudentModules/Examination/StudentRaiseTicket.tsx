import React, { useState } from "react";

const categories = [
  "Exam Schedule",
  "Hall Ticket",
  "Results",
  "Attendance",
  "Others",
];

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function RaiseTicketForm() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    return subject.trim() !== "" && category !== "" && description.trim() !== "";
  };

  const resetForm = () => {
    setSubject("");
    setCategory("");
    setPriority("medium");
    setDescription("");
    setAttachments(null);
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      resetForm();
    }, 1500);
  };

  const handleAttachmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments(e.target.files);
  };

  return (
    <main className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md font-sans">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">Raise a Ticket / Support</h1>
      <p className="mb-6 text-gray-700">Submit your query or issue related to examinations.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
      )}

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Your ticket has been submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-gray-700">
            Category <span className="text-red-600">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={submitting}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block mb-1 font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={submitting}
          >
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="attachments" className="block mb-1 font-medium text-gray-700">
            Attachments (optional)
          </label>
          <input
            type="file"
            id="attachments"
            onChange={handleAttachmentsChange}
            multiple
            disabled={submitting}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          aria-busy={submitting}
        >
          {submitting ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </main>
  );
}
