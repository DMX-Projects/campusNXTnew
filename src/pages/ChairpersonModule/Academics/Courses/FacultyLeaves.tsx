import React from "react";

type FacultyLeave = {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
};

const FacultyLeaves: React.FC = () => {
  const leaves: FacultyLeave[] = [
    {
      leaveType: "Sick Leave",
      startDate: "2024-08-14",
      endDate: "2024-08-15",
      reason: "Fever",
      status: "Approved",
    },
    {
      leaveType: "Sick Leave",
      startDate: "2024-08-14",
      endDate: "2024-08-15",
      reason: "Headache",
      status: "Rejected",
    },
    {
      leaveType: "Casual Leave",
      startDate: "2024-08-15",
      endDate: "2024-08-16",
      reason: "Personal Work",
      status: "Approved",
    },
    {
      leaveType: "Sick Leave",
      startDate: "2024-08-15",
      endDate: "2024-08-21",
      reason: "Hospital Visit",
      status: "Rejected",
    },
    {
      leaveType: "Sick Leave",
      startDate: "2024-11-03",
      endDate: "2024-11-25",
      reason: "Personal",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Faculty Leaves</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="border border-gray-300 p-2">Leave Type</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Reason</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border border-gray-300 p-2">{leave.leaveType}</td>
              <td className="border border-gray-300 p-2">{leave.startDate}</td>
              <td className="border border-gray-300 p-2">{leave.endDate}</td>
              <td className="border border-gray-300 p-2">{leave.reason}</td>
              <td
                className={`border border-gray-300 p-2 font-semibold ${
                  leave.status === "Approved"
                    ? "text-green-600"
                    : leave.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {leave.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyLeaves;
