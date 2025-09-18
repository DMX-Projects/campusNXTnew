import React, { useState, useEffect, useCallback } from 'react';
import {
  ClockIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  TargetIcon,
  AwardIcon,
  RefreshCwIcon,
  EyeIcon,
  BookOpenIcon,
  BrainIcon,
  BarChart3Icon,
  PieChartIcon,
  CalendarIcon,
  UserIcon,
  StarIcon,
  FilterIcon,
  SearchIcon,
  DownloadIcon,
  ShareIcon,
  TimerIcon,
  ZapIcon,
  FlagIcon,
  HelpCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SkipForwardIcon,
  XIcon,
  InfoIcon,
  BellIcon,
  ThumbsUpIcon,
  ThumbsDownIcon
} from 'lucide-react';

interface MockTest {
  id: string;
  title: string;
  description: string;
  category: 'aptitude' | 'technical' | 'verbal' | 'coding' | 'full-test' | 'company-specific';
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
  totalQuestions: number;
  duration: number;
  maxMarks: number;
  passMarks: number;
  negativeMarking: boolean;
  negativeMarkingRatio: number;
  instructions: string[];
  syllabus: string[];
  companyName?: string;
  yearConducted?: string;
  questionTypes: QuestionType[];
  isAttempted: boolean;
  bestScore?: number;
  attemptCount: number;
  averageScore: number;
  totalAttempts: number;
  tags: string[];
  rating: number;
  reviews: number;
  isBookmarked: boolean;
  isPremium: boolean;
  validUntil?: string;
}

interface QuestionType {
  type: string;
  count: number;
  marks: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  marks: number;
  negativeMarks: number;
  timeRecommended: number;
}

interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  startTime: string;
  endTime?: string;
  status: 'ongoing' | 'completed' | 'paused' | 'abandoned';
  answers: { [questionId: string]: number | null };
  markedForReview: string[];
  timeSpent: { [questionId: string]: number };
  totalTimeSpent: number;
  score?: number;
  percentage?: number;
  rank?: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
  unattempted?: number;
  sectionWiseScore?: { [section: string]: number };
  analysis?: TestAnalysis;
}

interface TestAnalysis {
  overallPerformance: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  topicWiseAnalysis: { [topic: string]: { attempted: number; correct: number; percentage: number } };
  difficultyWiseAnalysis: { easy: number; medium: number; hard: number };
  timeAnalysis: { fast: number; optimal: number; slow: number };
  comparisonWithPeers: { better: number; average: number; below: number };
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

const PlacementMockTests: React.FC = () => {
  // State for tests and data
  const [mockTests, setMockTests] = useState<MockTest[]>([
    {
      id: '1',
      title: 'TCS National Qualifier Test (NQT) - Full Length',
      description: 'Complete TCS NQT simulation with all sections including numerical ability, verbal ability, reasoning ability, and programming logic.',
      category: 'company-specific',
      subcategory: 'TCS NQT',
      difficulty: 'medium',
      totalQuestions: 90,
      duration: 90,
      maxMarks: 90,
      passMarks: 50,
      negativeMarking: false,
      negativeMarkingRatio: 0,
      instructions: [
        'This test contains 90 questions to be solved in 90 minutes',
        'All questions are compulsory',
        'No negative marking',
        'Calculator is not allowed',
        'Once submitted, answers cannot be changed'
      ],
      syllabus: ['Quantitative Aptitude', 'Verbal Ability', 'Logical Reasoning', 'Programming Concepts'],
      companyName: 'TCS',
      yearConducted: '2024',
      questionTypes: [
        { type: 'Numerical Ability', count: 26, marks: 26 },
        { type: 'Verbal Ability', count: 24, marks: 24 },
        { type: 'Reasoning Ability', count: 30, marks: 30 },
        { type: 'Programming Logic', count: 10, marks: 10 }
      ],
      isAttempted: true,
      bestScore: 72,
      attemptCount: 2,
      averageScore: 68,
      totalAttempts: 1250,
      tags: ['tcs', 'nqt', 'placement', 'full-length'],
      rating: 4.6,
      reviews: 890,
      isBookmarked: true,
      isPremium: false
    },
    {
      id: '2',
      title: 'Infosys Mysore InfyTQ Mock Test',
      description: 'Practice test based on Infosys recruitment pattern covering programming fundamentals, database management, and software engineering.',
      category: 'company-specific',
      subcategory: 'Infosys InfyTQ',
      difficulty: 'medium',
      totalQuestions: 60,
      duration: 95,
      maxMarks: 100,
      passMarks: 65,
      negativeMarking: true,
      negativeMarkingRatio: 0.25,
      instructions: [
        'Test duration: 95 minutes for 60 questions',
        'Negative marking: -0.25 for wrong answers',
        'Programming questions carry more weightage',
        'Use of external resources is not allowed',
        'Internet connectivity required throughout'
      ],
      syllabus: ['Programming Concepts', 'Database Management', 'Software Engineering', 'Logical Reasoning'],
      companyName: 'Infosys',
      yearConducted: '2024',
      questionTypes: [
        { type: 'Programming Fundamentals', count: 25, marks: 40 },
        { type: 'Database Concepts', count: 15, marks: 25 },
        { type: 'Software Engineering', count: 10, marks: 20 },
        { type: 'Logical Reasoning', count: 10, marks: 15 }
      ],
      isAttempted: false,
      attemptCount: 0,
      averageScore: 71,
      totalAttempts: 980,
      tags: ['infosys', 'infytq', 'programming', 'database'],
      rating: 4.4,
      reviews: 567,
      isBookmarked: false,
      isPremium: true
    }
  ]);

  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);
  const [currentTest, setCurrentTest] = useState<MockTest | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<TestAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<TestAttempt | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState('');
  
  // Filter states
  const [filteredTests, setFilteredTests] = useState<MockTest[]>(mockTests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'difficulty' | 'duration' | 'attempts'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sample questions for demonstration
  const sampleQuestions: Question[] = [
    {
      id: '1',
      question: 'What is the time complexity of binary search algorithm?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
      correctAnswer: 1,
      explanation: 'Binary search divides the search interval in half with each iteration, resulting in O(log n) time complexity.',
      difficulty: 'easy',
      topic: 'Algorithms',
      marks: 1,
      negativeMarks: 0.25,
      timeRecommended: 60
    },
    {
      id: '2',
      question: 'If a man can complete a work in 12 days and a woman can complete the same work in 18 days, how many days will they take to complete the work together?',
      options: ['7.2 days', '6.5 days', '8.1 days', '9.0 days'],
      correctAnswer: 0,
      explanation: 'Combined rate = 1/12 + 1/18 = (3+2)/36 = 5/36. Time = 36/5 = 7.2 days.',
      difficulty: 'medium',
      topic: 'Time and Work',
      marks: 1,
      negativeMarks: 0.33,
      timeRecommended: 90
    }
  ];

  // Toast notification system
  const showToast = useCallback((type: Toast['type'], title: string, message: string, duration = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, title, message, duration };
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Confirmation modal system
  const showConfirmation = useCallback((message: string, onConfirm: () => void) => {
    setConfirmMessage(message);
    setConfirmAction(() => onConfirm);
    setShowConfirmModal(true);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTestActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestActive, timeLeft]);

  // Filter tests
  useEffect(() => {
    let filtered = mockTests.filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty;
      const matchesBookmarked = !showBookmarkedOnly || test.isBookmarked;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmarked;
    });

    // Sort tests
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'duration':
          return a.duration - b.duration;
        case 'attempts':
          return b.totalAttempts - a.totalAttempts;
        default:
          return 0;
      }
    });

    setFilteredTests(filtered);
  }, [mockTests, searchTerm, selectedCategory, selectedDifficulty, showBookmarkedOnly, sortBy]);

  const startTest = useCallback((test: MockTest) => {
    if (test.isPremium) {
      setShowPremiumModal(true);
      return;
    }

    setCurrentTest(test);
    setShowInstructions(true);
  }, []);

  const beginTest = useCallback(() => {
    if (!currentTest) return;

    const attempt: TestAttempt = {
      id: Date.now().toString(),
      testId: currentTest.id,
      testTitle: currentTest.title,
      startTime: new Date().toISOString(),
      status: 'ongoing',
      answers: {},
      markedForReview: [],
      timeSpent: {},
      totalTimeSpent: 0
    };

    setCurrentAttempt(attempt);
    setQuestions(sampleQuestions);
    setCurrentQuestionIndex(0);
    setTimeLeft(currentTest.duration * 60);
    setIsTestActive(true);
    setShowInstructions(false);
    setSelectedAnswer(null);

    // Update attempt count
    setMockTests(prev => prev.map(test => 
      test.id === currentTest.id 
        ? { ...test, attemptCount: test.attemptCount + 1, isAttempted: true }
        : test
    ));

    showToast('success', 'Test Started', `${currentTest.title} has begun. Good luck!`);
  }, [currentTest, sampleQuestions, showToast]);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (!currentAttempt) return;

    setSelectedAnswer(answerIndex);
    
    setCurrentAttempt(prev => prev ? {
      ...prev,
      answers: {
        ...prev.answers,
        [questions[currentQuestionIndex].id]: answerIndex
      }
    } : null);
  }, [currentAttempt, questions, currentQuestionIndex]);

  const markForReview = useCallback(() => {
    if (!currentAttempt) return;

    const questionId = questions[currentQuestionIndex].id;
    
    setCurrentAttempt(prev => prev ? {
      ...prev,
      markedForReview: prev.markedForReview.includes(questionId)
        ? prev.markedForReview.filter(id => id !== questionId)
        : [...prev.markedForReview, questionId]
    } : null);

    const isMarked = currentAttempt.markedForReview.includes(questionId);
    showToast('info', isMarked ? 'Removed from Review' : 'Marked for Review', 
      isMarked ? 'Question removed from review list' : 'Question added to review list');
  }, [currentAttempt, questions, currentQuestionIndex, showToast]);

  const navigateQuestion = useCallback((direction: 'prev' | 'next' | number) => {
    if (typeof direction === 'number') {
      setCurrentQuestionIndex(direction);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }

    // Load saved answer if any
    const questionId = questions[currentQuestionIndex].id;
    const savedAnswer = currentAttempt?.answers[questionId];
    setSelectedAnswer(savedAnswer !== undefined ? savedAnswer : null);
  }, [currentQuestionIndex, questions, currentAttempt]);

  const pauseTest = useCallback(() => {
    if (!currentAttempt) return;

    setIsTestActive(false);
    setCurrentAttempt(prev => prev ? { ...prev, status: 'paused' } : null);
    showToast('warning', 'Test Paused', 'Your progress has been saved. Click Resume to continue.');
  }, [currentAttempt, showToast]);

  const resumeTest = useCallback(() => {
    if (!currentAttempt) return;

    setIsTestActive(true);
    setCurrentAttempt(prev => prev ? { ...prev, status: 'ongoing' } : null);
    showToast('success', 'Test Resumed', 'Welcome back! Continue from where you left off.');
  }, [currentAttempt, showToast]);

  const handleSubmitTest = useCallback(() => {
    if (!currentTest || !currentAttempt) return;

    const submitTest = () => {
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let unattempted = 0;
      let totalScore = 0;

      questions.forEach(question => {
        const userAnswer = currentAttempt.answers[question.id];
        if (userAnswer === undefined || userAnswer === null) {
          unattempted++;
        } else if (userAnswer === question.correctAnswer) {
          correctAnswers++;
          totalScore += question.marks;
        } else {
          incorrectAnswers++;
          if (currentTest.negativeMarking) {
            totalScore -= question.negativeMarks;
          }
        }
      });

      const percentage = Math.round((totalScore / currentTest.maxMarks) * 100);
      const rank = Math.floor(Math.random() * 500) + 1;

      const completedAttempt: TestAttempt = {
        ...currentAttempt,
        endTime: new Date().toISOString(),
        status: 'completed',
        score: totalScore,
        percentage,
        rank,
        correctAnswers,
        incorrectAnswers,
        unattempted,
        totalTimeSpent: (currentTest.duration * 60) - timeLeft,
        analysis: generateAnalysis(totalScore, correctAnswers, incorrectAnswers, unattempted)
      };

      setTestAttempts(prev => [...prev, completedAttempt]);
      
      setMockTests(prev => prev.map(test => 
        test.id === currentTest.id 
          ? { 
              ...test, 
              bestScore: Math.max(test.bestScore || 0, totalScore),
              totalAttempts: test.totalAttempts + 1
            }
          : test
      ));

      setIsTestActive(false);
      setSelectedAttempt(completedAttempt);
      setShowResults(true);

      // Reset test state
      setCurrentTest(null);
      setCurrentAttempt(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setTimeLeft(0);

      showToast('success', 'Test Completed!', 
        `Score: ${totalScore}/${currentTest.maxMarks} (${percentage}%)`);
    };

    showConfirmation(
      'Are you sure you want to submit the test? This action cannot be undone.',
      submitTest
    );
  }, [currentTest, currentAttempt, questions, timeLeft, showConfirmation, showToast]);

  const generateAnalysis = useCallback((score: number, correct: number, incorrect: number, unattempted: number): TestAnalysis => {
    return {
      overallPerformance: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Improvement',
      strengths: ['Time Management', 'Problem Solving'],
      weaknesses: ['Speed', 'Accuracy'],
      recommendations: [
        'Practice more mock tests',
        'Focus on weak areas',
        'Improve time management'
      ],
      topicWiseAnalysis: {},
      difficultyWiseAnalysis: { easy: 85, medium: 70, hard: 55 },
      timeAnalysis: { fast: 25, optimal: 50, slow: 25 },
      comparisonWithPeers: { better: 40, average: 35, below: 25 }
    };
  }, []);

  const toggleBookmark = useCallback((testId: string) => {
    setMockTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, isBookmarked: !test.isBookmarked }
        : test
    ));
    
    const test = mockTests.find(t => t.id === testId);
    if (test) {
      showToast('success', 'Bookmark Updated', 
        `${test.isBookmarked ? 'Removed from' : 'Added to'} bookmarks`);
    }
  }, [mockTests, showToast]);

  const shareTest = useCallback((test: MockTest) => {
    const shareText = `Check out this mock test: ${test.title}
    
📊 ${test.totalQuestions} questions | ⏱️ ${test.duration} minutes
⭐ Rating: ${test.rating}/5 | 🎯 Difficulty: ${test.difficulty}
📈 ${test.totalAttempts} attempts by students

Great for ${test.category} preparation!`;

    if (navigator.share) {
      navigator.share({
        title: test.title,
        text: shareText,
        url: window.location.href
      }).then(() => {
        showToast('success', 'Shared Successfully', 'Test details shared');
      }).catch(() => {
        navigator.clipboard.writeText(shareText);
        showToast('success', 'Copied to Clipboard', 'Test details copied');
      });
    } else {
      navigator.clipboard.writeText(shareText);
      showToast('success', 'Copied to Clipboard', 'Test details copied to clipboard');
    }
  }, [showToast]);

  const downloadReport = useCallback((attempt: TestAttempt) => {
    // Simulate report generation and download
    const reportData = {
      testTitle: attempt.testTitle,
      score: attempt.score,
      percentage: attempt.percentage,
      rank: attempt.rank,
      completedAt: attempt.endTime,
      analysis: attempt.analysis
    };

    console.log('Downloading report:', reportData);
    
    // Create and trigger download
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${attempt.testTitle.replace(/\s+/g, '_')}_Report.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    showToast('success', 'Report Downloaded', 'Check your downloads folder');
  }, [showToast]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'aptitude': 'bg-blue-100 text-blue-800',
      'technical': 'bg-green-100 text-green-800',
      'verbal': 'bg-purple-100 text-purple-800',
      'coding': 'bg-orange-100 text-orange-800',
      'full-test': 'bg-indigo-100 text-indigo-800',
      'company-specific': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const stats = {
    totalTests: mockTests.length,
    attempted: mockTests.filter(t => t.isAttempted).length,
    bookmarked: mockTests.filter(t => t.isBookmarked).length,
    averageScore: testAttempts.length > 0 
      ? Math.round(testAttempts.reduce((sum, attempt) => sum + (attempt.percentage || 0), 0) / testAttempts.length)
      : 0
  };

  if (isTestActive && currentTest && currentAttempt) {
    // Test Interface
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isMarkedForReview = currentAttempt.markedForReview.includes(currentQuestion?.id);

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Test Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">{currentTest.title}</h1>
              <p className="text-sm text-gray-300">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Timer */}
              <div className="flex items-center gap-2 bg-red-900 px-3 py-2 rounded-lg">
                <TimerIcon size={16} />
                <span className="font-mono text-lg">
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={pauseTest}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <PauseIcon size={16} />
                  Pause
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Panel */}
            <div className="lg:col-span-3">
              <div className="bg-white text-gray-900 rounded-xl p-6">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {currentQuestion && (
                  <div>
                    {/* Question Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Q{currentQuestionIndex + 1}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                          {currentQuestion.difficulty.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-600">
                          {currentQuestion.topic} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={markForReview}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            isMarkedForReview 
                              ? 'bg-orange-200 text-orange-800' 
                              : 'bg-gray-200 text-gray-700 hover:bg-orange-100'
                          }`}
                        >
                          <FlagIcon size={14} className="inline mr-1" />
                          {isMarkedForReview ? 'Marked' : 'Mark for Review'}
                        </button>
                      </div>
                    </div>

                    {/* Question */}
                    <div className="mb-6">
                      <h2 className="text-lg font-medium mb-4 leading-relaxed">
                        {currentQuestion.question}
                      </h2>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                      {currentQuestion.options.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedAnswer === index 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => selectAnswer(index)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                            selectedAnswer === index 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswer === index && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => navigateQuestion('prev')}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon size={16} />
                        Previous
                      </button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedAnswer(null)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          Clear Response
                        </button>
                        
                        {currentQuestionIndex < questions.length - 1 ? (
                          <button
                            onClick={() => navigateQuestion('next')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Next
                            <ChevronRightIcon size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmitTest}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Submit Test
                            <CheckCircleIcon size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Question Navigation Sidebar */}
            <div className="bg-white text-gray-900 rounded-xl p-4">
              <h3 className="font-semibold mb-4">Question Navigation</h3>
              
              {/* Legend */}
              <div className="mb-4 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  <span>Not Visited</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => {
                  const isAnswered = currentAttempt?.answers[question.id] !== undefined;
                  const isMarked = currentAttempt?.markedForReview.includes(question.id);
                  const isCurrent = index === currentQuestionIndex;
                  
                  let bgColor = 'bg-gray-300';
                  if (isCurrent) bgColor = 'bg-red-500 text-white';
                  else if (isMarked) bgColor = 'bg-orange-500 text-white';
                  else if (isAnswered) bgColor = 'bg-green-500 text-white';
                  
                  return (
                    <button
                      key={question.id}
                      onClick={() => navigateQuestion(index)}
                      className={`w-8 h-8 rounded text-xs font-medium transition-colors ${bgColor} hover:opacity-80`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="mt-4 pt-4 border-t text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <span className="font-medium">{Object.keys(currentAttempt?.answers || {}).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marked:</span>
                    <span className="font-medium">{currentAttempt?.markedForReview.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Not Visited:</span>
                    <span className="font-medium">
                      {questions.length - Math.max(currentQuestionIndex + 1, Object.keys(currentAttempt?.answers || {}).length)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentAttempt?.status === 'paused') {
    // Paused Test Screen
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⏸️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Paused</h2>
          <p className="text-gray-600 mb-6">
            Your test progress has been saved. Click resume to continue where you left off.
          </p>
          <div className="space-y-3">
            <button
              onClick={resumeTest}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <PlayIcon size={20} />
              Resume Test
            </button>
            <button
              onClick={() => {
                setCurrentAttempt(null);
                setIsTestActive(false);
                showToast('info', 'Test Exited', 'You can resume your test later');
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg transition-colors"
            >
              Exit Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all transform ${
                toast.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                toast.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                toast.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{toast.title}</div>
                <div className="text-xs mt-1">{toast.message}</div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Placement Mock Tests</h1>
              <p className="text-gray-600 mt-1">Practice with real placement test patterns and improve your performance</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* <button
                onClick={() => console.log('Opening analytics dashboard...')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BarChart3Icon size={20} />
                View Analytics
              </button>
              <button
                onClick={() => console.log('Opening progress tracker...')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <TrendingUpIcon size={20} />
                Track Progress
              </button> */}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Available Tests</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalTests}</p>
                </div>
                <BrainIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Attempted</p>
                  <p className="text-2xl font-bold text-green-900">{stats.attempted}</p>
                </div>
                <CheckCircleIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Average Score</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.averageScore}%</p>
                </div>
                <AwardIcon className="text-purple-600" size={24} />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Bookmarked</p>
                  <p className="text-2xl font-bold text-red-900">{stats.bookmarked}</p>
                </div>
                <FlagIcon className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tests by title, company, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="aptitude">Aptitude</option>
                  <option value="technical">Technical</option>
                  <option value="verbal">Verbal</option>
                  <option value="coding">Coding</option>
                  <option value="full-test">Full Test</option>
                  <option value="company-specific">Company Specific</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rating">By Rating</option>
                  <option value="difficulty">By Difficulty</option>
                  <option value="duration">By Duration</option>
                  <option value="attempts">By Popularity</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors lg:hidden"
                >
                  <FilterIcon size={16} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                
                <button
                  onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    showBookmarkedOnly 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bookmarked Only ({stats.bookmarked})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTests.map(test => (
            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <div className="p-6">
                {/* Test Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{test.title}</h3>
                      {test.isPremium && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{test.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(test.category)}`}>
                        {test.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty.toUpperCase()}
                      </span>
                      {test.companyName && (
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                          {test.companyName}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1 ml-4">
                    <button
                      onClick={() => toggleBookmark(test.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        test.isBookmarked 
                          ? 'text-red-500 bg-red-100' 
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <FlagIcon size={16} fill={test.isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => shareTest(test)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ShareIcon size={16} />
                    </button>
                  </div>
                </div>

                {/* Test Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{test.totalQuestions}</div>
                    <div className="text-xs text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{test.duration}</div>
                    <div className="text-xs text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{test.maxMarks}</div>
                    <div className="text-xs text-gray-600">Max Marks</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <StarIcon size={14} className="text-yellow-500 fill-current" />
                      <span className="text-lg font-bold text-gray-900">{test.rating}</span>
                    </div>
                    <div className="text-xs text-gray-600">({test.reviews})</div>
                  </div>
                </div>

                {/* Performance Info */}
                {test.isAttempted && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-900">Your Performance</span>
                      <span className="text-sm text-blue-700">Attempts: {test.attemptCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Best Score: {test.bestScore}/{test.maxMarks}</span>
                      <span className="text-sm font-medium text-blue-900">
                        {Math.round(((test.bestScore || 0) / test.maxMarks) * 100)}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Question Types */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Question Distribution:</h4>
                  <div className="space-y-1">
                    {test.questionTypes.slice(0, 3).map((type, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">{type.type}</span>
                        <span className="font-medium text-gray-900">{type.count} questions ({type.marks} marks)</span>
                      </div>
                    ))}
                    {test.questionTypes.length > 3 && (
                      <div className="text-xs text-blue-600">
                        +{test.questionTypes.length - 3} more sections
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{test.totalAttempts.toLocaleString()} students attempted</span>
                  <span>Avg: {test.averageScore}%</span>
                  {test.negativeMarking && (
                    <span className="text-red-600">-{test.negativeMarkingRatio} negative marking</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => startTest(test)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      test.isPremium 
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <PlayIcon size={16} />
                    {test.isAttempted ? 'Retake Test' : 'Start Test'}
                    {test.isPremium && '🔒'}
                  </button>
                  
                  <div className="flex gap-2">
                    {/* <button
                      onClick={() => console.log(`Viewing details for: ${test.title}`)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <EyeIcon size={14} />
                      View Details
                    </button> */}
                    
                    {test.isAttempted && (
                      <button
                        onClick={() => {
                          const attempt = testAttempts.find(a => a.testId === test.id);
                          if (attempt) {
                            setSelectedAttempt(attempt);
                            setShowAnalysis(true);
                          } else {
                            showToast('info', 'No Results', 'No test attempts found for analysis');
                          }
                        }}
                        className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <BarChart3Icon size={14} />
                        View Results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BrainIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || showBookmarkedOnly
                ? 'Try adjusting your search criteria or filters'
                : 'Mock tests will appear here when available'
              }
            </p>
            {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || showBookmarkedOnly) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setShowBookmarkedOnly(false);
                  showToast('success', 'Filters Cleared', 'All filters have been reset');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Premium Modal */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Premium Test</h2>
                <p className="text-gray-600 mb-6">
                  This is a premium test. Upgrade your account to access premium content and features.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowPremiumModal(false);
                      showToast('info', 'Upgrade Required', 'Contact admin to upgrade your account');
                    }}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    Upgrade to Premium
                  </button>
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="text-center">
                <div className="text-4xl mb-4">❓</div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Action</h2>
                <p className="text-gray-600 mb-6">{confirmMessage}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      confirmAction();
                      setShowConfirmModal(false);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Instructions Modal */}
        {showInstructions && currentTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentTest.title}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Duration</div>
                    <div className="text-lg font-bold text-blue-900">{currentTest.duration} minutes</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Questions</div>
                    <div className="text-lg font-bold text-green-900">{currentTest.totalQuestions}</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-sm text-yellow-600 font-medium">Max Marks</div>
                    <div className="text-lg font-bold text-yellow-900">{currentTest.maxMarks}</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm text-red-600 font-medium">Pass Marks</div>
                    <div className="text-lg font-bold text-red-900">{currentTest.passMarks}</div>
                  </div>
                </div>

                {currentTest.negativeMarking && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircleIcon size={16} />
                      <span className="font-medium">Negative Marking</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      -{currentTest.negativeMarkingRatio} marks will be deducted for each incorrect answer.
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Instructions:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {currentTest.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm">{instruction}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Syllabus:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTest.syllabus.map((topic, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowInstructions(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={beginTest}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <PlayIcon size={20} />
                    Start Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Modal */}
        {showResults && selectedAttempt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">
                    {(selectedAttempt.percentage || 0) >= 80 ? '🎉' : 
                     (selectedAttempt.percentage || 0) >= 60 ? '👍' : 
                     (selectedAttempt.percentage || 0) >= 40 ? '😐' : '😞'}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Completed!</h2>
                  <p className="text-gray-600">{selectedAttempt.testTitle}</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-900">{selectedAttempt.score}</div>
                    <div className="text-sm text-blue-600">Score</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-900">{selectedAttempt.percentage}%</div>
                    <div className="text-sm text-green-600">Percentage</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-900">#{selectedAttempt.rank}</div>
                    <div className="text-sm text-purple-600">Rank</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-900">{formatTime(selectedAttempt.totalTimeSpent)}</div>
                    <div className="text-sm text-orange-600">Time</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{selectedAttempt.correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{selectedAttempt.incorrectAnswers}</div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">{selectedAttempt.unattempted}</div>
                    <div className="text-sm text-gray-600">Unattempted</div>
                  </div>
                </div>

                {selectedAttempt.sectionWiseScore && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Section-wise Performance</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedAttempt.sectionWiseScore).map(([section, score]) => (
                        <div key={section} className="flex justify-between items-center">
                          <span className="text-gray-700">{section}</span>
                          <span className="font-medium">{score} marks</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResults(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setShowAnalysis(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <BarChart3Icon size={16} />
                    View Detailed Analysis
                  </button>
                  <button
                    onClick={() => {
                      if (selectedAttempt) downloadReport(selectedAttempt);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <DownloadIcon size={16} />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Modal */}
        {showAnalysis && selectedAttempt?.analysis && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Performance Analysis</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Overall Performance</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {selectedAttempt.analysis.overallPerformance}
                      </p>
                      <div className="text-sm text-gray-600">
                        You scored {selectedAttempt.percentage}% which is{' '}
                        {(selectedAttempt.percentage || 0) > 75 ? 'excellent' : 
                         (selectedAttempt.percentage || 0) > 60 ? 'good' : 
                         (selectedAttempt.percentage || 0) > 40 ? 'average' : 'below average'}.
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Difficulty-wise Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-green-600">Easy Questions</span>
                        <span className="font-medium">{selectedAttempt.analysis.difficultyWiseAnalysis.easy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-600">Medium Questions</span>
                        <span className="font-medium">{selectedAttempt.analysis.difficultyWiseAnalysis.medium}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-600">Hard Questions</span>
                        <span className="font-medium">{selectedAttempt.analysis.difficultyWiseAnalysis.hard}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Strengths</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedAttempt.analysis.strengths.map((strength, index) => (
                        <li key={index} className="text-green-700 text-sm">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Areas for Improvement</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedAttempt.analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-red-700 text-sm">{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ul className="list-disc list-inside space-y-1">
                      {selectedAttempt.analysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-blue-800 text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAnalysis(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => showToast('info', 'Feature Coming Soon', 'Analysis sharing will be available soon')}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Share with Mentor
                  </button>
                  <button
                    onClick={() => showToast('info', 'Feature Coming Soon', 'Study plan creation will be available soon')}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Create Study Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementMockTests;
