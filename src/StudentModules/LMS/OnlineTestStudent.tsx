import React, { useState, useEffect } from 'react';
import { 
  PlayIcon,  
  CheckCircleIcon, 
  AlertTriangleIcon,
  TimerIcon,
  EyeIcon,
  FlagIcon,
  SaveIcon,
  SendIcon,
} from 'lucide-react';

interface Question {
  id: string;
  type: 'mcq' | 'multiple' | 'true-false' | 'short' | 'long';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
}

interface Test {
  id: string;
  title: string;
  subject: string;
  instructor: string;
  duration: number;
  totalMarks: number;
  totalQuestions: number;
  passingMarks: number;
  instructions: string[];
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'active' | 'completed' | 'missed';
  allowRetake: boolean;
  showResults: boolean;
  questions: Question[];
  timeLimit: number;
  negativeMarking: boolean;
  attempts: number;
  maxAttempts: number;
}

interface TestAttempt {
  id: string;
  testId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  timeSpent: number;
  answers: { [questionId: string]: string | string[] };
  flaggedQuestions: string[];
  score?: number;
  status: 'in-progress' | 'submitted' | 'auto-submitted';
}

const OnlineTestStu: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: '1',
      title: 'Data Structures Mid-term Examination',
      subject: 'Data Structures',
      instructor: 'Dr. Rajesh Kumar',
      duration: 90,
      totalMarks: 100,
      totalQuestions: 25,
      passingMarks: 40,
      instructions: [
        'Read all questions carefully before answering',
        'Each question carries equal marks',
        'No negative marking for wrong answers',
        'You can flag questions for review',
        'Submit the test before time expires',
        'Once submitted, you cannot modify answers'
      ],
      startTime: '2025-09-03T10:00:00Z',
      endTime: '2025-09-03T11:30:00Z',
      status: 'active',
      allowRetake: false,
      showResults: true,
      timeLimit: 90,
      negativeMarking: false,
      attempts: 0,
      maxAttempts: 1,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is the time complexity of binary search in a sorted array?',
          options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
          correctAnswer: 'O(log n)',
          marks: 4,
          difficulty: 'easy',
          subject: 'Data Structures',
          topic: 'Searching'
        },
        {
          id: 'q2',
          type: 'multiple',
          question: 'Which of the following are linear data structures? (Select all that apply)',
          options: ['Array', 'Stack', 'Queue', 'Binary Tree', 'Linked List'],
          correctAnswer: ['Array', 'Stack', 'Queue', 'Linked List'],
          marks: 4,
          difficulty: 'medium',
          subject: 'Data Structures',
          topic: 'Linear Data Structures'
        },
        {
          id: 'q3',
          type: 'true-false',
          question: 'A stack follows the LIFO (Last In First Out) principle.',
          correctAnswer: 'true',
          marks: 2,
          difficulty: 'easy',
          subject: 'Data Structures',
          topic: 'Stack'
        },
        {
          id: 'q4',
          type: 'short',
          question: 'Explain the difference between array and linked list in terms of memory allocation.',
          marks: 10,
          difficulty: 'medium',
          subject: 'Data Structures',
          topic: 'Arrays and Linked Lists'
        }
      ]
    },
    {
      id: '2',
      title: 'Database Management Quiz',
      subject: 'DBMS',
      instructor: 'Prof. Priya Sharma',
      duration: 30,
      totalMarks: 50,
      totalQuestions: 15,
      passingMarks: 25,
      instructions: [
        'This is a quick assessment quiz',
        'Each MCQ carries 3 marks, True/False carries 2 marks',
        'Total duration is 30 minutes',
        'Auto-submit will happen when time expires'
      ],
      startTime: '2025-09-04T14:00:00Z',
      endTime: '2025-09-04T14:30:00Z',
      status: 'upcoming',
      allowRetake: true,
      showResults: true,
      timeLimit: 30,
      negativeMarking: true,
      attempts: 0,
      maxAttempts: 2,
      questions: []
    }
  ]);

  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<TestAttempt | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string | string[] }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (testStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testStarted, timeRemaining]);

  // Auto-save answers every 30 seconds
  useEffect(() => {
    if (testStarted && currentAttempt) {
      const autoSaveInterval = setInterval(() => {
        saveAnswers();
      }, 30000);
      return () => clearInterval(autoSaveInterval);
    }
  }, [testStarted, currentAttempt, answers]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = (test: Test) => {
    const attempt: TestAttempt = {
      id: Date.now().toString(),
      testId: test.id,
      studentId: 'current-student',
      startTime: new Date().toISOString(),
      timeSpent: 0,
      answers: {},
      flaggedQuestions: [],
      status: 'in-progress'
    };

    setCurrentTest(test);
    setCurrentAttempt(attempt);
    setTimeRemaining(test.timeLimit * 60);
    setTestStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions([]);
    setShowInstructions(false);
  };

  const saveAnswers = () => {
    setAutoSaveStatus('saving');
    setTimeout(() => {
      setAutoSaveStatus('saved');
    }, 1000);
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    setAutoSaveStatus('unsaved');
  };

  const toggleQuestionFlag = (questionId: string) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (currentTest && currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAutoSubmit = () => {
    if (currentAttempt && currentTest) {
      const updatedAttempt = {
        ...currentAttempt,
        endTime: new Date().toISOString(),
        timeSpent: currentTest.timeLimit * 60,
        answers,
        flaggedQuestions,
        status: 'auto-submitted' as const
      };
      
      setCurrentAttempt(updatedAttempt);
      setTestStarted(false);
      alert('Time up! Test has been automatically submitted.');
    }
  };

  const submitTest = () => {
    if (currentAttempt && currentTest) {
      const updatedAttempt = {
        ...currentAttempt,
        endTime: new Date().toISOString(),
        timeSpent: (currentTest.timeLimit * 60) - timeRemaining,
        answers,
        flaggedQuestions,
        status: 'submitted' as const
      };
      
      // Calculate score (simplified)
      let score = 0;
      currentTest.questions.forEach(question => {
        const userAnswer = answers[question.id];
        if (userAnswer === question.correctAnswer) {
          score += question.marks;
        }
      });
      
      updatedAttempt.score = score;
      setCurrentAttempt(updatedAttempt);
      setTestStarted(false);
      setShowConfirmSubmit(false);
      
      // Update test attempts
      setTests(prev => prev.map(test => 
        test.id === currentTest.id 
          ? { ...test, attempts: test.attempts + 1 }
          : test
      ));
      
      alert(`Test submitted successfully! Your score: ${score}/${currentTest.totalMarks}`);
    }
  };

  const getQuestionStatus = (questionIndex: number) => {
    const question = currentTest?.questions[questionIndex];
    if (!question) return 'unanswered';
    
    const hasAnswer = answers[question.id] !== undefined && answers[question.id] !== '';
    const isFlagged = flaggedQuestions.includes(question.id);
    
    if (hasAnswer && isFlagged) return 'answered-flagged';
    if (hasAnswer) return 'answered';
    if (isFlagged) return 'flagged';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'unanswered': 'bg-gray-200 text-gray-700',
      'answered': 'bg-green-200 text-green-800',
      'flagged': 'bg-yellow-200 text-yellow-800',
      'answered-flagged': 'bg-blue-200 text-blue-800',
      'current': 'bg-blue-500 text-white'
    };
    return colors[status as keyof typeof colors];
  };

  if (testStarted && currentTest && currentAttempt) {
    const currentQuestion = currentTest.questions[currentQuestionIndex];
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Test Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{currentTest.title}</h1>
              <p className="text-sm text-gray-600">{currentTest.subject} • {currentTest.instructor}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-600">Time Remaining</div>
                <div className={`text-xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                  {formatTime(timeRemaining)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-semibold text-gray-900">
                  {currentQuestionIndex + 1}/{currentTest.questions.length}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`text-xs px-2 py-1 rounded ${
                  autoSaveStatus === 'saved' ? 'bg-green-100 text-green-700' :
                  autoSaveStatus === 'saving' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {autoSaveStatus === 'saved' && <><SaveIcon size={12} className="inline mr-1" />Saved</>}
                  {autoSaveStatus === 'saving' && 'Saving...'}
                  {autoSaveStatus === 'unsaved' && 'Unsaved'}
                </div>
                
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <SendIcon size={16} />
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
              
              <div className="grid grid-cols-5 lg:grid-cols-3 gap-2 mb-4">
                {currentTest.questions.map((_, index) => {
                  const status = index === currentQuestionIndex ? 'current' : getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => navigateToQuestion(index)}
                      className={`w-10 h-10 rounded text-sm font-medium transition-colors ${getStatusColor(status)}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 rounded"></div>
                  <span>Answered & Flagged</span>
                </div>
              </div>
              
              {/* Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <span>{Object.keys(answers).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flagged:</span>
                    <span>{flaggedQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span>{currentTest.questions.length - Object.keys(answers).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Question {currentQuestionIndex + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {currentQuestion.difficulty.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">{currentQuestion.marks} marks</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleQuestionFlag(currentQuestion.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FlagIcon size={16} />
                    {flaggedQuestions.includes(currentQuestion.id) ? 'Flagged' : 'Flag'}
                  </button>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-4 leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                  
                  {/* MCQ Options */}
                  {currentQuestion.type === 'mcq' && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name={`question_${currentQuestion.id}`}
                            value={option}
                            checked={answers[currentQuestion.id] === option}
                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                            className="text-blue-600"
                          />
                          <span className="text-gray-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {/* Multiple Choice Options */}
                  {currentQuestion.type === 'multiple' && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            value={option}
                            checked={Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).includes(option)}
                            onChange={(e) => {
                              const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
                              const newAnswers = e.target.checked
                                ? [...currentAnswers, option]
                                : currentAnswers.filter(a => a !== option);
                              handleAnswerChange(currentQuestion.id, newAnswers);
                            }}
                            className="text-blue-600 rounded"
                          />
                          <span className="text-gray-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {/* True/False */}
                  {currentQuestion.type === 'true-false' && (
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={`question_${currentQuestion.id}`}
                          value="true"
                          checked={answers[currentQuestion.id] === 'true'}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-gray-900">True</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={`question_${currentQuestion.id}`}
                          value="false"
                          checked={answers[currentQuestion.id] === 'false'}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-gray-900">False</span>
                      </label>
                    </div>
                  )}
                  
                  {/* Short Answer */}
                  {currentQuestion.type === 'short' && (
                    <textarea
                      value={(answers[currentQuestion.id] as string) || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-blue-500"
                      placeholder="Type your answer here..."
                    />
                  )}
                  
                  {/* Long Answer */}
                  {currentQuestion.type === 'long' && (
                    <textarea
                      value={(answers[currentQuestion.id] as string) || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 h-40 focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your detailed answer here..."
                    />
                  )}
                </div>
              </div>
              
              {/* Navigation Footer */}
              <div className="border-t border-gray-200 p-6 flex items-center justify-between">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ← Previous
                </button>
                
                <div className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {currentTest.questions.length}
                </div>
                
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === currentTest.questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Test?</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Questions Answered:</span>
                  <span className="font-medium">{Object.keys(answers).length}/{currentTest.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions Flagged:</span>
                  <span className="font-medium">{flaggedQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Remaining:</span>
                  <span className="font-medium">{formatTime(timeRemaining)}</span>
                </div>
              </div>
              
              {Object.keys(answers).length < currentTest.questions.length && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangleIcon size={16} className="text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Warning!</p>
                      <p>You have {currentTest.questions.length - Object.keys(answers).length} unanswered questions. Are you sure you want to submit?</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Continue Test
                </button>
                <button
                  onClick={submitTest}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Online Tests</h1>
              <p className="text-gray-600 mt-1">Take your scheduled tests and view results</p>
            </div>
          </div>
        </div>

        {/* Test Cards */}
        <div className="grid gap-6">
          {tests.map(test => (
            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{test.title}</h2>
                      <p className="text-gray-600">{test.subject} • {test.instructor}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      test.status === 'active' ? 'bg-green-100 text-green-800' :
                      test.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      test.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {test.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold flex items-center gap-1">
                        <TimerIcon size={16} />
                        {test.duration} min
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Questions</div>
                      <div className="font-semibold">{test.totalQuestions}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Total Marks</div>
                      <div className="font-semibold">{test.totalMarks}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Passing Marks</div>
                      <div className="font-semibold">{test.passingMarks}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>Start: {new Date(test.startTime).toLocaleString()}</span>
                    <span>End: {new Date(test.endTime).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {test.allowRetake && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Retakes Allowed
                      </span>
                    )}
                    {test.negativeMarking && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                        Negative Marking
                      </span>
                    )}
                    {test.showResults && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Results Shown
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      Attempts: {test.attempts}/{test.maxAttempts}
                    </span>
                  </div>
                </div>
                
                <div className="lg:w-64 flex flex-col gap-3">
                  {test.status === 'active' && (
                    <>
                      <button
                        onClick={() => {
                          setCurrentTest(test);
                          setShowInstructions(true);
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium"
                      >
                        <PlayIcon size={20} />
                        Start Test
                      </button>
                      <div className="text-center text-sm text-gray-600">
                        Time remaining to start: {Math.max(0, Math.floor((new Date(test.endTime).getTime() - new Date().getTime()) / (1000 * 60)))} min
                      </div>
                    </>
                  )}
                  
                  {test.status === 'upcoming' && (
                    <div className="text-center">
                      <div className="bg-blue-50 text-blue-700 py-3 px-4 rounded-lg">
                        <div className="font-medium">Starts in</div>
                        <div className="text-sm">
                          {Math.max(0, Math.floor((new Date(test.startTime).getTime() - new Date().getTime()) / (1000 * 60)))} minutes
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {test.status === 'completed' && (
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                      <EyeIcon size={20} />
                      View Results
                    </button>
                  )}
                  
                  {test.status === 'missed' && (
                    <div className="text-center bg-red-50 text-red-700 py-3 px-4 rounded-lg">
                      Test Missed
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Modal */}
        {showInstructions && currentTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Test Instructions</h2>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{currentTest.title}</h3>
                <p className="text-gray-600">{currentTest.subject} • Duration: {currentTest.duration} minutes</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-900">Please read the following instructions carefully:</h4>
                <ul className="space-y-2">
                  {currentTest.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircleIcon size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <AlertTriangleIcon size={16} className="text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Important:</p>
                    <p>Once you start the test, the timer will begin. Make sure you have a stable internet connection.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => startTest(currentTest)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineTestStu;
