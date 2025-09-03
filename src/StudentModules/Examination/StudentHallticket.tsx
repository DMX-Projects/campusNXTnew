import React, { useState } from "react";
import { Printer, Eye, X } from "lucide-react";

type AdmitCardInfo = {
  examType: "Midterm" | "Semester";
  name: string;
  rollNo: string;
  branch: string;
  semester: number;
  academicYear: string;
  examDate: string;
  timings: string;
  venue?: string;
  mode: "Online" | "Offline";
  subjects: { code: string; name: string }[];
  instructions: string[];
};

const sampleAdmitCards: AdmitCardInfo[] = [
  {
    examType: "Midterm",
    name: "Sanjay Kumar",
    rollNo: "CSE2025001",
    branch: "Computer Science Engineering",
    semester: 3,
    academicYear: "2025-26",
    examDate: "2025-09-15",
    timings: "10:00 AM - 12:00 PM",
    venue: "Room 101, Block A",
    mode: "Offline",
    subjects: [
      { code: "CS201", name: "Data Structures" },
      { code: "CS202", name: "Computer Networks" },
      { code: "CS203", name: "Operating Systems" },
    ],
    instructions: [
      "Carry a valid photo ID along with this admit card.",
      "Mobile phones and electronic devices are not allowed.",
      "Reach exam venue 30 minutes early.",
      "Follow COVID-19 SOPs.",
    ],
  },
  {
    examType: "Semester",
    name: "Sanjay Kumar",
    rollNo: "CSE2025001",
    branch: "Computer Science Engineering",
    semester: 3,
    academicYear: "2025-26",
    examDate: "2025-12-20",
    timings: "9:00 AM - 12:00 PM",
    venue: "Room 201, Block B",
    mode: "Offline",
    subjects: [
      { code: "CS301", name: "Database Management" },
      { code: "CS302", name: "Algorithms" },
      { code: "CS303", name: "Software Engineering" },
    ],
    instructions: [
      "Bring your student ID card.",
      "No calculators allowed.",
      "Check seating chart at venue entrance.",
      "Maintain silence during exam.",
    ],
  },
];

export default function AdmitCardsPage() {
  const [selectedExamType, setSelectedExamType] = useState<"Midterm" | "Semester">("Midterm");
  const [showModal, setShowModal] = useState(false);

  const selectedCard = sampleAdmitCards.find((card) => card.examType === selectedExamType)!;

  const handleDownload = () => {
    // Open PDF in new tab
    window.open(selectedCard.examType === "Midterm" ?
      "https://example.com/admitcards/CSE_Midterm_2025.pdf" :
      "https://example.com/admitcards/CSE_Semester_2025.pdf", "_blank", "noopener,noreferrer");
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow space-y-8 font-sans">

      {/* Exam Selector */}
      <section>
        <label htmlFor="exam-type" className="block mb-2 font-semibold text-gray-800">
          Select Exam:
        </label>
        <select
          id="exam-type"
          name="exam-type"
          aria-label="Select exam type"
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setSelectedExamType(e.target.value as "Midterm" | "Semester");
            setShowModal(false);
          }}
          value={selectedExamType}
        >
          {sampleAdmitCards.map((card) => (
            <option key={card.examType} value={card.examType}>
              {card.examType} Exam
            </option>
          ))}
        </select>
      </section>

      {/* Buttons */}
      <section className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View Admit Card"
        >
          <Eye className="w-5 h-5" />
          <span>View Admit Card</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Download Admit Card PDF"
        >
          <Printer className="w-5 h-5" />
          <span>Download Admit Card</span>
        </button>
      </section>

      {/* Instructions */}
      <section>
        <Details instructions={selectedCard.instructions} />
      </section>

      {/* Popup Modal with Admit Card Info */}
      {showModal && (
        <Modal onClose={closeModal} title={`${selectedCard.examType} Exam Admit Card`}>
          <div className="space-y-4 p-4 text-gray-800 font-medium">
            <div>
              <span className="font-semibold">Name:</span> {selectedCard.name}
            </div>
            <div>
              <span className="font-semibold">Roll Number:</span> {selectedCard.rollNo}
            </div>
            <div>
              <span className="font-semibold">Branch:</span> {selectedCard.branch}
            </div>
            <div>
              <span className="font-semibold">Semester:</span> {selectedCard.semester}
            </div>
            <div>
              <span className="font-semibold">Academic Year:</span> {selectedCard.academicYear}
            </div>
            <div>
              <span className="font-semibold">Exam Date:</span> {new Date(selectedCard.examDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Timings:</span> {selectedCard.timings}
            </div>
            {selectedCard.mode === "Offline" && (
              <div>
                <span className="font-semibold">Venue:</span> {selectedCard.venue}
              </div>
            )}
            <div>
              <span className="font-semibold">Mode:</span> {selectedCard.mode}
            </div>
            <div>
              <span className="font-semibold">Subjects:</span>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {selectedCard.subjects.map(({ code, name }) => (
                  <li key={code}>
                    {code} - {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

function Details({ instructions }: { instructions: string[] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border border-gray-300 rounded-md bg-gray-50 p-4">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center font-semibold text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <span>Exam Day Instructions & Policies</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2 max-h-52 overflow-auto">
          {instructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

type ModalProps = {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

function Modal({ onClose, title, children }: ModalProps) {
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative bg-white rounded-md shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
