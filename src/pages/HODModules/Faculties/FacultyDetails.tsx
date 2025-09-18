import React, { useMemo, useState, useCallback } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Calendar,
  Award,
  BookOpen,
  GraduationCap,
  Clock,
  MapPin,
  Star,
  Users,
  Building,
  Eye,
  ChevronDown,
  ChevronUp,
  Shield,
  Activity,
  TrendingUp,
  BarChart3,
  Globe,
  FileText,
  MessageSquare,
  User,
  Settings,
  RefreshCw,
  Briefcase,
  Target,
  Zap,
  Info,
  X,
  Plus,
  Edit3,
  ExternalLink,
  Lightbulb,
  Code,
  Database,
  Network,
  Cpu
} from "lucide-react";

type Faculty = {
  id: string;
  name: string;
  department: string;
  designation: "Professor" | "Associate Professor" | "Assistant Professor" | string;
  specialization: string[];
  qualifications: string[];
  experienceYears: number;
  coursesTaught: string[];
  research: { 
    title: string; 
    year: number; 
    journal?: string; 
    citations?: number;
    impactFactor?: number;
  }[];
  email: string;
  phone: string;
  alternatePhone?: string;
  photoUrl?: string;
  joiningDate: string;
  office: string;
  currentProjects: string[];
  awards: string[];
  publications: number;
  hIndex: number;
  i10Index: number;
  teachingRating: number;
  researchRating: number;
  mentorshipRating: number;
  officeHours: string;
  status: "Active" | "On Leave" | "Sabbatical" | "Visiting";
  socialProfiles?: {
    linkedin?: string;
    googleScholar?: string;
    researchGate?: string;
    orcid?: string;
  };
  teachingExperience: number;
  industryExperience: number;
  courseLoad: number;
  studentsSupervised: number;
  ongoingPhDs: number;
  completedPhDs: number;
  grants: string[];
  languages: string[];
  skills: string[];
  certifications: string[];
  memberships: string[];
  editorialBoards: string[];
  conferenceCommittees: string[];
};

const FACULTY_DATA: Faculty[] = [
  {
    id: "FAC001",
    name: "Dr. Ananya Sharma",
    department: "Computer Science",
    designation: "Professor",
    specialization: ["Artificial Intelligence", "Machine Learning", "Natural Language Processing", "Deep Learning", "Computer Vision"],
    qualifications: ["Ph.D. (Computer Science Engineering)", "M.Tech (Artificial Intelligence)", "B.Tech (Information Technology)"],
    experienceYears: 14,
    teachingExperience: 12,
    industryExperience: 2,
    coursesTaught: ["Machine Learning", "Natural Language Processing", "AI Lab", "Advanced Deep Learning", "Neural Networks", "Computer Vision", "Pattern Recognition"],
    research: [
      { title: "Contextual Embeddings in Indic Languages", year: 2024, journal: "ACL", citations: 124, impactFactor: 4.2 },
      { title: "Efficient Transformers for Edge Computing", year: 2023, journal: "NeurIPS", citations: 189, impactFactor: 8.1 },
      { title: "Multilingual BERT for Low-Resource Languages", year: 2022, journal: "EMNLP", citations: 267, impactFactor: 5.8 },
      { title: "Zero-Shot Learning for Indian Languages", year: 2021, journal: "IJCAI", citations: 145, impactFactor: 4.5 },
    ],
    email: "ananya.sharma@bestcollege.edu",
    phone: "+91-98765-43210",
    alternatePhone: "+91-98765-43211",
    joiningDate: "2015-07-15",
    office: "CS-301, Third Floor, Computer Science Block",
    currentProjects: ["AI for Healthcare Diagnostics", "Multilingual NLP Systems", "Edge AI Optimization", "Accessible Computing"],
    awards: ["Best Teacher Award 2024", "Excellence in Research 2023", "Young Scientist Award 2020", "Google Research Scholar Award 2022"],
    publications: 52,
    hIndex: 31,
    i10Index: 45,
    teachingRating: 4.9,
    researchRating: 4.8,
    mentorshipRating: 4.7,
    officeHours: "Mon-Fri 2:00-4:00 PM",
    status: "Active",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/ananya-sharma-ai",
      googleScholar: "https://scholar.google.com/citations?user=abc123",
      researchGate: "https://researchgate.net/profile/ananya-sharma",
      orcid: "https://orcid.org/0000-0000-0000-0000"
    },
    courseLoad: 4,
    studentsSupervised: 35,
    ongoingPhDs: 6,
    completedPhDs: 8,
    grants: ["NSF Grant for AI Research - $500K", "Google Faculty Award - $100K", "Industry Collaboration Grant - $200K"],
    languages: ["English", "Hindi", "Tamil", "Bengali"],
    skills: ["Python", "TensorFlow", "PyTorch", "R", "Java", "CUDA", "Docker"],
    certifications: ["AWS Certified ML Specialist", "Google Cloud Professional ML Engineer", "NVIDIA DLI Instructor"],
    memberships: ["IEEE", "ACM", "AAAI", "Indian Academy of Sciences"],
    editorialBoards: ["Journal of AI Research", "Neural Computing & Applications"],
    conferenceCommittees: ["ICML 2024", "NeurIPS 2023", "AAAI 2024"]
  },
  {
    id: "FAC002",
    name: "Prof. Rahul Verma",
    department: "Computer Science",
    designation: "Associate Professor",
    specialization: ["Distributed Systems", "Cloud Computing", "DevOps", "Microservices Architecture", "Container Orchestration"],
    qualifications: ["M.Tech (Computer Science Engineering)", "B.Tech (Computer Science Engineering)", "AWS Certified Solutions Architect", "Kubernetes Certified Administrator"],
    experienceYears: 11,
    teachingExperience: 8,
    industryExperience: 3,
    coursesTaught: ["Operating Systems", "Cloud Computing", "DevOps", "Distributed Systems", "System Design", "Software Architecture"],
    research: [
      { title: "Observability in Cloud-Native Systems", year: 2023, journal: "IEEE Cloud Computing", citations: 89, impactFactor: 3.8 },
      { title: "Serverless Computing Performance Analysis", year: 2022, journal: "ACM Computing Surveys", citations: 134, impactFactor: 6.2 },
      { title: "Container Orchestration Optimization", year: 2021, journal: "Journal of Systems Architecture", citations: 67, impactFactor: 3.2 },
      { title: "Edge Computing Infrastructure Design", year: 2020, journal: "IEEE Transactions on Cloud Computing", citations: 98, impactFactor: 5.4 },
    ],
    email: "rahul.verma@bestcollege.edu",
    phone: "+91-98765-40010",
    alternatePhone: "+91-98765-40011",
    joiningDate: "2018-08-20",
    office: "CS-205, Second Floor, Computer Science Block",
    currentProjects: ["Cloud Security Framework", "Kubernetes Optimization", "Edge Computing Infrastructure", "Green Cloud Computing"],
    awards: ["Industry Collaboration Award 2023", "Best Paper Award ICDCS 2022", "Teaching Excellence Award 2021"],
    publications: 38,
    hIndex: 22,
    i10Index: 28,
    teachingRating: 4.7,
    researchRating: 4.6,
    mentorshipRating: 4.5,
    officeHours: "Tue-Thu 10:00-12:00 PM",
    status: "Active",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/rahul-verma-cloud",
      googleScholar: "https://scholar.google.com/citations?user=def456",
      researchGate: "https://researchgate.net/profile/rahul-verma"
    },
    courseLoad: 3,
    studentsSupervised: 22,
    ongoingPhDs: 4,
    completedPhDs: 3,
    grants: ["AWS Research Grant - $150K", "Industry Partnership Grant - $300K"],
    languages: ["English", "Hindi", "Punjabi"],
    skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Terraform", "Ansible"],
    certifications: ["AWS Solutions Architect", "Kubernetes Administrator", "Azure DevOps Expert"],
    memberships: ["IEEE", "ACM", "Cloud Native Computing Foundation"],
    editorialBoards: ["Journal of Cloud Computing"],
    conferenceCommittees: ["CLOUD 2024", "ICDCS 2023"]
  },
  {
    id: "FAC003",
    name: "Dr. Karthik Rao",
    department: "Computer Science",
    designation: "Assistant Professor",
    specialization: ["Data Science", "Database Systems", "Big Data Analytics", "Reinforcement Learning", "Graph Neural Networks"],
    qualifications: ["Ph.D. (Data Science)", "M.S (Computer Science)", "B.Tech (Information Technology)"],
    experienceYears: 6,
    teachingExperience: 5,
    industryExperience: 1,
    coursesTaught: ["Database Systems", "Data Mining", "Big Data Analytics", "Machine Learning Fundamentals", "Data Structures"],
    research: [
      { title: "Auto-Indexing with Reinforcement Learning", year: 2024, journal: "VLDB", citations: 45, impactFactor: 4.8 },
      { title: "Scalable Graph Neural Networks", year: 2023, journal: "KDD", citations: 78, impactFactor: 5.2 },
      { title: "Privacy-Preserving Data Analytics", year: 2022, journal: "IEEE TKDE", citations: 112, impactFactor: 4.9 },
      { title: "Federated Learning for Healthcare", year: 2021, journal: "Nature Digital Medicine", citations: 156, impactFactor: 12.8 },
    ],
    email: "karthik.rao@bestcollege.edu",
    phone: "+91-98111-22233",
    alternatePhone: "+91-98111-22234",
    joiningDate: "2020-01-10",
    office: "CS-108, First Floor, Computer Science Block",
    currentProjects: ["Federated Learning Systems", "Graph Database Optimization", "Privacy-First Analytics", "Healthcare Data Mining"],
    awards: ["Rising Star in Data Science 2024", "Best Dissertation Award 2019", "Young Researcher Award 2023"],
    publications: 24,
    hIndex: 15,
    i10Index: 18,
    teachingRating: 4.6,
    researchRating: 4.7,
    mentorshipRating: 4.4,
    officeHours: "Wed-Fri 1:00-3:00 PM",
    status: "Active",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/karthik-rao-data",
      googleScholar: "https://scholar.google.com/citations?user=ghi789",
      researchGate: "https://researchgate.net/profile/karthik-rao"
    },
    courseLoad: 4,
    studentsSupervised: 15,
    ongoingPhDs: 3,
    completedPhDs: 1,
    grants: ["Data Science Research Grant - $100K", "Healthcare AI Grant - $250K"],
    languages: ["English", "Hindi", "Kannada", "Tamil"],
    skills: ["Python", "R", "SQL", "Spark", "Hadoop", "Neo4j", "MongoDB"],
    certifications: ["Certified Data Scientist", "AWS Data Analytics Specialty", "Google Cloud Data Engineer"],
    memberships: ["IEEE", "ACM", "Data Science Society"],
    editorialBoards: ["Data Mining and Knowledge Discovery"],
    conferenceCommittees: ["KDD 2024", "ICDE 2023"]
  },
  {
    id: "FAC004",
    name: "Dr. Priya Menon",
    department: "Computer Science",
    designation: "Associate Professor",
    specialization: ["Cybersecurity", "Cryptography", "Network Security", "Blockchain", "Privacy Engineering"],
    qualifications: ["Ph.D. (Cybersecurity)", "M.Tech (Information Security)", "B.E (Computer Engineering)", "CISSP Certified"],
    experienceYears: 13,
    teachingExperience: 10,
    industryExperience: 3,
    coursesTaught: ["Network Security", "Cryptography", "Ethical Hacking", "Blockchain Technology", "Privacy Engineering", "Cyber Forensics"],
    research: [
      { title: "Quantum-Resistant Cryptographic Protocols", year: 2024, journal: "IEEE Security & Privacy", citations: 167, impactFactor: 4.3 },
      { title: "Blockchain Scalability Solutions", year: 2023, journal: "ACM Computing Surveys", citations: 234, impactFactor: 6.2 },
      { title: "Zero-Knowledge Proof Applications", year: 2022, journal: "Journal of Cryptology", citations: 189, impactFactor: 3.8 },
      { title: "Privacy-Preserving Machine Learning", year: 2021, journal: "IEEE TIFS", citations: 201, impactFactor: 7.2 },
    ],
    email: "priya.menon@bestcollege.edu",
    phone: "+91-97654-32109",
    alternatePhone: "+91-97654-32110",
    joiningDate: "2017-03-12",
    office: "CS-403, Fourth Floor, Computer Science Block",
    currentProjects: ["Post-Quantum Cryptography", "DeFi Security Analysis", "Privacy-Preserving Protocols", "Blockchain for Healthcare"],
    awards: ["Cybersecurity Excellence Award 2024", "Distinguished Researcher 2022", "Women in Tech Leadership 2021", "NSF CAREER Award 2020"],
    publications: 47,
    hIndex: 28,
    i10Index: 35,
    teachingRating: 4.8,
    researchRating: 4.9,
    mentorshipRating: 4.6,
    officeHours: "Mon-Thu 11:00-1:00 PM",
    status: "Active",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/priya-menon-security",
      googleScholar: "https://scholar.google.com/citations?user=jkl012",
      researchGate: "https://researchgate.net/profile/priya-menon",
      orcid: "https://orcid.org/0000-0000-0000-0001"
    },
    courseLoad: 3,
    studentsSupervised: 28,
    ongoingPhDs: 5,
    completedPhDs: 6,
    grants: ["NSF Cybersecurity Grant - $400K", "Industry Security Research - $200K", "Blockchain Research Grant - $150K"],
    languages: ["English", "Hindi", "Malayalam", "French"],
    skills: ["Python", "C++", "Solidity", "Wireshark", "Metasploit", "Burp Suite", "Nmap"],
    certifications: ["CISSP", "CEH", "OSCP", "CISM", "Blockchain Developer Certified"],
    memberships: ["IEEE", "ACM", "ISACA", "(ISC)²", "Women in Cybersecurity"],
    editorialBoards: ["IEEE Security & Privacy", "Journal of Computer Security"],
    conferenceCommittees: ["CCS 2024", "S&P 2023", "USENIX Security 2024"]
  },
  {
    id: "FAC005",
    name: "Prof. Arjun Singh",
    department: "Computer Science",
    designation: "Professor",
    specialization: ["Software Engineering", "Human-Computer Interaction", "Mobile Computing", "UI/UX Design", "Accessibility"],
    qualifications: ["Ph.D. (Software Engineering)", "M.S (Human-Computer Interaction)", "B.Tech (Computer Science)"],
    experienceYears: 17,
    teachingExperience: 14,
    industryExperience: 3,
    coursesTaught: ["Software Engineering", "HCI", "Mobile App Development", "Design Thinking", "Agile Methodologies", "User Experience Design"],
    research: [
      { title: "Accessibility in Mobile Applications", year: 2024, journal: "ACM Transactions on Accessible Computing", citations: 134, impactFactor: 3.2 },
      { title: "Agile Development in Large-Scale Projects", year: 2023, journal: "IEEE Software", citations: 156, impactFactor: 2.8 },
      { title: "User Experience Patterns in AR/VR", year: 2022, journal: "CHI Conference", citations: 178, impactFactor: 4.1 },
      { title: "Inclusive Design for Diverse Users", year: 2021, journal: "International Journal of HCI", citations: 145, impactFactor: 2.9 },
    ],
    email: "arjun.singh@bestcollege.edu",
    phone: "+91-98765-54321",
    alternatePhone: "+91-98765-54322",
    joiningDate: "2014-01-20",
    office: "CS-501, Fifth Floor, Computer Science Block",
    currentProjects: ["Accessible Computing Technologies", "AR/VR User Interfaces", "Sustainable Software Development", "AI-Assisted Design Tools"],
    awards: ["Excellence in Teaching 2024", "Software Industry Impact Award 2023", "UX Innovation Award 2021", "Accessibility Champion Award 2020"],
    publications: 58,
    hIndex: 34,
    i10Index: 42,
    teachingRating: 4.9,
    researchRating: 4.7,
    mentorshipRating: 4.8,
    officeHours: "Tue-Fri 9:00-11:00 AM",
    status: "Sabbatical",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/arjun-singh-hci",
      googleScholar: "https://scholar.google.com/citations?user=mno345",
      researchGate: "https://researchgate.net/profile/arjun-singh"
    },
    courseLoad: 0,
    studentsSupervised: 42,
    ongoingPhDs: 7,
    completedPhDs: 12,
    grants: ["NSF HCI Research Grant - $350K", "Accessibility Research Grant - $200K", "Industry UX Grant - $180K"],
    languages: ["English", "Hindi", "Gujarati", "German"],
    skills: ["Swift", "Kotlin", "React Native", "Flutter", "Figma", "Sketch", "Adobe XD"],
    certifications: ["Google UX Design Certificate", "Apple iOS Developer", "Scrum Master Certified"],
    memberships: ["IEEE", "ACM", "CHI Community", "UX Professionals Association"],
    editorialBoards: ["ACM Transactions on CHI", "International Journal of HCI"],
    conferenceCommittees: ["CHI 2024", "UbiComp 2023", "MobileHCI 2024"]
  },
  {
    id: "FAC006",
    name: "Dr. Sanjay Kumar",
    department: "Computer Science",
    designation: "Assistant Professor",
    specialization: ["Computer Networks", "Network Protocols", "Wireless Communication", "IoT", "5G Technologies"],
    qualifications: ["Ph.D. (Computer Networks)", "M.Tech (Communication Systems)", "B.E (Electronics & Communication)"],
    experienceYears: 8,
    teachingExperience: 6,
    industryExperience: 2,
    coursesTaught: ["Computer Networks", "Network Programming", "Wireless Networks", "IoT Systems", "Network Security"],
    research: [
      { title: "5G Network Optimization Algorithms", year: 2024, journal: "IEEE Communications", citations: 67, impactFactor: 6.2 },
      { title: "IoT Security in Smart Cities", year: 2023, journal: "IEEE IoT Journal", citations: 89, impactFactor: 10.2 },
      { title: "Edge Computing for 5G Networks", year: 2022, journal: "Computer Networks", citations: 78, impactFactor: 3.4 },
      { title: "Wireless Sensor Network Protocols", year: 2021, journal: "Ad Hoc Networks", citations: 56, impactFactor: 4.1 },
    ],
    email: "sanjay.kumar@bestcollege.edu",
    phone: "+91-99876-54321",
    alternatePhone: "+91-99876-54322",
    joiningDate: "2021-06-01",
    office: "CS-202, Second Floor, Computer Science Block",
    currentProjects: ["5G Network Protocols", "Smart City IoT Infrastructure", "Network Security Frameworks", "Wireless Mesh Networks"],
    awards: ["Best Young Faculty 2023", "IEEE Communication Society Award 2022", "Innovation in Networking Award 2024"],
    publications: 21,
    hIndex: 13,
    i10Index: 16,
    teachingRating: 4.5,
    researchRating: 4.4,
    mentorshipRating: 4.3,
    officeHours: "Mon-Wed 2:00-4:00 PM",
    status: "Active",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/sanjay-kumar-networks",
      googleScholar: "https://scholar.google.com/citations?user=pqr678"
    },
    courseLoad: 4,
    studentsSupervised: 12,
    ongoingPhDs: 2,
    completedPhDs: 0,
    grants: ["5G Research Grant - $120K", "IoT Security Grant - $80K"],
    languages: ["English", "Hindi", "Bengali"],
    skills: ["C++", "Python", "NS-3", "MATLAB", "Wireshark", "GNS3", "Cisco IOS"],
    certifications: ["CCNA", "CCNP", "Network+ Certified"],
    memberships: ["IEEE", "IEEE Communications Society", "ACM SIGCOMM"],
    editorialBoards: ["Computer Networks Journal"],
    conferenceCommittees: ["INFOCOM 2024", "GLOBECOM 2023"]
  }
];

const HOD_DEPARTMENT = "Computer Science";

const styles = {
  page: "w-full max-w-full min-h-screen overflow-x-clip bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
  container: "w-full max-w-[1920px] mx-auto p-4 sm:p-6 lg:p-8 xl:p-12",

  // Header
  header: "mb-8",
  headerTitle: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent mb-3",
  headerSubtitle: "text-lg sm:text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-4",
  headerActions: "flex flex-col sm:flex-row gap-3",

  // Stats
  statsGrid: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-8",
  statCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-4 lg:p-6",
  statIcon: "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-3 lg:mb-4 transition-transform group-hover:scale-110",
  statValue: "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  statLabel: "text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium",
  statBadge: "absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold",

  // Filters
  filtersSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-4 lg:p-6 mb-8",
  filtersHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  filtersTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  filtersActions: "flex flex-wrap gap-2",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  
  // Form Elements
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",

  // Faculty Cards
  facultyGrid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",
  facultyCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  cardHeader: "flex items-start gap-4 mb-6",

  // Avatar and Status
  avatar: "relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg shrink-0",
  statusDot: "absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-900",
  
  // Faculty Info
  facultyInfo: "flex-1 min-w-0",
  name: "text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  designation: "text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2",
  experience: "text-sm text-gray-600 dark:text-gray-400 mb-2",
  quickStats: "flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap",

  // Content sections
  section: "mb-6 last:mb-0",
  sectionTitle: "text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2",
  
  // Tags
  tagContainer: "flex flex-wrap gap-2",
  tag: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  tagPrimary: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",
  tagSecondary: "bg-gray-100 text-gray-700 dark:bg-gray-800 text-gray-300 border border-gray-200 dark:border-gray-700",
  tagSuccess: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  tagWarning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800",

  // Research and metrics
  researchItem: "p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 mb-3 last:mb-0 border border-gray-200/50 dark:border-gray-700/50",
  researchTitle: "font-medium text-gray-900 dark:text-gray-100 text-sm mb-2",
  researchMeta: "text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2 flex-wrap",
  
  metricsGrid: "grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 border border-gray-200/50 dark:border-gray-700/50",
  metricItem: "text-center",
  metricValue: "text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100",
  metricLabel: "text-xs text-gray-600 dark:text-gray-400 mt-1",

  // Contact
  contactGrid: "grid grid-cols-1 gap-3",
  contactItem: "flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50",
  contactIcon: "w-5 h-5 text-gray-400 shrink-0",
  contactText: "text-sm text-gray-700 dark:text-gray-300 truncate",

  // Social Links
  socialGrid: "grid grid-cols-2 gap-2",
  socialLink: "flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",

  // Action Buttons
  actionButtons: "flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200 dark:border-gray-700",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Alert
  alert: "p-4 rounded-xl border mb-6",
  alertInfo: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200",
};

export default function FacultyDirectoryHOD() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [minExp, setMinExp] = useState<number | "">("");
  const [maxExp, setMaxExp] = useState<number | "">("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const deptFaculty = useMemo(
    () => FACULTY_DATA.filter((f) => f.department === HOD_DEPARTMENT),
    []
  );

  const allSpecs = useMemo(() => {
    const set = new Set<string>();
    deptFaculty.forEach((f) => f.specialization.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [deptFaculty]);

  const allDesignations = useMemo(() => {
    const set = new Set<string>();
    deptFaculty.forEach((f) => set.add(f.designation));
    return Array.from(set).sort();
  }, [deptFaculty]);

  const allStatuses = useMemo(() => {
    const set = new Set<string>();
    deptFaculty.forEach((f) => set.add(f.status));
    return Array.from(set).sort();
  }, [deptFaculty]);

  const stats = useMemo(() => {
    const activeCount = deptFaculty.filter((f) => f.status === "Active").length;
    const totalPublications = deptFaculty.reduce((sum, f) => sum + f.publications, 0);
    const avgHIndex = deptFaculty.length > 0 ? 
      Math.round(deptFaculty.reduce((sum, f) => sum + f.hIndex, 0) / deptFaculty.length) : 0;
    const totalStudents = deptFaculty.reduce((sum, f) => sum + f.studentsSupervised, 0);
    const totalPhDs = deptFaculty.reduce((sum, f) => sum + f.ongoingPhDs + f.completedPhDs, 0);
    const avgTeachingRating = deptFaculty.length > 0 ? 
      (deptFaculty.reduce((sum, f) => sum + f.teachingRating, 0) / deptFaculty.length).toFixed(1) : "0.0";

    return {
      total: deptFaculty.length,
      active: activeCount,
      professor: deptFaculty.filter((f) => f.designation === "Professor").length,
      associate: deptFaculty.filter((f) => f.designation === "Associate Professor").length,
      assistant: deptFaculty.filter((f) => f.designation === "Assistant Professor").length,
      totalPublications,
      avgHIndex,
      totalStudents,
      totalPhDs,
      avgTeachingRating: parseFloat(avgTeachingRating),
    };
  }, [deptFaculty]);

  const filtered = useMemo(() => {
    return deptFaculty
      .filter((f) => (designation ? f.designation === designation : true))
      .filter((f) => (status ? f.status === status : true))
      .filter((f) =>
        search
          ? f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.coursesTaught.join(" ").toLowerCase().includes(search.toLowerCase()) ||
            f.specialization.join(" ").toLowerCase().includes(search.toLowerCase()) ||
            f.currentProjects.join(" ").toLowerCase().includes(search.toLowerCase()) ||
            f.skills.join(" ").toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((f) => (specialization ? f.specialization.some(s => s.toLowerCase().includes(specialization.toLowerCase())) : true))
      .filter((f) => (minExp !== "" ? f.experienceYears >= Number(minExp) : true))
      .filter((f) => (maxExp !== "" ? f.experienceYears <= Number(maxExp) : true))
      .sort((a, b) => {
        // Sort by status (Active first), then by experience
        if (a.status !== b.status) {
          if (a.status === "Active") return -1;
          if (b.status === "Active") return 1;
        }
        return b.experienceYears - a.experienceYears;
      });
  }, [deptFaculty, designation, status, search, specialization, minExp, maxExp]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setSpecialization("");
    setMinExp("");
    setMaxExp("");
    setDesignation("");
    setStatus("");
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-500";
      case "On Leave": return "bg-amber-500";
      case "Sabbatical": return "bg-blue-500";
      case "Visiting": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const exportCSV = useCallback(() => {
    const headers = [
      "ID", "Name", "Designation", "Experience", "Teaching Experience", "Industry Experience",
      "Email", "Phone", "Publications", "H-Index", "i10-Index", "Teaching Rating", 
      "Research Rating", "Students Supervised", "Ongoing PhDs", "Completed PhDs", "Status"
    ];
    const csvRows = [headers.join(",")];
    
    filtered.forEach(f => {
      const row = [
        f.id,
        `"${f.name}"`,
        f.designation,
        f.experienceYears.toString(),
        f.teachingExperience.toString(),
        f.industryExperience.toString(),
        f.email,
        f.phone,
        f.publications.toString(),
        f.hIndex.toString(),
        f.i10Index.toString(),
        f.teachingRating.toString(),
        f.researchRating.toString(),
        f.studentsSupervised.toString(),
        f.ongoingPhDs.toString(),
        f.completedPhDs.toString(),
        f.status
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `faculty_directory_${HOD_DEPARTMENT.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Faculty Directory</h2>
          <p className={styles.headerSubtitle}>
            <Shield className="w-6 h-6" />
            HOD Portal - {HOD_DEPARTMENT} Department Faculty Profiles
          </p>
          <div className={styles.headerActions}>
            <button onClick={exportCSV} className={`${styles.button} ${styles.buttonSecondary}`}>
              <Download className="w-5 h-5" />
              Export Directory
            </button>
            <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
              <RefreshCw className="w-5 h-5" />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
              <Users className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Faculty</div>
            <div className={`${styles.statBadge} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300`}>
              {stats.active} Active
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <GraduationCap className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.professor}</div>
            <div className={styles.statLabel}>Professors</div>
            <div className={`${styles.statBadge} bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300`}>
              Senior
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <BookOpen className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.totalPublications}</div>
            <div className={styles.statLabel}>Publications</div>
            <div className={`${styles.statBadge} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300`}>
              Research
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <TrendingUp className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.avgHIndex}</div>
            <div className={styles.statLabel}>Avg H-Index</div>
            <div className={`${styles.statBadge} bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300`}>
              Impact
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <Award className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.totalStudents}</div>
            <div className={styles.statLabel}>Students Guided</div>
            <div className={`${styles.statBadge} bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300`}>
              Mentoring
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400`}>
              <Star className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.avgTeachingRating}</div>
            <div className={styles.statLabel}>Avg Teaching Rating</div>
            <div className={`${styles.statBadge} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`}>
              Excellence
            </div>
          </div>
        </div>

        {/* HOD Information Alert */}
        <div className={`${styles.alert} ${styles.alertInfo}`}>
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <strong>HOD Dashboard:</strong> Comprehensive faculty directory with detailed profiles, research metrics, 
              and performance indicators. Use filters to find faculty by specialization, experience, or current projects.
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h2 className={styles.filtersTitle}>
              <Filter className="w-6 h-6" />
              Advanced Search & Filters
            </h2>
            <div className={styles.filtersActions}>
              <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
          
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Search className="w-4 h-4" />
                Search
              </label>
              <input
                className={styles.input}
                placeholder="Name, courses, projects, skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <GraduationCap className="w-4 h-4" />
                Designation
              </label>
              <select
                className={styles.select}
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="">All Designations</option>
                {allDesignations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <BookOpen className="w-4 h-4" />
                Specialization
              </label>
              <select
                className={styles.select}
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                {allSpecs.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Activity className="w-4 h-4" />
                Status
              </label>
              <select
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                {allStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Clock className="w-4 h-4" />
                Experience Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={minExp}
                  onChange={(e) => setMinExp(e.target.value === "" ? "" : Number(e.target.value))}
                />
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={maxExp}
                  onChange={(e) => setMaxExp(e.target.value === "" ? "" : Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="font-medium">{filtered.length} Results</div>
                <div>of {deptFaculty.length} faculty</div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Cards */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <Users className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Faculty Found</h3>
            <p className={styles.emptyText}>
              Try adjusting your search criteria or filters to find faculty members.
            </p>
          </div>
        ) : (
          <div className={styles.facultyGrid}>
            {filtered.map((faculty) => {
              const isExpanded = expandedCard === faculty.id;
              
              return (
                <article key={faculty.id} className={styles.facultyCard}>
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                      <div className={`${styles.statusDot} ${getStatusColor(faculty.status)}`} />
                      {faculty.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className={styles.facultyInfo}>
                      <h3 className={styles.name}>{faculty.name}</h3>
                      <div className={styles.designation}>{faculty.designation}</div>
                      <div className={styles.experience}>
                        {faculty.experienceYears} years experience • {faculty.status}
                      </div>
                      <div className={styles.quickStats}>
                        <span>{faculty.publications} papers</span>
                        <span>•</span>
                        <span>H-index: {faculty.hIndex}</span>
                        <span>•</span>
                        <span>{faculty.studentsSupervised} students</span>
                        <span>•</span>
                        <span>★ {faculty.teachingRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      <Target className="w-4 h-4" />
                      Specializations
                    </h4>
                    <div className={styles.tagContainer}>
                      {faculty.specialization.slice(0, 3).map((spec) => (
                        <span key={spec} className={`${styles.tag} ${styles.tagPrimary}`}>
                          {spec}
                        </span>
                      ))}
                      {faculty.specialization.length > 3 && (
                        <span className={`${styles.tag} ${styles.tagSecondary}`}>
                          +{faculty.specialization.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className={styles.section}>
                    <div className={styles.metricsGrid}>
                      <div className={styles.metricItem}>
                        <div className={styles.metricValue}>{faculty.teachingRating}</div>
                        <div className={styles.metricLabel}>Teaching</div>
                      </div>
                      <div className={styles.metricItem}>
                        <div className={styles.metricValue}>{faculty.researchRating}</div>
                        <div className={styles.metricLabel}>Research</div>
                      </div>
                      <div className={styles.metricItem}>
                        <div className={styles.metricValue}>{faculty.mentorshipRating}</div>
                        <div className={styles.metricLabel}>Mentoring</div>
                      </div>
                    </div>
                  </div>

                  {/* Current Projects Preview */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      <Lightbulb className="w-4 h-4" />
                      Current Projects
                    </h4>
                    <div className={styles.tagContainer}>
                      {faculty.currentProjects.slice(0, 2).map((project) => (
                        <span key={project} className={`${styles.tag} ${styles.tagSuccess}`}>
                          {project}
                        </span>
                      ))}
                      {faculty.currentProjects.length > 2 && (
                        <span className={`${styles.tag} ${styles.tagSecondary}`}>
                          +{faculty.currentProjects.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <>
                      {/* Detailed Metrics */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          <BarChart3 className="w-4 h-4" />
                          Academic Metrics
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{faculty.publications}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Publications</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{faculty.hIndex}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">H-Index</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{faculty.i10Index}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">i10-Index</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{faculty.ongoingPhDs}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Ongoing PhDs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{faculty.completedPhDs}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Completed PhDs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{faculty.courseLoad}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Course Load</div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Research */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          <Star className="w-4 h-4" />
                          Recent Publications
                        </h4>
                        {faculty.research.slice(0, 3).map((research, idx) => (
                          <div key={idx} className={styles.researchItem}>
                            <div className={styles.researchTitle}>{research.title}</div>
                            <div className={styles.researchMeta}>
                              <span>{research.journal}</span>
                              <span>•</span>
                              <span>{research.year}</span>
                              {research.citations && (
                                <>
                                  <span>•</span>
                                  <span>{research.citations} citations</span>
                                </>
                              )}
                              {research.impactFactor && (
                                <>
                                  <span>•</span>
                                  <span>IF: {research.impactFactor}</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Skills & Technologies */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          <Code className="w-4 h-4" />
                          Technical Skills
                        </h4>
                        <div className={styles.tagContainer}>
                          {faculty.skills.slice(0, 8).map((skill) => (
                            <span key={skill} className={`${styles.tag} ${styles.tagWarning}`}>
                              {skill}
                            </span>
                          ))}
                          {faculty.skills.length > 8 && (
                            <span className={`${styles.tag} ${styles.tagSecondary}`}>
                              +{faculty.skills.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Awards & Recognition */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          <Award className="w-4 h-4" />
                          Awards & Recognition
                        </h4>
                        <div className={styles.tagContainer}>
                          {faculty.awards.map((award) => (
                            <span key={award} className={`${styles.tag} ${styles.tagPrimary}`}>
                              {award}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Courses Taught */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          <BookOpen className="w-4 h-4" />
                          Courses Taught
                        </h4>
                        <div className={styles.tagContainer}>
                          {faculty.coursesTaught.map((course) => (
                            <span key={course} className={`${styles.tag} ${styles.tagSecondary}`}>
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          <Mail className="w-4 h-4" />
                          Contact & Office
                        </h4>
                        <div className={styles.contactGrid}>
                          <div className={styles.contactItem}>
                            <Mail className={styles.contactIcon} />
                            <span className={styles.contactText}>{faculty.email}</span>
                          </div>
                          <div className={styles.contactItem}>
                            <Phone className={styles.contactIcon} />
                            <span className={styles.contactText}>{faculty.phone}</span>
                          </div>
                          <div className={styles.contactItem}>
                            <MapPin className={styles.contactIcon} />
                            <span className={styles.contactText}>{faculty.office}</span>
                          </div>
                          <div className={styles.contactItem}>
                            <Clock className={styles.contactIcon} />
                            <span className={styles.contactText}>Office Hours: {faculty.officeHours}</span>
                          </div>
                        </div>
                      </div>

                      {/* Social Profiles */}
                      {faculty.socialProfiles && (
                        <div className={styles.section}>
                          <h4 className={styles.sectionTitle}>
                            <Globe className="w-4 h-4" />
                            Academic Profiles
                          </h4>
                          <div className={styles.socialGrid}>
                            {faculty.socialProfiles.googleScholar && (
                              <a href={faculty.socialProfiles.googleScholar} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Globe className="w-4 h-4" />
                                Google Scholar
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </a>
                            )}
                            {faculty.socialProfiles.researchGate && (
                              <a href={faculty.socialProfiles.researchGate} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Network className="w-4 h-4" />
                                ResearchGate
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </a>
                            )}
                            {faculty.socialProfiles.linkedin && (
                              <a href={faculty.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Users className="w-4 h-4" />
                                LinkedIn
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </a>
                            )}
                            {faculty.socialProfiles.orcid && (
                              <a href={faculty.socialProfiles.orcid} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <User className="w-4 h-4" />
                                ORCID
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Research Grants */}
                      {faculty.grants.length > 0 && (
                        <div className={styles.section}>
                          <h4 className={styles.sectionTitle}>
                            <Briefcase className="w-4 h-4" />
                            Research Grants
                          </h4>
                          <div className="space-y-2">
                            {faculty.grants.map((grant, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm">
                                {grant}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : faculty.id)}
                      className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          View Details
                        </>
                      )}
                    </button>
                    <button className={`${styles.button} ${styles.buttonPrimary} flex-1`}>
                      <Eye className="w-4 h-4" />
                      Full Profile
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
