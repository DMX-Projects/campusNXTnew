import React, { useEffect, useState } from "react";
import { FileText, Edit, Send, ArrowDownToLine } from "lucide-react";

type Student = {
  id: number;
  name: string;
  rollNumber: string;
  admissionNumber: string;
  studentId: string;
  registrationNumber: string;
  academicYear: string;
  program: string;
  batch: string;
  course: string;
  branch: string;
  semester: string;
  specialization: string;
  section: string;
  courseDuration: string;
  corrAddress: string;
  corrCity: string;
  corrState: string;
  corrPincode: string;
  corrCountry: string;
  corrLandmark: string;
  permAddress: string;
  permCity: string;
  permState: string;
  permPincode: string;
  permCountry: string;
  permLandmark: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  caste: string;
  category: string;
  aadharNumber: string;
  panNumber: string;
  passportNumber: string;
  maritalStatus: string;
  phoneNumber: string;
  alternatePhone: string;
  email: string;
  alternateEmail: string;
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  fatherEmail: string;
  fatherIncome: string;
  fatherEducation: string;
  fatherOrganization: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  motherEmail: string;
  motherIncome: string;
  motherEducation: string;
  motherOrganization: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress: string;
  guardianOccupation: string;
  isGuardianRequired: boolean;
  previousSchool: string;
  previousBoard: string;
  previousPercentage: string;
  previousYear: string;
  previousGrade: string;
  previousRollNumber: string;
  tcNumber: string;
  migrationNumber: string;
  educationRecords: Array<EducationRecord>;
};

type EducationRecord = {
  id: number;
  instituteName: string;
  boardUni: string;
  year: string;
  month: string;
  obtained: string;
  maximum: string;
  percentage: string;
  grade: string;
  attempt: string;
};

type Ticket = {
  id: number;
  field: string;
  description: string;
  status: "Pending" | "Resolved" | "Rejected";
  createdAt: string;
  updatedAt: string;
};

const StudentProfile: React.FC = () => {
  // You would provide this based on the logged-in user's session
  const [student, setStudent] = useState<Student | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mocked field list for ticket raising
  const editableFields = [
    { name: "Phone Number", key: "phoneNumber" },
    { name: "Email", key: "email" },
    { name: "Address", key: "corrAddress" },
    { name: "Father Name", key: "fatherName" },
    // ... add more fields as necessary
  ];

  useEffect(() => {
    // Fetch student and tickets from API
    async function fetchData() {
      // Replace with actual API calls
      // const studentRes = await fetch("/api/student/me");
      // setStudent(await studentRes.json());
      // const ticketsRes = await fetch("/api/tickets/my");
      // setTickets(await ticketsRes.json());

      // MOCK DATA for demo
      setStudent({
        id: 1,
        name: "PRIYA SHARMA",
        rollNumber: "SC004",
        admissionNumber: "A10002",
        studentId: "STU1012",
        registrationNumber: "REG123",
        academicYear: "2024-25",
        program: "XI Science",
        batch: "2024",
        course: "Physics, Chemistry, Maths",
        branch: "cse",
        semester: "1",
        specialization: "Robotics",
        section: "A",
        courseDuration: "2 Years",
        corrAddress: "32 Dream Lane",
        corrCity: "Pune",
        corrState: "Maharashtra",
        corrPincode: "411001",
        corrCountry: "India",
        corrLandmark: "Near Park",
        permAddress: "32 Dream Lane",
        permCity: "Pune",
        permState: "Maharashtra",
        permPincode: "411001",
        permCountry: "India",
        permLandmark: "Near Park",
        dateOfBirth: "2008-04-21",
        gender: "Female",
        bloodGroup: "B+",
        nationality: "Indian",
        religion: "Hindu",
        caste: "OPEN",
        category: "General",
        aadharNumber: "123456789012",
        panNumber: "",
        passportNumber: "",
        maritalStatus: "Single",
        phoneNumber: "8765432109",
        alternatePhone: "",
        email: "priya.sharma@email.com",
        alternateEmail: "",
        fatherName: "Ramesh Sharma",
        fatherOccupation: "Government Employee",
        fatherPhone: "8585858585",
        fatherEmail: "",
        fatherIncome: "850000",
        fatherEducation: "Graduate",
        fatherOrganization: "PWD",
        motherName: "Sangeeta Sharma",
        motherOccupation: "Teacher",
        motherPhone: "8585845845",
        motherEmail: "",
        motherIncome: "500000",
        motherEducation: "Graduate",
        motherOrganization: "XYZ School",
        guardianName: "",
        guardianRelation: "",
        guardianPhone: "",
        guardianEmail: "",
        guardianAddress: "",
        guardianOccupation: "",
        isGuardianRequired: false,
        previousSchool: "Sunshine High School",
        previousBoard: "MSBSHSE",
        previousPercentage: "93",
        previousYear: "2023",
        previousGrade: "A",
        previousRollNumber: "XII34567",
        tcNumber: "TC123",
        migrationNumber: "",
        educationRecords: [
          {
            id: 1,
            instituteName: "Sunshine High School",
            boardUni: "MSBSHSE",
            year: "2023",
            month: "March",
            obtained: "559",
            maximum: "600",
            percentage: "93",
            grade: "A",
            attempt: "1"
          }
        ]
      });
      setTickets([
        {
          id: 19,
          field: "phoneNumber",
          description: "Please update my phone number to 98123...",
          status: "Pending",
          createdAt: "2025-08-25",
          updatedAt: "2025-08-25"
        },
        {
          id: 18,
          field: "email",
          description: "My email was incorrectly entered.",
          status: "Resolved",
          createdAt: "2025-07-18",
          updatedAt: "2025-07-20"
        }
      ]);
    }
    fetchData();
  }, []);

  // Function to submit ticket request
  const submitTicket = async () => {
    if (!selectedField || !requestDescription) return;
    setIsSubmitting(true);
    // await fetch("/api/tickets/raise", {...})
    // For demo, append locally
    setTickets([
      {
        id: Math.floor(Math.random() * 10000),
        field: selectedField,
        description: requestDescription,
        status: "Pending",
        createdAt: new Date().toISOString().substr(0, 10),
        updatedAt: new Date().toISOString().substr(0, 10)
      },
      ...tickets
    ]);
    setShowRequestModal(false);
    setSelectedField("");
    setRequestDescription("");
    setIsSubmitting(false);
  };

  // Mock: PDF button handler
  const handleGeneratePDF = () => {
    // Would make request to API or trigger JS PDF library.
    alert("PDF generation coming soon!");
  };

  if (!student) return <div className="p-12 text-xl text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className=" mx-auto bg-white rounded-xl shadow-md p-8 border">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Student Profile</h2>
            <div className="text-gray-500 mt-1 text-sm">Academic Year: {student.academicYear}</div>
          </div>
          <div className="flex gap-4">
            <button
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-3"
              onClick={handleGeneratePDF}
            >
              <FileText className="w-5 h-5" />
              Generate PDF
            </button>
            <button
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-3"
              onClick={() => setShowRequestModal(true)}
            >
              <Edit className="w-5 h-5" />
              Raise Change Request
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Basic Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            <Field label="Full Name" value={student.name} />
            <Field label="Roll Number" value={student.rollNumber} />
            <Field label="Admission Number" value={student.admissionNumber} />
            <Field label="Student ID" value={student.studentId} />
            <Field label="Program" value={student.program} />
            <Field label="Batch" value={student.batch} />
            <Field label="Registration Number" value={student.registrationNumber} />
            <Field label="Course" value={student.course} />
            <Field label="Branch" value={student.branch} />
            <Field label="Semester" value={student.semester} />
            <Field label="Section" value={student.section} />
            <Field label="Specialization" value={student.specialization} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact & Personal Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            <Field label="Mobile" value={student.phoneNumber} />
            <Field label="Email" value={student.email} />
            <Field label="Gender" value={student.gender} />
            <Field label="DOB" value={student.dateOfBirth} />
            <Field label="Blood Group" value={student.bloodGroup} />
            <Field label="Category" value={student.category} />
            <Field label="Caste" value={student.caste} />
            <Field label="Nationality" value={student.nationality} />
            <Field label="Religion" value={student.religion} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Correspondence Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            <Field label="Address" value={student.corrAddress} />
            <Field label="City" value={student.corrCity} />
            <Field label="State" value={student.corrState} />
            <Field label="Pincode" value={student.corrPincode} />
            <Field label="Country" value={student.corrCountry} />
            <Field label="Landmark" value={student.corrLandmark} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Father's Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            <Field label="Father Name" value={student.fatherName} />
            <Field label="Occupation" value={student.fatherOccupation} />
            <Field label="Phone" value={student.fatherPhone} />
            <Field label="Education" value={student.fatherEducation} />
            <Field label="Income" value={student.fatherIncome} />
            <Field label="Organization" value={student.fatherOrganization} />
          </div>
        </div>

        {student.motherName && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Mother's Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
              <Field label="Mother Name" value={student.motherName} />
              <Field label="Occupation" value={student.motherOccupation} />
              <Field label="Phone" value={student.motherPhone} />
              <Field label="Education" value={student.motherEducation} />
              <Field label="Income" value={student.motherIncome} />
              <Field label="Organization" value={student.motherOrganization} />
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Previous Academic Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            <Field label="School/College" value={student.previousSchool} />
            <Field label="Board" value={student.previousBoard} />
            <Field label="Year" value={student.previousYear} />
            <Field label="Percentage" value={student.previousPercentage} />
            <Field label="Grade" value={student.previousGrade} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Educational Records</h3>
          {student.educationRecords.length === 0 ? (
            <div className="text-gray-400">No records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-xs font-semibold">Institute</th>
                    <th className="px-3 py-2 text-xs font-semibold">Board/Uni.</th>
                    <th className="px-3 py-2 text-xs font-semibold">Year</th>
                    <th className="px-3 py-2 text-xs font-semibold">Month</th>
                    <th className="px-3 py-2 text-xs font-semibold">Obtained</th>
                    <th className="px-3 py-2 text-xs font-semibold">Max</th>
                    <th className="px-3 py-2 text-xs font-semibold">Percentage</th>
                    <th className="px-3 py-2 text-xs font-semibold">Grade</th>
                    <th className="px-3 py-2 text-xs font-semibold">Attempt</th>
                  </tr>
                </thead>
                <tbody>
                  {student.educationRecords.map((er) => (
                    <tr key={er.id} className="border-t">
                      <td className="px-3 py-1 text-xs">{er.instituteName}</td>
                      <td className="px-3 py-1 text-xs">{er.boardUni}</td>
                      <td className="px-3 py-1 text-xs">{er.year}</td>
                      <td className="px-3 py-1 text-xs">{er.month}</td>
                      <td className="px-3 py-1 text-xs">{er.obtained}</td>
                      <td className="px-3 py-1 text-xs">{er.maximum}</td>
                      <td className="px-3 py-1 text-xs">{er.percentage}</td>
                      <td className="px-3 py-1 text-xs">{er.grade}</td>
                      <td className="px-3 py-1 text-xs">{er.attempt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Ticketing Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">My Change Requests (Tickets)</h3>
          {tickets.length === 0 ? (
            <div className="text-gray-400">No requests raised.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-xs font-semibold">Request For</th>
                    <th className="px-3 py-2 text-xs font-semibold">Description</th>
                    <th className="px-3 py-2 text-xs font-semibold">Status</th>
                    <th className="px-3 py-2 text-xs font-semibold">Raised On</th>
                    <th className="px-3 py-2 text-xs font-semibold">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((tk) => (
                    <tr key={tk.id} className="border-t">
                      <td className="px-3 py-1 text-xs">{editableFields.find(f => f.key === tk.field)?.name || tk.field}</td>
                      <td className="px-3 py-1 text-xs">{tk.description}</td>
                      <td className="px-3 py-1 text-xs">
                        <span className={
                          tk.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
                            : tk.status === "Resolved"
                            ? "bg-green-100 text-green-700 px-2 py-1 rounded"
                            : "bg-red-100 text-red-700 px-2 py-1 rounded"
                        }>
                          {tk.status}
                        </span>
                      </td>
                      <td className="px-3 py-1 text-xs">{tk.createdAt}</td>
                      <td className="px-3 py-1 text-xs">{tk.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Change Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex gap-2 items-center">
              <Edit className="w-5 h-5" />
              Raise Change Request
            </h3>
            <div className="mb-4">
              <label className="text-gray-700 font-medium block mb-1">Field to Update</label>
              <select
                className="w-full px-4 py-2 border rounded"
                value={selectedField}
                onChange={e => setSelectedField(e.target.value)}
              >
                <option value="">Select Field</option>
                {editableFields.map(field => (
                  <option key={field.key} value={field.key}>{field.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-medium block mb-1">Describe the Change</label>
              <textarea
                className="w-full px-4 py-2 border rounded"
                rows={4}
                value={requestDescription}
                onChange={e => setRequestDescription(e.target.value)}
                placeholder="Why do you need this change? What should be updated?"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-lg"
                onClick={() => setShowRequestModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                disabled={!selectedField || !requestDescription || isSubmitting}
                onClick={submitTicket}
              >
                <Send className="w-4 h-4 inline" /> Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) =>
  value ? (
    <div>
      <div className="text-xs uppercase text-gray-400">{label}</div>
      <div className="font-semibold text-gray-700">{value}</div>
    </div>
  ) : null;

export default StudentProfile;
