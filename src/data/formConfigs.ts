import { FormConfig } from '../components/Common/FormComponents';

export const FORM_CONFIGS: { [key: string]: FormConfig } = {
  ADD_STUDENT: {
    title: "Add New Student",
    fields: [
      { name: "studentId", type: "text", label: "Student ID", required: true, pattern: "^[A-Z]{2}[0-9]{7}$", placeholder: "e.g., CS2024001" },
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "email", type: "email", label: "Email Address", required: true },
      { name: "phone", type: "tel", label: "Phone Number", required: true },
      { name: "department", type: "select", label: "Department", options: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"], required: true },
      { name: "year", type: "select", label: "Academic Year", options: [1, 2, 3, 4], required: true },
      { name: "section", type: "select", label: "Section", options: ["A", "B", "C"], required: true },
      { name: "admissionDate", type: "date", label: "Admission Date", required: true },
      { name: "fatherName", type: "text", label: "Father's Name", required: true },
      { name: "motherName", type: "text", label: "Mother's Name", required: true },
      { name: "address", type: "textarea", label: "Address", required: true },
      { name: "bloodGroup", type: "select", label: "Blood Group", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
      { name: "photo", type: "file", label: "Student Photo", accept: "image/*" }
    ]
  },

  ADD_FACULTY: {
    title: "Add New Faculty",
    fields: [
      { name: "employeeId", type: "text", label: "Employee ID", required: true, pattern: "^EMP[0-9]{3}$", placeholder: "e.g., EMP001" },
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "email", type: "email", label: "Email Address", required: true },
      { name: "phone", type: "tel", label: "Phone Number", required: true },
      { name: "department", type: "select", label: "Department", options: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"], required: true },
      { name: "designation", type: "select", label: "Designation", options: ["Assistant Professor", "Associate Professor", "Professor", "Head of Department"], required: true },
      { name: "qualification", type: "text", label: "Highest Qualification", required: true },
      { name: "experience", type: "number", label: "Years of Experience", required: true, min: 0 },
      { name: "joiningDate", type: "date", label: "Joining Date", required: true },
      { name: "salary", type: "number", label: "Monthly Salary", required: true, min: 0 },
      { name: "subjects", type: "text", label: "Subjects Teaching", placeholder: "Comma separated subjects" },
      { name: "address", type: "textarea", label: "Address", required: true },
      { name: "emergencyContact", type: "tel", label: "Emergency Contact", required: true },
      { name: "photo", type: "file", label: "Faculty Photo", accept: "image/*" }
    ]
  },

  ADD_BOOK: {
    title: "Add New Book",
    fields: [
      { name: "isbn", type: "text", label: "ISBN Number", required: true, pattern: "^[0-9-]{10,17}$" },
      { name: "title", type: "text", label: "Book Title", required: true },
      { name: "author", type: "text", label: "Author", required: true },
      { name: "publisher", type: "text", label: "Publisher", required: true },
      { name: "category", type: "select", label: "Category", options: ["Academic", "Reference", "Fiction", "Technical", "Research"], required: true },
      { name: "department", type: "select", label: "Department", options: ["General", "Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"] },
      { name: "edition", type: "text", label: "Edition" },
      { name: "publicationYear", type: "number", label: "Publication Year", required: true, min: 1900, max: new Date().getFullYear() },
      { name: "price", type: "number", label: "Price", required: true, min: 0 },
      { name: "quantity", type: "number", label: "Quantity", required: true, min: 1 },
      { name: "rackNumber", type: "text", label: "Rack Number", required: true },
      { name: "description", type: "textarea", label: "Description" },
      { name: "coverImage", type: "file", label: "Book Cover", accept: "image/*" }
    ]
  },

  ADD_EXAM: {
    title: "Schedule New Exam",
    fields: [
      { name: "examName", type: "text", label: "Exam Name", required: true },
      { name: "examType", type: "select", label: "Exam Type", options: ["Mid-term", "End-term", "Surprise Test", "Lab Test"], required: true },
      { name: "subject", type: "select", label: "Subject", options: ["Data Structures", "Database Systems", "Operating Systems", "Computer Networks"], required: true },
      { name: "department", type: "select", label: "Department", options: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"], required: true },
      { name: "year", type: "select", label: "Academic Year", options: [1, 2, 3, 4], required: true },
      { name: "section", type: "select", label: "Section", options: ["A", "B", "C"], required: true },
      { name: "examDate", type: "date", label: "Exam Date", required: true },
      { name: "startTime", type: "time", label: "Start Time", required: true },
      { name: "duration", type: "number", label: "Duration (minutes)", required: true, min: 30, max: 300 },
      { name: "totalMarks", type: "number", label: "Total Marks", required: true, min: 1 },
      { name: "passingMarks", type: "number", label: "Passing Marks", required: true, min: 1 },
      { name: "venue", type: "text", label: "Exam Venue", required: true },
      { name: "instructions", type: "textarea", label: "Special Instructions" }
    ]
  },

  ADD_ASSIGNMENT: {
    title: "Create New Assignment",
    fields: [
      { name: "title", type: "text", label: "Assignment Title", required: true },
      { name: "subject", type: "select", label: "Subject", options: ["Data Structures", "Database Systems", "Operating Systems", "Computer Networks"], required: true },
      { name: "department", type: "select", label: "Department", options: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"], required: true },
      { name: "year", type: "select", label: "Academic Year", options: [1, 2, 3, 4], required: true },
      { name: "section", type: "select", label: "Section", options: ["A", "B", "C"], required: true },
      { name: "description", type: "textarea", label: "Assignment Description", required: true },
      { name: "dueDate", type: "date", label: "Due Date", required: true },
      { name: "maxMarks", type: "number", label: "Maximum Marks", required: true, min: 1 },
      { name: "submissionType", type: "select", label: "Submission Type", options: ["Online", "Physical", "Both"], required: true },
      { name: "attachments", type: "file", label: "Assignment Files", accept: ".pdf,.doc,.docx" }
    ]
  },

  ADD_FEE_STRUCTURE: {
    title: "Add Fee Structure",
    fields: [
      { name: "feeType", type: "select", label: "Fee Type", options: ["Tuition", "Lab", "Library", "Sports", "Transport", "Hostel"], required: true },
      { name: "department", type: "select", label: "Department", options: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"], required: true },
      { name: "year", type: "select", label: "Academic Year", options: [1, 2, 3, 4], required: true },
      { name: "semester", type: "select", label: "Semester", options: [1, 2], required: true },
      { name: "amount", type: "number", label: "Amount", required: true, min: 0 },
      { name: "dueDate", type: "date", label: "Due Date", required: true },
      { name: "lateFeePenalty", type: "number", label: "Late Fee Penalty", required: true, min: 0 },
      { name: "description", type: "textarea", label: "Description" }
    ]
  },

  ADD_ROUTE: {
    title: "Create Transport Route",
    fields: [
      { name: "routeName", type: "text", label: "Route Name", required: true },
      { name: "routeNumber", type: "text", label: "Route Number", required: true },
      { name: "vehicleNumber", type: "text", label: "Vehicle Number", required: true },
      { name: "driverName", type: "text", label: "Driver Name", required: true },
      { name: "driverPhone", type: "tel", label: "Driver Phone", required: true },
      { name: "capacity", type: "number", label: "Seating Capacity", required: true, min: 1 },
      { name: "morningDeparture", type: "time", label: "Morning Departure", required: true },
      { name: "eveningDeparture", type: "time", label: "Evening Departure", required: true },
      { name: "monthlyFee", type: "number", label: "Monthly Fee", required: true, min: 0 },
      { name: "stops", type: "textarea", label: "Bus Stops", placeholder: "Enter stops separated by commas", required: true }
    ]
  },

  BOOK_ISSUE: {
    title: "Issue Book",
    fields: [
      { name: "userId", type: "text", label: "Student/Faculty ID", required: true },
      { name: "bookId", type: "text", label: "Book ID", required: true },
      { name: "issueDate", type: "date", label: "Issue Date", required: true },
      { name: "dueDate", type: "date", label: "Due Date", required: true },
      { name: "notes", type: "textarea", label: "Notes" }
    ]
  },

  ADD_PLACEMENT_DRIVE: {
    title: "Schedule Placement Drive",
    fields: [
      { name: "companyName", type: "text", label: "Company Name", required: true },
      { name: "position", type: "text", label: "Position", required: true },
      { name: "jobDescription", type: "textarea", label: "Job Description", required: true },
      { name: "packageMin", type: "number", label: "Package (Min)", required: true, min: 0 },
      { name: "packageMax", type: "number", label: "Package (Max)", required: true, min: 0 },
      { name: "eligibleDepartments", type: "text", label: "Eligible Departments", placeholder: "Comma separated" },
      { name: "minCGPA", type: "number", label: "Minimum CGPA", required: true, min: 0, max: 10 },
      { name: "driveDate", type: "date", label: "Drive Date", required: true },
      { name: "registrationDeadline", type: "date", label: "Registration Deadline", required: true },
      { name: "venue", type: "text", label: "Venue", required: true },
      { name: "contactPerson", type: "text", label: "Company Contact Person", required: true },
      { name: "contactEmail", type: "email", label: "Contact Email", required: true },
      { name: "contactPhone", type: "tel", label: "Contact Phone", required: true }
    ]
  }
};