// Form-related types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  options?: SelectOption[];
  validation?: ValidationRule[];
  gridCols?: 1 | 2 | 3 | 4 | 6 | 12;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'email' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface FormConfig {
  title?: string;
  description?: string;
  fields: FormField[];
  submitText?: string;
  cancelText?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
  columns?: 1 | 2 | 3 | 4;
}

export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface FormActions<T = any> {
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, touched: boolean) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
}