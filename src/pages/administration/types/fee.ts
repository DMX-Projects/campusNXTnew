export interface FeeStructure {
  id: string;
  feeType: FeeType;
  amount: number;
  year: string;
  semester: string;
  status: 'Active' | 'Inactive';
  course: string;
}

export type FeeType = 'Tuition Fee' | 'Lab Fee' | 'Hostel Fee' | 'Transport Fee';

export interface FeeFilters {
  feeType: string;
  year: string;
  semester: string;
}