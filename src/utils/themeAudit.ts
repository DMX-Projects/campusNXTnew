/**
 * Theme Audit Utility
 * Helps identify and fix dark mode issues across the application
 */

export interface ThemeIssue {
  file: string;
  line: number;
  issue: string;
  suggestion: string;
}

export const commonThemeFixes = {
  // Background colors
  'bg-white': 'bg-white dark:bg-gray-800',
  'bg-gray-50': 'bg-gray-50 dark:bg-gray-900',
  'bg-gray-100': 'bg-gray-100 dark:bg-gray-700',
  
  // Text colors
  'text-gray-900': 'text-gray-900 dark:text-gray-100',
  'text-gray-600': 'text-gray-600 dark:text-gray-400',
  'text-gray-500': 'text-gray-500 dark:text-gray-500',
  'text-gray-400': 'text-gray-400 dark:text-gray-500',
  
  // Border colors
  'border-gray-200': 'border-gray-200 dark:border-gray-700',
  'border-gray-300': 'border-gray-300 dark:border-gray-600',
  
  // Form elements
  'border-gray-300 rounded-lg px-3 py-2': 'border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
  
  // Common patterns that need dark mode
  patterns: [
    {
      pattern: /className="([^"]*bg-white[^"]*)"/g,
      fix: (match: string) => match.replace('bg-white', 'bg-white dark:bg-gray-800')
    },
    {
      pattern: /className="([^"]*text-gray-900[^"]*)"/g,
      fix: (match: string) => match.replace('text-gray-900', 'text-gray-900 dark:text-gray-100')
    },
    {
      pattern: /className="([^"]*text-gray-600[^"]*)"/g,
      fix: (match: string) => match.replace('text-gray-600', 'text-gray-600 dark:text-gray-400')
    },
    {
      pattern: /className="([^"]*border-gray-200[^"]*)"/g,
      fix: (match: string) => match.replace('border-gray-200', 'border-gray-200 dark:border-gray-700')
    },
    {
      pattern: /className="([^"]*border-gray-300[^"]*)"/g,
      fix: (match: string) => match.replace('border-gray-300', 'border-gray-300 dark:border-gray-600')
    }
  ]
};

export const getThemeIssues = (content: string, filePath: string): ThemeIssue[] => {
  const issues: ThemeIssue[] = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Check for bg-white without dark mode
    if (line.includes('bg-white') && !line.includes('dark:bg-')) {
      issues.push({
        file: filePath,
        line: index + 1,
        issue: 'Missing dark mode background',
        suggestion: 'Add dark:bg-gray-800 to bg-white classes'
      });
    }
    
    // Check for text-gray-900 without dark mode
    if (line.includes('text-gray-900') && !line.includes('dark:text-')) {
      issues.push({
        file: filePath,
        line: index + 1,
        issue: 'Missing dark mode text color',
        suggestion: 'Add dark:text-gray-100 to text-gray-900 classes'
      });
    }
    
    // Check for text-gray-600 without dark mode
    if (line.includes('text-gray-600') && !line.includes('dark:text-')) {
      issues.push({
        file: filePath,
        line: index + 1,
        issue: 'Missing dark mode text color',
        suggestion: 'Add dark:text-gray-400 to text-gray-600 classes'
      });
    }
    
    // Check for border-gray-200 without dark mode
    if (line.includes('border-gray-200') && !line.includes('dark:border-')) {
      issues.push({
        file: filePath,
        line: index + 1,
        issue: 'Missing dark mode border color',
        suggestion: 'Add dark:border-gray-700 to border-gray-200 classes'
      });
    }
    
    // Check for border-gray-300 without dark mode
    if (line.includes('border-gray-300') && !line.includes('dark:border-')) {
      issues.push({
        file: filePath,
        line: index + 1,
        issue: 'Missing dark mode border color',
        suggestion: 'Add dark:border-gray-600 to border-gray-300 classes'
      });
    }
  });
  
  return issues;
};

export const applyThemeFixes = (content: string): string => {
  let fixedContent = content;
  
  // Apply common fixes
  Object.entries(commonThemeFixes).forEach(([original, fixed]) => {
    if (original !== 'patterns') {
      const regex = new RegExp(`\\b${original}\\b`, 'g');
      fixedContent = fixedContent.replace(regex, fixed);
    }
  });
  
  // Apply pattern-based fixes
  commonThemeFixes.patterns.forEach(({ pattern, fix }) => {
    fixedContent = fixedContent.replace(pattern, fix);
  });
  
  return fixedContent;
};

export const getThemeCompliance = (content: string): {
  score: number;
  total: number;
  issues: number;
} => {
  const issues = getThemeIssues(content, '');
  const total = content.split('\n').length;
  const score = Math.max(0, ((total - issues.length) / total) * 100);
  
  return {
    score: Math.round(score),
    total,
    issues: issues.length
  };
};
