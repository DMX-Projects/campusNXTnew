import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  FileText, ClipboardList, Clock, Info, CheckCircle,
} from "lucide-react";

type CertificateStatus =
  | "Held in College"
  | "Returned to Student"
  | "Request in Process"
  | "Ready for Pickup"
  | "Rejected"
  | "Approved"
  | "Completed";

interface Certificate {
  id: string;
  name: string;
  issueDate: string; // ISO date string
  certificateNumber?: string;
  status: CertificateStatus;
  remarks?: string;
  downloadUrl?: string; // Optional scanned copy or soft copy link
}

type DeliveryMethod = "Self Pick-up" | "Guardian Pick-up" | "Scan" | "Postal Dispatch";

interface CertificateRequest {
  id: string;
  certificateId: string;
  certificateName: string;
  requestedOn: string; // ISO date string
  reason: string;
  startDate: string; // requested duration start
  endDate: string; // requested duration end
  deliveryMethod: DeliveryMethod;
  guardianName?: string;
  guardianIdProofUrl?: string;
  contact: string;
  supportingDocUrl?: string;
  consent: boolean;
  status: CertificateStatus;
  adminRemarks?: string;
}

const MOCK_CERTIFICATES: Certificate[] = [
  { id: "c1", name: "10th Marksheet", issueDate: "2019-05-15", certificateNumber: "XYZ123", status: "Held in College" },
  {
    id: "c2",
    name: "12th Certificate",
    issueDate: "2021-07-10",
    certificateNumber: "ABC789",
    status: "Held in College",
    remarks: "Required for closure",
  },
  {
    id: "c3",
    name: "Transfer Certificate",
    issueDate: "2021-08-01",
    certificateNumber: "TC2021CSE",
    status: "Returned to Student",
    remarks: "Returned: 2024-09-30",
  },
];

const MOCK_REQUESTS: CertificateRequest[] = [
  {
    id: "r1",
    certificateId: "c2",
    certificateName: "12th Certificate",
    requestedOn: "2024-11-05",
    reason: "For Document Verification",
    startDate: "2024-11-06",
    endDate: "2024-11-20",
    deliveryMethod: "Self Pick-up",
    contact: "9876543210",
    consent: true,
    status: "Approved",
    adminRemarks: "Ready. ID proof needed",
  },
  {
    id: "r2",
    certificateId: "c4",
    certificateName: "Migration Certificate",
    requestedOn: "2025-01-15",
    reason: "Higher Studies Application",
    startDate: "2025-01-20",
    endDate: "2025-02-05",
    deliveryMethod: "Scan",
    contact: "9876543210",
    consent: true,
    status: "Request in Process",
  },
];

const formatDateDisplay = (isoDateStr: string): string => {
  const d = new Date(isoDateStr);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const tabs = [
  {
    key: "certificatesList",
    label: "Certificates Held",
    Icon: ClipboardList,
  },
  {
    key: "requestForm",
    label: "Request Certificate",
    Icon: FileText,
  },
  {
    key: "requestsHistory",
    label: "My Requests",
    Icon: Clock,
  },
  {
    key: "instructions",
    label: "Instructions & Policies",
    Icon: Info,
  },
];

export default function MyCertificatesPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [requests, setRequests] = useState<CertificateRequest[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    certificateId: "",
    reason: "",
    startDate: "",
    endDate: "",
    deliveryMethod: "" as DeliveryMethod | "",
    guardianName: "",
    guardianIdProof: null as File | null,
    contact: "",
    supportingDoc: null as File | null,
    consent: false,
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Load data on mount
  useEffect(() => {
    setCertificates(MOCK_CERTIFICATES);
    setRequests(MOCK_REQUESTS);
  }, []);

  const availableForRequest = certificates.filter(
    (cert) => cert.status === "Held in College" || cert.status === "Request in Process"
  );

  // Handlers
  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file,
    }));
  }
  function validateForm() {
    const errors: string[] = [];
    if (!formData.certificateId) errors.push("Please select certificate to request.");
    if (!formData.reason || formData.reason.trim().length < 10)
      errors.push("Please enter a detailed reason (min 10 characters).");
    if (!formData.startDate) errors.push("Please select start date for request.");
    if (!formData.endDate) errors.push("Please select end date for request.");
    else if (formData.endDate < formData.startDate) errors.push("End date cannot be before start date.");
    if (!formData.deliveryMethod) errors.push("Please select delivery method.");
    if (formData.deliveryMethod === "Guardian Pick-up" && !formData.guardianName.trim())
      errors.push("Please enter guardian name for pick-up.");
    if (formData.deliveryMethod === "Guardian Pick-up" && !formData.guardianIdProof)
      errors.push("Please upload guardian ID proof.");
    if (!formData.contact.trim()) errors.push("Please enter your contact number or email.");
    if (!formData.consent) errors.push("You must agree to the consent to proceed.");
    return errors;
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (errors.length > 0) {
      setActiveTab("requestForm");
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      const cert = certificates.find((c) => c.id === formData.certificateId);
      const newRequest: CertificateRequest = {
        id: "r" + Date.now(),
        certificateId: formData.certificateId,
        certificateName: cert?.name || "Unknown Certificate",
        requestedOn: new Date().toISOString(),
        reason: formData.reason,
        startDate: formData.startDate,
        endDate: formData.endDate,
        deliveryMethod: formData.deliveryMethod as DeliveryMethod,
        guardianName: formData.deliveryMethod === "Guardian Pick-up" ? formData.guardianName : undefined,
        guardianIdProofUrl: undefined, // upload to backend
        contact: formData.contact,
        supportingDocUrl: undefined, // upload to backend
        consent: formData.consent,
        status: "Request in Process",
      };
      setRequests((prev) => [newRequest, ...prev]);

      setFormData({
        certificateId: "",
        reason: "",
        startDate: "",
        endDate: "",
        deliveryMethod: "" as DeliveryMethod | "",
        guardianName: "",
        guardianIdProof: null,
        contact: "",
        supportingDoc: null,
        consent: false,
      });
      setFormErrors([]);
      setSubmitting(false);
      setActiveTab("requestsHistory");
      alert("Certificate request submitted successfully.");
    }, 1200);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 ">
      {/* Tabs */}
      <nav
        className="flex flex-wrap gap-2 mb-8 border border-gray-200 rounded-xl bg-white shadow-md"
        aria-label="My Certificates Tabs"
      >
        {tabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            aria-current={activeTab === key ? "page" : undefined}
            className={`flex items-center gap-2 flex-1 sm:flex-none justify-center px-4 py-3 font-medium  transition 
              rounded-xl
              ${
                activeTab === key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }
            `}
            onClick={() => setActiveTab(key)}
          >
            <Icon className={`w-5 h-5 ${activeTab === key ? "text-white" : "text-blue-600"}`} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </nav>

      {/* Tab content */}
      <div>
        {activeTab === "certificatesList" && (
          <CertificatesList certificates={certificates} />
        )}
        {activeTab === "requestForm" && (
          <CertificateRequestForm
            availableForRequest={availableForRequest}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            submitting={submitting}
            onChange={onChange}
            onFileChange={onFileChange}
            onSubmit={onSubmit}
          />
        )}
        {activeTab === "requestsHistory" && <RequestsHistory requests={requests} />}
        {activeTab === "instructions" && <InstructionsPanel />}
      </div>
    </div>
  );
}

function CertificatesList({ certificates }: { certificates: Certificate[] }) {
  if (!certificates.length) {
    return <p className="text-gray-500">No certificates found.</p>;
  }
  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 border-b border-gray-300">Certificate Name</th>
            <th className="py-3 px-4 border-b border-gray-300">Issue Date</th>
            <th className="py-3 px-4 border-b border-gray-300">Certificate Number</th>
            <th className="py-3 px-4 border-b border-gray-300">Status</th>
            <th className="py-3 px-4 border-b border-gray-300">Remarks</th>
            <th className="py-3 px-4 border-b border-gray-300">Download</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b border-gray-200">{cert.name}</td>
              <td className="py-3 px-4 border-b border-gray-200">{formatDateDisplay(cert.issueDate)}</td>
              <td className="py-3 px-4 border-b border-gray-200">{cert.certificateNumber || "--"}</td>
              <td className="py-3 px-4 border-b border-gray-200">{cert.status}</td>
              <td className="py-3 px-4 border-b border-gray-200">{cert.remarks || "--"}</td>
              <td className="py-3 px-4 border-b border-gray-200">
                {cert.downloadUrl ? (
                  <a
                    href={cert.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline"
                  >
                    View
                  </a>
                ) : (
                  "--"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CertificateRequestForm({
  availableForRequest,
  formData,
  setFormData,
  formErrors,
  submitting,
  onChange,
  onFileChange,
  onSubmit,
}: {
  availableForRequest: Certificate[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formErrors: string[];
  submitting: boolean;
  onChange: (e: ChangeEvent<any>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white rounded-md shadow p-6 max-w-3xl"
      aria-label="Certificate Request Form"
    >
      {formErrors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          <ul className="list-disc list-inside space-y-1">
            {formErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <label className="block">
        <span className="text-gray-700 font-semibold">Certificate to Request</span>
        <select
          name="certificateId"
          value={formData.certificateId}
          onChange={onChange}
          required
          className="mt-1 w-full border rounded-md p-2"
        >
          <option value="">Select certificate</option>
          {availableForRequest.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold">Reason for Request</span>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={onChange}
          placeholder="E.g. Required for passport application"
          required
          minLength={10}
          className="mt-1 w-full border rounded-md p-2"
          rows={3}
          aria-describedby="reasonHelp"
        />
        <small id="reasonHelp" className="text-gray-400">
          Minimum 10 characters
        </small>
      </label>

      <div className="flex gap-4 flex-wrap">
        <label className="flex-1 min-w-[150px]">
          <span className="text-gray-700 font-semibold">Start Date Needed</span>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            required
            className="mt-1 w-full border rounded-md p-2"
          />
        </label>
        <label className="flex-1 min-w-[150px]">
          <span className="text-gray-700 font-semibold">End Date Needed</span>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            required
            className="mt-1 w-full border rounded-md p-2"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-gray-700 font-semibold">Delivery Method</span>
        <select
          name="deliveryMethod"
          value={formData.deliveryMethod}
          onChange={onChange}
          required
          className="mt-1 w-full border rounded-md p-2"
        >
          <option value="">Select a method</option>
          <option value="Self Pick-up">Self Pick-up</option>
          <option value="Guardian Pick-up">Guardian Pick-up</option>
          <option value="Scan">Scan (if permissible)</option>
          <option value="Postal Dispatch">Postal Dispatch</option>
        </select>
      </label>

      {formData.deliveryMethod === "Guardian Pick-up" && (
        <>
          <label className="block">
            <span className="text-gray-700 font-semibold">Guardian Name</span>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={onChange}
              required={formData.deliveryMethod === "Guardian Pick-up"}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Guardian full name"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Guardian ID Proof</span>
            <input
              type="file"
              name="guardianIdProof"
              onChange={onFileChange}
              required={formData.deliveryMethod === "Guardian Pick-up"}
              className="mt-1 w-full"
            />
          </label>
        </>
      )}

      <label className="block">
        <span className="text-gray-700 font-semibold">Contact Number/Email</span>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={onChange}
          required
          className="mt-1 w-full border rounded-md p-2"
          placeholder="Phone or email for contact"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold">Upload Supporting Document (optional)</span>
        <input type="file" name="supportingDoc" onChange={onFileChange} className="mt-1 w-full" />
      </label>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={onChange}
          required
          aria-required="true"
        />
        <span className="text-gray-700 text-sm">
          I agree to promptly return the certificate within the stipulated time or upon request.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-4 px-6 py-3 rounded-md shadow text-white font-semibold ${
          submitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-800"
        }`}
      >
        {submitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}

function RequestsHistory({ requests }: { requests: CertificateRequest[] }) {
  if (!requests.length) {
    return <p className="text-gray-500">You have no certificate requests.</p>;
  }
  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 border-b border-gray-300">Certificate</th>
            <th className="py-3 px-4 border-b border-gray-300">Requested On</th>
            <th className="py-3 px-4 border-b border-gray-300">Reason</th>
            <th className="py-3 px-4 border-b border-gray-300">Duration</th>
            <th className="py-3 px-4 border-b border-gray-300">Delivery Method</th>
            <th className="py-3 px-4 border-b border-gray-300">Status</th>
            <th className="py-3 px-4 border-b border-gray-300">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b border-gray-200">{req.certificateName}</td>
              <td className="py-3 px-4 border-b border-gray-200">{formatDateDisplay(req.requestedOn)}</td>
              <td className="py-3 px-4 border-b border-gray-200">{req.reason}</td>
              <td className="py-3 px-4 border-b border-gray-200">
                {formatDateDisplay(req.startDate)} to {formatDateDisplay(req.endDate)}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">{req.deliveryMethod}</td>
              <td className="py-3 px-4 border-b border-gray-200">{req.status}</td>
              <td className="py-3 px-4 border-b border-gray-200">{req.adminRemarks || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InstructionsPanel() {
  return (
    <div className="bg-blue-50 p-6 rounded-md text-blue-900 max-w-3xl mx-auto leading-relaxed shadow-sm">
      <h3 className="text-lg font-bold mb-3">Certificate Return & Request Policies</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Students cannot claim original certificates while under active enrollment without formal requests.</li>
        <li>Requests must contain valid reasons and expected usage duration.</li>
        <li>Guardian pick-up requires valid ID proof upload and prior approvals.</li>
        <li>Scan or postal dispatch option may be limited to certain certificate types by administration.</li>
        <li>Delays in returning certificates beyond approved duration may lead to institutional penalties.</li>
        <li>Students must regularly check status via this portal or official communication.</li>
        <li>All requests are subject to administrative approval within 7 working days.</li>
      </ul>
    </div>
  );
}
