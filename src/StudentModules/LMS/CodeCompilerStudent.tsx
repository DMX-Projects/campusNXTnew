import React, { useState, useEffect } from 'react';
import { 
  PlayIcon, 
  SaveIcon, 
  DownloadIcon, 
  UploadIcon,
  RefreshCwIcon,
  SettingsIcon,
  FileTextIcon,
  FolderIcon,
  TerminalIcon,
  CodeIcon,
  BugIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MemoryStickIcon
} from 'lucide-react';

interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
  lastModified: string;
  isUnsaved: boolean;
}

interface CompilationResult {
  success: boolean;
  output: string;
  errors: string;
  executionTime: number;
  memoryUsed: number;
  status: string;
}

interface LanguageConfig {
  name: string;
  extension: string;
  template: string;
  compileCommand: string;
  runCommand: string;
}

const CodeCompilerStu: React.FC = () => {
  const [files, setFiles] = useState<CodeFile[]>([
    {
      id: '1',
      name: 'main.cpp',
      language: 'cpp',
      content: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      lastModified: new Date().toISOString(),
      isUnsaved: false
    }
  ]);

  const [activeFileId, setActiveFileId] = useState('1');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const languages: { [key: string]: LanguageConfig } = {
    cpp: {
      name: 'C++',
      extension: '.cpp',
      template: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
      compileCommand: 'g++ -o program',
      runCommand: './program'
    },
    java: {
      name: 'Java',
      extension: '.java',
      template: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      compileCommand: 'javac',
      runCommand: 'java Main'
    },
    python: {
      name: 'Python',
      extension: '.py',
      template: `# Python program
print("Hello, World!")`,
      compileCommand: '',
      runCommand: 'python'
    },
    c: {
      name: 'C',
      extension: '.c',
      template: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      compileCommand: 'gcc -o program',
      runCommand: './program'
    },
    javascript: {
      name: 'JavaScript',
      extension: '.js',
      template: `// JavaScript program
console.log("Hello, World!");`,
      compileCommand: '',
      runCommand: 'node'
    }
  };

  const activeFile = files.find(file => file.id === activeFileId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S to save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveFile();
      }
      // Ctrl+R to run
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        runCode();
      }
      // Ctrl+N for new file
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        createNewFile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateFileContent = (content: string) => {
    if (activeFile) {
      setFiles(prev => prev.map(file => 
        file.id === activeFileId 
          ? { ...file, content, isUnsaved: true }
          : file
      ));
    }
  };

  const saveFile = () => {
    if (activeFile) {
      setFiles(prev => prev.map(file => 
        file.id === activeFileId 
          ? { ...file, lastModified: new Date().toISOString(), isUnsaved: false }
          : file
      ));
      
      // Simulate saving to server
      setTimeout(() => {
        alert('File saved successfully!');
      }, 500);
    }
  };

  const createNewFile = (language = 'cpp') => {
    const newFile: CodeFile = {
      id: Date.now().toString(),
      name: `untitled${files.length + 1}${languages[language].extension}`,
      language,
      content: languages[language].template,
      lastModified: new Date().toISOString(),
      isUnsaved: true
    };
    
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const deleteFile = (fileId: string) => {
    if (files.length <= 1) {
      alert('Cannot delete the last file!');
      return;
    }
    
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(prev => prev.filter(file => file.id !== fileId));
      if (activeFileId === fileId) {
        setActiveFileId(files.find(file => file.id !== fileId)?.id || files[0].id);
      }
    }
  };

  const runCode = async () => {
    if (!activeFile) return;
    
    setIsCompiling(true);
    setCompilationResult(null);
    
    // Simulate compilation and execution
    setTimeout(() => {
      const mockResults: CompilationResult[] = [
        {
          success: true,
          output: 'Hello, World!\nProgram executed successfully.',
          errors: '',
          executionTime: 0.23,
          memoryUsed: 1024,
          status: 'Success'
        },
        {
          success: false,
          output: '',
          errors: 'error: expected \';\' before \'return\'',
          executionTime: 0,
          memoryUsed: 0,
          status: 'Compilation Error'
        },
        {
          success: true,
          output: customInput ? `Input received: ${customInput}\nProcessed successfully.` : 'No input provided.\nProgram executed successfully.',
          errors: '',
          executionTime: 0.15,
          memoryUsed: 892,
          status: 'Success'
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      
      // If there's custom input, use the third result
      if (customInput) {
        setCompilationResult(mockResults[2]);
      } else {
        setCompilationResult(randomResult);
      }
      
      setIsCompiling(false);
    }, 2000);
  };

  const downloadFile = () => {
    if (!activeFile) return;
    
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const extension = file.name.split('.').pop()?.toLowerCase();
      let language = 'cpp';
      
      // Detect language by extension
      Object.entries(languages).forEach(([key, config]) => {
        if (config.extension === `.${extension}`) {
          language = key;
        }
      });
      
      const newFile: CodeFile = {
        id: Date.now().toString(),
        name: file.name,
        language,
        content,
        lastModified: new Date().toISOString(),
        isUnsaved: false
      };
      
      setFiles(prev => [...prev, newFile]);
      setActiveFileId(newFile.id);
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Code Compiler</h1>
            <p className="text-gray-600">Write, compile, and run your code online</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => createNewFile()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FileTextIcon size={16} />
              New File
            </button>
            
            <button
              onClick={saveFile}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <SaveIcon size={16} />
              Save
            </button>
            
            <button
              onClick={runCode}
              disabled={isCompiling}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isCompiling ? (
                <RefreshCwIcon size={16} className="animate-spin" />
              ) : (
                <PlayIcon size={16} />
              )}
              {isCompiling ? 'Running...' : 'Run Code'}
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <SettingsIcon size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          {/* File Explorer */}
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FolderIcon size={16} />
                Files
              </h3>
              <div className="flex gap-1">
                <label className="cursor-pointer">
                  <UploadIcon size={16} className="text-gray-600 hover:text-blue-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept=".cpp,.java,.py,.c,.js,.txt"
                    onChange={uploadFile}
                  />
                </label>
              </div>
            </div>
            
            <div className="space-y-1">
              {files.map(file => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer group ${
                    activeFileId === file.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveFileId(file.id)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CodeIcon size={14} />
                    <span className="text-sm truncate">
                      {file.name}
                      {file.isUnsaved && '*'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            {/* Language Selector */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New File Language
              </label>
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                onChange={(e) => createNewFile(e.target.value)}
                value=""
              >
                <option value="">Select Language</option>
                {Object.entries(languages).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Code Editor */}
          <div className="col-span-7 bg-white rounded-lg border border-gray-200 flex flex-col">
            <div className="border-b border-gray-200 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">
                  {activeFile?.name}
                </span>
                <span className="text-sm text-gray-500">
                  {activeFile?.language && languages[activeFile.language]?.name}
                </span>
                {activeFile?.isUnsaved && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Unsaved
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadFile}
                  className="text-gray-600 hover:text-blue-600 p-1"
                  title="Download file"
                >
                  <DownloadIcon size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <textarea
                value={activeFile?.content || ''}
                onChange={(e) => updateFileContent(e.target.value)}
                className={`w-full h-full p-4 resize-none border-none outline-none font-mono ${
                  theme === 'dark' 
                    ? 'bg-gray-900 text-green-400' 
                    : 'bg-white text-gray-900'
                }`}
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
                placeholder="Start typing your code here..."
                spellCheck={false}
              />
              
              {/* Line numbers would go here in a real implementation */}
            </div>
          </div>

          {/* Output Panel */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Input Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TerminalIcon size={16} />
                Custom Input
              </h3>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm font-mono h-24 resize-none"
                placeholder="Enter input for your program..."
              />
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <TerminalIcon size={16} />
                  Output
                </h3>
                {compilationResult && (
                  <span className={`flex items-center gap-1 text-sm px-2 py-1 rounded ${
                    compilationResult.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {compilationResult.success ? (
                      <CheckCircleIcon size={14} />
                    ) : (
                      <XCircleIcon size={14} />
                    )}
                    {compilationResult.status}
                  </span>
                )}
              </div>
              
              {isCompiling && (
                <div className="flex items-center gap-2 text-blue-600 py-4">
                  <RefreshCwIcon size={16} className="animate-spin" />
                  <span>Compiling and running your code...</span>
                </div>
              )}
              
              {compilationResult && (
                <div className="space-y-4">
                  {compilationResult.success && compilationResult.output && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Output:</h4>
                      <pre className="bg-green-50 border border-green-200 rounded p-3 text-sm font-mono whitespace-pre-wrap text-green-800">
                        {compilationResult.output}
                      </pre>
                    </div>
                  )}
                  
                  {!compilationResult.success && compilationResult.errors && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <BugIcon size={14} />
                        Errors:
                      </h4>
                      <pre className="bg-red-50 border border-red-200 rounded p-3 text-sm font-mono whitespace-pre-wrap text-red-800">
                        {compilationResult.errors}
                      </pre>
                    </div>
                  )}
                  
                  {compilationResult.success && (
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <ClockIcon size={12} className="text-gray-500" />
                        <span>Time: {compilationResult.executionTime}s</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MemoryStickIcon size={12} className="text-gray-500" />
                        <span>Memory: {compilationResult.memoryUsed} KB</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {!isCompiling && !compilationResult && (
                <div className="text-center py-8 text-gray-500">
                  <TerminalIcon className="mx-auto mb-2" size={32} />
                  <p>Click "Run Code" to see output here</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                  Format Code
                </button>
                <button className="p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                  Check Syntax
                </button>
                <button className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                  Optimize
                </button>
                <button className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors">
                  Debug
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Editor Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600">{fontSize}px</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowSettings(false);
                    alert('Settings saved!');
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs">
        <div className="font-medium mb-1">Keyboard Shortcuts:</div>
        <div>Ctrl+S: Save | Ctrl+R: Run | Ctrl+N: New File</div>
      </div>
    </div>
  );
};

export default CodeCompilerStu;
