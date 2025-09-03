// FacultyFeedbackDashboard.tsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Plus, Eye, BarChart3, User, Star, TrendingUp, MessageSquare, Calendar, Users } from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  subjects: string[];
  experience: number;
  qualification: string;
}

interface FeedbackResponse {
  id: string;
  studentId: string;
  facultyId: string;
  studentName?: string; // Optional for anonymous feedback
  rollNumber?: string;
  department: string;
  semester: string;
  subject: string;
  academicYear: string;
  submittedAt: string;
  isAnonymous: boolean;
  ratings: {
    teachingMethodology: number;
    subjectKnowledge: number;
    communication: number;
    punctuality: number;
    helpfulness: number;
    courseRelevance: number;
  };
  comments: string;
  suggestions: string;
  overallRating: number;
}

interface FeedbackSession {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  targetSemesters: string[];
  targetDepartments: string[];
  totalResponses: number;
}

// Feedback Form Modal Component
const FeedbackFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  faculty: Faculty[];
  onSubmit: (feedback: Partial<FeedbackResponse>) => void;
}> = ({ isOpen, onClose, faculty, onSubmit }) => {
  const [formData, setFormData] = useState({
    facultyId: '',
    studentName: '',
    rollNumber: '',
    department: '',
    semester: '',
    subject: '',
    isAnonymous: false,
    ratings: {
      teachingMethodology: 0,
      subjectKnowledge: 0,
      communication: 0,
      punctuality: 0,
      helpfulness: 0,
      courseRelevance: 0
    },
    comments: '',
    suggestions: ''
  });

  const handleRatingChange = (category: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: rating
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const overallRating = Object.values(formData.ratings).reduce((a, b) => a + b, 0) / 6;
    onSubmit({
      ...formData,
      overallRating,
      submittedAt: new Date().toISOString(),
      academicYear: '2024-25'
    });
    onClose();
    setFormData({
      facultyId: '',
      studentName: '',
      rollNumber: '',
      department: '',
      semester: '',
      subject: '',
      isAnonymous: false,
      ratings: {
        teachingMethodology: 0,
        subjectKnowledge: 0,
        communication: 0,
        punctuality: 0,
        helpfulness: 0,
        courseRelevance: 0
      },
      comments: '',
      suggestions: ''
    });
  };

  const StarRating: React.FC<{ rating: number; onRate: (rating: number) => void; label: string }> = ({ rating, onRate, label }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
          >
            <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : ''}`} />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Faculty Feedback Form</h2>
          <p className="text-gray-600 mt-2">Please provide honest feedback to help improve teaching quality</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={formData.isAnonymous}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={formData.isAnonymous}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Semester</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={`${sem}${sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester`}>
                      {sem}{sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Submit feedback anonymously</span>
              </label>
            </div>
          </div>

          {/* Faculty Selection */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty & Subject Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Faculty</label>
                <select
                  value={formData.facultyId}
                  onChange={(e) => setFormData(prev => ({ ...prev, facultyId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Faculty</option>
                  {faculty.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} - {f.department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Rating Categories */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Rating Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StarRating 
                rating={formData.ratings.teachingMethodology} 
                onRate={(rating) => handleRatingChange('teachingMethodology', rating)}
                label="Teaching Methodology & Delivery"
              />
              <StarRating 
                rating={formData.ratings.subjectKnowledge} 
                onRate={(rating) => handleRatingChange('subjectKnowledge', rating)}
                label="Subject Knowledge & Expertise"
              />
              <StarRating 
                rating={formData.ratings.communication} 
                onRate={(rating) => handleRatingChange('communication', rating)}
                label="Communication Skills"
              />
              <StarRating 
                rating={formData.ratings.punctuality} 
                onRate={(rating) => handleRatingChange('punctuality', rating)}
                label="Punctuality & Regularity"
              />
              <StarRating 
                rating={formData.ratings.helpfulness} 
                onRate={(rating) => handleRatingChange('helpfulness', rating)}
                label="Helpfulness & Accessibility"
              />
              <StarRating 
                rating={formData.ratings.courseRelevance} 
                onRate={(rating) => handleRatingChange('courseRelevance', rating)}
                label="Course Content Relevance"
              />
            </div>
          </div>

          {/* Comments & Suggestions */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your thoughts about the faculty's teaching..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suggestions for Improvement</label>
                <textarea
                  value={formData.suggestions}
                  onChange={(e) => setFormData(prev => ({ ...prev, suggestions: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Suggest improvements or areas of focus..."
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Faculty Details Modal
const FacultyDetailModal: React.FC<{
  faculty: Faculty | null;
  feedbacks: FeedbackResponse[];
  isOpen: boolean;
  onClose: () => void;
}> = ({ faculty, feedbacks, isOpen, onClose }) => {
  if (!isOpen || !faculty) return null;

  const facultyFeedbacks = feedbacks.filter(f => f.facultyId === faculty.id);
  const avgRating = facultyFeedbacks.length > 0 
    ? facultyFeedbacks.reduce((sum, f) => sum + f.overallRating, 0) / facultyFeedbacks.length 
    : 0;

  const categoryAverages = {
    teachingMethodology: facultyFeedbacks.reduce((sum, f) => sum + f.ratings.teachingMethodology, 0) / facultyFeedbacks.length || 0,
    subjectKnowledge: facultyFeedbacks.reduce((sum, f) => sum + f.ratings.subjectKnowledge, 0) / facultyFeedbacks.length || 0,
    communication: facultyFeedbacks.reduce((sum, f) => sum + f.ratings.communication, 0) / facultyFeedbacks.length || 0,
    punctuality: facultyFeedbacks.reduce((sum, f) => sum + f.ratings.punctuality, 0) / facultyFeedbacks.length || 0,
    helpfulness: facultyFeedbacks.reduce((sum, f) => sum + f.ratings.helpfulness, 0) / facultyFeedbacks.length || 0,
    courseRelevance: facultyFeedbacks.reduce((sum, f) => sum + f.ratings.courseRelevance, 0) / facultyFeedbacks.length || 0
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{faculty.name}</h2>
              <p className="text-gray-600">{faculty.designation} - {faculty.department}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Faculty Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <span className="text-gray-600">Email:</span>
                <p className="font-semibold">{faculty.email}</p>
              </div>
              <div>
                <span className="text-gray-600">Department:</span>
                <p className="font-semibold">{faculty.department}</p>
              </div>
              <div>
                <span className="text-gray-600">Designation:</span>
                <p className="font-semibold">{faculty.designation}</p>
              </div>
              <div>
                <span className="text-gray-600">Experience:</span>
                <p className="font-semibold">{faculty.experience} years</p>
              </div>
              <div>
                <span className="text-gray-600">Qualification:</span>
                <p className="font-semibold">{faculty.qualification}</p>
              </div>
              <div>
                <span className="text-gray-600">Subjects:</span>
                <p className="font-semibold">{faculty.subjects.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Rating</h3>
            <div className="flex items-center gap-4">
              <div className="text-6xl font-bold text-blue-600">{avgRating.toFixed(1)}</div>
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className={`w-8 h-8 ${star <= avgRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className="text-gray-600">
                <div>Based on {facultyFeedbacks.length} reviews</div>
                <div className="text-sm">Academic Year 2024-25</div>
              </div>
            </div>
          </div>

          {/* Category-wise Ratings */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category-wise Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryAverages).map(([category, avg]) => (
                <div key={category} className="bg-white rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">
                    {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-blue-600">{avg.toFixed(1)}</div>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= avg ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(avg / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Comments</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {facultyFeedbacks.slice(0, 5).map(feedback => (
                <div key={feedback.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">
                      {feedback.isAnonymous ? 'Anonymous Student' : feedback.studentName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{feedback.overallRating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{feedback.subject} • {feedback.department}</div>
                  {feedback.comments && (
                    <div className="text-gray-700 text-sm">{feedback.comments}</div>
                  )}
                  {feedback.suggestions && (
                    <div className="text-gray-600 text-sm mt-2">
                      <strong>Suggestion:</strong> {feedback.suggestions}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(feedback.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultyFeedbackDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'faculty' | 'analytics' | 'sessions'>('overview');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isFacultyDetailOpen, setIsFacultyDetailOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Sample Faculty Data
  const [faculty] = useState<Faculty[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu',
      department: 'Computer Science',
      designation: 'Professor',
      subjects: ['Data Structures', 'Algorithms', 'Database Management'],
      experience: 15,
      qualification: 'Ph.D in Computer Science'
    },
    {
      id: '2',
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@college.edu',
      department: 'Mechanical Engineering',
      designation: 'Associate Professor',
      subjects: ['Thermodynamics', 'Heat Transfer', 'Fluid Mechanics'],
      experience: 12,
      qualification: 'M.Tech in Mechanical Engineering'
    },
    {
      id: '3',
      name: 'Dr. Amit Patel',
      email: 'amit.patel@college.edu',
      department: 'Electrical Engineering',
      designation: 'Assistant Professor',
      subjects: ['Circuit Analysis', 'Power Systems', 'Control Systems'],
      experience: 8,
      qualification: 'Ph.D in Electrical Engineering'
    },
    {
      id: '4',
      name: 'Prof. Sneha Reddy',
      email: 'sneha.reddy@college.edu',
      department: 'Information Technology',
      designation: 'Professor',
      subjects: ['Web Development', 'Software Engineering', 'Mobile App Development'],
      experience: 18,
      qualification: 'M.Tech in Information Technology'
    }
  ]);

  // Sample Feedback Data
  const [feedbacks] = useState<FeedbackResponse[]>([
    {
      id: '1',
      studentId: 'STU001',
      facultyId: '1',
      studentName: 'Arjun Kumar',
      rollNumber: '2021CSE101',
      department: 'Computer Science',
      semester: '6th Semester',
      subject: 'Data Structures',
      academicYear: '2024-25',
      submittedAt: '2025-09-01T10:30:00',
      isAnonymous: false,
      ratings: {
        teachingMethodology: 5,
        subjectKnowledge: 5,
        communication: 4,
        punctuality: 5,
        helpfulness: 4,
        courseRelevance: 5
      },
      comments: 'Excellent teaching style and very clear explanations. Makes complex topics easy to understand.',
      suggestions: 'Could provide more practical examples during lectures.',
      overallRating: 4.7
    },
    {
      id: '2',
      studentId: 'STU002',
      facultyId: '1',
      studentName: '',
      rollNumber: '',
      department: 'Computer Science',
      semester: '6th Semester',
      subject: 'Algorithms',
      academicYear: '2024-25',
      submittedAt: '2025-09-01T11:15:00',
      isAnonymous: true,
      ratings: {
        teachingMethodology: 4,
        subjectKnowledge: 5,
        communication: 4,
        punctuality: 5,
        helpfulness: 3,
        courseRelevance: 4
      },
      comments: 'Good knowledge of subject but sometimes goes too fast.',
      suggestions: 'Slow down the pace for better understanding.',
      overallRating: 4.2
    },
    {
      id: '3',
      studentId: 'STU003',
      facultyId: '2',
      studentName: 'Priya Singh',
      rollNumber: '2021ME102',
      department: 'Mechanical Engineering',
      semester: '4th Semester',
      subject: 'Thermodynamics',
      academicYear: '2024-25',
      submittedAt: '2025-09-01T14:20:00',
      isAnonymous: false,
      ratings: {
        teachingMethodology: 5,
        subjectKnowledge: 5,
        communication: 5,
        punctuality: 4,
        helpfulness: 5,
        courseRelevance: 5
      },
      comments: 'Outstanding faculty! Very helpful and always available for doubts.',
      suggestions: 'Continue the same teaching approach.',
      overallRating: 4.8
    }
  ]);

  // Sample Sessions Data
  const [sessions] = useState<FeedbackSession[]>([
    {
      id: '1',
      title: 'Mid-Semester Faculty Feedback',
      description: 'Faculty feedback collection for mid-semester evaluation',
      startDate: '2025-09-01',
      endDate: '2025-09-15',
      isActive: true,
      targetSemesters: ['4th Semester', '6th Semester', '8th Semester'],
      targetDepartments: ['Computer Science', 'Mechanical Engineering'],
      totalResponses: 156
    },
    {
      id: '2',
      title: 'End Semester Faculty Feedback',
      description: 'Comprehensive faculty feedback for semester end',
      startDate: '2025-11-15',
      endDate: '2025-11-30',
      isActive: false,
      targetSemesters: ['All Semesters'],
      targetDepartments: ['All Departments'],
      totalResponses: 0
    }
  ]);

  // Filtered faculty
  const filteredFaculty = useMemo(() => {
    return faculty.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           f.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDepartment = filterDepartment === 'all' || f.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [faculty, searchTerm, filterDepartment]);

  // Analytics
  const analytics = useMemo(() => {
    const totalFeedbacks = feedbacks.length;
    const averageRating = totalFeedbacks > 0 
      ? feedbacks.reduce((sum, f) => sum + f.overallRating, 0) / totalFeedbacks 
      : 0;
    
    const departmentStats = faculty.map(f => {
      const facultyFeedbacks = feedbacks.filter(fb => fb.facultyId === f.id);
      const avgRating = facultyFeedbacks.length > 0 
        ? facultyFeedbacks.reduce((sum, fb) => sum + fb.overallRating, 0) / facultyFeedbacks.length 
        : 0;
      return {
        ...f,
        feedbackCount: facultyFeedbacks.length,
        averageRating: avgRating
      };
    });

    const topRatedFaculty = departmentStats
      .filter(f => f.feedbackCount > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    return {
      totalFeedbacks,
      averageRating,
      totalFaculty: faculty.length,
      departmentStats,
      topRatedFaculty
    };
  }, [faculty, feedbacks]);

  const handleSubmitFeedback = (feedbackData: Partial<FeedbackResponse>) => {
    console.log('Feedback submitted:', feedbackData);
    // Here you would typically send the data to your backend
  };

  const handleViewFacultyDetails = (facultyMember: Faculty) => {
    setSelectedFaculty(facultyMember);
    setIsFacultyDetailOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Faculty Feedback System</h1>
              <p className="text-gray-600">Academic Quality Assessment & Improvement</p>
            </div>
          </div>
          <button 
            onClick={() => setIsFormModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'faculty', label: 'Faculty List', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'sessions', label: 'Feedback Sessions', icon: Calendar }
          ].map(tab => (
            <button
              key={tab.id}
              className={`flex-1 px-6 py-4 text-lg font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <div className="flex items-center justify-center gap-2">
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Faculty</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalFaculty}</div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Feedbacks</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalFeedbacks}</div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Average Rating</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{analytics.averageRating.toFixed(1)}</div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Sessions</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{sessions.filter(s => s.isActive).length}</div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Rated Faculty */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Rated Faculty</h2>
            <div className="space-y-4">
              {analytics.topRatedFaculty.map((faculty, index) => (
                <div key={faculty.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{faculty.name}</div>
                      <div className="text-sm text-gray-600">{faculty.designation} - {faculty.department}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-lg text-blue-600">{faculty.averageRating.toFixed(1)}</div>
                      <div className="text-xs text-gray-500">{faculty.feedbackCount} reviews</div>
                    </div>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= faculty.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Feedback Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Feedback Activity</h2>
            <div className="space-y-4">
              {feedbacks.slice(0, 5).map(feedback => {
                const facultyMember = faculty.find(f => f.id === feedback.facultyId);
                return (
                  <div key={feedback.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {feedback.isAnonymous ? 'Anonymous Student' : feedback.studentName}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{feedback.department}</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        Reviewed <strong>{facultyMember?.name}</strong> for <strong>{feedback.subject}</strong>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-3 h-3 ${star <= feedback.overallRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{feedback.overallRating.toFixed(1)} rating</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(feedback.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Faculty List Tab */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search faculty by name, department, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Information Technology">Information Technology</option>
              </select>
            </div>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map(facultyMember => {
              const facultyFeedbacks = feedbacks.filter(f => f.facultyId === facultyMember.id);
              const avgRating = facultyFeedbacks.length > 0
                ? facultyFeedbacks.reduce((sum, f) => sum + f.overallRating, 0) / facultyFeedbacks.length
                : 0;

              return (
                <div key={facultyMember.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{facultyMember.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{facultyMember.designation}</p>
                      <p className="text-sm font-medium text-blue-600">{facultyMember.department}</p>
                    </div>
                    {avgRating > 0 && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-600">{avgRating.toFixed(1)}</div>
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-4 h-4 ${star <= avgRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{facultyFeedbacks.length} reviews</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-xs text-gray-500">Experience:</span>
                      <span className="text-sm font-medium text-gray-700 ml-1">{facultyMember.experience} years</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Qualification:</span>
                      <span className="text-sm font-medium text-gray-700 ml-1">{facultyMember.qualification}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Subjects:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {facultyMember.subjects.slice(0, 2).map(subject => (
                          <span key={subject} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {subject}
                          </span>
                        ))}
                        {facultyMember.subjects.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{facultyMember.subjects.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewFacultyDetails(facultyMember)}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details & Feedback
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department-wise Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Department-wise Performance</h3>
              <div className="space-y-4">
                {['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Information Technology'].map(dept => {
                  const deptFaculty = faculty.filter(f => f.department === dept);
                  const deptFeedbacks = feedbacks.filter(f => {
                    const facultyMember = faculty.find(fm => fm.id === f.facultyId);
                    return facultyMember?.department === dept;
                  });
                  const avgRating = deptFeedbacks.length > 0
                    ? deptFeedbacks.reduce((sum, f) => sum + f.overallRating, 0) / deptFeedbacks.length
                    : 0;

                  return (
                    <div key={dept} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{dept}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className={`w-4 h-4 ${star <= avgRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-900">{avgRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span>Faculty: </span>
                          <strong>{deptFaculty.length}</strong>
                        </div>
                        <div>
                          <span>Feedbacks: </span>
                          <strong>{deptFeedbacks.length}</strong>
                        </div>
                        <div>
                          <span>Avg Rating: </span>
                          <strong className="text-blue-600">{avgRating.toFixed(1)}</strong>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(avgRating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Rating Distribution</h3>
              <div className="space-y-4">
                {[5,4,3,2,1].map(rating => {
                  const count = feedbacks.filter(f => Math.floor(f.overallRating) === rating).length;
                  const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0;

                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-16 text-right">
                        <span className="text-sm font-medium text-gray-900">{count}</span>
                        <span className="text-xs text-gray-500"> ({percentage.toFixed(0)}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category-wise Analysis */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Category-wise Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(feedbacks[0]?.ratings || {}).map(category => {
                const avgRating = feedbacks.length > 0
                  ? feedbacks.reduce((sum, f) => sum + f.ratings[category as keyof typeof f.ratings], 0) / feedbacks.length
                  : 0;

                return (
                  <div key={category} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-2">
                      {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{avgRating.toFixed(1)}</div>
                    <div className="flex justify-center">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= avgRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(avgRating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Feedback Sessions</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Session
              </button>
            </div>

            <div className="space-y-4">
              {sessions.map(session => (
                <div key={session.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          session.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {session.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{session.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <div className="font-medium text-gray-900">
                            {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Target Semesters:</span>
                          <div className="font-medium text-gray-900">{session.targetSemesters.join(', ')}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Departments:</span>
                          <div className="font-medium text-gray-900">{session.targetDepartments.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">{session.totalResponses}</div>
                      <div className="text-sm text-gray-500">Responses</div>
                      <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <FeedbackFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        faculty={faculty}
        onSubmit={handleSubmitFeedback}
      />

      <FacultyDetailModal
        faculty={selectedFaculty}
        feedbacks={feedbacks}
        isOpen={isFacultyDetailOpen}
        onClose={() => setIsFacultyDetailOpen(false)}
      />
    </div>
  );
};

export default FacultyFeedbackDashboard;
