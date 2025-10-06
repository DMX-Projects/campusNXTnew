import { format, parseISO, isValid } from 'date-fns';
import { formatCurrency, formatNumber, truncateText, getInitials } from './helpers';
import { DATE_FORMATS } from './constants';

/**
 * Format user display name
 */
export const formatUserName = (firstName: string, lastName: string, middleName?: string): string => {
  const parts = [firstName];
  if (middleName) parts.push(middleName);
  parts.push(lastName);
  return parts.filter(Boolean).join(' ');
};

/**
 * Format user role for display
 */
export const formatUserRole = (role: string): string => {
  return role
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +91 XXXXX XXXXX for Indian numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
};

/**
 * Format address for display
 */
export const formatAddress = (address: {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}): string => {
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.pincode,
    address.country
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Format academic year
 */
export const formatAcademicYear = (startYear: number, endYear?: number): string => {
  if (endYear) {
    return `${startYear}-${endYear}`;
  }
  return `${startYear}-${startYear + 1}`;
};

/**
 * Format semester
 */
export const formatSemester = (semester: number, academicYear?: string): string => {
  const semesterText = semester % 2 === 0 ? 'Even' : 'Odd';
  if (academicYear) {
    return `Sem ${semester} (${semesterText}) - ${academicYear}`;
  }
  return `Semester ${semester} (${semesterText})`;
};

/**
 * Format course code and name
 */
export const formatCourse = (code: string, name: string): string => {
  return `${code} - ${name}`;
};

/**
 * Format exam details
 */
export const formatExamDetails = (exam: {
  examCode: string;
  examName: string;
  date: string;
  startTime: string;
  endTime: string;
}): string => {
  const formattedDate = formatDate(exam.date, 'dd/MM/yyyy');
  const timeRange = `${exam.startTime} - ${exam.endTime}`;
  return `${exam.examCode}: ${exam.examName} (${formattedDate} ${timeRange})`;
};

/**
 * Format attendance percentage
 */
export const formatAttendancePercentage = (present: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = Math.round((present / total) * 100);
  return `${percentage}%`;
};

/**
 * Format CGPA
 */
export const formatCGPA = (cgpa: number): string => {
  return cgpa.toFixed(2);
};

/**
 * Format grade
 */
export const formatGrade = (grade: string): string => {
  return grade.toUpperCase();
};

/**
 * Format marks
 */
export const formatMarks = (obtained: number, total: number): string => {
  return `${obtained}/${total}`;
};

/**
 * Format fee amount with status
 */
export const formatFeeAmount = (amount: number, status: string): string => {
  const formattedAmount = formatCurrency(amount);
  const statusIcon = status === 'Paid' ? '✅' : status === 'Pending' ? '⏳' : '❌';
  return `${formattedAmount} ${statusIcon}`;
};

/**
 * Format book details
 */
export const formatBookDetails = (book: {
  title: string;
  author: string;
  isbn?: string;
  availableCopies: number;
  totalCopies: number;
}): string => {
  const availability = `${book.availableCopies}/${book.totalCopies} available`;
  const isbn = book.isbn ? ` (ISBN: ${book.isbn})` : '';
  return `${book.title} by ${book.author}${isbn} - ${availability}`;
};

/**
 * Format placement details
 */
export const formatPlacementDetails = (placement: {
  companyName: string;
  position: string;
  package: number;
  driveDate: string;
}): string => {
  const formattedDate = formatDate(placement.driveDate, 'dd/MM/yyyy');
  const formattedPackage = formatCurrency(placement.package);
  return `${placement.companyName} - ${placement.position} (${formattedPackage}) on ${formattedDate}`;
};

/**
 * Format hostel room details
 */
export const formatHostelRoom = (room: {
  roomNumber: string;
  roomType: string;
  capacity: number;
  currentOccupancy: number;
  monthlyFee: number;
}): string => {
  const occupancy = `${room.currentOccupancy}/${room.capacity}`;
  const fee = formatCurrency(room.monthlyFee);
  return `Room ${room.roomNumber} (${room.roomType}) - ${occupancy} occupants - ${fee}/month`;
};

/**
 * Format transport route details
 */
export const formatTransportRoute = (route: {
  routeName: string;
  startPoint: string;
  endPoint: string;
  totalDistance: number;
  estimatedTime: number;
}): string => {
  const distance = `${route.totalDistance} km`;
  const time = `${route.estimatedTime} mins`;
  return `${route.routeName}: ${route.startPoint} to ${route.endPoint} (${distance}, ${time})`;
};

/**
 * Format vehicle details
 */
export const formatVehicleDetails = (vehicle: {
  vehicleNumber: string;
  vehicleType: string;
  makeModel: string;
  seatingCapacity: number;
  driverName?: string;
}): string => {
  const driver = vehicle.driverName ? ` - Driver: ${vehicle.driverName}` : '';
  return `${vehicle.vehicleType} ${vehicle.makeModel} (${vehicle.vehicleNumber}) - ${vehicle.seatingCapacity} seats${driver}`;
};

/**
 * Format notification details
 */
export const formatNotificationDetails = (notification: {
  title: string;
  message: string;
  type: string;
  priority: string;
  sentAt: string;
}): string => {
  const formattedDate = formatDate(notification.sentAt, 'dd/MM/yyyy HH:mm');
  const priorityIcon = notification.priority === 'High' ? '🔴' : notification.priority === 'Medium' ? '🟡' : '🟢';
  return `${priorityIcon} ${notification.title} - ${formattedDate}`;
};

/**
 * Format leave request details
 */
export const formatLeaveRequest = (leave: {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}): string => {
  const startDate = formatDate(leave.startDate, 'dd/MM/yyyy');
  const endDate = formatDate(leave.endDate, 'dd/MM/yyyy');
  const statusIcon = leave.status === 'Approved' ? '✅' : leave.status === 'Rejected' ? '❌' : '⏳';
  return `${leave.leaveType} (${startDate} to ${endDate}) - ${leave.reason} ${statusIcon}`;
};

/**
 * Format document details
 */
export const formatDocumentDetails = (document: {
  documentType: string;
  documentNumber: string;
  isVerified: boolean;
  expiryDate?: string;
}): string => {
  const verificationStatus = document.isVerified ? '✅ Verified' : '❌ Not Verified';
  const expiry = document.expiryDate ? ` (Expires: ${formatDate(document.expiryDate, 'dd/MM/yyyy')})` : '';
  return `${document.documentType} - ${document.documentNumber} - ${verificationStatus}${expiry}`;
};

/**
 * Format dashboard card value
 */
export const formatDashboardValue = (value: string | number, type: string): string => {
  switch (type) {
    case 'currency':
      return formatCurrency(Number(value));
    case 'percentage':
      return `${value}%`;
    case 'number':
      return formatNumber(Number(value));
    case 'date':
      return formatDate(String(value));
    case 'time':
      return formatDate(String(value), 'HH:mm');
    default:
      return String(value);
  }
};

/**
 * Format status badge
 */
export const formatStatusBadge = (status: string): { text: string; color: string; variant: string } => {
  const statusMap: Record<string, { text: string; color: string; variant: string }> = {
    'Active': { text: 'Active', color: 'green', variant: 'success' },
    'Inactive': { text: 'Inactive', color: 'red', variant: 'danger' },
    'Pending': { text: 'Pending', color: 'orange', variant: 'warning' },
    'Approved': { text: 'Approved', color: 'green', variant: 'success' },
    'Rejected': { text: 'Rejected', color: 'red', variant: 'danger' },
    'Paid': { text: 'Paid', color: 'green', variant: 'success' },
    'Unpaid': { text: 'Unpaid', color: 'red', variant: 'danger' },
    'Overdue': { text: 'Overdue', color: 'red', variant: 'danger' },
    'Present': { text: 'Present', color: 'green', variant: 'success' },
    'Absent': { text: 'Absent', color: 'red', variant: 'danger' },
    'Late': { text: 'Late', color: 'orange', variant: 'warning' },
    'Available': { text: 'Available', color: 'green', variant: 'success' },
    'Occupied': { text: 'Occupied', color: 'red', variant: 'danger' },
    'Maintenance': { text: 'Maintenance', color: 'orange', variant: 'warning' },
  };

  return statusMap[status] || { text: status, color: 'gray', variant: 'secondary' };
};

/**
 * Format priority badge
 */
export const formatPriorityBadge = (priority: string): { text: string; color: string; variant: string } => {
  const priorityMap: Record<string, { text: string; color: string; variant: string }> = {
    'Low': { text: 'Low', color: 'green', variant: 'success' },
    'Medium': { text: 'Medium', color: 'orange', variant: 'warning' },
    'High': { text: 'High', color: 'red', variant: 'danger' },
    'Urgent': { text: 'Urgent', color: 'red', variant: 'danger' },
  };

  return priorityMap[priority] || { text: priority, color: 'gray', variant: 'secondary' };
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format file type icon
 */
export const formatFileTypeIcon = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  const iconMap: Record<string, string> = {
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'xls': '📊',
    'xlsx': '📊',
    'ppt': '📽️',
    'pptx': '📽️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'zip': '📦',
    'rar': '📦',
    'txt': '📄',
    'csv': '📊',
  };

  return iconMap[extension || ''] || '📄';
};

/**
 * Format search result snippet
 */
export const formatSearchSnippet = (text: string, query: string, maxLength: number = 150): string => {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  const index = textLower.indexOf(queryLower);
  if (index === -1) {
    return truncateText(text, maxLength);
  }
  
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 50);
  
  let snippet = text.substring(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  
  // Highlight the query in the snippet
  snippet = snippet.replace(
    new RegExp(`(${query})`, 'gi'),
    '<mark>$1</mark>'
  );
  
  return snippet;
};

/**
 * Format breadcrumb path
 */
export const formatBreadcrumbPath = (path: string): Array<{ label: string; path: string }> => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      path: currentPath,
    });
  }
  
  return breadcrumbs;
};

