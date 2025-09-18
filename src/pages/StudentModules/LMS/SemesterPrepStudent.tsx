import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  StarIcon,
  PlayIcon,
  PauseIcon,
  TargetIcon,
  BrainIcon,
  FileTextIcon,
  AwardIcon,
  TimerIcon,

  PlusIcon,
  BookOpenIcon,
  Settings2Icon,
  ZapIcon,
  HeartIcon,
} from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  subject: string;
  unit: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  completed: boolean;
  score?: number;
  lastStudied?: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  studyMaterials: string[];
  practiceQuestions: number;
  timeSpent: number;
  attempts: number;
}

interface StudySession {
  id: string;
  topicId: string;
  topicName: string;
  startTime: string;
  duration: number;
  completed: boolean;
  score?: number;
  notes?: string;
  focusRating?: number;
  breaksCount?: number;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdDate: string;
  targetScore?: number;
}

interface PomodoroSettings {
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
}

const SemesterPrepStu: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: '1',
      name: 'Arrays and Strings',
      subject: 'Data Structures',
      unit: 'Unit 1',
      difficulty: 'easy',
      estimatedTime: 120,
      completed: true,
      score: 85,
      lastStudied: '2025-09-01',
      importance: 'critical',
      studyMaterials: ['arrays-guide.pdf', 'string-algorithms.pdf'],
      practiceQuestions: 25,
      timeSpent: 90,
      attempts: 3
    },
    {
      id: '2',
      name: 'Linked Lists',
      subject: 'Data Structures',
      unit: 'Unit 1',
      difficulty: 'medium',
      estimatedTime: 150,
      completed: false,
      importance: 'high',
      studyMaterials: ['linked-lists.pdf', 'implementation-guide.pdf'],
      practiceQuestions: 30,
      timeSpent: 45,
      attempts: 1
    },
    {
      id: '3',
      name: 'SQL Joins and Queries',
      subject: 'Database Management',
      unit: 'Unit 2',
      difficulty: 'medium',
      estimatedTime: 180,
      completed: false,
      importance: 'critical',
      studyMaterials: ['sql-joins.pdf', 'advanced-queries.pdf'],
      practiceQuestions: 40,
      timeSpent: 0,
      attempts: 0
    },
    {
      id: '4',
      name: 'Binary Trees and BST',
      subject: 'Data Structures',
      unit: 'Unit 3',
      difficulty: 'hard',
      estimatedTime: 200,
      completed: false,
      importance: 'critical',
      studyMaterials: ['binary-trees.pdf', 'bst-operations.pdf'],
      practiceQuestions: 35,
      timeSpent: 30,
      attempts: 1
    },
    {
      id: '5',
      name: 'Process Synchronization',
      subject: 'Operating Systems',
      unit: 'Unit 2',
      difficulty: 'hard',
      estimatedTime: 160,
      completed: false,
      importance: 'high',
      studyMaterials: ['synchronization.pdf', 'deadlock-prevention.pdf'],
      practiceQuestions: 28,
      timeSpent: 0,
      attempts: 0
    }
  ]);

  const [studySessions, setStudySessions] = useState<StudySession[]>([
    {
      id: '1',
      topicId: '1',
      topicName: 'Arrays and Strings',
      startTime: '2025-09-01T10:00:00Z',
      duration: 90,
      completed: true,
      score: 85,
      notes: 'Completed all practice problems. Focus on time complexity optimization.',
      focusRating: 4,
      breaksCount: 2
    },
    {
      id: '2',
      topicId: '2',
      topicName: 'Linked Lists',
      startTime: '2025-09-02T14:30:00Z',
      duration: 45,
      completed: true,
      score: 72,
      notes: 'Good understanding of basic operations. Need more practice with doubly linked lists.',
      focusRating: 3,
      breaksCount: 1
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Data Structures Unit 1',
      description: 'Finish all topics in Unit 1 with 80%+ score',
      targetDate: '2025-09-15',
      progress: 60,
      completed: false,
      priority: 'high',
      createdDate: '2025-09-01',
      targetScore: 80
    },
    {
      id: '2',
      title: 'Master SQL Fundamentals',
      description: 'Complete all SQL topics and practice exercises',
      targetDate: '2025-09-20',
      progress: 30,
      completed: false,
      priority: 'medium',
      createdDate: '2025-09-01',
      targetScore: 85
    },
    {
      id: '3',
      title: 'Weekly Study Target',
      description: 'Study for at least 20 hours this week',
      targetDate: '2025-09-08',
      progress: 75,
      completed: false,
      priority: 'high',
      createdDate: '2025-09-02'
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [studyMode, setStudyMode] = useState<'overview' | 'focused' | 'practice'>('overview');
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState(false);
  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>({
    focusTime: 25 * 60,
    breakTime: 5 * 60,
    longBreakTime: 15 * 60,
    longBreakInterval: 4
  });
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetDate: '', priority: 'medium' as 'low' | 'medium' | 'high' });
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionScore, setSessionScore] = useState('');
  const [focusRating, setFocusRating] = useState(5);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showPomodoroSettings, setShowPomodoroSettings] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Timer effect with proper cleanup
  useEffect(() => {
    let interval: number;
    
    if (isStudying && currentSession) {
      interval = setInterval(() => {
        setSessionTimer(prev => {
          const newTime = prev + 1;
          
          if (pomodoroMode) {
            const currentTime = isBreak ? 
              (pomodoroCount > 0 && pomodoroCount % pomodoroSettings.longBreakInterval === 0 ? 
                pomodoroSettings.longBreakTime : pomodoroSettings.breakTime) : 
              pomodoroSettings.focusTime;
            
            if (newTime >= currentTime) {
              if (isBreak) {
                setIsBreak(false);
                setSessionTimer(0);
                playNotificationSound();
                alert('🎯 Break time over! Ready to continue studying?');
              } else {
                setIsBreak(true);
                setPomodoroCount(prev => prev + 1);
                setSessionTimer(0);
                playNotificationSound();
                const isLongBreak = (pomodoroCount + 1) % pomodoroSettings.longBreakInterval === 0;
                alert(isLongBreak ? '🌟 Time for a long break! Take 15 minutes to recharge.' : '☕ Time for a break! Take 5 minutes to rest.');
              }
              return 0;
            }
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStudying, currentSession, pomodoroMode, isBreak, pomodoroCount, pomodoroSettings]);

  const playNotificationSound = () => {
    // Create audio context for notification sound
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      hard: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const getImportanceColor = (importance: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[importance as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const startStudySession = (topic: Topic) => {
    if (currentSession) {
      alert('⚠️ Please end your current study session first!');
      return;
    }

    const session: StudySession = {
      id: Date.now().toString(),
      topicId: topic.id,
      topicName: topic.name,
      startTime: new Date().toISOString(),
      duration: 0,
      completed: false
    };
    
    setCurrentSession(session);
    setSessionTimer(0);
    setIsStudying(true);
    setIsBreak(false);
    setPomodoroCount(0);
    
    // Show success message
    alert(`🚀 Study session started for ${topic.name}!`);
  };

  const pauseStudySession = () => {
    setIsStudying(false);
    alert('⏸️ Study session paused. Take a moment to recharge!');
  };

  const resumeStudySession = () => {
    setIsStudying(true);
    alert('▶️ Study session resumed. Stay focused!');
  };

  const endStudySession = () => {
    if (!currentSession) return;
    
    setShowSessionModal(true);
    setIsStudying(false);
  };

  const saveStudySession = () => {
    if (!currentSession) return;

    const completedSession: StudySession = {
      ...currentSession,
      duration: sessionTimer,
      completed: true,
      score: sessionScore ? parseInt(sessionScore) : undefined,
      notes: sessionNotes || undefined,
      focusRating,
      breaksCount: pomodoroCount
    };
    
    setStudySessions(prev => [...prev, completedSession]);
    
    // Update topic progress
    setTopics(prev => prev.map(topic => 
      topic.id === currentSession.topicId 
        ? { 
            ...topic, 
            lastStudied: new Date().toISOString().split('T')[0], 
            score: sessionScore ? parseInt(sessionScore) : topic.score,
            timeSpent: topic.timeSpent + Math.round(sessionTimer / 60),
            attempts: topic.attempts + 1
          }
        : topic
    ));

    // Update goals progress
    updateGoalsProgress();
    
    // Reset state
    setCurrentSession(null);
    setSessionTimer(0);
    setSessionNotes('');
    setSessionScore('');
    setFocusRating(5);
    setShowSessionModal(false);
    
    alert(`🎉 Study session completed! You studied for ${Math.round(sessionTimer / 60)} minutes.`);
  };

  const updateGoalsProgress = useCallback(() => {
    const totalStudyTime = studySessions.reduce((sum, s) => sum + s.duration, 0) / 3600; // Convert to hours
    
    setGoals(prev => prev.map(goal => {
      let newProgress = goal.progress;
      
      if (goal.title.includes('Weekly Study Target')) {
        newProgress = Math.min((totalStudyTime / 20) * 100, 100);
      } else if (goal.title.includes('Data Structures Unit 1')) {
        const unit1Topics = topics.filter(t => t.subject === 'Data Structures' && t.unit === 'Unit 1');
        const completedUnit1 = unit1Topics.filter(t => t.completed).length;
        newProgress = unit1Topics.length > 0 ? (completedUnit1 / unit1Topics.length) * 100 : 0;
      } else if (goal.title.includes('SQL Fundamentals')) {
        const sqlTopics = topics.filter(t => t.subject === 'Database Management');
        const completedSQL = sqlTopics.filter(t => t.completed).length;
        newProgress = sqlTopics.length > 0 ? (completedSQL / sqlTopics.length) * 100 : 0;
      }
      
      return {
        ...goal,
        progress: Math.round(newProgress),
        completed: newProgress >= 100
      };
    }));
  }, [studySessions, topics]);

  const markTopicCompleted = (topicId: string) => {
    setTopics(prev => prev.map(topic => 
      topic.id === topicId ? { ...topic, completed: true } : topic
    ));
    
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      alert(`✅ ${topic.name} marked as completed! Great job!`);
    }
    
    updateGoalsProgress();
  };

  const addNewGoal = () => {
    if (!newGoal.title.trim()) {
      alert('⚠️ Please enter a goal title!');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      targetDate: newGoal.targetDate,
      progress: 0,
      completed: false,
      priority: newGoal.priority,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ title: '', description: '', targetDate: '', priority: 'medium' });
    setShowGoalModal(false);
    
    alert('🎯 New goal added successfully!');
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(prev => prev.map(goal =>
      goal.id === goalId 
        ? { ...goal, progress: Math.min(Math.max(newProgress, 0), 100), completed: newProgress >= 100 }
        : goal
    ));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateOverallProgress = () => {
    const totalTopics = topics.length;
    const completedTopics = topics.filter(t => t.completed).length;
    const totalEstimatedTime = topics.reduce((sum, t) => sum + t.estimatedTime, 0);
    const studiedTime = studySessions.reduce((sum, s) => sum + s.duration, 0) / 60; // Convert to minutes
    const totalTimeSpent = topics.reduce((sum, t) => sum + t.timeSpent, 0);
    
    return {
      topicsProgress: totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0,
      timeProgress: totalEstimatedTime > 0 ? (totalTimeSpent / totalEstimatedTime) * 100 : 0,
      completedTopics,
      totalTopics,
      studiedTime: Math.round(studiedTime),
      totalEstimatedTime,
      totalTimeSpent,
      averageScore: studySessions.length > 0 
        ? Math.round(studySessions.filter(s => s.score).reduce((sum, s) => sum + (s.score || 0), 0) / studySessions.filter(s => s.score).length)
        : 0
    };
  };

  const generateStudyPlan = () => {
    const incompleteTasks = topics.filter(t => !t.completed).sort((a, b) => {
      // Sort by importance first, then by difficulty
      const importanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
      
      if (importanceOrder[a.importance] !== importanceOrder[b.importance]) {
        return importanceOrder[b.importance] - importanceOrder[a.importance];
      }
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

    const plan = incompleteTasks.slice(0, 5).map((topic, index) => 
      `${index + 1}. ${topic.name} (${topic.subject}) - ${topic.estimatedTime}min - ${topic.importance} priority`
    ).join('\n');

    alert(`📋 Your Study Plan:\n\n${plan}\n\n💡 Focus on high-priority topics first!`);
  };

  const getRecommendedNextTopic = () => {
    const incompleteTopics = topics.filter(t => !t.completed);
    if (incompleteTopics.length === 0) return null;

    return incompleteTopics.sort((a, b) => {
      const importanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return importanceOrder[b.importance] - importanceOrder[a.importance];
    })[0];
  };

  const filteredTopics = topics.filter(topic => {
    const subjectMatch = selectedSubject === 'all' || topic.subject === selectedSubject;
    const difficultyMatch = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
    return subjectMatch && difficultyMatch;
  });

  const subjects = Array.from(new Set(topics.map(t => t.subject)));
  const progress = calculateOverallProgress();
  const recommendedTopic = getRecommendedNextTopic();

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Semester Preparation</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Organize your study plan and track your progress</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPomodoroMode(!pomodoroMode)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm ${
                  pomodoroMode 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <TimerIcon size={16} />
                <span className="hidden sm:inline">Pomodoro {pomodoroMode ? 'ON' : 'OFF'}</span>
                <span className="sm:hidden">{pomodoroMode ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={() => setShowPomodoroSettings(true)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
                title="Pomodoro Settings"
              >
                <Settings2Icon size={16} />
              </button>
              <button
                onClick={generateStudyPlan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <span className="hidden sm:inline">Generate Study Plan</span>
                <span className="sm:hidden">Plan</span>
              </button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-xs sm:text-sm font-medium">Topics Progress</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-900">{progress.topicsProgress.toFixed(1)}%</p>
                  <p className="text-xs sm:text-sm text-blue-700">{progress.completedTopics}/{progress.totalTopics} completed</p>
                </div>
                <TargetIcon className="text-blue-600" size={isMobileView ? 24 : 32} />
              </div>
            </div>
            
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-xs sm:text-sm font-medium">Study Time</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-900">{progress.totalTimeSpent}h</p>
                  <p className="text-xs sm:text-sm text-green-700">of {Math.round(progress.totalEstimatedTime/60)}h planned</p>
                </div>
                <ClockIcon className="text-green-600" size={isMobileView ? 24 : 32} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-xs sm:text-sm font-medium">Study Sessions</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-900">{studySessions.length}</p>
                  <p className="text-xs sm:text-sm text-purple-700">completed</p>
                </div>
                <BrainIcon className="text-purple-600" size={isMobileView ? 24 : 32} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-xs sm:text-sm font-medium">Average Score</p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-900">{progress.averageScore}%</p>
                  <p className="text-xs sm:text-sm text-yellow-700">across sessions</p>
                </div>
                <AwardIcon className="text-yellow-600" size={isMobileView ? 24 : 32} />
              </div>
            </div>
          </div>

          {/* Recommended Next Topic */}
          {recommendedTopic && !currentSession && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ZapIcon className="text-green-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">Recommended Next</h3>
                  </div>
                  <p className="text-gray-700 mb-2">{recommendedTopic.name} ({recommendedTopic.subject})</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(recommendedTopic.importance)}`}>
                      {recommendedTopic.importance} priority
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(recommendedTopic.difficulty)}`}>
                      {recommendedTopic.difficulty}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => startStudySession(recommendedTopic)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <PlayIcon size={16} />
                  Start Now
                </button>
              </div>
            </div>
          )}

          {/* Active Study Session */}
          {currentSession && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isBreak ? '☕ Break Time' : '📚 Studying'}: {currentSession.topicName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isBreak ? 'Take a rest and come back refreshed!' : 'Stay focused and keep learning!'}
                  </p>
                  {pomodoroMode && (
                    <p className="text-sm text-blue-600 mt-1">
                      🍅 Pomodoro #{pomodoroCount + 1} {isBreak ? '(Break)' : '(Focus)'}
                    </p>
                  )}
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {formatTime(sessionTimer)}
                  </div>
                  {pomodoroMode && (
                    <div className="text-sm text-gray-600 mt-1">
                      {isBreak ? 
                        `${Math.round((pomodoroCount > 0 && pomodoroCount % pomodoroSettings.longBreakInterval === 0 ? pomodoroSettings.longBreakTime : pomodoroSettings.breakTime) / 60)} min break` : 
                        `${Math.round(pomodoroSettings.focusTime / 60)} min focus`
                      }
                    </div>
                  )}
                  {pomodoroMode && (
                    <div className="w-24 bg-gray-200 rounded-full h-1 mt-2">
                      <div 
                        className={`h-1 rounded-full transition-all ${isBreak ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ 
                          width: `${Math.min((sessionTimer / (isBreak ? 
                            (pomodoroCount > 0 && pomodoroCount % pomodoroSettings.longBreakInterval === 0 ? pomodoroSettings.longBreakTime : pomodoroSettings.breakTime) : 
                            pomodoroSettings.focusTime)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {!isBreak && (
                  <>
                    {isStudying ? (
                      <button
                        onClick={pauseStudySession}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <PauseIcon size={16} />
                        Pause
                      </button>
                    ) : (
                      <button
                        onClick={resumeStudySession}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <PlayIcon size={16} />
                        Resume
                      </button>
                    )}
                    <button
                      onClick={endStudySession}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      End Session
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Filters and Mode Selection */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 gap-4">
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setStudyMode('overview')}
                className={`px-3 py-2 text-sm ${studyMode === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-lg`}
              >
                Overview
              </button>
              {/* <button
                onClick={() => setStudyMode('focused')}
                className={`px-3 py-2 text-sm ${studyMode === 'focused' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Focused
              </button> */}
              {/* <button
                onClick={() => setStudyMode('practice')}
                className={`px-3 py-2 text-sm ${studyMode === 'practice' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-lg`}
              >
                Practice
              </button> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {studyMode === 'overview' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Study Topics ({filteredTopics.length})</h2>
                <div className="space-y-4">
                  {filteredTopics.map(topic => (
                    <div key={topic.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all">
                      <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{topic.name}</h3>
                            {topic.completed && (
                              <CheckCircleIcon className="text-green-500 flex-shrink-0" size={20} />
                            )}
                          </div>
                          <p className="text-gray-600 mb-3 text-sm">{topic.subject} • {topic.unit}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(topic.importance)}`}>
                              {topic.importance.toUpperCase()}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {topic.estimatedTime}min
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {topic.practiceQuestions} questions
                            </span>
                          </div>

                          <div className="space-y-2 mb-3">
                            {topic.score && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Best Score:</span>
                                <span className="font-semibold text-green-600">{topic.score}%</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      size={14}
                                      className={i < Math.floor(topic.score! / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Time Spent: {topic.timeSpent}h</span>
                              <span>Attempts: {topic.attempts}</span>
                            </div>

                            {topic.lastStudied && (
                              <p className="text-sm text-gray-500">
                                Last studied: {new Date(topic.lastStudied).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {!currentSession && (
                          <button
                            onClick={() => startStudySession(topic)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
                          >
                            <PlayIcon size={14} />
                            Start Studying
                          </button>
                        )}
                        {/* <button 
                          onClick={() => alert(`🔥 Practice mode for ${topic.name} coming soon!`)}
                          className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          Practice Questions
                        </button> */}
                        <button 
                          onClick={() => alert(`📚 Study materials for ${topic.name}:\n${topic.studyMaterials.join('\n')}`)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          Materials
                        </button>
                        {!topic.completed && (
                          <button
                            onClick={() => markTopicCompleted(topic.id)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg transition-colors text-sm"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredTopics.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpenIcon className="mx-auto text-gray-300 mb-4" size={64} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
                    <p className="text-gray-600">
                      Try adjusting your filters to see more topics
                    </p>
                  </div>
                )}
              </div>
            )}

            {studyMode === 'focused' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Focused Study Mode</h2>
                <div className="text-center py-12">
                  <BrainIcon className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Distraction-Free Study Environment</h3>
                  <p className="text-gray-600 mb-6">
                    Enter an immersive study mode with built-in timer, note-taking, and progress tracking.
                  </p>
                  <button 
                    onClick={() => alert('🧘 Focus mode will open in a distraction-free window!')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition-colors"
                  >
                    Enter Focus Mode
                  </button>
                </div>
              </div>
            )}

            {/* {studyMode === 'practice' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Practice Mode</h2>
                <div className="text-center py-12">
                  <FileTextIcon className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Practice Questions & Mock Tests</h3>
                  <p className="text-gray-600 mb-6">
                    Test your knowledge with practice questions and timed mock exams.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={() => alert('🚀 Quick practice session starting soon!')}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Quick Practice
                    </button>
                    <button 
                      onClick={() => alert('📝 Mock test feature coming soon!')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Mock Test
                    </button>
                  </div>
                </div>
              </div> */}
            {/* )} */}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Study Goals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Study Goals</h3>
                <button
                  onClick={() => setShowGoalModal(true)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                  title="Add New Goal"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {goals.slice(-3).map(goal => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 mr-2">{goal.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{goal.description}</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${goal.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
                      <span className="text-gray-500">Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const newProgress = prompt(`Update progress for "${goal.title}" (0-100):`, goal.progress.toString());
                            if (newProgress && !isNaN(parseInt(newProgress))) {
                              updateGoalProgress(goal.id, parseInt(newProgress));
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {goals.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <TargetIcon className="mx-auto mb-2" size={32} />
                    <p className="text-sm">No goals set yet</p>
                    <button
                      onClick={() => setShowGoalModal(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                    >
                      Add your first goal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Study Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
              <div className="space-y-3">
                {studySessions.slice(-5).reverse().map(session => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-1 flex-1 mr-2">{session.topicName}</h4>
                      {session.score && (
                        <span className="text-sm font-medium text-green-600 flex-shrink-0">{session.score}%</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{Math.round(session.duration / 60)} minutes</span>
                      <span>{new Date(session.startTime).toLocaleDateString()}</span>
                    </div>
                    {session.focusRating && (
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-gray-600">Focus:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <HeartIcon
                              key={i}
                              size={10}
                              className={i < session.focusRating! ? 'text-red-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {session.notes && (
                      <p className="text-xs text-gray-600 line-clamp-2">{session.notes}</p>
                    )}
                  </div>
                ))}
                
                {studySessions.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <BrainIcon className="mx-auto mb-2" size={32} />
                    <p className="text-sm">No study sessions yet</p>
                    <p className="text-xs">Start studying to see your sessions here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-medium">{Math.round(progress.totalTimeSpent * 0.4)}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Session</span>
                  <span className="font-medium">
                    {studySessions.length > 0 
                      ? Math.round(studySessions.reduce((sum, s) => sum + s.duration, 0) / studySessions.length / 60)
                      : 0}min
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Study Streak</span>
                  <span className="font-medium">5 days 🔥</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Topics Mastered</span>
                  <span className="font-medium">{topics.filter(t => t.completed).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Focus Rating</span>
                  <span className="font-medium">
                    {studySessions.filter(s => s.focusRating).length > 0 
                      ? (studySessions.reduce((sum, s) => sum + (s.focusRating || 0), 0) / studySessions.filter(s => s.focusRating).length).toFixed(1)
                      : 'N/A'}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session End Modal */}
        {showSessionModal && currentSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">End Study Session</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">You studied <strong>{currentSession.topicName}</strong> for</p>
                  <p className="text-2xl font-bold text-blue-600">{formatTime(sessionTimer)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Score (0-100) - Optional</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sessionScore}
                    onChange={(e) => setSessionScore(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your score"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Focus Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setFocusRating(rating)}
                        className={`p-2 ${focusRating >= rating ? 'text-red-500' : 'text-gray-300'}`}
                      >
                        <HeartIcon size={24} fill={focusRating >= rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes - Optional</label>
                  <textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                    placeholder="How did the session go? Any insights?"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowSessionModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveStudySession}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Session
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Goal Modal */}
        {showGoalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Goal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title *</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Complete Data Structures Unit 2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your goal..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewGoal}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pomodoro Settings Modal */}
        {showPomodoroSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pomodoro Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Focus Time (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={Math.round(pomodoroSettings.focusTime / 60)}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings, 
                      focusTime: parseInt(e.target.value) * 60
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Break (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={Math.round(pomodoroSettings.breakTime / 60)}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings, 
                      breakTime: parseInt(e.target.value) * 60
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Long Break (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={Math.round(pomodoroSettings.longBreakTime / 60)}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings, 
                      longBreakTime: parseInt(e.target.value) * 60
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Long Break Interval</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={pomodoroSettings.longBreakInterval}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings, 
                      longBreakInterval: parseInt(e.target.value)
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">After how many focus sessions to take a long break</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPomodoroSettings(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowPomodoroSettings(false);
                    alert('⚙️ Pomodoro settings updated!');
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
    </div>
  );
};

export default SemesterPrepStu;
