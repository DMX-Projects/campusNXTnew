import { Student } from '../types/student';

export const generateStudentTemplate = (): void => {
  const headers = [
    'Student Name',
    'Roll Number',
    'Mobile',
    'Email',
    'Gender',
    'Caste',
    'Status',
    'Program'
  ];

  const csvContent = headers.join(',') + '\n';
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const parseCSV = (text: string): any[] => {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    const values = lines[i].split(',').map(value => value.trim());
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    data.push(row);
  }

  return data;
};

export const convertCSVToStudents = (data: any[]): Student[] => {
  return data.map((row, index) => ({
    id: Date.now() + index,
    name: row['Student Name'] || '',
    mobile: row['Mobile'] || '',
    email: row['Email'] || '',
    gender: row['Gender'] || '',
    caste: row['Caste'] || 'OPEN',
    status: row['Status'] || 'CAP',
    program: row['Program'] || '',
    rollNumber: row['Roll Number'] || ''
  })).filter(student => student.name && student.rollNumber);
};

export const convertToCSV = (data: any[]): string => {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header] || '';
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    )
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};