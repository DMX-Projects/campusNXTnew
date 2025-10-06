import { VALIDATION } from './constants';

/**
 * Validation error interface
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Base validator class
 */
export class Validator {
  protected errors: ValidationError[] = [];

  /**
   * Add an error to the validation result
   */
  protected addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  /**
   * Check if a field is required and not empty
   */
  protected validateRequired(value: any, fieldName: string): boolean {
    if (value === null || value === undefined || value === '') {
      this.addError(fieldName, `${fieldName} is required`);
      return false;
    }
    return true;
  }

  /**
   * Check if a string has minimum length
   */
  protected validateMinLength(value: string, minLength: number, fieldName: string): boolean {
    if (value && value.length < minLength) {
      this.addError(fieldName, `${fieldName} must be at least ${minLength} characters long`);
      return false;
    }
    return true;
  }

  /**
   * Check if a string has maximum length
   */
  protected validateMaxLength(value: string, maxLength: number, fieldName: string): boolean {
    if (value && value.length > maxLength) {
      this.addError(fieldName, `${fieldName} must not exceed ${maxLength} characters`);
      return false;
    }
    return true;
  }

  /**
   * Check if a value matches a pattern
   */
  protected validatePattern(value: string, pattern: RegExp, fieldName: string, errorMessage?: string): boolean {
    if (value && !pattern.test(value)) {
      this.addError(fieldName, errorMessage || `${fieldName} format is invalid`);
      return false;
    }
    return true;
  }

  /**
   * Check if a number is within a range
   */
  protected validateRange(value: number, min: number, max: number, fieldName: string): boolean {
    if (value !== undefined && (value < min || value > max)) {
      this.addError(fieldName, `${fieldName} must be between ${min} and ${max}`);
      return false;
    }
    return true;
  }

  /**
   * Check if an email is valid
   */
  protected validateEmail(email: string, fieldName: string = 'Email'): boolean {
    return this.validatePattern(email, VALIDATION.EMAIL.PATTERN, fieldName, 'Please enter a valid email address');
  }

  /**
   * Check if a phone number is valid
   */
  protected validatePhone(phone: string, fieldName: string = 'Phone'): boolean {
    return this.validatePattern(phone, VALIDATION.PHONE.PATTERN, fieldName, 'Please enter a valid 10-digit phone number');
  }

  /**
   * Check if an Aadhar number is valid
   */
  protected validateAadhar(aadhar: string, fieldName: string = 'Aadhar'): boolean {
    return this.validatePattern(aadhar, VALIDATION.AADHAR.PATTERN, fieldName, 'Please enter a valid 12-digit Aadhar number');
  }

  /**
   * Check if a PAN number is valid
   */
  protected validatePAN(pan: string, fieldName: string = 'PAN'): boolean {
    return this.validatePattern(pan, VALIDATION.PAN.PATTERN, fieldName, 'Please enter a valid PAN number');
  }

  /**
   * Get validation result
   */
  public getResult(): ValidationResult {
    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
    };
  }

  /**
   * Clear all errors
   */
  public clearErrors(): void {
    this.errors = [];
  }
}

/**
 * User registration validator
 */
export class UserRegistrationValidator extends Validator {
  public validate(data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): ValidationResult {
    this.clearErrors();

    // Username validation
    this.validateRequired(data.username, 'Username');
    this.validateMinLength(data.username, 3, 'Username');
    this.validateMaxLength(data.username, 50, 'Username');

    // Email validation
    this.validateRequired(data.email, 'Email');
    this.validateEmail(data.email);

    // Password validation
    this.validateRequired(data.password, 'Password');
    this.validatePassword(data.password);

    // Confirm password validation
    this.validateRequired(data.confirmPassword, 'Confirm Password');
    if (data.password !== data.confirmPassword) {
      this.addError('confirmPassword', 'Passwords do not match');
    }

    // Name validation
    this.validateRequired(data.firstName, 'First Name');
    this.validateMinLength(data.firstName, 2, 'First Name');
    this.validateMaxLength(data.firstName, 50, 'First Name');

    this.validateRequired(data.lastName, 'Last Name');
    this.validateMinLength(data.lastName, 2, 'Last Name');
    this.validateMaxLength(data.lastName, 50, 'Last Name');

    // Phone validation
    this.validateRequired(data.phone, 'Phone');
    this.validatePhone(data.phone);

    return this.getResult();
  }

  private validatePassword(password: string): void {
    if (!password) return;

    if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
      this.addError('password', `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters long`);
    }

    if (VALIDATION.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      this.addError('password', 'Password must contain at least one uppercase letter');
    }

    if (VALIDATION.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      this.addError('password', 'Password must contain at least one lowercase letter');
    }

    if (VALIDATION.PASSWORD.REQUIRE_NUMBERS && !/\d/.test(password)) {
      this.addError('password', 'Password must contain at least one number');
    }

    if (VALIDATION.PASSWORD.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.addError('password', 'Password must contain at least one special character');
    }
  }
}

/**
 * Student validator
 */
export class StudentValidator extends Validator {
  public validate(data: {
    rollNumber: string;
    admissionNumber: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    programId: string;
    batchId: string;
  }): ValidationResult {
    this.clearErrors();

    // Roll number validation
    this.validateRequired(data.rollNumber, 'Roll Number');
    this.validateMinLength(data.rollNumber, 3, 'Roll Number');

    // Admission number validation
    this.validateRequired(data.admissionNumber, 'Admission Number');
    this.validateMinLength(data.admissionNumber, 3, 'Admission Number');

    // Email validation
    this.validateRequired(data.email, 'Email');
    this.validateEmail(data.email);

    // Phone validation
    this.validateRequired(data.phone, 'Phone');
    this.validatePhone(data.phone);

    // Date of birth validation
    this.validateRequired(data.dateOfBirth, 'Date of Birth');
    this.validateDateOfBirth(data.dateOfBirth);

    // Program and batch validation
    this.validateRequired(data.programId, 'Program');
    this.validateRequired(data.batchId, 'Batch');

    return this.getResult();
  }

  private validateDateOfBirth(dateOfBirth: string): void {
    if (!dateOfBirth) return;

    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 15 || age > 80) {
      this.addError('dateOfBirth', 'Age must be between 15 and 80 years');
    }
  }
}

/**
 * Faculty validator
 */
export class FacultyValidator extends Validator {
  public validate(data: {
    employeeId: string;
    email: string;
    phone: string;
    qualification: string;
    specialization: string;
    experienceYears: number;
    departmentId: string;
  }): ValidationResult {
    this.clearErrors();

    // Employee ID validation
    this.validateRequired(data.employeeId, 'Employee ID');
    this.validateMinLength(data.employeeId, 3, 'Employee ID');

    // Email validation
    this.validateRequired(data.email, 'Email');
    this.validateEmail(data.email);

    // Phone validation
    this.validateRequired(data.phone, 'Phone');
    this.validatePhone(data.phone);

    // Qualification validation
    this.validateRequired(data.qualification, 'Qualification');
    this.validateMinLength(data.qualification, 2, 'Qualification');

    // Specialization validation
    this.validateRequired(data.specialization, 'Specialization');
    this.validateMinLength(data.specialization, 2, 'Specialization');

    // Experience validation
    this.validateRange(data.experienceYears, 0, 50, 'Experience Years');

    // Department validation
    this.validateRequired(data.departmentId, 'Department');

    return this.getResult();
  }
}

/**
 * Course validator
 */
export class CourseValidator extends Validator {
  public validate(data: {
    courseCode: string;
    courseName: string;
    credits: number;
    lectureHours: number;
    tutorialHours: number;
    practicalHours: number;
    semesterNumber: number;
  }): ValidationResult {
    this.clearErrors();

    // Course code validation
    this.validateRequired(data.courseCode, 'Course Code');
    this.validateMinLength(data.courseCode, 3, 'Course Code');

    // Course name validation
    this.validateRequired(data.courseName, 'Course Name');
    this.validateMinLength(data.courseName, 3, 'Course Name');

    // Credits validation
    this.validateRange(data.credits, 1, 10, 'Credits');

    // Hours validation
    this.validateRange(data.lectureHours, 0, 40, 'Lecture Hours');
    this.validateRange(data.tutorialHours, 0, 20, 'Tutorial Hours');
    this.validateRange(data.practicalHours, 0, 40, 'Practical Hours');

    // Semester validation
    this.validateRange(data.semesterNumber, 1, 10, 'Semester Number');

    return this.getResult();
  }
}

/**
 * Exam validator
 */
export class ExamValidator extends Validator {
  public validate(data: {
    examCode: string;
    examName: string;
    date: string;
    startTime: string;
    endTime: string;
    maxMarks: number;
    passingMarks: number;
  }): ValidationResult {
    this.clearErrors();

    // Exam code validation
    this.validateRequired(data.examCode, 'Exam Code');
    this.validateMinLength(data.examCode, 3, 'Exam Code');

    // Exam name validation
    this.validateRequired(data.examName, 'Exam Name');
    this.validateMinLength(data.examName, 3, 'Exam Name');

    // Date validation
    this.validateRequired(data.date, 'Exam Date');
    this.validateExamDate(data.date);

    // Time validation
    this.validateRequired(data.startTime, 'Start Time');
    this.validateRequired(data.endTime, 'End Time');
    this.validateExamTime(data.startTime, data.endTime);

    // Marks validation
    this.validateRange(data.maxMarks, 1, 1000, 'Maximum Marks');
    this.validateRange(data.passingMarks, 1, data.maxMarks, 'Passing Marks');

    return this.getResult();
  }

  private validateExamDate(date: string): void {
    if (!date) return;

    const examDate = new Date(date);
    const today = new Date();

    if (examDate < today) {
      this.addError('date', 'Exam date cannot be in the past');
    }
  }

  private validateExamTime(startTime: string, endTime: string): void {
    if (!startTime || !endTime) return;

    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    if (end <= start) {
      this.addError('endTime', 'End time must be after start time');
    }
  }
}

/**
 * Fee validator
 */
export class FeeValidator extends Validator {
  public validate(data: {
    feeName: string;
    amount: number;
    dueDate: string;
    academicYear: string;
    semester: number;
  }): ValidationResult {
    this.clearErrors();

    // Fee name validation
    this.validateRequired(data.feeName, 'Fee Name');
    this.validateMinLength(data.feeName, 3, 'Fee Name');

    // Amount validation
    this.validateRange(data.amount, 1, 1000000, 'Amount');

    // Due date validation
    this.validateRequired(data.dueDate, 'Due Date');
    this.validateFeeDate(data.dueDate);

    // Academic year validation
    this.validateRequired(data.academicYear, 'Academic Year');

    // Semester validation
    this.validateRange(data.semester, 1, 10, 'Semester');

    return this.getResult();
  }

  private validateFeeDate(dueDate: string): void {
    if (!dueDate) return;

    const due = new Date(dueDate);
    const today = new Date();

    if (due < today) {
      this.addError('dueDate', 'Due date cannot be in the past');
    }
  }
}

/**
 * Book validator
 */
export class BookValidator extends Validator {
  public validate(data: {
    title: string;
    author: string;
    isbn: string;
    totalCopies: number;
    price: number;
  }): ValidationResult {
    this.clearErrors();

    // Title validation
    this.validateRequired(data.title, 'Title');
    this.validateMinLength(data.title, 3, 'Title');

    // Author validation
    this.validateRequired(data.author, 'Author');
    this.validateMinLength(data.author, 3, 'Author');

    // ISBN validation (optional but if provided, should be valid)
    if (data.isbn) {
      this.validateISBN(data.isbn);
    }

    // Copies validation
    this.validateRange(data.totalCopies, 1, 1000, 'Total Copies');

    // Price validation
    this.validateRange(data.price, 0, 10000, 'Price');

    return this.getResult();
  }

  private validateISBN(isbn: string): void {
    // Basic ISBN validation (can be enhanced)
    const isbnPattern = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
    
    if (!isbnPattern.test(isbn)) {
      this.addError('isbn', 'Please enter a valid ISBN');
    }
  }
}

/**
 * Generic form validator
 */
export class FormValidator {
  private validators: Map<string, Validator> = new Map();

  /**
   * Add a validator for a specific form
   */
  public addValidator(formName: string, validator: Validator): void {
    this.validators.set(formName, validator);
  }

  /**
   * Validate a form
   */
  public validate(formName: string, data: any): ValidationResult {
    const validator = this.validators.get(formName);
    if (!validator) {
      return {
        isValid: false,
        errors: [{ field: 'form', message: `No validator found for form: ${formName}` }],
      };
    }

    return validator.validate(data);
  }

  /**
   * Get all validation errors for a specific field
   */
  public getFieldErrors(errors: ValidationError[], fieldName: string): string[] {
    return errors
      .filter(error => error.field === fieldName)
      .map(error => error.message);
  }

  /**
   * Check if a specific field has errors
   */
  public hasFieldError(errors: ValidationError[], fieldName: string): boolean {
    return errors.some(error => error.field === fieldName);
  }
}

// Export singleton instance
export const formValidator = new FormValidator();

// Register validators
formValidator.addValidator('userRegistration', new UserRegistrationValidator());
formValidator.addValidator('student', new StudentValidator());
formValidator.addValidator('faculty', new FacultyValidator());
formValidator.addValidator('course', new CourseValidator());
formValidator.addValidator('exam', new ExamValidator());
formValidator.addValidator('fee', new FeeValidator());
formValidator.addValidator('book', new BookValidator());

