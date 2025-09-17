export interface FeeStructure {
  id: string;
  academicYear: string;
  course: string;
  year: number;
  semester: number;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  components: FeeComponent[];
  totalAmount: number;
  dueDate: string;
  lateFee: {
    amount: number;
    perDay: number;
    maxAmount: number;
  };
  installments?: Installment[];
  scholarshipApplicable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FeeComponent {
  name: string;
  amount: number;
  isRefundable: boolean;
  isMandatory: boolean;
  description?: string;
}

export interface Installment {
  installmentNumber: number;
  amount: number;
  dueDate: string;
  components: string[];
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  academicYear: string;
  semester: number;
  feeType: 'Tuition' | 'Hostel' | 'Transport' | 'Library' | 'Examination' | 'Other';
  amount: number;
  paymentDate: string;
  paymentMode: PaymentMode;
  transactionDetails: TransactionDetails;
  status: 'Success' | 'Failed' | 'Pending' | 'Refunded';
  remarks?: string;
  receiptUrl?: string;
  createdAt: string;
}

export type PaymentMode = 
  | 'Cash'
  | 'Cheque'
  | 'DD'
  | 'Online Transfer'
  | 'Credit Card'
  | 'Debit Card'
  | 'UPI'
  | 'Net Banking';

export interface TransactionDetails {
  referenceNumber?: string;
  bankName?: string;
  branchName?: string;
  chequeNumber?: string;
  chequeDate?: string;
  upiId?: string;
  cardLastFourDigits?: string;
}

export interface StudentFeeRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  academicYear: string;
  totalFee: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  lateFee: number;
  scholarshipAmount: number;
  waiverAmount: number;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  payments: FeePayment[];
  nextDueDate?: string;
  lastPaymentDate?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  type: 'Merit' | 'Need-Based' | 'Sports' | 'Government' | 'Private';
  eligibilityCriteria: {
    minimumCGPA?: number;
    incomeLimit?: number;
    category?: string[];
    other?: string[];
  };
  amount: number;
  isPercentage: boolean;
  applicableFeeComponents: string[];
  applicationDeadline: string;
  requiredDocuments: string[];
  status: 'Open' | 'Closed' | 'Upcoming';
}

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  studentId: string;
  studentName: string;
  appliedOn: string;
  documents: {
    name: string;
    url: string;
    uploadedOn: string;
  }[];
  status: 'Applied' | 'Under Review' | 'Approved' | 'Rejected';
  reviewedBy?: string;
  reviewedOn?: string;
  approvedAmount?: number;
  remarks?: string;
}

export interface FeeRefund {
  id: string;
  studentId: string;
  studentName: string;
  reason: string;
  amount: number;
  feeComponents: string[];
  requestDate: string;
  status: 'Requested' | 'Approved' | 'Processing' | 'Completed' | 'Rejected';
  approvedBy?: string;
  approvedOn?: string;
  processedOn?: string;
  refundMode?: PaymentMode;
  refundDetails?: TransactionDetails;
  remarks?: string;
}