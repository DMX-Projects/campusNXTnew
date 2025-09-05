import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  block: string;
  roomNumber: string;
  branch: string;
  semester: number;
  parentContact: string;
  parentEmail: string;
  emergencyContact: string;
  profileImage?: string;
}

interface PermissionRequest {
  id: string;
  student: Student;
  permissionType: 'Gate Pass' | 'Late Entry' | 'Visitor Permission' | 'Room Change' | 'Special Permission' | 'Medical Leave' | 'Academic Leave' | 'Outstation Pass';
  category: 'Local' | 'Outstation' | 'Emergency' | 'Official' | 'Personal' | 'Medical' | 'Academic';
  title: string;
  description: string;
  fromDateTime: string;
  toDateTime: string;
  destination?: string;
  purpose: string;
  accompaniedBy?: string;
  vehicleDetails?: string;
  contactDuringAbsence: string;
  emergencyContactPerson: string;
  status: 'Pending Parent Approval' | 'Parent Approved' | 'Warden Approved' | 'HOD Approved' | 'Principal Approved' | 'Chairman Approved' | 'Rejected' | 'Cancelled' | 'Expired';
  currentApprovalLevel: 'Parent' | 'Warden' | 'HOD' | 'Principal' | 'Chairman' | 'Completed';
  submittedDate: string;
  lastUpdated: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  approvalFlow: {
    parentApproval?: { status: boolean; timestamp?: string; remarks?: string };
    wardenApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
    hodApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
    principalApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
    chairmanApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
  };
  attachments?: string[];
  qrCode?: string;
  violations?: string[];
  remarks?: string;
}

const StudentPermissionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all-requests' | 'pending-approvals' | 'approved-permissions' | 'rejected-requests' | 'analytics'>('all-requests');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'this-week' | 'this-month'>('all');
  const [selectedPermission, setSelectedPermission] = useState<PermissionRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample permission requests data
  const permissionRequests: PermissionRequest[] = [
    {
      id: 'PERM001',
      student: {
        id: 'STU001', name: 'Rahul Kumar', rollNumber: '2023CSE001', block: 'A Block', roomNumber: 'A-101',
        branch: 'Computer Science Engineering', semester: 4, parentContact: '+91-9876543210',
        parentEmail: 'rahul.parent@email.com', emergencyContact: '+91-9876543211'
      },
      permissionType: 'Gate Pass', category: 'Personal', title: 'Family Wedding Attendance',
      description: 'Attending cousin\'s wedding ceremony in hometown. Family function requires 3 days leave.',
      fromDateTime: '2025-09-05T14:00:00Z', toDateTime: '2025-09-07T20:00:00Z',
      destination: 'Mysore, Karnataka', purpose: 'Family wedding and related ceremonies',
      accompaniedBy: 'Parents will pick up', vehicleDetails: 'Private Car - KA 09 AB 1234',
      contactDuringAbsence: '+91-9876543210', emergencyContactPerson: '+91-9876543211',
      status: 'Warden Approved', currentApprovalLevel: 'HOD', submittedDate: '2025-08-30T10:00:00Z',
      lastUpdated: '2025-08-31T14:30:00Z', priority: 'Medium',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-30T15:00:00Z', remarks: 'Approved by father via SMS' },
        wardenApproval: { status: true, timestamp: '2025-08-31T09:00:00Z', approvedBy: 'Dr. Rajesh Sharma', remarks: 'Good student record. Family function approved.' }
      },
      qrCode: 'QR_PERM001_2025'
    },
    {
      id: 'PERM002',
      student: {
        id: 'STU002', name: 'Priya Sharma', rollNumber: '2023ECE015', block: 'B Block', roomNumber: 'B-205',
        branch: 'Electronics & Communication', semester: 4, parentContact: '+91-9876543212',
        parentEmail: 'priya.parent@email.com', emergencyContact: '+91-9876543213'
      },
      permissionType: 'Medical Leave', category: 'Medical', title: 'Dental Surgery',
      description: 'Scheduled dental surgery at Apollo Hospital. Doctor has recommended 4 days rest post-surgery.',
      fromDateTime: '2025-09-10T08:00:00Z', toDateTime: '2025-09-13T18:00:00Z',
      destination: 'Apollo Hospital, Bangalore', purpose: 'Dental surgery and recovery',
      contactDuringAbsence: '+91-9876543212', emergencyContactPerson: '+91-9876543213',
      status: 'Principal Approved', currentApprovalLevel: 'Completed', submittedDate: '2025-08-28T16:20:00Z',
      lastUpdated: '2025-08-31T11:00:00Z', priority: 'High',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-28T17:00:00Z' },
        wardenApproval: { status: true, timestamp: '2025-08-29T10:00:00Z', approvedBy: 'Mrs. Kavitha Rao' },
        hodApproval: { status: true, timestamp: '2025-08-30T14:00:00Z', approvedBy: 'Dr. ECE HOD' },
        principalApproval: { status: true, timestamp: '2025-08-31T11:00:00Z', approvedBy: 'Dr. Principal', remarks: 'Medical leave approved. Submit medical certificates on return.' }
      },
      attachments: ['medical_prescription.pdf', 'hospital_appointment.pdf'],
      qrCode: 'QR_PERM002_2025'
    },
    {
      id: 'PERM003',
      student: {
        id: 'STU003', name: 'Amit Singh', rollNumber: '2022ME020', block: 'C Block', roomNumber: 'C-301',
        branch: 'Mechanical Engineering', semester: 6, parentContact: '+91-9876543214',
        parentEmail: 'amit.parent@email.com', emergencyContact: '+91-9876543215'
      },
      permissionType: 'Special Permission', category: 'Official', title: 'Industry Conference',
      description: 'Selected to present research paper at National Mechanical Engineering Conference in IIT Delhi.',
      fromDateTime: '2025-09-15T06:00:00Z', toDateTime: '2025-09-17T22:00:00Z',
      destination: 'IIT Delhi, New Delhi', purpose: 'Present research paper and attend technical sessions',
      accompaniedBy: 'Faculty guide Dr. Kumar and fellow students', vehicleDetails: 'Train - Rajdhani Express',
      contactDuringAbsence: '+91-9876543214', emergencyContactPerson: '+91-9876543215',
      status: 'HOD Approved', currentApprovalLevel: 'Principal', submittedDate: '2025-08-25T10:00:00Z',
      lastUpdated: '2025-08-30T16:00:00Z', priority: 'High',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-25T11:00:00Z' },
        wardenApproval: { status: true, timestamp: '2025-08-26T09:00:00Z', approvedBy: 'Dr. Rajesh Sharma' },
        hodApproval: { status: true, timestamp: '2025-08-30T16:00:00Z', approvedBy: 'Dr. Mechanical HOD', remarks: 'Excellent academic opportunity. Fully supported by department.' }
      },
      attachments: ['conference_invitation.pdf', 'research_abstract.pdf'],
      qrCode: 'QR_PERM003_2025'
    },
    {
      id: 'PERM004',
      student: {
        id: 'STU004', name: 'Sneha Patel', rollNumber: '2023IT008', block: 'A Block', roomNumber: 'A-204',
        branch: 'Information Technology', semester: 4, parentContact: '+91-9876543216',
        parentEmail: 'sneha.parent@email.com', emergencyContact: '+91-9876543217'
      },
      permissionType: 'Late Entry', category: 'Academic', title: 'Project Work Late Return',
      description: 'Working on final year project with external mentor. May return after hostel hours.',
      fromDateTime: '2025-09-02T20:00:00Z', toDateTime: '2025-09-03T02:00:00Z',
      destination: 'Tech Hub, Electronic City', purpose: 'Final year project work with industry mentor',
      contactDuringAbsence: '+91-9876543216', emergencyContactPerson: '+91-9876543217',
      status: 'Pending Parent Approval', currentApprovalLevel: 'Parent', submittedDate: '2025-08-31T14:00:00Z',
      lastUpdated: '2025-08-31T14:00:00Z', priority: 'Medium',
      approvalFlow: {},
      remarks: 'Late entry permission for academic project work'
    },
    {
      id: 'PERM005',
      student: {
        id: 'STU005', name: 'Vikram Reddy', rollNumber: '2022CSE045', block: 'D Block', roomNumber: 'D-102',
        branch: 'Computer Science Engineering', semester: 6, parentContact: '+91-9876543218',
        parentEmail: 'vikram.parent@email.com', emergencyContact: '+91-9876543219'
      },
      permissionType: 'Outstation Pass', category: 'Official', title: 'Campus Placement Interview',
      description: 'Final round interview with Microsoft at their Hyderabad office. Critical for career placement.',
      fromDateTime: '2025-09-08T06:00:00Z', toDateTime: '2025-09-09T23:00:00Z',
      destination: 'Microsoft Office, Hyderabad', purpose: 'Campus placement final interview round',
      accompaniedBy: 'Self', vehicleDetails: 'Flight + Cab booking',
      contactDuringAbsence: '+91-9876543218', emergencyContactPerson: '+91-9876543219',
      status: 'Rejected', currentApprovalLevel: 'Completed', submittedDate: '2025-08-29T12:00:00Z',
      lastUpdated: '2025-08-30T10:00:00Z', priority: 'High',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-29T13:00:00Z' },
        wardenApproval: { status: false, timestamp: '2025-08-30T10:00:00Z', approvedBy: 'Dr. Rajesh Sharma', remarks: 'Attendance below minimum requirement. Focus on academics first.' }
      },
      violations: ['Low attendance in current semester'],
      remarks: 'Rejected due to poor academic attendance'
    },
    {
      id: 'PERM006',
      student: {
        id: 'STU006', name: 'Anjali Gupta', rollNumber: '2023EEE012', block: 'E Block', roomNumber: 'E-301',
        branch: 'Electrical & Electronics', semester: 4, parentContact: '+91-9876543220',
        parentEmail: 'anjali.parent@email.com', emergencyContact: '+91-9876543221'
      },
      permissionType: 'Visitor Permission', category: 'Personal', title: 'Parent Visit - Parents Day',
      description: 'Parents coming to visit for Parents Day celebration. Request for room visit permission.',
      fromDateTime: '2025-09-12T10:00:00Z', toDateTime: '2025-09-12T18:00:00Z',
      destination: 'Hostel Premises', purpose: 'Parents Day celebration and room visit',
      contactDuringAbsence: '+91-9876543220', emergencyContactPerson: '+91-9876543221',
      status: 'Chairman Approved', currentApprovalLevel: 'Completed', submittedDate: '2025-08-20T09:00:00Z',
      lastUpdated: '2025-08-31T12:00:00Z', priority: 'Low',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-20T10:00:00Z' },
        wardenApproval: { status: true, timestamp: '2025-08-21T11:00:00Z', approvedBy: 'Mrs. Kavitha Rao' },
        hodApproval: { status: true, timestamp: '2025-08-25T14:00:00Z', approvedBy: 'Dr. EEE HOD' },
        principalApproval: { status: true, timestamp: '2025-08-28T10:00:00Z', approvedBy: 'Dr. Principal' },
        chairmanApproval: { status: true, timestamp: '2025-08-31T12:00:00Z', approvedBy: 'Dr. Chairman', remarks: 'Parents Day visitor permission approved.' }
      },
      qrCode: 'QR_PERM006_2025'
    }
  ];

  // Filter permissions based on active tab
  const getPermissionsForActiveTab = () => {
    let basePermissions = permissionRequests.filter(permission => {
      const matchesSearch = permission.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           permission.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           permission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           permission.permissionType.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    switch (activeTab) {
      case 'pending-approvals':
        return basePermissions.filter(p => 
          p.status.includes('Pending') || 
          (p.status.includes('Approved') && p.currentApprovalLevel !== 'Completed')
        );
      
      case 'approved-permissions':
        return basePermissions.filter(p => 
          p.status.includes('Approved') && p.currentApprovalLevel === 'Completed'
        );
      
      case 'rejected-requests':
        return basePermissions.filter(p => p.status === 'Rejected');
      
      case 'analytics':
        return basePermissions; // For analytics, we might want all data
      
      case 'all-requests':
      default:
        return basePermissions;
    }
  };

  const displayedPermissions = getPermissionsForActiveTab();

  // Action handlers
  const handleSendNotification = (permission: PermissionRequest) => {
    alert(`📱 Notification Sent Successfully!
    
To: ${permission.student.name} (${permission.student.parentContact})
Subject: Permission Request Update - #${permission.id}

Message: Your ${permission.permissionType.toLowerCase()} request "${permission.title}" status has been updated to: ${permission.status}

📧 Email also sent to: ${permission.student.parentEmail}
🕒 Sent at: ${new Date().toLocaleString()}`);
    
    console.log('Sending notification:', {
      studentName: permission.student.name,
      parentContact: permission.student.parentContact,
      parentEmail: permission.student.parentEmail,
      message: `Permission ${permission.id} - ${permission.status}`
    });
  };

  const handleTrackLocation = (permission: PermissionRequest) => {
    const mockLocations = [
      `📍 Currently at: Main Gate - College Campus\n🕒 Last updated: ${new Date().toLocaleTimeString()}`,
      `🚌 Last seen: Bus Stand, 15 minutes ago\n📱 GPS Status: Active`,
      `🛣️ En route to: ${permission.destination || 'Unknown destination'}\n📊 ETA: 45 minutes`,
      `⚠️ Location tracking unavailable\n📶 Student may be in offline area`
    ];
    
    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    
    alert(`🗺️ Real-time Location Tracking
    
Student: ${permission.student.name} (${permission.student.rollNumber})
Permission ID: ${permission.id}

${randomLocation}

📋 Permission Status: ${permission.status}
📞 Contact: ${permission.contactDuringAbsence}
🚨 Emergency Contact: ${permission.emergencyContactPerson}

⚠️ Note: Real-time GPS tracking requires student consent and active location services.`);
    
    console.log('Tracking location for student:', permission.student.rollNumber);
  };

  const handleGenerateReport = (permission: PermissionRequest) => {
    const report = `STUDENT PERMISSION REQUEST REPORT
==========================================

📋 PERMISSION DETAILS
Request ID: ${permission.id}
Date Generated: ${new Date().toLocaleString()}
Report Type: Individual Permission Analysis

👨‍🎓 STUDENT INFORMATION
Name: ${permission.student.name}
Roll Number: ${permission.student.rollNumber}
Branch: ${permission.student.branch}
Semester: ${permission.student.semester}
Room: ${permission.student.block} - ${permission.student.roomNumber}

📝 PERMISSION REQUEST
Type: ${permission.permissionType}
Category: ${permission.category}
Title: ${permission.title}
Description: ${permission.description}
Purpose: ${permission.purpose}

📅 TIMELINE
Submitted: ${formatDateTime(permission.submittedDate)}
From: ${formatDateTime(permission.fromDateTime)}
To: ${formatDateTime(permission.toDateTime)}
Last Updated: ${formatDateTime(permission.lastUpdated)}

🎯 REQUEST DETAILS
Destination: ${permission.destination || 'N/A'}
Priority Level: ${permission.priority}
Current Status: ${permission.status}
Approval Stage: ${permission.currentApprovalLevel}
Accompanied By: ${permission.accompaniedBy || 'Self'}
Vehicle Details: ${permission.vehicleDetails || 'Not specified'}

✅ APPROVAL WORKFLOW STATUS
Parent Approval: ${permission.approvalFlow.parentApproval?.status ? '✓ Approved' : '⏳ Pending'}
${permission.approvalFlow.parentApproval?.timestamp ? `  └─ Date: ${formatDateTime(permission.approvalFlow.parentApproval.timestamp)}` : ''}
${permission.approvalFlow.parentApproval?.remarks ? `  └─ Remarks: ${permission.approvalFlow.parentApproval.remarks}` : ''}

Warden Approval: ${permission.approvalFlow.wardenApproval?.status === true ? '✓ Approved' : permission.approvalFlow.wardenApproval?.status === false ? '❌ Rejected' : '⏳ Pending'}
${permission.approvalFlow.wardenApproval?.timestamp ? `  └─ Date: ${formatDateTime(permission.approvalFlow.wardenApproval.timestamp)}` : ''}
${permission.approvalFlow.wardenApproval?.approvedBy ? `  └─ Approved By: ${permission.approvalFlow.wardenApproval.approvedBy}` : ''}
${permission.approvalFlow.wardenApproval?.remarks ? `  └─ Remarks: ${permission.approvalFlow.wardenApproval.remarks}` : ''}

HOD Approval: ${permission.approvalFlow.hodApproval?.status === true ? '✓ Approved' : permission.approvalFlow.hodApproval?.status === false ? '❌ Rejected' : '⏳ Pending'}
${permission.approvalFlow.hodApproval?.timestamp ? `  └─ Date: ${formatDateTime(permission.approvalFlow.hodApproval.timestamp)}` : ''}
${permission.approvalFlow.hodApproval?.approvedBy ? `  └─ Approved By: ${permission.approvalFlow.hodApproval.approvedBy}` : ''}

Principal Approval: ${permission.approvalFlow.principalApproval?.status === true ? '✓ Approved' : permission.approvalFlow.principalApproval?.status === false ? '❌ Rejected' : '⏳ Pending'}
${permission.approvalFlow.principalApproval?.timestamp ? `  └─ Date: ${formatDateTime(permission.approvalFlow.principalApproval.timestamp)}` : ''}
${permission.approvalFlow.principalApproval?.approvedBy ? `  └─ Approved By: ${permission.approvalFlow.principalApproval.approvedBy}` : ''}

Chairman Approval: ${permission.approvalFlow.chairmanApproval?.status === true ? '✓ Approved' : permission.approvalFlow.chairmanApproval?.status === false ? '❌ Rejected' : '⏳ Pending'}
${permission.approvalFlow.chairmanApproval?.timestamp ? `  └─ Date: ${formatDateTime(permission.approvalFlow.chairmanApproval.timestamp)}` : ''}
${permission.approvalFlow.chairmanApproval?.approvedBy ? `  └─ Approved By: ${permission.approvalFlow.chairmanApproval.approvedBy}` : ''}

📞 CONTACT INFORMATION
Parent Contact: ${permission.student.parentContact}
Parent Email: ${permission.student.parentEmail}
Emergency Contact: ${permission.emergencyContactPerson}
Contact During Absence: ${permission.contactDuringAbsence}

📎 ATTACHMENTS
${permission.attachments ? permission.attachments.map(att => `• ${att}`).join('\n') : 'No attachments'}

🔒 SECURITY
QR Code: ${permission.qrCode || 'Not generated'}
${permission.violations ? `⚠️ Violations: ${permission.violations.join(', ')}` : ''}

💬 ADDITIONAL REMARKS
${permission.remarks || 'No additional remarks'}

==========================================
Report generated by Student Permission Management System
Contact: admin@college.edu | Phone: +91-80-1234-5678
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Permission_Report_${permission.id}_${permission.student.rollNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`📊 Detailed Report Generated!
    
File: Permission_Report_${permission.id}_${permission.student.rollNumber}.txt
Status: Downloaded successfully
    
📋 Report includes:
• Complete student information
• Permission request details
• Full approval workflow
• Timeline and status updates
• Contact information
• Security details

The report has been downloaded to your device.`);
  };

  const handleExportDetails = (permission: PermissionRequest) => {
    const csvData = [
      ['Field', 'Value'],
      ['Permission ID', permission.id],
      ['Student Name', permission.student.name],
      ['Roll Number', permission.student.rollNumber],
      ['Branch', permission.student.branch],
      ['Semester', permission.student.semester.toString()],
      ['Room', `${permission.student.block} - ${permission.student.roomNumber}`],
      ['Permission Type', permission.permissionType],
      ['Category', permission.category],
      ['Title', permission.title],
      ['Description', permission.description],
      ['From Date', formatDateTime(permission.fromDateTime)],
      ['To Date', formatDateTime(permission.toDateTime)],
      ['Destination', permission.destination || 'N/A'],
      ['Purpose', permission.purpose],
      ['Priority', permission.priority],
      ['Status', permission.status],
      ['Current Approval Level', permission.currentApprovalLevel],
      ['Parent Contact', permission.student.parentContact],
      ['Parent Email', permission.student.parentEmail],
      ['Emergency Contact', permission.emergencyContactPerson],
      ['Contact During Absence', permission.contactDuringAbsence],
      ['Accompanied By', permission.accompaniedBy || 'Self'],
      ['Vehicle Details', permission.vehicleDetails || 'Not specified'],
      ['Submitted Date', formatDateTime(permission.submittedDate)],
      ['Last Updated', formatDateTime(permission.lastUpdated)],
      ['Parent Approval Status', permission.approvalFlow.parentApproval?.status ? 'Approved' : 'Pending'],
      ['Warden Approval Status', permission.approvalFlow.wardenApproval?.status === true ? 'Approved' : permission.approvalFlow.wardenApproval?.status === false ? 'Rejected' : 'Pending'],
      ['HOD Approval Status', permission.approvalFlow.hodApproval?.status === true ? 'Approved' : permission.approvalFlow.hodApproval?.status === false ? 'Rejected' : 'Pending'],
      ['Principal Approval Status', permission.approvalFlow.principalApproval?.status === true ? 'Approved' : permission.approvalFlow.principalApproval?.status === false ? 'Rejected' : 'Pending'],
      ['Chairman Approval Status', permission.approvalFlow.chairmanApproval?.status === true ? 'Approved' : permission.approvalFlow.chairmanApproval?.status === false ? 'Rejected' : 'Pending'],
      ['QR Code', permission.qrCode || 'Not generated'],
      ['Attachments Count', permission.attachments ? permission.attachments.length.toString() : '0'],
      ['Violations', permission.violations ? permission.violations.join('; ') : 'None'],
      ['Remarks', permission.remarks || 'No remarks']
    ];
    
    const csvContent = csvData.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Permission_Export_${permission.id}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`📊 Data Export Completed!
    
File: Permission_Export_${permission.id}_${new Date().toISOString().split('T')[0]}.csv
Format: CSV (Comma Separated Values)
Status: Downloaded successfully

📋 Exported data includes:
• Complete permission details
• Student information
• All approval statuses
• Timeline information
• Contact details
• Security information

✅ The CSV file is ready for use in Excel, Google Sheets, or any data analysis tool.`);
  };

  const handleViewPermission = (permission: PermissionRequest) => {
    setSelectedPermission(permission);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPermission(null);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Approved')) return 'bg-secondary-500 text-white';
    if (status === 'Rejected') return 'bg-red-500 text-white';
    if (status === 'Cancelled') return 'bg-gray-500 text-white';
    if (status === 'Expired') return 'bg-orange-500 text-white';
    return 'bg-accent-500 text-white';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalStepColor = (approved: boolean | undefined) => {
    if (approved === true) return 'bg-secondary-500 text-white';
    if (approved === false) return 'bg-red-500 text-white';
    return 'bg-gray-300 text-gray-600';
  };

  // Analytics data
  const totalRequests = permissionRequests.length;
  const pendingRequests = permissionRequests.filter(p => p.status.includes('Pending') || (p.status.includes('Approved') && p.currentApprovalLevel !== 'Completed')).length;
  const approvedRequests = permissionRequests.filter(p => p.status.includes('Approved') && p.currentApprovalLevel === 'Completed').length;
  const rejectedRequests = permissionRequests.filter(p => p.status === 'Rejected').length;

  // Render content based on active tab
  const renderTabContent = () => {
    if (activeTab === 'analytics') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Permission Analytics Dashboard</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Permission Type Distribution */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Permission Types</h4>
              <div className="space-y-2">
                {Array.from(new Set(permissionRequests.map(p => p.permissionType))).map(type => {
                  const count = permissionRequests.filter(p => p.permissionType === type).length;
                  const percentage = ((count / totalRequests) * 100).toFixed(1);
                  return (
                    <div key={type} className="flex justify-between text-sm">
                      <span>{type}:</span>
                      <span className="font-medium">{count} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Status Overview</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Requests:</span>
                  <span className="font-medium">{totalRequests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending:</span>
                  <span className="font-medium text-yellow-600">{pendingRequests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Approved:</span>
                  <span className="font-medium text-green-600">{approvedRequests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rejected:</span>
                  <span className="font-medium text-red-600">{rejectedRequests}</span>
                </div>
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Priority Levels</h4>
              <div className="space-y-2">
                {['Critical', 'High', 'Medium', 'Low'].map(priority => {
                  const count = permissionRequests.filter(p => p.priority === priority).length;
                  const percentage = ((count / totalRequests) * 100).toFixed(1);
                  return (
                    <div key={priority} className="flex justify-between text-sm">
                      <span>{priority}:</span>
                      <span className="font-medium">{count} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-lg p-4 md:col-span-2 lg:col-span-3">
              <h4 className="font-semibold text-gray-800 mb-3">Recent Activity Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Most Common Request:</strong> {Array.from(new Set(permissionRequests.map(p => p.permissionType))).reduce((a, b) => permissionRequests.filter(p => p.permissionType === a).length > permissionRequests.filter(p => p.permissionType === b).length ? a : b)}</p>
                  <p><strong>Average Processing Time:</strong> 2-3 business days</p>
                  <p><strong>Success Rate:</strong> {(((approvedRequests) / totalRequests) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p><strong>Peak Request Period:</strong> Beginning of semester</p>
                  <p><strong>Most Active Department:</strong> Computer Science</p>
                  <p><strong>Emergency Requests:</strong> {permissionRequests.filter(p => p.category === 'Emergency').length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Regular table view for other tabs
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by student name, roll number, or permission type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Periods' },
              { key: 'today', label: 'Today' },
              { key: 'this-week', label: 'This Week' },
              { key: 'this-month', label: 'This Month' }
            ].map((filter) => (
              <button
                key={filter.key}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'border border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                }`}
                onClick={() => setSelectedFilter(filter.key as any)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Approver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedPermissions.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{permission.student.name}</div>
                      <div className="text-sm text-gray-500">{permission.student.rollNumber}</div>
                      <div className="text-xs text-gray-400">{permission.student.branch}</div>
                      <div className="text-xs text-gray-400">{permission.student.block} - {permission.student.roomNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{permission.permissionType}</div>
                    <div className="text-xs text-gray-500">{permission.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>From: {formatDateTime(permission.fromDateTime)}</div>
                    <div>To: {formatDateTime(permission.toDateTime)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">{permission.title}</div>
                    <div className="text-xs text-gray-500">{permission.purpose}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(permission.status)}`}>
                      {permission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(permission.priority)}`}>
                      {permission.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {permission.currentApprovalLevel !== 'Completed' ? permission.currentApprovalLevel : 'Completed'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewPermission(permission)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {displayedPermissions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m0 0V9a1 1 0 011-1h.01a1 1 0 011 1v3m-6 0v6a1 1 0 001 1h6a1 1 0 001-1v-6m0 0V9a1 1 0 011-1h.01a1 1 0 011 1v3m0 9v6a1 1 0 01-1 1H7a1 1 0 01-1-1v-6a1 1 0 011-1h6z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {activeTab === 'pending-approvals' && 'No pending approvals found'}
                {activeTab === 'approved-permissions' && 'No approved permissions found'}
                {activeTab === 'rejected-requests' && 'No rejected requests found'}
                {activeTab === 'all-requests' && 'No permission requests found'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria' : 'No data available for this category'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {[
            { key: 'all-requests', label: 'All Permission Requests' },
            { key: 'pending-approvals', label: 'Pending Approvals' },
            { key: 'approved-permissions', label: 'Approved Permissions' },
            { key: 'rejected-requests', label: 'Rejected Requests' },
            { key: 'analytics', label: 'Permission Analytics' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-primary-600">{totalRequests}</p>
            <p className="text-sm text-gray-600">All permission requests</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-accent-600">{pendingRequests}</p>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Approved</h3>
            <p className="text-3xl font-bold text-secondary-600">{approvedRequests}</p>
            <p className="text-sm text-gray-600">Successfully approved</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">{rejectedRequests}</p>
            <p className="text-sm text-gray-600">Denied requests</p>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Permission Detail Modal */}
        {isModalOpen && selectedPermission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Permission Request - #{selectedPermission.id}</h2>
                  <p className="text-gray-600">{selectedPermission.title}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Permission Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{selectedPermission.student.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Roll Number:</span>
                          <span className="font-medium">{selectedPermission.student.rollNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Branch:</span>
                          <span className="font-medium">{selectedPermission.student.branch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room:</span>
                          <span className="font-medium">{selectedPermission.student.block} - {selectedPermission.student.roomNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Parent Contact:</span>
                          <span className="font-medium">{selectedPermission.student.parentContact}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Permission Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{selectedPermission.permissionType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{selectedPermission.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">From:</span>
                          <span className="font-medium">{formatDateTime(selectedPermission.fromDateTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">To:</span>
                          <span className="font-medium">{formatDateTime(selectedPermission.toDateTime)}</span>
                        </div>
                        {selectedPermission.destination && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Destination:</span>
                            <span className="font-medium">{selectedPermission.destination}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(selectedPermission.priority)}`}>
                            {selectedPermission.priority}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPermission.status)}`}>
                            {selectedPermission.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Description & Purpose</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{selectedPermission.description}</p>
                      <p className="text-gray-600 text-sm"><strong>Purpose:</strong> {selectedPermission.purpose}</p>
                      {selectedPermission.remarks && (
                        <div className="mt-3">
                          <h4 className="font-semibold text-gray-800 mb-1">Additional Remarks:</h4>
                          <p className="text-gray-700 text-sm">{selectedPermission.remarks}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Approval Flow */}
                  <div className="space-y-6">
                    <div className="bg-accent-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Workflow</h3>
                      <div className="space-y-4">
                        {/* Parent Approval */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <h4 className="font-medium text-gray-800">Parent Approval</h4>
                            <p className="text-xs text-gray-600">SMS verification required</p>
                          </div>
                          <span className={`px-3 py-1 text-sm rounded-full ${getApprovalStepColor(selectedPermission.approvalFlow.parentApproval?.status)}`}>
                            {selectedPermission.approvalFlow.parentApproval?.status ? 'Approved' : 'Pending'}
                          </span>
                        </div>

                        {/* Warden Approval */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <h4 className="font-medium text-gray-800">Warden Approval</h4>
                            <p className="text-xs text-gray-600">Hostel administration review</p>
                          </div>
                          <span className={`px-3 py-1 text-sm rounded-full ${getApprovalStepColor(selectedPermission.approvalFlow.wardenApproval?.status)}`}>
                            {selectedPermission.approvalFlow.wardenApproval?.status === true ? 'Approved' : 
                             selectedPermission.approvalFlow.wardenApproval?.status === false ? 'Rejected' : 'Pending'}
                          </span>
                        </div>

                        {/* HOD Approval */}
                        {selectedPermission.approvalFlow.hodApproval !== undefined && (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div>
                              <h4 className="font-medium text-gray-800">HOD Approval</h4>
                              <p className="text-xs text-gray-600">Department head approval</p>
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${getApprovalStepColor(selectedPermission.approvalFlow.hodApproval?.status)}`}>
                              {selectedPermission.approvalFlow.hodApproval?.status === true ? 'Approved' : 
                               selectedPermission.approvalFlow.hodApproval?.status === false ? 'Rejected' : 'Pending'}
                            </span>
                          </div>
                        )}

                        {/* Principal Approval */}
                        {selectedPermission.approvalFlow.principalApproval !== undefined && (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div>
                              <h4 className="font-medium text-gray-800">Principal Approval</h4>
                              <p className="text-xs text-gray-600">Final institutional approval</p>
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${getApprovalStepColor(selectedPermission.approvalFlow.principalApproval?.status)}`}>
                              {selectedPermission.approvalFlow.principalApproval?.status === true ? 'Approved' : 
                               selectedPermission.approvalFlow.principalApproval?.status === false ? 'Rejected' : 'Pending'}
                            </span>
                          </div>
                        )}

                        {/* Chairman Approval */}
                        {selectedPermission.approvalFlow.chairmanApproval !== undefined && (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div>
                              <h4 className="font-medium text-gray-800">Chairman Approval</h4>
                              <p className="text-xs text-gray-600">Top-level authorization</p>
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${getApprovalStepColor(selectedPermission.approvalFlow.chairmanApproval?.status)}`}>
                              {selectedPermission.approvalFlow.chairmanApproval?.status === true ? 'Approved' : 
                               selectedPermission.approvalFlow.chairmanApproval?.status === false ? 'Rejected' : 'Pending'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedPermission.qrCode && (
                      <div className="bg-primary-50 rounded-xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Digital Permission Pass</h3>
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-primary-300 mb-4">
                          <div className="text-6xl mb-2">📱</div>
                          <p className="text-sm text-gray-600">QR Code: {selectedPermission.qrCode}</p>
                        </div>
                        <p className="text-xs text-gray-600">Present this QR code for entry/exit verification</p>
                      </div>
                    )}

                    {selectedPermission.attachments && selectedPermission.attachments.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Supporting Documents</h3>
                        <div className="space-y-2">
                          {selectedPermission.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                              <span className="text-sm text-gray-700">📎 {attachment}</span>
                              <button className="text-primary-600 hover:text-primary-800 text-sm">
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => handleSendNotification(selectedPermission)}
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Send Notification
                  </button>
                  <button 
                    onClick={() => handleTrackLocation(selectedPermission)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Track Student Location
                  </button>
                  <button 
                    onClick={() => handleGenerateReport(selectedPermission)}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Generate Report
                  </button>
                  <button 
                    onClick={() => handleExportDetails(selectedPermission)}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Export Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPermissionManagement;
