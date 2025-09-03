import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const categories = [
  "Exam Timetable",
  "Invigilation Issues",
  "Student Attendance",
  "Exam Evaluation",
  "Marks List",
  "Exam Results",
  "Others",
];

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function FacultyRaiseTicket() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const validateForm = () => {
    return subject.trim() !== "" && category !== "" && description.trim() !== "";
  };

  const handleAttachmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments(e.target.files);
  };

  const resetForm = () => {
    setSubject("");
    setCategory("");
    setPriority("medium");
    setDescription("");
    setAttachments(null);
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

    try {
      // Simulate async ticket submission API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Dummy ticket ID generation
      const ticketId = `FAC-${Math.floor(Math.random() * 1000000)}`;
      setSubmittedTicketId(ticketId);
      resetForm();
    } catch (err) {
      setError("Failed to submit ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md font-sans space-y-8">
      <div className="flex items-center space-x-2 text-indigo-600">
        <AlertCircle className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Raise a Support Ticket</h1>
      </div>

      <p className="text-gray-700">
        Submit your queries or concerns related to examination management.
      </p>

      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded-md">{error}</div>
      )}

      {submittedTicketId && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md">
          Your ticket has been submitted successfully. Your Ticket ID is{" "}
          <strong>{submittedTicketId}</strong>.
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
            disabled={submitting}
            required
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
            disabled={submitting}
            required
          >
            <option value="">-- Select Category --</option>
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
            {priorities.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-gray-700"
          >
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={submitting}
            required
          />
        </div>

        <div>
          <label htmlFor="attachments" className="block mb-1 font-medium text-gray-700">
            Attachments (optional)
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            onChange={(e) => {
              setAttachments(e.target.files);
            }}
            disabled={submitting}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !validateForm()}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {submitting ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </main>
  );
}
