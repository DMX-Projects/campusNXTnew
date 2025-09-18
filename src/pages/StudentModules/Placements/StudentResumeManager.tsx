import React, { useState, useRef, useEffect } from 'react';
import {
  FileTextIcon,
  UploadIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  StarIcon,
  MoreVerticalIcon,
  ThumbsDownIcon,
  ShareIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  ExternalLinkIcon,
  CalendarIcon,
  BuildingIcon,
  BookOpenIcon,
  TrendingUpIcon,
  ZapIcon,
  TargetIcon,
  SearchIcon,
  FilterIcon,
  XIcon,
  SaveIcon,
  CopyIcon,
  ClockIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  BarChart3Icon,
  PieChartIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  InfoIcon,
  HelpCircleIcon,
  Settings2Icon,
  PaperclipIcon
} from 'lucide-react';
import { div } from 'framer-motion/client';

interface Resume {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  lastModified: string;
  isDefault: boolean;
  downloadCount: number;
  viewCount: number;
  format: 'pdf' | 'docx';
  status: 'active' | 'draft' | 'archived';
  thumbnail: string;
  tags: string[];
  appliedToCompanies: string[];
  feedback: ResumeFeedback[];
  atsScore: number;
  templateType: string;
  createdWith: 'upload' | 'builder' | 'imported';
  version: number;
  parentId?: string;
  isPublic: boolean;
  shareUrl?: string;
  customizations: ResumeCustomization;
}

interface ResumeFeedback {
  id: string;
  reviewer: string;
  rating: number;
  comments: string;
  suggestions: string[];
  date: string;
  category: 'content' | 'format' | 'skills' | 'experience' | 'overall';
  isHelpful?: boolean;
}

interface ResumeCustomization {
  colorScheme: string;
  fontSize: number;
  fontFamily: string;
  layout: 'single-column' | 'two-column' | 'modern';
  sections: string[];
  showPhoto: boolean;
}

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'professional' | 'modern' | 'creative' | 'academic' | 'minimalist';
  isPopular: boolean;
  downloadCount: number;
  rating: number;
  features: string[];
  colorSchemes: string[];
  difficulty: 'easy' | 'intermediate' | 'advanced';
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  profileImage?: string;
  dateOfBirth?: string;
  nationality?: string;
  languages: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  percentage?: string;
  achievements: string[];
  coursework: string[];
  projects: string[];
  current: boolean;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string[];
  technologies: string[];
  achievements: string[];
  type: 'full-time' | 'internship' | 'part-time' | 'freelance' | 'volunteer';
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  role: string;
  highlights: string[];
  category: 'web' | 'mobile' | 'desktop' | 'ai/ml' | 'blockchain' | 'other';
}

interface Skill {
  id: string;
  name: string;
  category: 'programming' | 'framework' | 'database' | 'tool' | 'soft-skill' | 'language';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  certifications?: string[];
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
}

interface ATSAnalysis {
  overallScore: number;
  sections: {
    contactInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    formatting: number;
  };
  suggestions: string[];
  keywords: {
    found: string[];
    missing: string[];
    density: number;
  };
  improvements: {
    category: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
  }[];
}

const StudentResumeManager: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      name: 'Software Engineer Resume',
      fileName: 'John_Doe_SDE_Resume.pdf',
      fileSize: '2.3 MB',
      uploadDate: '2025-09-01',
      lastModified: '2025-09-02',
      isDefault: true,
      downloadCount: 15,
      viewCount: 45,
      format: 'pdf',
      status: 'active',
      thumbnail: '📄',
      tags: ['software-engineer', 'full-stack', 'react', 'node.js', 'current'],
      appliedToCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
      feedback: [
        {
          id: '1',
          reviewer: 'Placement Officer - Dr. Sarah Johnson',
          rating: 4,
          comments: 'Well structured resume with strong technical skills section. Good use of action verbs and quantified achievements.',
          suggestions: ['Add more specific metrics to achievements', 'Include relevant coursework section', 'Consider adding a projects section'],
          date: '2025-09-02',
          category: 'content',
          isHelpful: true
        },
        {
          id: '2',
          reviewer: 'Industry Expert - Rajesh Kumar (Microsoft)',
          rating: 5,
          comments: 'Excellent resume! Clear formatting and relevant experience highlighted perfectly. Strong candidate profile.',
          suggestions: ['Perfect as is', 'Maybe add GitHub contributions graph'],
          date: '2025-09-01',
          category: 'overall',
          isHelpful: true
        }
      ],
      atsScore: 87,
      templateType: 'Professional Modern',
      createdWith: 'builder',
      version: 3,
      isPublic: false,
      customizations: {
        colorScheme: 'blue',
        fontSize: 11,
        fontFamily: 'Calibri',
        layout: 'two-column',
        sections: ['contact', 'summary', 'experience', 'education', 'skills', 'projects'],
        showPhoto: false
      }
    },
    {
      id: '2',
      name: 'Data Science Internship Resume',
      fileName: 'John_Doe_DS_Intern_Resume.pdf',
      fileSize: '1.9 MB',
      uploadDate: '2025-08-15',
      lastModified: '2025-08-30',
      isDefault: false,
      downloadCount: 8,
      viewCount: 22,
      format: 'pdf',
      status: 'active',
      thumbnail: '📊',
      tags: ['data-science', 'python', 'machine-learning', 'internship'],
      appliedToCompanies: ['Netflix', 'Uber', 'Airbnb'],
      feedback: [
        {
          id: '1',
          reviewer: 'Career Advisor - Prof. Amit Patel',
          rating: 3,
          comments: 'Good foundation but needs more emphasis on data science projects and relevant coursework.',
          suggestions: ['Add more ML projects', 'Include relevant MOOCs', 'Showcase data visualization skills'],
          date: '2025-08-30',
          category: 'content'
        }
      ],
      atsScore: 73,
      templateType: 'Modern Tech',
      createdWith: 'builder',
      version: 2,
      isPublic: false,
      customizations: {
        colorScheme: 'green',
        fontSize: 10,
        fontFamily: 'Arial',
        layout: 'single-column',
        sections: ['contact', 'summary', 'education', 'projects', 'skills', 'certifications'],
        showPhoto: false
      }
    },
    {
      id: '3',
      name: 'Product Manager Resume',
      fileName: 'John_Doe_PM_Resume.docx',
      fileSize: '1.2 MB',
      uploadDate: '2025-08-10',
      lastModified: '2025-08-10',
      isDefault: false,
      downloadCount: 3,
      viewCount: 12,
      format: 'docx',
      status: 'draft',
      thumbnail: '📋',
      tags: ['product-manager', 'strategy', 'analytics', 'draft'],
      appliedToCompanies: [],
      feedback: [],
      atsScore: 65,
      templateType: 'Creative Professional',
      createdWith: 'upload',
      version: 1,
      isPublic: false,
      customizations: {
        colorScheme: 'purple',
        fontSize: 11,
        fontFamily: 'Times New Roman',
        layout: 'single-column',
        sections: ['contact', 'summary', 'experience', 'education', 'skills'],
        showPhoto: true
      }
    }
  ]);

  const [templates] = useState<ResumeTemplate[]>([
    {
      id: '1',
      name: 'Professional Classic',
      description: 'Clean, ATS-friendly template perfect for corporate positions and traditional industries',
      preview: '📊',
      category: 'professional',
      isPopular: true,
      downloadCount: 1250,
      rating: 4.8,
      features: ['ATS Optimized', 'Clean Layout', 'Professional Fonts', 'Easy to Customize'],
      colorSchemes: ['blue', 'black', 'gray', 'navy'],
      difficulty: 'easy'
    },
    {
      id: '2',
      name: 'Modern Tech',
      description: 'Contemporary design ideal for tech startups and innovative companies',
      preview: '💻',
      category: 'modern',
      isPopular: true,
      downloadCount: 980,
      rating: 4.7,
      features: ['Modern Design', 'Tech-Focused', 'Skills Visualization', 'Project Showcase'],
      colorSchemes: ['blue', 'green', 'purple', 'orange'],
      difficulty: 'intermediate'
    },
    {
      id: '3',
      name: 'Creative Designer',
      description: 'Eye-catching template for creative professionals and design roles',
      preview: '🎨',
      category: 'creative',
      isPopular: false,
      downloadCount: 670,
      rating: 4.5,
      features: ['Creative Layout', 'Portfolio Integration', 'Visual Elements', 'Unique Design'],
      colorSchemes: ['red', 'orange', 'purple', 'pink'],
      difficulty: 'advanced'
    },
    {
      id: '4',
      name: 'Academic Research',
      description: 'Formal template suitable for academic and research positions',
      preview: '🎓',
      category: 'academic',
      isPopular: false,
      downloadCount: 450,
      rating: 4.3,
      features: ['Publication Ready', 'Research Focus', 'Citation Format', 'Academic Style'],
      colorSchemes: ['black', 'blue', 'gray'],
      difficulty: 'easy'
    },
    {
      id: '5',
      name: 'Minimalist Pro',
      description: 'Clean, distraction-free design focusing on content over aesthetics',
      preview: '📝',
      category: 'minimalist',
      isPopular: true,
      downloadCount: 890,
      rating: 4.6,
      features: ['Ultra Clean', 'Content Focused', 'Easy Reading', 'Print Friendly'],
      colorSchemes: ['black', 'gray', 'blue'],
      difficulty: 'easy'
    }
  ]);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    location: 'Bangalore, Karnataka, India',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'johndoe.dev',
    summary: 'Passionate and driven Computer Science student with expertise in full-stack web development and problem-solving. Experienced in React.js, Node.js, and modern web technologies. Seeking opportunities to contribute to innovative projects and grow as a software engineer.',
    languages: ['English', 'Hindi', 'Kannada']
  });

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: 'XYZ Institute of Technology',
      degree: 'Bachelor of Technology',
      field: 'Computer Science Engineering',
      startYear: '2021',
      endYear: '2025',
      cgpa: '8.7',
      percentage: '87%',
      achievements: ['Dean\'s List (6 semesters)', 'Best Project Award 2024', 'Programming Club President'],
      coursework: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Machine Learning'],
      projects: ['Library Management System', 'Student Portal', 'Chat Application'],
      current: true
    }
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    {
      id: '1',
      company: 'TechStartup Inc.',
      position: 'Software Development Intern',
      startDate: '2024-06',
      endDate: '2024-08',
      current: false,
      location: 'Bangalore, India',
      description: [
        'Developed responsive web applications using React.js and Node.js, serving 1000+ users daily',
        'Collaborated with cross-functional teams to deliver 5 major features ahead of schedule',
        'Improved application performance by 35% through code optimization and caching strategies',
        'Participated in code reviews and maintained 95% test coverage across all modules'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'HTML', 'CSS'],
      achievements: ['Employee of the Month - July 2024', 'Led team of 3 junior developers'],
      type: 'internship'
    },
    {
      id: '2',
      company: 'College Technical Society',
      position: 'Web Development Lead',
      startDate: '2023-08',
      endDate: '2024-05',
      current: false,
      location: 'College Campus',
      description: [
        'Led a team of 8 developers to build college management portal with 2000+ active users',
        'Designed and implemented RESTful APIs for student information system',
        'Mentored junior students in web development technologies and best practices'
      ],
      technologies: ['Vue.js', 'PHP', 'MySQL', 'Bootstrap'],
      achievements: ['Increased user engagement by 60%', 'Reduced page load time by 40%'],
      type: 'volunteer'
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment gateway integration, user authentication, and real-time inventory management',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux'],
      githubUrl: 'https://github.com/johndoe/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.johndoe.dev',
      startDate: '2024-03',
      endDate: '2024-05',
      teamSize: 1,
      role: 'Full-Stack Developer',
      highlights: [
        'Implemented secure payment processing with Stripe',
        'Built responsive UI supporting mobile and desktop',
        'Integrated real-time notifications using WebSockets',
        'Achieved 98% test coverage with Jest and Cypress'
      ],
      category: 'web'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, team collaboration, and progress tracking',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Chart.js'],
      githubUrl: 'https://github.com/johndoe/taskmanager',
      liveUrl: 'https://taskmanager.johndoe.dev',
      startDate: '2024-01',
      endDate: '2024-02',
      teamSize: 2,
      role: 'Frontend Lead',
      highlights: [
        'Built real-time collaborative features using Firebase',
        'Implemented drag-and-drop task management interface',
        'Added comprehensive analytics dashboard',
        'Supported offline functionality with service workers'
      ],
      category: 'web'
    },
    {
      id: '3',
      name: 'AI Recipe Recommender',
      description: 'Machine learning application that recommends recipes based on available ingredients and dietary preferences',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'scikit-learn'],
      githubUrl: 'https://github.com/johndoe/ai-recipe-recommender',
      liveUrl: 'https://recipes.johndoe.dev',
      startDate: '2023-11',
      endDate: '2023-12',
      teamSize: 3,
      role: 'ML Engineer',
      highlights: [
        'Trained recommendation model with 95% accuracy',
        'Processed dataset of 50,000+ recipes',
        'Built REST API serving 100+ requests per minute',
        'Implemented user preference learning algorithm'
      ],
      category: 'ai/ml'
    }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'JavaScript', category: 'programming', proficiency: 'advanced', yearsOfExperience: 3 },
    { id: '2', name: 'Python', category: 'programming', proficiency: 'intermediate', yearsOfExperience: 2 },
    { id: '3', name: 'Java', category: 'programming', proficiency: 'intermediate', yearsOfExperience: 2 },
    { id: '4', name: 'React.js', category: 'framework', proficiency: 'advanced', yearsOfExperience: 2 },
    { id: '5', name: 'Node.js', category: 'framework', proficiency: 'intermediate', yearsOfExperience: 2 },
    { id: '6', name: 'Vue.js', category: 'framework', proficiency: 'intermediate', yearsOfExperience: 1 },
    { id: '7', name: 'MongoDB', category: 'database', proficiency: 'intermediate', yearsOfExperience: 2 },
    { id: '8', name: 'PostgreSQL', category: 'database', proficiency: 'beginner', yearsOfExperience: 1 },
    { id: '9', name: 'Git', category: 'tool', proficiency: 'advanced', yearsOfExperience: 3 },
    { id: '10', name: 'Docker', category: 'tool', proficiency: 'intermediate', yearsOfExperience: 1 },
    { id: '11', name: 'Communication', category: 'soft-skill', proficiency: 'advanced' },
    { id: '12', name: 'Team Leadership', category: 'soft-skill', proficiency: 'intermediate' }
  ]);

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2024-07',
      expiryDate: '2027-07',
      credentialId: 'AWS-DEV-2024-JD001',
      verificationUrl: 'https://aws.amazon.com/verification/AWS-DEV-2024-JD001',
      skills: ['AWS', 'Cloud Computing', 'Lambda', 'DynamoDB']
    },
    {
      id: '2',
      name: 'Meta Frontend Developer Professional Certificate',
      issuer: 'Meta (Coursera)',
      issueDate: '2024-05',
      credentialId: 'META-FE-2024-001',
      verificationUrl: 'https://coursera.org/verify/META-FE-2024-001',
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'UI/UX']
    },
    {
      id: '3',
      name: 'Google Data Analytics Professional Certificate',
      issuer: 'Google (Coursera)',
      issueDate: '2024-03',
      credentialId: 'GOOGLE-DA-2024-001',
      skills: ['Data Analysis', 'SQL', 'Tableau', 'R', 'Python']
    }
  ]);

  // Component State
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeBuilderTab, setActiveBuilderTab] = useState<'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'certificates' | 'preview'>('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ATSAnalysis | null>(null);

  // Filter resumes
  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resume.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         resume.appliedToCompanies.some(company => company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'all' || resume.status === selectedStatus;
    const matchesFormat = selectedFormat === 'all' || resume.format === selectedFormat;
    
    return matchesSearch && matchesStatus && matchesFormat;
  });

  // File Upload Handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      alert('⚠️ Please upload only PDF or DOCX files');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('⚠️ File size should be less than 5MB');
      return;
    }

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Create new resume entry
          const newResume: Resume = {
            id: Date.now().toString(),
            name: file.name.replace(/\.[^/.]+$/, ''),
            fileName: file.name,
            fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            uploadDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            isDefault: resumes.length === 0,
            downloadCount: 0,
            viewCount: 0,
            format: file.type.includes('pdf') ? 'pdf' : 'docx',
            status: 'active',
            thumbnail: file.type.includes('pdf') ? '📄' : '📝',
            tags: ['uploaded', 'new'],
            appliedToCompanies: [],
            feedback: [],
            atsScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
            templateType: 'Uploaded Document',
            createdWith: 'upload',
            version: 1,
            isPublic: false,
            customizations: {
              colorScheme: 'blue',
              fontSize: 11,
              fontFamily: 'Calibri',
              layout: 'single-column',
              sections: ['contact', 'summary', 'experience', 'education', 'skills'],
              showPhoto: false
            }
          };

          setResumes(prev => [...prev, newResume]);
          setIsUploading(false);
          setUploadProgress(0);
          setShowUploadModal(false);
          
          alert('✅ Resume uploaded successfully!');
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Resume Management Functions
  const setDefaultResume = (resumeId: string) => {
    setResumes(prev => prev.map(resume => ({
      ...resume,
      isDefault: resume.id === resumeId
    })));
    
    const resume = resumes.find(r => r.id === resumeId);
    alert(`✅ "${resume?.name}" is now your default resume!`);
  };

  const deleteResume = (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) return;

    if (resume.isDefault) {
      alert('⚠️ Cannot delete your default resume. Please set another resume as default first.');
      return;
    }

    if (confirm(`Are you sure you want to delete "${resume.name}"? This action cannot be undone.`)) {
      setResumes(prev => prev.filter(r => r.id !== resumeId));
      if (selectedResume?.id === resumeId) {
        setSelectedResume(null);
        setShowPreviewModal(false);
      }
      alert('🗑️ Resume deleted successfully!');
    }
  };

  const duplicateResume = (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) return;

    const duplicatedResume: Resume = {
      ...resume,
      id: Date.now().toString(),
      name: `${resume.name} (Copy)`,
      fileName: `${resume.fileName.replace(/\.[^/.]+$/, '')}_copy.${resume.format}`,
      uploadDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      isDefault: false,
      downloadCount: 0,
      viewCount: 0,
      version: 1,
      parentId: resume.id,
      tags: [...resume.tags, 'copy'],
      appliedToCompanies: [],
      feedback: []
    };

    setResumes(prev => [...prev, duplicatedResume]);
    alert(`📋 "${resume.name}" duplicated successfully!`);
  };

  const downloadResume = (resume: Resume) => {
    setResumes(prev => prev.map(r => 
      r.id === resume.id 
        ? { ...r, downloadCount: r.downloadCount + 1 }
        : r
    ));
    alert(`📥 Downloading ${resume.fileName}... Check your downloads folder.`);
    
    // In a real application, this would trigger actual file download
    const link = document.createElement('a');
    link.href = '#'; // Would be actual file URL
    link.download = resume.fileName;
    link.click();
  };

  const previewResume = (resume: Resume) => {
    setResumes(prev => prev.map(r => 
      r.id === resume.id 
        ? { ...r, viewCount: r.viewCount + 1 }
        : r
    ));
    setSelectedResume(resume);
    setShowPreviewModal(true);
  };

  const shareResume = (resume: Resume) => {
    setSelectedResume(resume);
    setShowShareModal(true);
  };

  const generateShareUrl = (resumeId: string, isPublic: boolean) => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/resume/view/${resumeId}`;
    
    setResumes(prev => prev.map(resume => 
      resume.id === resumeId 
        ? { ...resume, isPublic, shareUrl }
        : resume
    ));
    
    if (isPublic) {
      navigator.clipboard.writeText(shareUrl);
      alert('🔗 Public share link copied to clipboard!');
    } else {
      alert('🔒 Resume is now private');
    }
  };

  // ATS Analysis Functions
  const analyzeResume = (resume: Resume) => {
    setSelectedResume(resume);
    
    // Simulate ATS analysis
    const analysis: ATSAnalysis = {
      overallScore: resume.atsScore,
      sections: {
        contactInfo: Math.floor(Math.random() * 20) + 80,
        summary: Math.floor(Math.random() * 30) + 70,
        experience: Math.floor(Math.random() * 25) + 75,
        education: Math.floor(Math.random() * 20) + 80,
        skills: Math.floor(Math.random() * 30) + 70,
        formatting: Math.floor(Math.random() * 15) + 85
      },
      suggestions: [
        'Add more quantified achievements in experience section',
        'Include relevant keywords from job descriptions',
        'Optimize formatting for better ATS readability',
        'Add skills section with industry-relevant keywords',
        'Use consistent date formatting throughout'
      ],
      keywords: {
        found: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'Agile', 'APIs'],
        missing: ['TypeScript', 'AWS', 'Docker', 'CI/CD', 'Testing', 'Microservices'],
        density: 2.5
      },
      improvements: [
        {
          category: 'Keywords',
          description: 'Add missing technical keywords to improve matching',
          impact: 'high'
        },
        {
          category: 'Formatting',
          description: 'Use consistent bullet points and spacing',
          impact: 'medium'
        },
        {
          category: 'Content',
          description: 'Quantify more achievements with specific numbers',
          impact: 'high'
        }
      ]
    };
    
    setCurrentAnalysis(analysis);
    setShowAnalysisModal(true);
  };

  // Template and Builder Functions
  const buildResumeFromTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setShowTemplatesModal(false);
    setShowBuilderModal(true);
    alert(`🎨 Building resume with "${template.name}" template...`);
  };

  const generateResume = () => {
    if (!selectedTemplate) {
      alert('⚠️ Please select a template first!');
      return;
    }

    const newResume: Resume = {
      id: Date.now().toString(),
      name: `${selectedTemplate.name} Resume`,
      fileName: `${personalInfo.fullName.replace(' ', '_')}_Resume.pdf`,
      fileSize: '2.1 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      isDefault: false,
      downloadCount: 0,
      viewCount: 0,
      format: 'pdf',
      status: 'active',
      thumbnail: selectedTemplate.preview,
      tags: ['generated', selectedTemplate.category, 'new'],
      appliedToCompanies: [],
      feedback: [],
      atsScore: Math.floor(Math.random() * 20) + 80,
      templateType: selectedTemplate.name,
      createdWith: 'builder',
      version: 1,
      isPublic: false,
      customizations: {
        colorScheme: selectedTemplate.colorSchemes[0],
        fontSize: 11,
        fontFamily: 'Calibri',
        layout: 'two-column',
        sections: ['contact', 'summary', 'experience', 'education', 'skills', 'projects'],
        showPhoto: false
      }
    };

    setResumes(prev => [...prev, newResume]);
    setShowBuilderModal(false);
    alert('🎉 Resume generated successfully!');
  };

  // Data Management Functions
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      cgpa: '',
      achievements: [],
      coursework: [],
      projects: [],
      current: false
    };
    setEducation(prev => [...prev, newEducation]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    setEducation(prev => prev.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    ));
  };

  const removeEducation = (id: string) => {
    if (education.length <= 1) {
      alert('⚠️ At least one education entry is required!');
      return;
    }
    setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: [''],
      technologies: [],
      achievements: [],
      type: 'full-time'
    };
    setExperience(prev => [...prev, newExperience]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperience(prev => prev.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperience(prev => prev.filter(exp => exp.id !== id));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      startDate: '',
      endDate: '',
      teamSize: 1,
      role: '',
      highlights: [],
      category: 'web'
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'programming',
      proficiency: 'intermediate'
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, ...updates } : skill
    ));
  };

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      skills: []
    };
    setCertificates(prev => [...prev, newCertificate]);
  };

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    setCertificates(prev => prev.map(cert => 
      cert.id === id ? { ...cert, ...updates } : cert
    ));
  };

  const removeCertificate = (id: string) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  // Feedback Functions
  const addFeedback = (resumeId: string, feedback: Omit<ResumeFeedback, 'id'>) => {
    const newFeedback: ResumeFeedback = {
      ...feedback,
      id: Date.now().toString()
    };
    
    setResumes(prev => prev.map(resume => 
      resume.id === resumeId 
        ? { ...resume, feedback: [...resume.feedback, newFeedback] }
        : resume
    ));
  };

  const markFeedbackHelpful = (resumeId: string, feedbackId: string, isHelpful: boolean) => {
    setResumes(prev => prev.map(resume => 
      resume.id === resumeId 
        ? {
            ...resume,
            feedback: resume.feedback.map(fb => 
              fb.id === feedbackId ? { ...fb, isHelpful } : fb
            )
          }
        : resume
    ));
    
    alert(isHelpful ? '👍 Marked as helpful!' : '👎 Feedback noted.');
  };

  // Utility Functions
  const getATSScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getProficiencyColor = (proficiency: string) => {
    const colors = {
      beginner: 'bg-gray-100 text-gray-800',
      intermediate: 'bg-blue-100 text-blue-800',
      advanced: 'bg-green-100 text-green-800',
      expert: 'bg-purple-100 text-purple-800'
    };
    return colors[proficiency as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors];
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedFormat('all');
  };

  // Statistics
  const stats = {
    totalResumes: resumes.length,
    activeResumes: resumes.filter(r => r.status === 'active').length,
    totalDownloads: resumes.reduce((sum, r) => sum + r.downloadCount, 0),
    totalViews: resumes.reduce((sum, r) => sum + r.viewCount, 0),
    averageATS: resumes.length > 0 ? Math.round(resumes.reduce((sum, r) => sum + r.atsScore, 0) / resumes.length) : 0,
    totalApplications: resumes.reduce((sum, r) => sum + r.appliedToCompanies.length, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume Manager</h1>
              <p className="text-gray-600 mt-1">Create, manage, and optimize your resumes for different job applications</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowTemplatesModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create New
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <UploadIcon size={20} />
                Upload Resume
              </button>
              <button
                onClick={() => alert('📊 Opening resume analytics dashboard...')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BarChart3Icon size={20} />
                Analytics
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalResumes}</p>
                </div>
                <FileTextIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Active</p>
                  <p className="text-2xl font-bold text-green-900">{stats.activeResumes}</p>
                </div>
                <CheckCircleIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Downloads</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.totalDownloads}</p>
                </div>
                <DownloadIcon className="text-purple-600" size={24} />
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Views</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.totalViews}</p>
                </div>
                <EyeIcon className="text-orange-600" size={24} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Avg ATS</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.averageATS}%</p>
                </div>
                <TargetIcon className="text-yellow-600" size={24} />
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">Applications</p>
                  <p className="text-2xl font-bold text-indigo-900">{stats.totalApplications}</p>
                </div>
                <BriefcaseIcon className="text-indigo-600" size={24} />
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
                  placeholder="Search resumes by name, tags, or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Formats</option>
                  <option value="pdf">PDF</option>
                  <option value="docx">DOCX</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors lg:hidden"
                >
                  <FilterIcon size={16} />
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedStatus !== 'all' || selectedFormat !== 'all') && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Showing {filteredResumes.length} of {resumes.length} resumes
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {filteredResumes.map(resume => (
            <div key={resume.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <div className="p-6">
                {/* Resume Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{resume.thumbnail}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{resume.name}</h3>
                        {resume.isDefault && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{resume.templateType}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume.status)}`}>
                        {resume.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                      <MoreVerticalIcon size={16} />
                    </button>
                  </div>
                </div>

                {/* Resume Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{resume.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium uppercase">{resume.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Downloads:</span>
                    <span className="font-medium">{resume.downloadCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-medium">{resume.viewCount}</span>
                  </div>
                </div>

                {/* ATS Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">ATS Score</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getATSScoreColor(resume.atsScore)}`}>
                      {resume.atsScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        resume.atsScore >= 80 ? 'bg-green-500' :
                        resume.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${resume.atsScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tags */}
                {resume.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {resume.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                      {resume.tags.length > 4 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{resume.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Applied Companies */}
                {resume.appliedToCompanies.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-1">Applied to:</p>
                    <p className="text-sm font-medium text-blue-600">
                      {resume.appliedToCompanies.slice(0, 2).join(', ')}
                      {resume.appliedToCompanies.length > 2 && ` +${resume.appliedToCompanies.length - 2} more`}
                    </p>
                  </div>
                )}

                {/* Last Modified */}
                <div className="mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ClockIcon size={12} />
                    <span>Modified {new Date(resume.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => previewResume(resume)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <EyeIcon size={14} />
                      Preview
                    </button>
                    <button
                      onClick={() => downloadResume(resume)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <DownloadIcon size={14} />
                      Download
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => analyzeResume(resume)}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <ZapIcon size={14} />
                      Analyze
                    </button>
                    <button
                      onClick={() => shareResume(resume)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <ShareIcon size={14} />
                      Share
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1">
                    {!resume.isDefault && (
                      <button
                        onClick={() => setDefaultResume(resume.id)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 px-2 rounded-lg transition-colors text-xs flex items-center justify-center gap-1"
                      >
                        <StarIcon size={12} />
                        Default
                      </button>
                    )}
                    <button
                      onClick={() => duplicateResume(resume.id)}
                      className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-2 rounded-lg transition-colors text-xs flex items-center justify-center gap-1"
                    >
                      <CopyIcon size={12} />
                      Copy
                    </button>
                    <button
                      onClick={() => deleteResume(resume.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-2 rounded-lg transition-colors text-xs flex items-center justify-center gap-1"
                    >
                      <TrashIcon size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <div 
            className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-all cursor-pointer"
            onClick={() => setShowTemplatesModal(true)}
          >
            <div className="p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <PlusIcon className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Create New Resume</h3>
              <p className="text-sm text-blue-700 mb-4">Use our professional templates to build your perfect resume</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-blue-600">
                  <CheckCircleIcon size={14} />
                  <span>ATS Optimized</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-blue-600">
                  <CheckCircleIcon size={14} />
                  <span>Multiple Templates</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-blue-600">
                  <CheckCircleIcon size={14} />
                  <span>Easy Customization</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredResumes.length === 0 && resumes.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <SearchIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes match your search</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
            <button
              onClick={clearAllFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {resumes.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileTextIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume or upload an existing one to get started</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setShowTemplatesModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon size={20} />
                Create Resume
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <UploadIcon size={20} />
                Upload Resume
              </button>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upload Resume</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isUploading}
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              {!isUploading ? (
                <div>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadIcon className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="font-medium text-gray-700 mb-2">Upload your resume</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <p>Supported formats: PDF, DOCX</p>
                      <p>Maximum file size: 5MB</p>
                    </div>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Choose File
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Upload Tips:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Use PDF format for best compatibility</li>
                      <li>• Ensure text is selectable (not scanned image)</li>
                      <li>• Keep file size under 5MB</li>
                      <li>• Use standard fonts for better ATS parsing</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UploadIcon className="text-blue-600 animate-bounce" size={24} />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Uploading Resume...</h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
                  <div className="mt-4 space-y-1 text-xs text-gray-500">
                    <p>Processing your resume...</p>
                    <p>This may take a few moments</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Templates Modal */}
        {showTemplatesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose Resume Template</h2>
                  <p className="text-gray-600 mt-1">Select a professional template to build your perfect resume</p>
                </div>
                <button
                  onClick={() => setShowTemplatesModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              {/* Template Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['all', 'professional', 'modern', 'creative', 'academic', 'minimalist'].map(category => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors text-sm"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(template => (
                  <div key={template.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{template.preview}</div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        {template.isPopular && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          template.category === 'professional' ? 'bg-blue-100 text-blue-800' :
                          template.category === 'modern' ? 'bg-green-100 text-green-800' :
                          template.category === 'creative' ? 'bg-purple-100 text-purple-800' :
                          template.category === 'academic' ? 'bg-gray-100 text-gray-800' :
                          'bg-pink-100 text-pink-800'
                        }`}>
                          {template.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <StarIcon size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{template.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{template.downloadCount.toLocaleString()} downloads</span>
                        <span className={`px-2 py-1 rounded-full ${
                          template.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {template.difficulty}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-700">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                          {template.features.length > 3 && (
                            <span className="text-xs text-gray-500">+{template.features.length - 3}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-700">Colors:</h4>
                        <div className="flex gap-1">
                          {template.colorSchemes.map((color, index) => (
                            <div
                              key={index}
                              className={`w-6 h-6 rounded-full border-2 border-white shadow-sm ${
                                color === 'blue' ? 'bg-blue-500' :
                                color === 'green' ? 'bg-green-500' :
                                color === 'purple' ? 'bg-purple-500' :
                                color === 'red' ? 'bg-red-500' :
                                color === 'orange' ? 'bg-orange-500' :
                                color === 'pink' ? 'bg-pink-500' :
                                color === 'gray' ? 'bg-gray-500' :
                                color === 'navy' ? 'bg-blue-900' :
                                'bg-black'
                              }`}
                              title={color}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <button
                        onClick={() => buildResumeFromTemplate(template)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                      >
                        Use This Template
                      </button>
                      <button
                        onClick={() => alert(`👁️ Previewing ${template.name} template...`)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        Preview Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">Why Use Our Templates?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} />
                    <span>ATS-Friendly Formatting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} />
                    <span>Professional Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} />
                    <span>Easy Customization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume Builder Modal */}
        {showBuilderModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Resume Builder</h2>
                    <p className="text-gray-600">Building with {selectedTemplate.name} template</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <SaveIcon size={16} />
                      <span>Auto-saving...</span>
                    </div>
                    <button
                      onClick={() => setShowBuilderModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XIcon size={24} />
                    </button>
                  </div>
                </div>
                
                {/* Builder Tabs */}
                <div className="flex gap-1 overflow-x-auto">
                  {['personal', 'education', 'experience', 'projects', 'skills', 'certificates', 'preview'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveBuilderTab(tab as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                        activeBuilderTab === tab 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tab === 'personal' && <UserIcon size={14} />}
                        {tab === 'education' && <GraduationCapIcon size={14} />}
                        {tab === 'experience' && <BriefcaseIcon size={14} />}
                        {tab === 'projects' && <BuildingIcon size={14} />}
                        {tab === 'skills' && <ZapIcon size={14} />}
                        {tab === 'certificates' && <AwardIcon size={14} />}
                        {tab === 'preview' && <EyeIcon size={14} />}
                        <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                <div className="p-6">
                  {activeBuilderTab === 'personal' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <UserIcon size={20} />
                          Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input
                              type="text"
                              value={personalInfo.fullName}
                              onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter your full name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input
                              type="email"
                              value={personalInfo.email}
                              onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="your.email@example.com"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                            <input
                              type="tel"
                              value={personalInfo.phone}
                              onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="+91 9876543210"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                              type="text"
                              value={personalInfo.location}
                              onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="City, State, Country"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                            <input
                              type="url"
                              value={personalInfo.linkedin}
                              onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="linkedin.com/in/username"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                            <input
                              type="url"
                              value={personalInfo.github}
                              onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="github.com/username"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                            <input
                              type="url"
                              value={personalInfo.portfolio}
                              onChange={(e) => setPersonalInfo({...personalInfo, portfolio: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="yourportfolio.com"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                          <textarea
                            value={personalInfo.summary}
                            onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Write a compelling professional summary highlighting your key strengths, experience, and career objectives..."
                          />
                          <div className="mt-2 text-xs text-gray-500">
                            {personalInfo.summary.length}/500 characters
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                          <input
                            type="text"
                            value={personalInfo.languages.join(', ')}
                            onChange={(e) => setPersonalInfo({
                              ...personalInfo, 
                              languages: e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang)
                            })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="English, Hindi, Spanish (separate with commas)"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeBuilderTab === 'education' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <GraduationCapIcon size={20} />
                          Education
                        </h3>
                        <button
                          onClick={addEducation}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <PlusIcon size={16} />
                          Add Education
                        </button>
                      </div>
                      
                      {education.map((edu, index) => (
                        <div key={edu.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
                            {education.length > 1 && (
                              <button
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="University/College name"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Bachelor of Technology"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
                              <input
                                type="text"
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Computer Science Engineering"
                              />
                            </div>
                            
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
                                <input
                                  type="text"
                                  value={edu.cgpa}
                                  onChange={(e) => updateEducation(edu.id, { cgpa: e.target.value })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                  placeholder="8.5"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Percentage</label>
                                <input
                                  type="text"
                                  value={edu.percentage || ''}
                                  onChange={(e) => updateEducation(edu.id, { percentage: e.target.value })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                  placeholder="85%"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                              <input
                                type="text"
                                value={edu.startYear}
                                onChange={(e) => updateEducation(edu.id, { startYear: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="2021"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={edu.endYear}
                                  onChange={(e) => updateEducation(edu.id, { endYear: e.target.value })}
                                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                  placeholder="2025"
                                  disabled={edu.current}
                                />
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={edu.current}
                                    onChange={(e) => updateEducation(edu.id, { current: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-600"
                                  />
                                  <span>Current</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Achievements & Honors</label>
                            <textarea
                              value={edu.achievements.join('\n')}
                              onChange={(e) => updateEducation(edu.id, { 
                                achievements: e.target.value.split('\n').filter(item => item.trim()) 
                              })}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="List your achievements, honors, or awards (one per line)"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Coursework</label>
                            <textarea
                              value={edu.coursework.join('\n')}
                              onChange={(e) => updateEducation(edu.id, { 
                                coursework: e.target.value.split('\n').filter(item => item.trim()) 
                              })}
                              rows={2}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="List relevant courses (one per line)"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeBuilderTab === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <BriefcaseIcon size={20} />
                          Work Experience
                        </h3>
                        <button
                          onClick={addExperience}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <PlusIcon size={16} />
                          Add Experience
                        </button>
                      </div>
                      
                      {experience.map((exp, index) => (
                        <div key={exp.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Company name"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Job title"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="City, Country"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                              <select
                                value={exp.type}
                                onChange={(e) => updateExperience(exp.id, { type: e.target.value as any })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="internship">Internship</option>
                                <option value="freelance">Freelance</option>
                                <option value="volunteer">Volunteer</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value, current: false })}
                                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                  disabled={exp.current}
                                />
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={exp.current}
                                    onChange={(e) => updateExperience(exp.id, { 
                                      current: e.target.checked,
                                      endDate: e.target.checked ? '' : exp.endDate
                                    })}
                                    className="rounded border-gray-300 text-blue-600"
                                  />
                                  <span>Current</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description & Responsibilities</label>
                            <textarea
                              value={exp.description.join('\n')}
                              onChange={(e) => updateExperience(exp.id, { 
                                description: e.target.value.split('\n').filter(item => item.trim()) 
                              })}
                              rows={4}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="• Describe your key responsibilities and achievements (one bullet point per line)&#10;• Use action verbs and quantify results where possible&#10;• Focus on impact and outcomes"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies & Tools Used</label>
                            <input
                              type="text"
                              value={exp.technologies.join(', ')}
                              onChange={(e) => updateExperience(exp.id, { 
                                technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech) 
                              })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="React, Node.js, Python, AWS (separate with commas)"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
                            <textarea
                              value={exp.achievements.join('\n')}
                              onChange={(e) => updateExperience(exp.id, { 
                                achievements: e.target.value.split('\n').filter(item => item.trim()) 
                              })}
                              rows={2}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="List specific achievements with metrics (one per line)"
                            />
                          </div>
                        </div>
                      ))}
                      
                      {experience.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                          <BriefcaseIcon className="mx-auto text-gray-400 mb-4" size={48} />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience yet?</h3>
                          <p className="text-gray-600 mb-4">Add internships, part-time jobs, volunteer work, or projects</p>
                          <button
                            onClick={addExperience}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            Add Your First Experience
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeBuilderTab === 'projects' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <BuildingIcon size={20} />
                          Projects
                        </h3>
                        <button
                          onClick={addProject}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <PlusIcon size={16} />
                          Add Project
                        </button>
                      </div>
                      
                      {projects.map((project, index) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
                            <button
                              onClick={() => removeProject(project.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                              <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateProject(project.id, { name: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., E-Commerce Platform"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                              <select
                                value={project.category}
                                onChange={(e) => updateProject(project.id, { category: e.target.value as any })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="web">Web Application</option>
                                <option value="mobile">Mobile App</option>
                                <option value="desktop">Desktop Software</option>
                                <option value="ai/ml">AI/ML Project</option>
                                <option value="blockchain">Blockchain</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
                              <input
                                type="text"
                                value={project.role}
                                onChange={(e) => updateProject(project.id, { role: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Full-Stack Developer, Team Lead"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                              <input
                                type="number"
                                value={project.teamSize}
                                onChange={(e) => updateProject(project.id, { teamSize: parseInt(e.target.value) })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                min="1"
                                placeholder="1"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                              <input
                                type="month"
                                value={project.startDate}
                                onChange={(e) => updateProject(project.id, { startDate: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                              <input
                                type="month"
                                value={project.endDate}
                                onChange={(e) => updateProject(project.id, { endDate: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Repository</label>
                              <input
                                type="url"
                                value={project.githubUrl}
                                onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                              <input
                                type="url"
                                value={project.liveUrl}
                                onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="https://yourproject.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => updateProject(project.id, { description: e.target.value })}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="Describe your project, its purpose, features, and your contribution"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                            <input
                              type="text"
                              value={project.technologies.join(', ')}
                              onChange={(e) => updateProject(project.id, { 
                                technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech) 
                              })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="React, Node.js, MongoDB, Express (separate with commas)"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Key Highlights & Features</label>
                            <textarea
                              value={project.highlights.join('\n')}
                              onChange={(e) => updateProject(project.id, { 
                                highlights: e.target.value.split('\n').filter(item => item.trim()) 
                              })}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="• List key features and achievements (one per line)&#10;• Include metrics where possible&#10;• Highlight technical challenges solved"
                            />
                          </div>
                        </div>
                      ))}
                      
                      {projects.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                          <BuildingIcon className="mx-auto text-gray-400 mb-4" size={48} />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet?</h3>
                          <p className="text-gray-600 mb-4">Showcase your coding projects, college assignments, or personal work</p>
                          <button
                            onClick={addProject}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            Add Your First Project
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeBuilderTab === 'skills' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <ZapIcon size={20} />
                          Skills & Expertise
                        </h3>
                        <button
                          onClick={addSkill}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <PlusIcon size={16} />
                          Add Skill
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map((skill, index) => (
                          <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h5 className="font-medium text-gray-900">Skill #{index + 1}</h5>
                                <button
                                  onClick={() => removeSkill(skill.id)}
                                  className="text-red-600 hover:text-red-800 text-xs"
                                >
                                  Remove
                                </button>
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Skill Name *</label>
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                  placeholder="e.g., JavaScript"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                <select
                                  value={skill.category}
                                  onChange={(e) => updateSkill(skill.id, { category: e.target.value as any })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="programming">Programming</option>
                                  <option value="framework">Framework</option>
                                  <option value="database">Database</option>
                                  <option value="tool">Tool</option>
                                  <option value="soft-skill">Soft Skill</option>
                                  <option value="language">Language</option>
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Proficiency</label>
                                <select
                                  value={skill.proficiency}
                                  onChange={(e) => updateSkill(skill.id, { proficiency: e.target.value as any })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="beginner">Beginner</option>
                                  <option value="intermediate">Intermediate</option>
                                  <option value="advanced">Advanced</option>
                                  <option value="expert">Expert</option>
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Years of Experience</label>
                                <input
                                  type="number"
                                  value={skill.yearsOfExperience || ''}
                                  onChange={(e) => updateSkill(skill.id, { yearsOfExperience: parseInt(e.target.value) || undefined })}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                  min="0"
                                  step="0.5"
                                  placeholder="2"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-3">Skills by Category</h4>
                        <div className="space-y-3">
                          {['programming', 'framework', 'database', 'tool', 'soft-skill', 'language'].map(category => {
                            const categorySkills = skills.filter(s => s.category === category);
                            if (categorySkills.length === 0) return null;
                            
                            return (
                              <div key={category} className="flex flex-wrap gap-2">
                                <span className="font-medium text-sm text-blue-800 capitalize min-w-[100px]">
                                  {category.replace('-', ' ')}:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {categorySkills.map(skill => (
                                    <span key={skill.id} className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
                                      {skill.name} ({skill.proficiency})
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeBuilderTab === 'certificates' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <AwardIcon size={20} />
                          Certifications & Licenses
                        </h3>
                        <button
                          onClick={addCertificate}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <PlusIcon size={16} />
                          Add Certificate
                        </button>
                      </div>
                      
                      {certificates.map((cert, index) => (
                        <div key={cert.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">Certificate #{index + 1}</h4>
                            <button
                              onClick={() => removeCertificate(cert.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Name *</label>
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., AWS Certified Developer"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization *</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Amazon Web Services"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                              <input
                                type="month"
                                value={cert.issueDate}
                                onChange={(e) => updateCertificate(cert.id, { issueDate: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (if any)</label>
                              <input
                                type="month"
                                value={cert.expiryDate || ''}
                                onChange={(e) => updateCertificate(cert.id, { expiryDate: e.target.value || undefined })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
                              <input
                                type="text"
                                value={cert.credentialId || ''}
                                onChange={(e) => updateCertificate(cert.id, { credentialId: e.target.value || undefined })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Certificate/License number"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Verification URL</label>
                              <input
                                type="url"
                                value={cert.verificationUrl || ''}
                                onChange={(e) => updateCertificate(cert.id, { verificationUrl: e.target.value || undefined })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Link to verify certificate"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Related Skills</label>
                            <input
                              type="text"
                              value={cert.skills.join(', ')}
                              onChange={(e) => updateCertificate(cert.id, { 
                                skills: e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill) 
                              })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              placeholder="Skills gained from this certificate (separate with commas)"
                            />
                          </div>
                        </div>
                      ))}
                      
                      {certificates.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                          <AwardIcon className="mx-auto text-gray-400 mb-4" size={48} />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications yet?</h3>
                          <p className="text-gray-600 mb-4">Add professional certifications, licenses, or online course completions</p>
                          <button
                            onClick={addCertificate}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            Add Your First Certificate
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeBuilderTab === 'preview' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <EyeIcon size={20} />
                          Resume Preview
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => alert('📱 Mobile preview - optimized for small screens')}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
                          >
                            Mobile View
                          </button>
                          <button
                            onClick={() => alert('🖥️ Desktop preview - full-width layout')}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm transition-colors"
                          >
                            Desktop View
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
                        <div className="p-8">
                          {/* Header */}
                          <div className="text-center mb-6 pb-6 border-b-2 border-blue-600">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-2">
                              {personalInfo.email && (
                                <div className="flex items-center gap-1">
                                  <MailIcon size={14} />
                                  <span>{personalInfo.email}</span>
                                </div>
                              )}
                              {personalInfo.phone && (
                                <div className="flex items-center gap-1">
                                  <PhoneIcon size={14} />
                                  <span>{personalInfo.phone}</span>
                                </div>
                              )}
                              {personalInfo.location && (
                                <div className="flex items-center gap-1">
                                  <MapPinIcon size={14} />
                                  <span>{personalInfo.location}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                              {personalInfo.linkedin && (
                                <div className="flex items-center gap-1 text-blue-600">
                                  <LinkedinIcon size={14} />
                                  <span>{personalInfo.linkedin}</span>
                                </div>
                              )}
                              {personalInfo.github && (
                                <div className="flex items-center gap-1 text-gray-700">
                                  <GithubIcon size={14} />
                                  <span>{personalInfo.github}</span>
                                </div>
                              )}
                              {personalInfo.portfolio && (
                                <div className="flex items-center gap-1 text-purple-600">
                                  <ExternalLinkIcon size={14} />
                                  <span>{personalInfo.portfolio}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Summary */}
                          {personalInfo.summary && (
                            <div className="mb-6">
                              <h2 className="text-xl font-semibold text-gray-900 mb-3 text-blue-800 border-b border-blue-200 pb-1">
                                Professional Summary
                              </h2>
                              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                            </div>
                          )}
                          
                          {/* Experience */}
                          {experience.length > 0 && (
                            <div className="mb-6">
                              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-blue-800 border-b border-blue-200 pb-1">
                                Work Experience
                              </h2>
                              <div className="space-y-4">
                                {experience.map(exp => (
                                  <div key={exp.id}>
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                        <p className="text-sm text-gray-600">{exp.location}</p>
                                      </div>
                                      <div className="text-right text-sm text-gray-600">
                                        <p className="font-medium">
                                          {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                                          {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </p>
                                        <p className="text-xs capitalize">{exp.type}</p>
                                      </div>
                                    </div>
                                    {exp.description.length > 0 && (
                                      <ul className="list-disc list-inside text-sm text-gray-700 mb-2 ml-4">
                                        {exp.description.map((desc, index) => (
                                          <li key={index} className="mb-1">{desc}</li>
                                        ))}
                                      </ul>
                                    )}
                                    {exp.technologies.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mb-2">
                                        <span className="text-sm text-gray-600 font-medium">Technologies:</span>
                                        {exp.technologies.map((tech, index) => (
                                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    {exp.achievements.length > 0 && (
                                      <div className="mb-2">
                                        <span className="text-sm text-gray-600 font-medium">Key Achievements:</span>
                                        <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                                          {exp.achievements.map((achievement, index) => (
                                            <li key={index}>{achievement}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Projects */}
                          {projects.length > 0 && (
                            <div className="mb-6">
                              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-blue-800 border-b border-blue-200 pb-1">
                                Projects
                              </h2>
                              <div className="space-y-4">
                                {projects.map(project => (
                                  <div key={project.id}>
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                        <p className="text-sm text-gray-600 capitalize">{project.category} • {project.role}</p>
                                        <div className="flex gap-2 text-sm text-blue-600 mt-1">
                                          {project.githubUrl && (
                                            <span className="flex items-center gap-1">
                                              <GithubIcon size={12} />
                                              <span>GitHub</span>
                                            </span>
                                          )}
                                          {project.liveUrl && (
                                            <span className="flex items-center gap-1">
                                              <ExternalLinkIcon size={12} />
                                              <span>Live Demo</span>
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="text-right text-sm text-gray-600">
                                        <p>
                                          {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                                          {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </p>
                                        <p className="text-xs">Team Size: {project.teamSize}</p>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                                    {project.technologies.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mb-2">
                                        <span className="text-sm text-gray-600 font-medium">Technologies:</span>
                                        {project.technologies.map((tech, index) => (
                                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    {project.highlights.length > 0 && (
                                      <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                                        {project.highlights.map((highlight, index) => (
                                          <li key={index}>{highlight}</li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Education */}
                          {education.length > 0 && (
                            <div className="mb-6">
                              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-blue-800 border-b border-blue-200 pb-1">
                                Education
                              </h2>
                              <div className="space-y-3">
                                {education.map(edu => (
                                  <div key={edu.id}>
                                    <div className="flex justify-between items-start mb-1">
                                      <div>
                                        <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                                        <p className="text-gray-700">{edu.institution}</p>
                                      </div>
                                      <div className="text-right text-sm text-gray-600">
                                        <p>{edu.startYear} - {edu.current ? 'Present' : edu.endYear}</p>
                                        {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                                        {edu.percentage && <p>{edu.percentage}</p>}
                                      </div>
                                    </div>
                                    {edu.achievements.length > 0 && (
                                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mb-2">
                                        {edu.achievements.map((achievement, index) => (
                                          <li key={index}>{achievement}</li>
                                        ))}
                                      </ul>
                                    )}
                                    {edu.coursework.length > 0 && (
                                      <div className="mb-2">
                                        <span className="text-sm text-gray-600 font-medium">Relevant Coursework: </span>
                                        <span className="text-sm text-gray-700">{edu.coursework.join(', ')}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Skills */}
                          {skills.length > 0 && (
                            <div className="mb-6">
                              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-blue-800 border-b border-blue-200 pb-1">
                                Technical Skills
                              </h2>
                              <div className="space-y-3">
                                {['programming', 'framework', 'database', 'tool'].map(category => {
                                  const categorySkills = skills.filter(s => s.category === category);
                                  if (categorySkills.length === 0) return null;
                                  
                                  return (
                                    <div key={category}>
                                      <h3 className="font-medium text-gray-900 mb-2 capitalize">
                                        {category === 'programming' ? 'Programming Languages' : 
                                         category === 'framework' ? 'Frameworks & Libraries' :
                                         category === 'database' ? 'Databases' : 'Tools & Technologies'}
                                      </h3>
                                      <div className="flex flex-wrap gap-2">
                                        {categorySkills.map(skill => (
                                          <span key={skill.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                            {skill.name}
                                            {skill.yearsOfExperience && ` (${skill.yearsOfExperience}y)`}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                                
                                {/* Soft Skills */}
                                {skills.filter(s => s.category === 'soft-skill').length > 0 && (
                                  <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Soft Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                      {skills.filter(s => s.category === 'soft-skill').map(skill => (
                                        <span key={skill.id} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                          {skill.name}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Certifications */}
                          {certificates.length > 0 && (
                            <div className="mb-6">
                              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-blue-800 border-b border-blue-200 pb-1">
                                Certifications
                              </h2>
                              <div className="space-y-3">
                                {certificates.map(cert => (
                                  <div key={cert.id} className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                                      <p className="text-gray-700">{cert.issuer}</p>
                                      {cert.credentialId && (
                                        <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                                      )}
                                      {cert.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {cert.skills.map((skill, index) => (
                                            <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                      <p>{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                      {cert.expiryDate && (
                                        <p className="text-xs">Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Languages */}
                          {personalInfo.languages.length > 0 && (
                            <div>
                              <h2 className="text-xl font-semibold text-gray-900 mb-3 text-blue-800 border-b border-blue-200 pb-1">
                                Languages
                              </h2>
                              <div className="flex flex-wrap gap-2">
                                {personalInfo.languages.map((language, index) => (
                                  <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                    {language}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={generateResume}
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <DownloadIcon size={20} />
                          Generate & Download Resume
                        </button>
                        <button
                          onClick={() => alert('💾 Resume saved as draft successfully!')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <SaveIcon size={20} />
                          Save as Draft
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedResume.name}</h2>
                    <p className="text-gray-600">Resume Preview</p>
                  </div>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Preview Area */}
                  <div className="lg:col-span-2">
                    <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[600px] flex flex-col items-center justify-center">
                      <div className="text-6xl mb-4">{selectedResume.thumbnail}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedResume.fileName}</h3>
                      <p className="text-gray-600 mb-4">Resume Preview</p>
                      <div className="bg-white rounded-lg p-6 shadow-sm max-w-md w-full">
                        <h4 className="font-medium text-gray-900 mb-4">Preview Features:</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircleIcon size={16} className="text-green-500" />
                            <span>ATS-Friendly Format</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircleIcon size={16} className="text-green-500" />
                            <span>Professional Layout</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircleIcon size={16} className="text-green-500" />
                            <span>Optimized Typography</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircleIcon size={16} className="text-green-500" />
                            <span>Print-Ready Design</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-4 max-w-md">
                        Full preview functionality would show the actual resume content in a real application
                      </p>
                    </div>
                  </div>
                  
                  {/* Resume Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Resume Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Template:</span>
                          <span className="font-medium">{selectedResume.templateType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Format:</span>
                          <span className="font-medium uppercase">{selectedResume.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">File Size:</span>
                          <span className="font-medium">{selectedResume.fileSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedResume.status)}`}>
                            {selectedResume.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Version:</span>
                          <span className="font-medium">v{selectedResume.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-medium">{new Date(selectedResume.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Modified:</span>
                          <span className="font-medium">{new Date(selectedResume.lastModified).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">ATS Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Overall Score</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getATSScoreColor(selectedResume.atsScore)}`}>
                            {selectedResume.atsScore}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all ${
                              selectedResume.atsScore >= 80 ? 'bg-green-500' :
                              selectedResume.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedResume.atsScore}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {selectedResume.atsScore >= 80 ? '✅ Excellent! Your resume is highly ATS-compatible.' :
                           selectedResume.atsScore >= 60 ? '⚠️ Good, but could be improved for better ATS compatibility.' :
                           '❌ Needs significant improvement for ATS compatibility.'}
                        </div>
                        
                        <button
                          onClick={() => analyzeResume(selectedResume)}
                          className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <ZapIcon size={14} />
                          Detailed Analysis
                        </button>
                      </div>
                    </div>
                    
                    {selectedResume.appliedToCompanies.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Application History</h3>
                        <div className="space-y-2">
                          {selectedResume.appliedToCompanies.map((company, index) => (
                            <div key={index} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm">
                              {company}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedResume.feedback.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Recent Feedback</h3>
                        <div className="space-y-3">
                          {selectedResume.feedback.slice(0, 2).map(feedback => (
                            <div key={feedback.id} className="border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-sm">{feedback.reviewer}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      size={12}
                                      className={i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{feedback.comments}</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => markFeedbackHelpful(selectedResume.id, feedback.id, true)}
                                  className={`text-xs px-2 py-1 rounded transition-colors ${
                                    feedback.isHelpful ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                                  }`}
                                >
                                  <ThumbsUpIcon size={12} className="inline mr-1" />
                                  Helpful
                                </button>
                                <button
                                  onClick={() => markFeedbackHelpful(selectedResume.id, feedback.id, false)}
                                  className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-red-100 transition-colors"
                                >
                                  <ThumbsDownIcon size={12} className="inline mr-1" />
                                  Not Helpful
                                </button>
                              </div>
                            </div>
                          ))}
                          {selectedResume.feedback.length > 2 && (
                            <p className="text-sm text-gray-500">
                              +{selectedResume.feedback.length - 2} more feedback entries
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadResume(selectedResume)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <DownloadIcon size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => shareResume(selectedResume)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ShareIcon size={16} />
                    Share
                  </button>
                  <button
                    onClick={() => duplicateResume(selectedResume.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CopyIcon size={16} />
                    Duplicate
                  </button>
                  <button
                    onClick={() => analyzeResume(selectedResume)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ZapIcon size={16} />
                    Analyze
                  </button>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ATS Analysis Modal */}
        {showAnalysisModal && currentAnalysis && selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">ATS Analysis Report</h2>
                    <p className="text-gray-600">{selectedResume.name}</p>
                  </div>
                  <button
                    onClick={() => setShowAnalysisModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Overall Score */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentAnalysis.overallScore}</div>
                      <div className="text-sm">ATS Score</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentAnalysis.overallScore >= 80 ? 'Excellent!' : 
                     currentAnalysis.overallScore >= 60 ? 'Good Score' : 'Needs Improvement'}
                  </h3>
                  <p className="text-gray-600">
                    Your resume is {currentAnalysis.overallScore >= 80 ? 'highly optimized' : 
                                   currentAnalysis.overallScore >= 60 ? 'well optimized' : 'poorly optimized'} for ATS systems
                  </p>
                </div>

                {/* Section Scores */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Section Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(currentAnalysis.sections).map(([section, score]) => (
                      <div key={section} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {section.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={`text-sm font-bold ${
                            score >= 80 ? 'text-green-600' : 
                            score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {score}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              score >= 80 ? 'bg-green-500' :
                              score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords Analysis */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Keywords Analysis</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-700 mb-3">Found Keywords ({currentAnalysis.keywords.found.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentAnalysis.keywords.found.map((keyword, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-3">Missing Keywords ({currentAnalysis.keywords.missing.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentAnalysis.keywords.missing.map((keyword, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <InfoIcon size={16} className="inline mr-2" />
                      Keyword Density: {currentAnalysis.keywords.density}% 
                      (Recommended: 2-4% for optimal ATS performance)
                    </p>
                  </div>
                </div>

                {/* Improvements */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Improvements</h3>
                  <div className="space-y-4">
                    {currentAnalysis.improvements.map((improvement, index) => (
                      <div key={index} className={`border-l-4 p-4 rounded-lg ${
                        improvement.impact === 'high' ? 'border-red-500 bg-red-50' :
                        improvement.impact === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                        'border-green-500 bg-green-50'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            improvement.impact === 'high' ? 'bg-red-100 text-red-800' :
                            improvement.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {improvement.impact.toUpperCase()} IMPACT
                          </span>
                          <h4 className="font-medium text-gray-900">{improvement.category}</h4>
                        </div>
                        <p className="text-gray-700">{improvement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* General Suggestions */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Suggestions</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {currentAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <CheckCircleIcon size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => alert('📥 Downloading detailed ATS report...')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <DownloadIcon size={16} />
                    Download Report
                  </button>
                  <button
                    onClick={() => {
                      setShowAnalysisModal(false);
                      setShowBuilderModal(true);
                      setSelectedTemplate(templates[0]);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <EditIcon size={16} />
                    Improve Resume
                  </button>
                  <button
                    onClick={() => alert('📧 Scheduling consultation with resume expert...')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <UserIcon size={16} />
                    Expert Review
                  </button>
                  <button
                    onClick={() => setShowAnalysisModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Share Resume</h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{selectedResume.thumbnail}</div>
                  <h3 className="font-semibold text-gray-900">{selectedResume.name}</h3>
                  <p className="text-sm text-gray-600">{selectedResume.fileName}</p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => generateShareUrl(selectedResume.id, true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShareIcon size={16} />
                    Generate Public Link
                  </button>
                  
                  <button
                    onClick={() => {
                      const shareText = `Check out my resume: ${selectedResume.name}`;
                      if (navigator.share) {
                        navigator.share({
                          title: selectedResume.name,
                          text: shareText,
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(shareText);
                        alert('📋 Resume details copied to clipboard!');
                      }
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquareIcon size={16} />
                    Share via Social Media
                  </button>
                  
                  <button
                    onClick={() => {
                      const emailBody = `I'm sharing my resume with you: ${selectedResume.name}
                      
ATS Score: ${selectedResume.atsScore}%
Template: ${selectedResume.templateType}
Last Updated: ${new Date(selectedResume.lastModified).toLocaleDateString()}

Please find my resume attached.

Best regards`;
                      
                      window.open(`mailto:?subject=My Resume - ${selectedResume.name}&body=${encodeURIComponent(emailBody)}`);
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MailIcon size={16} />
                    Send via Email
                  </button>
                  
                  {selectedResume.isPublic && selectedResume.shareUrl && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-2">Public Share URL:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={selectedResume.shareUrl}
                          readOnly
                          className="flex-1 text-xs bg-white border border-blue-200 rounded px-2 py-1"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedResume.shareUrl!);
                            alert('🔗 Link copied to clipboard!');
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangleIcon size={16} className="text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-900">Privacy Notice</p>
                        <p className="text-yellow-800">Public links can be accessed by anyone with the URL. Consider sharing privately for sensitive information.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResumeManager;
