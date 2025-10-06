/**
 * Theme utility functions for consistent dark mode support
 */

/**
 * Common dark mode class combinations for different UI elements
 */
export const themeClasses = {
  // Backgrounds
  background: {
    primary: 'bg-white dark:bg-gray-800',
    secondary: 'bg-gray-50 dark:bg-gray-900',
    tertiary: 'bg-gray-100 dark:bg-gray-700',
    card: 'bg-white dark:bg-gray-800',
    modal: 'bg-white dark:bg-gray-800',
    sidebar: 'bg-white dark:bg-gray-800',
    header: 'bg-white dark:bg-gray-800',
  },
  
  // Text colors
  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-400',
    tertiary: 'text-gray-500 dark:text-gray-500',
    muted: 'text-gray-400 dark:text-gray-500',
    inverse: 'text-white dark:text-gray-900',
  },
  
  // Borders
  border: {
    primary: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600',
    accent: 'border-blue-200 dark:border-blue-700',
  },
  
  // Interactive elements
  interactive: {
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
    focus: 'focus:ring-blue-500 dark:focus:ring-blue-400',
    active: 'active:bg-gray-100 dark:active:bg-gray-600',
  },
  
  // Form elements
  form: {
    input: 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100',
    select: 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100',
    textarea: 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100',
  },
  
  // Status colors
  status: {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
  },
  
  // Shadows
  shadow: {
    sm: 'shadow-sm dark:shadow-gray-900/20',
    md: 'shadow-md dark:shadow-gray-900/20',
    lg: 'shadow-lg dark:shadow-gray-900/20',
    xl: 'shadow-xl dark:shadow-gray-900/20',
  },
};

/**
 * Get theme classes for a specific element type
 */
export const getThemeClasses = (elementType: keyof typeof themeClasses, variant?: string) => {
  const element = themeClasses[elementType];
  if (typeof element === 'string') {
    return element;
  }
  
  if (variant && variant in element) {
    return element[variant as keyof typeof element];
  }
  
  return '';
};

/**
 * Combine multiple theme classes
 */
export const combineThemeClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Common page container classes
 */
export const pageClasses = {
  container: 'min-h-screen bg-gray-50 dark:bg-gray-900',
  content: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm',
  card: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
  section: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6',
};

/**
 * Common component classes
 */
export const componentClasses = {
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100',
    outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
  },
  input: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent',
  select: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent',
  textarea: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent',
};
