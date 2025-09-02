 import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  Users,
  FileText,
  Search,
  Calendar,
  BarChart3,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Save,
  Send,
  Settings,
  AlertTriangle,
} from "lucide-react";

/** ====== Types ====== */
type QType = "multiple-choice" | "true-false" | "essay" | "fill-blank";

interface Question {
  id: string;
  type: QType;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  points: number;
  timeLimit?: number;
}

interface Test {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  duration: number; // minutes
  totalMarks: number;
  startDate: string; // ISO
  endDate: string; // ISO
  questions: Question[];
  status: "draft" | "published" | "ongoing" | "completed";
  attempts: number;
  passPercentage: number;
  randomizeQuestions: boolean;
  showResultsImmediately: boolean;
  allowRetake: boolean;
  maxAttempts: number;
}

interface StudentAttempt {
  id: string;
  studentId: string;
  studentName: string;
  testId: string;
  startTime: string; // ISO
  endTime?: string; // ISO
  score: number;
  totalMarks: number;
  status: "in-progress" | "completed" | "submitted";
  answers: Record<string, any>;
  timeSpent: number; // seconds
  attempt: number;
  autoSubmitted?: boolean;
}

type Tab = "tests" | "create" | "results" | "student-view";

/** ====== Utilities ====== */
const uid = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

const ls = {
  tests: "erp.online.tests",
  attempts: "erp.online.attempts",
};

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const toCSV = (rows: any[]) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: any) =>
    `"${String(v ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;
  const lines = [
    headers.map(escape).join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  return lines.join("\n");
};

const downloadFile = (name: string, content: string, type = "text/csv") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

const withinWindow = (startISO: string, endISO: string) => {
  if (!startISO || !endISO) return true;
  const now = new Date();
  return now >= new Date(startISO) && now <= new Date(endISO);
};

const calcTotalMarks = (qs: Question[]) =>
  qs.reduce((s, q) => s + (q.points || 0), 0);

/** ====== Seed Data ====== */
const seedTest: Test = {
  id: "t1",
  title: "Mathematics Mid-Term Exam",
  description: "Comprehensive test covering algebra and geometry",
  subject: "Mathematics",
  class: "Class 10",
  duration: 45,
  totalMarks: 100,
  startDate: "2025-09-02T09:00",
  endDate: "2025-09-30T23:59",
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      question: "Solve: 2x + 3 = 11. What is x?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
      points: 5,
    },
    {
      id: "q2",
      type: "true-false",
      question: "The sum of angles in a triangle is 180 degrees.",
      correctAnswer: "true",
      points: 5,
    },
    {
      id: "q3",
      type: "fill-blank",
      question: "Area of a rectangle = ____ × width.",
      correctAnswer: "length",
      points: 5,
    },
    {
      id: "q4",
      type: "essay",
      question:
        "Explain the Pythagorean theorem and provide a real-life application.",
      correctAnswer: "",
      points: 10,
    },
  ],
  status: "published",
  attempts: 3,
  passPercentage: 60,
  randomizeQuestions: true,
  showResultsImmediately: true,
  allowRetake: true,
  maxAttempts: 3,
};

/** ====== Component ====== */
const OnlineTestSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("tests");
  const [tests, setTests] = useState<Test[]>([]);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [editingTestId, setEditingTestId] = useState<string | null>(null);

  // Student session state
  const [currentTestId, setCurrentTestId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("Rahul Kumar");
  const [studentId, setStudentId] = useState("ST001");
  const [answerMap, setAnswerMap] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [shuffledQIds, setShuffledQIds] = useState<string[]>([]);

  /** ====== Load / Persist LocalStorage ====== */
  useEffect(() => {
    const t = localStorage.getItem(ls.tests);
    const a = localStorage.getItem(ls.attempts);
    if (t) {
      const parsed: Test[] = JSON.parse(t);
      setTests(parsed);
    } else {
      const seeded = [{ ...seedTest, totalMarks: calcTotalMarks(seedTest.questions) }];
      setTests(seeded);
      localStorage.setItem(ls.tests, JSON.stringify(seeded));
    }
    if (a) setAttempts(JSON.parse(a));
  }, []);

  useEffect(() => {
    localStorage.setItem(ls.tests, JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem(ls.attempts, JSON.stringify(attempts));
  }, [attempts]);

  /** ====== Derived ====== */
  const currentTest = useMemo(
    () => tests.find((t) => t.id === currentTestId) || null,
    [tests, currentTestId]
  );

  const visibleTests = useMemo(() => {
    return tests
      .filter((test) => {
        const matchesSearch =
          test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = !selectedClass || test.class === selectedClass;
        const matchesSubject =
          !selectedSubject || test.subject === selectedSubject;
        return matchesSearch && matchesClass && matchesSubject;
      })
      .sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate));
  }, [tests, searchTerm, selectedClass, selectedSubject]);

  /** ====== Timer ====== */
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalRef.current!);
          intervalRef.current = null;
          autoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  /** ====== Grading ====== */
  const gradeAttempt = (t: Test, answers: Record<string, any>) => {
    let score = 0;
    let total = 0;
    for (const q of t.questions) {
      total += q.points || 0;
      if (q.type === "essay") continue; // manual grading
      const ans = answers[q.id];
      if (q.type === "multiple-choice") {
        if (String(ans) === String(q.correctAnswer)) score += q.points || 0;
      } else if (q.type === "true-false") {
        if (String(ans).toLowerCase() === String(q.correctAnswer).toLowerCase())
          score += q.points || 0;
      } else if (q.type === "fill-blank") {
        if (
          String(ans || "").trim().toLowerCase() ===
          String(q.correctAnswer || "").trim().toLowerCase()
        )
          score += q.points || 0;
      }
    }
    return { score, total };
  };

  /** ====== Student Flow ====== */
  const startTest = (t: Test) => {
    if (!withinWindow(t.startDate, t.endDate)) {
      alert("This test is not currently available.");
      return;
    }

    const myAttempts = attempts.filter(
      (a) => a.testId === t.id && a.studentId === studentId
    );
    if (myAttempts.length && !t.allowRetake) {
      alert("Retakes are disabled for this test.");
      return;
    }
    if (myAttempts.length >= t.maxAttempts) {
      alert("You have reached the maximum number of attempts.");
      return;
    }

    // init
    setCurrentTestId(t.id);
    const secs = (t.duration || 0) * 60;
    setTimeRemaining(secs);
    setIsRunning(true);
    setAnswerMap({});

    // shuffle ids if needed
    const order = t.randomizeQuestions
      ? shuffle(t.questions.map((q) => q.id))
      : t.questions.map((q) => q.id);
    setShuffledQIds(order);

    const newAttempt: StudentAttempt = {
      id: uid(),
      studentId,
      studentName,
      testId: t.id,
      startTime: new Date().toISOString(),
      score: 0,
      totalMarks: t.totalMarks,
      status: "in-progress",
      answers: {},
      timeSpent: 0,
      attempt: myAttempts.length + 1,
    };
    setAttempts((prev) => [...prev, newAttempt]);
    setActiveTab("student-view");
  };

  const currentAttempt = useMemo(() => {
    if (!currentTestId) return null;
    const cand = attempts
      .filter(
        (a) =>
          a.testId === currentTestId &&
          a.studentId === studentId &&
          a.status !== "completed"
      )
      .sort((a, b) => +new Date(b.startTime) - +new Date(a.startTime))[0];
    return cand || null;
  }, [attempts, currentTestId, studentId]);

  const saveProgress = () => {
    if (!currentAttempt) return;
    setAttempts((prev) =>
      prev.map((a) =>
        a.id === currentAttempt.id
          ? {
              ...a,
              answers: { ...a.answers, ...answerMap },
              timeSpent:
                (currentTest?.duration || 0) * 60 - timeRemaining,
            }
          : a
      )
    );
    alert("Progress saved.");
  };

  const submitAttempt = (opts?: { auto?: boolean }) => {
    if (!currentTest || !currentAttempt) return;
    const mergedAnswers = { ...currentAttempt.answers, ...answerMap };
    const { score, total } = gradeAttempt(currentTest, mergedAnswers);

    const nowISO = new Date().toISOString();
    const updated = attempts.map((a) =>
      a.id === currentAttempt.id
        ? {
            ...a,
            answers: mergedAnswers,
            score,
            totalMarks: total,
            status: "completed",
            endTime: nowISO,
            timeSpent:
              (currentTest.duration || 0) * 60 - timeRemaining,
            autoSubmitted: opts?.auto ?? false,
          }
        : a
    );
    setAttempts(updated);
    setIsRunning(false);
    setTimeRemaining(0);
    alert(opts?.auto ? "Time is up! Test auto-submitted." : "Submitted!");
    setActiveTab("results");
  };

  const autoSubmit = () => submitAttempt({ auto: true });

  /** ====== Test CRUD ====== */
  const deleteTest = (id: string) => {
    if (!confirm("Delete this test?")) return;
    setTests((prev) => prev.filter((t) => t.id !== id));
    setAttempts((prev) => prev.filter((a) => a.testId !== id));
    if (currentTestId === id) setCurrentTestId(null);
  };

  const publishTest = (t: Test) => {
    setTests((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, status: "published" } : x))
    );
  };

  const markCompletedIfPast = () => {
    const now = new Date().toISOString();
    setTests((prev) =>
      prev.map((t) =>
        t.endDate && t.endDate < now && t.status !== "completed"
          ? { ...t, status: "completed" }
          : t
      )
    );
  };
  useEffect(() => {
    const id = window.setInterval(markCompletedIfPast, 60_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ====== Create / Edit Form State ====== */
  const [form, setForm] = useState<Partial<Test>>({
    title: "",
    description: "",
    subject: "",
    class: "",
    duration: 60,
    totalMarks: 0,
    startDate: "",
    endDate: "",
    questions: [],
    passPercentage: 60,
    randomizeQuestions: false,
    showResultsImmediately: true,
    allowRetake: true,
    maxAttempts: 1,
    status: "draft",
  });

  const [qForm, setQForm] = useState<Partial<Question>>({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 1,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      totalMarks: calcTotalMarks(prev.questions || []),
    }));
  }, [form.questions]);

  const resetForms = () => {
    setEditingTestId(null);
    setForm({
      title: "",
      description: "",
      subject: "",
      class: "",
      duration: 60,
      totalMarks: 0,
      startDate: "",
      endDate: "",
      questions: [],
      passPercentage: 60,
      randomizeQuestions: false,
      showResultsImmediately: true,
      allowRetake: true,
      maxAttempts: 1,
      status: "draft",
    });
    setQForm({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1,
    });
  };

  const addQuestion = () => {
    if (!qForm.question || qForm.points == null) {
      alert("Please fill question and points.");
      return;
    }
    if (qForm.type === "multiple-choice") {
      const opts = (qForm.options || []).map((o) => o?.trim());
      if (opts.some((o) => !o)) {
        alert("Please fill all MCQ options.");
        return;
      }
    }
    const newQ: Question = {
      id: uid(),
      type: qForm.type as QType,
      question: qForm.question!,
      options:
        qForm.type === "multiple-choice" ? qForm.options || [] : undefined,
      correctAnswer: qForm.correctAnswer ?? "",
      points: qForm.points || 1,
    };
    setForm((prev) => ({ ...prev, questions: [...(prev.questions || []), newQ] }));
    setQForm({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1,
    });
  };

  const removeQuestion = (qid: string) => {
    setForm((prev) => ({
      ...prev,
      questions: (prev.questions || []).filter((q) => q.id !== qid),
    }));
  };

  const editTest = (t: Test) => {
    setEditingTestId(t.id);
    setForm({ ...t });
    setActiveTab("create");
  };

  const saveTest = () => {
    if (!form.title || !form.subject || !form.class || !(form.questions || []).length) {
      alert("Fill required fields and add at least one question.");
      return;
    }
    const toSave: Test = {
      ...(form as Test),
      id: editingTestId ?? uid(),
      totalMarks: calcTotalMarks(form.questions || []),
      attempts: editingTestId
        ? tests.find((t) => t.id === editingTestId)?.attempts || 0
        : 0,
    };
    setTests((prev) => {
      if (editingTestId) {
        return prev.map((t) => (t.id === editingTestId ? toSave : t));
      }
      return [toSave, ...prev];
    });
    resetForms();
    setActiveTab("tests");
    alert("Test saved!");
  };

  /** ====== Import / Export ====== */
  const exportResultsCSV = () => {
    const rows = attempts.map((a) => ({
      attemptId: a.id,
      testId: a.testId,
      studentId: a.studentId,
      studentName: a.studentName,
      startTime: a.startTime,
      endTime: a.endTime || "",
      status: a.status,
      score: a.score,
      totalMarks: a.totalMarks,
      timeSpentSec: a.timeSpent,
      attempt: a.attempt,
      autoSubmitted: a.autoSubmitted ? "yes" : "no",
    }));
    downloadFile("attempts.csv", toCSV(rows));
  };

  const exportTestsJSON = () => {
    downloadFile("tests.json", JSON.stringify(tests, null, 2), "application/json");
  };

  const importTestsJSON = async (file: File) => {
    try {
      const text = await file.text();
      const parsed: Test[] = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("Invalid file");
      setTests(parsed);
      alert("Tests imported.");
    } catch (e) {
      alert("Failed to import tests.");
    }
  };

  /** ====== Small UI Helpers ====== */
  const Tag = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${className}`}>{children}</span>
  );

  /** ====== Views ====== */
  const TestsList = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h2 className="text-2xl font-bold text-gray-800">Online Tests</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              resetForms();
              setActiveTab("create");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={18} />
            Create New Test
          </button>
          <button
            onClick={exportTestsJSON}
            className="px-3 py-2 rounded-lg border bg-white flex items-center gap-2"
          >
            <Download size={18} /> Export Tests
          </button>
          <label className="px-3 py-2 rounded-lg border bg-white flex items-center gap-2 cursor-pointer">
            <Upload size={18} /> Import
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importTestsJSON(f);
                e.currentTarget.value = "";
              }}
            />
          </label>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tests..."
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Classes</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleTests.map((test) => (
          <div key={test.id} className="bg-white rounded-lg border hover:shadow-md transition">
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{test.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{test.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    <Tag className="bg-blue-100 text-blue-800">{test.subject}</Tag>
                    <Tag className="bg-green-100 text-green-800">{test.class}</Tag>
                  </div>
                </div>
                <Tag
                  className={
                    test.status === "published"
                      ? "bg-green-100 text-green-800"
                      : test.status === "ongoing"
                      ? "bg-yellow-100 text-yellow-800"
                      : test.status === "completed"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-100 text-blue-800"
                  }
                >
                  {test.status}
                </Tag>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {test.duration} min
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  {test.totalMarks} marks
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {attempts.filter((a) => a.testId === test.id).length} attempts
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(test.startDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setCurrentTestId(test.id);
                    setActiveTab("student-view");
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
                >
                  <Eye size={16} />
                  Preview/Start
                </button>
                <button
                  onClick={() => editTest(test)}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setActiveTab("results")}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200"
                >
                  <BarChart3 size={16} />
                </button>
                <button
                  onClick={() => deleteTest(test.id)}
                  className="bg-red-100 text-red-700 py-2 px-3 rounded text-sm hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {test.status === "draft" && (
                <button
                  onClick={() => publishTest(test)}
                  className="mt-3 w-full border rounded py-2 text-sm flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Publish
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CreateEdit = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingTestId ? "Edit Test" : "Create New Test"}
        </h2>
        <button onClick={() => setActiveTab("tests")} className="text-gray-600 hover:text-gray-800">
          ← Back to Tests
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Test Details + Questions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Test Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Test Title *</label>
                <input
                  value={form.title || ""}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter test title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject *</label>
                <select
                  value={form.subject || ""}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Class *</label>
                <select
                  value={form.class || ""}
                  onChange={(e) => setForm((p) => ({ ...p, class: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Class</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={form.duration || 0}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, duration: parseInt(e.target.value || "0", 10) }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={form.startDate || ""}
                  onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={form.endDate || ""}
                  onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={form.description || ""}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter test description"
              />
            </div>
          </div>

          {/* Add Question */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Add Question</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question Type</label>
                <select
                  value={qForm.type}
                  onChange={(e) =>
                    setQForm((p) => ({ ...p, type: e.target.value as QType, correctAnswer: "" }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="essay">Essay</option>
                  <option value="fill-blank">Fill in the Blank</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Question Text</label>
                <textarea
                  value={qForm.question || ""}
                  onChange={(e) => setQForm((p) => ({ ...p, question: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter your question here..."
                />
              </div>

              {qForm.type === "multiple-choice" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Options</label>
                  {(qForm.options || []).map((opt, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input
                        value={opt}
                        onChange={(e) => {
                          const copy = [...(qForm.options || [])];
                          copy[i] = e.target.value;
                          setQForm((p) => ({ ...p, options: copy }));
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${i + 1}`}
                      />
                      <label className="flex items-center gap-1 text-sm text-gray-600">
                        <input
                          type="radio"
                          name="mcCorrect"
                          checked={String(qForm.correctAnswer) === String(i)}
                          onChange={() =>
                            setQForm((p) => ({ ...p, correctAnswer: String(i) }))
                          }
                        />
                        Correct
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {qForm.type === "true-false" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Correct Answer</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="tf"
                        checked={qForm.correctAnswer === "true"}
                        onChange={() => setQForm((p) => ({ ...p, correctAnswer: "true" }))}
                      />
                      True
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="tf"
                        checked={qForm.correctAnswer === "false"}
                        onChange={() => setQForm((p) => ({ ...p, correctAnswer: "false" }))}
                      />
                      False
                    </label>
                  </div>
                </div>
              )}

              {qForm.type === "fill-blank" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Correct Answer</label>
                  <input
                    value={qForm.correctAnswer as string}
                    onChange={(e) => setQForm((p) => ({ ...p, correctAnswer: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the correct answer"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Points</label>
                  <input
                    type="number"
                    value={qForm.points || 1}
                    min={1}
                    onChange={(e) =>
                      setQForm((p) => ({ ...p, points: parseInt(e.target.value || "1", 10) }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={addQuestion}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          {form.questions && form.questions.length > 0 && (
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">
                Questions ({form.questions.length})
              </h3>
              <div className="space-y-4">
                {form.questions.map((q, idx) => (
                  <div key={q.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            Q{idx + 1}
                          </span>
                          <Tag className="bg-blue-100 text-blue-800">
                            {q.type.replace("-", " ")}
                          </Tag>
                          <Tag className="bg-green-100 text-green-800">{q.points} pts</Tag>
                        </div>
                        <p className="text-gray-800 mb-2">{q.question}</p>
                        {q.type === "multiple-choice" && (
                          <div className="ml-4">
                            {q.options?.map((o, i) => (
                              <div
                                key={i}
                                className={`text-sm ${
                                  String(q.correctAnswer) === String(i)
                                    ? "text-green-600 font-medium"
                                    : "text-gray-600"
                                }`}
                              >
                                {i + 1}. {o}{" "}
                                {String(q.correctAnswer) === String(i) && "✓"}
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === "true-false" && (
                          <div className="ml-4 text-sm text-green-600 font-medium">
                            Answer: {String(q.correctAnswer)}
                          </div>
                        )}
                        {q.type === "fill-blank" && (
                          <div className="ml-4 text-sm text-green-600 font-medium">
                            Answer: {String(q.correctAnswer)}
                          </div>
                        )}
                        {q.type === "essay" && (
                          <div className="ml-4 text-sm text-gray-600">
                            Essay (manual grading)
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeQuestion(q.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove question"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Settings & Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings size={18} /> Test Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pass %</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.passPercentage ?? 60}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      passPercentage: parseInt(e.target.value || "60", 10),
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Attempts</label>
                <input
                  type="number"
                  min={1}
                  value={form.maxAttempts ?? 1}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      maxAttempts: parseInt(e.target.value || "1", 10),
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!form.randomizeQuestions}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, randomizeQuestions: e.target.checked }))
                    }
                  />
                  Randomize Questions
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!form.showResultsImmediately}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, showResultsImmediately: e.target.checked }))
                    }
                  />
                  Show Results Immediately
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!form.allowRetake}
                    onChange={(e) => setForm((p) => ({ ...p, allowRetake: e.target.checked }))}
                  />
                  Allow Retakes
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Test Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-medium">{form.questions?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Marks:</span>
                <span className="font-medium">
                  {calcTotalMarks(form.questions || [])}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{form.duration} min</span>
              </div>
            </div>
            <button
              onClick={saveTest}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Save Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Results = () => {
    const byTest = (id: string) => attempts.filter((a) => a.testId === id);
    const rows = tests.map((t) => {
      const arr = byTest(t.id);
      const completed = arr.filter((a) => a.status === "completed");
      const avg =
        completed.length > 0
          ? Math.round(
              (completed.reduce((s, a) => s + (a.score / (a.totalMarks || 1)) * 100, 0) /
                completed.length) *
                10
            ) / 10
          : 0;
      const passCount = completed.filter(
        (a) => (a.score / (a.totalMarks || 1)) * 100 >= t.passPercentage
      ).length;
      return {
        id: t.id,
        title: t.title,
        attempts: arr.length,
        completed: completed.length,
        avgPct: avg,
        passRate: completed.length ? Math.round((passCount / completed.length) * 100) : 0,
      };
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Results & Analytics</h2>
          <div className="flex gap-2">
            <button
              onClick={exportResultsCSV}
              className="px-3 py-2 rounded-lg border bg-white flex items-center gap-2"
            >
              <Download size={18} /> Export CSV
            </button>
            <button onClick={() => setActiveTab("tests")} className="text-gray-600">
              ← Back
            </button>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3">Test</th>
                <th className="text-left px-4 py-3">Attempts</th>
                <th className="text-left px-4 py-3">Completed</th>
                <th className="text-left px-4 py-3">Avg %</th>
                <th className="text-left px-4 py-3">Pass Rate</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3">{r.title}</td>
                  <td className="px-4 py-3">{r.attempts}</td>
                  <td className="px-4 py-3">{r.completed}</td>
                  <td className="px-4 py-3">{r.avgPct}%</td>
                  <td className="px-4 py-3">{r.passRate}%</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setCurrentTestId(r.id)}
                      className="px-2 py-1 text-xs border rounded"
                    >
                      View Attempts
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                    No tests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {currentTest && (
          <div className="bg-white p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{currentTest.title} — Attempts</h3>
              <button
                onClick={() => setCurrentTestId(null)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2">Student</th>
                    <th className="text-left px-3 py-2">Attempt</th>
                    <th className="text-left px-3 py-2">Start</th>
                    <th className="text-left px-3 py-2">End</th>
                    <th className="text-left px-3 py-2">Score</th>
                    <th className="text-left px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts
                    .filter((a) => a.testId === currentTest.id)
                    .sort((a, b) => +new Date(b.startTime) - +new Date(a.startTime))
                    .map((a) => (
                      <tr key={a.id} className="border-t">
                        <td className="px-3 py-2">
                          {a.studentName} ({a.studentId})
                        </td>
                        <td className="px-3 py-2">{a.attempt}</td>
                        <td className="px-3 py-2">
                          {new Date(a.startTime).toLocaleString()}
                        </td>
                        <td className="px-3 py-2">
                          {a.endTime ? new Date(a.endTime).toLocaleString() : "-"}
                        </td>
                        <td className="px-3 py-2">
                          {a.score}/{a.totalMarks}
                        </td>
                        <td className="px-3 py-2">
                          {a.status === "completed" ? (
                            <span className="text-green-700 flex items-center gap-1">
                              <CheckCircle size={14} /> Completed
                            </span>
                          ) : a.status === "submitted" ? (
                            <span className="text-blue-700 flex items-center gap-1">
                              <Send size={14} /> Submitted
                            </span>
                          ) : (
                            <span className="text-yellow-700 flex items-center gap-1">
                              <AlertTriangle size={14} /> In Progress
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  {attempts.filter((a) => a.testId === currentTest.id).length === 0 && (
                    <tr>
                      <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                        No attempts yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const StudentView = () => {
    const t = currentTest;
    const orderedQs = useMemo(() => {
      if (!t) return [];
      const map = new Map(t.questions.map((q) => [q.id, q]));
      return (shuffledQIds.length ? shuffledQIds : t.questions.map((q) => q.id))
        .map((id) => map.get(id)!)
        .filter(Boolean);
    }, [t, shuffledQIds]);

    const myAttempts = attempts.filter(
      (a) => a.testId === t?.id && a.studentId === studentId
    );
    const usedAttempts = myAttempts.length;
    const canStart =
      t &&
      withinWindow(t.startDate, t.endDate) &&
      (t.allowRetake ? usedAttempts < t.maxAttempts : usedAttempts === 0);

    const startOrResume = () => {
      if (!t) return;
      if (!currentAttempt) return startTest(t);
      // resume
      setIsRunning(true);
    };

    const showImmediate =
      t?.showResultsImmediately && currentAttempt?.status === "completed";

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Student View</h2>
          <button onClick={() => setActiveTab("tests")} className="text-gray-600">
            ← Back
          </button>
        </div>

        {!t && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
            Select a test from the Tests tab to preview or start.
          </div>
        )}

        {t && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Test Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-5 rounded-lg border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{t.title}</h3>
                    <p className="text-gray-600 mt-1">{t.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Tag className="bg-blue-100 text-blue-800">{t.subject}</Tag>
                      <Tag className="bg-green-100 text-green-800">{t.class}</Tag>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center justify-end gap-2">
                      <Clock size={16} /> {t.duration} min
                    </div>
                    <div>{new Date(t.startDate).toLocaleString()} →</div>
                    <div>{new Date(t.endDate).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Test Paper */}
              <div className="bg-white p-5 rounded-lg border">
                {!currentAttempt ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-sm text-gray-700">
                      Attempts used: <b>{usedAttempts}</b> / {t.maxAttempts}
                    </div>
                    <div className="flex gap-2">
                      <input
                        className="px-3 py-2 border rounded"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Your name"
                      />
                      <input
                        className="px-3 py-2 border rounded"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Student ID"
                      />
                      <button
                        onClick={startOrResume}
                        disabled={!canStart}
                        className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
                          canStart ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
                        }`}
                      >
                        <Play size={16} />
                        {usedAttempts ? "Retake" : "Start Test"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Timer & Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                      <div className="text-2xl font-mono">{formatTime(timeRemaining)}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsRunning((v) => !v)}
                          className="px-3 py-2 border rounded flex items-center gap-2"
                        >
                          {isRunning ? (
                            <>
                              <Pause size={16} /> Pause
                            </>
                          ) : (
                            <>
                              <Play size={16} /> Resume
                            </>
                          )}
                        </button>
                        <button
                          onClick={saveProgress}
                          className="px-3 py-2 border rounded flex items-center gap-2"
                        >
                          <Save size={16} /> Save
                        </button>
                        <button
                          onClick={() => submitAttempt()}
                          className="px-3 py-2 rounded bg-blue-600 text-white flex items-center gap-2"
                        >
                          <Send size={16} /> Submit
                        </button>
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">
                      {orderedQs.map((q, idx) => (
                        <div key={q.id} className="border rounded p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500">Q{idx + 1}</span>
                            <Tag className="bg-gray-100 text-gray-700">{q.type}</Tag>
                            <Tag className="bg-green-100 text-green-800">{q.points} pts</Tag>
                          </div>
                          <p className="font-medium mb-3">{q.question}</p>
                          {/* Inputs */}
                          {q.type === "multiple-choice" && (
                            <div className="space-y-2">
                              {q.options?.map((opt, i) => (
                                <label key={i} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={q.id}
                                    checked={String(answerMap[q.id]) === String(i)}
                                    onChange={() =>
                                      setAnswerMap((m) => ({ ...m, [q.id]: String(i) }))
                                    }
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          {q.type === "true-false" && (
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={q.id}
                                  checked={String(answerMap[q.id]) === "true"}
                                  onChange={() =>
                                    setAnswerMap((m) => ({ ...m, [q.id]: "true" }))
                                  }
                                />
                                True
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={q.id}
                                  checked={String(answerMap[q.id]) === "false"}
                                  onChange={() =>
                                    setAnswerMap((m) => ({ ...m, [q.id]: "false" }))
                                  }
                                />
                                False
                              </label>
                            </div>
                          )}
                          {q.type === "fill-blank" && (
                            <input
                              className="w-full px-3 py-2 border rounded"
                              value={answerMap[q.id] || ""}
                              onChange={(e) =>
                                setAnswerMap((m) => ({ ...m, [q.id]: e.target.value }))
                              }
                              placeholder="Your answer"
                            />
                          )}
                          {q.type === "essay" && (
                            <textarea
                              className="w-full px-3 py-2 border rounded"
                              rows={4}
                              value={answerMap[q.id] || ""}
                              onChange={(e) =>
                                setAnswerMap((m) => ({ ...m, [q.id]: e.target.value }))
                              }
                              placeholder="Write your answer..."
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Instant result */}
              {showImmediate && (
                <div className="bg-green-50 border border-green-200 p-4 rounded">
                  <div className="font-semibold mb-1">Your Result</div>
                  <div className="text-sm">
                    Score: <b>{currentAttempt?.score}</b> / {currentAttempt?.totalMarks}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Candidate</h4>
                <div className="text-sm text-gray-700">
                  <div>Name: {studentName}</div>
                  <div>ID: {studentId}</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Status</h4>
                <div className="text-sm text-gray-700">
                  {withinWindow(t.startDate, t.endDate) ? (
                    <div className="text-green-700 flex items-center gap-2">
                      <CheckCircle size={16} /> Available
                    </div>
                  ) : (
                    <div className="text-red-700 flex items-center gap-2">
                      <XCircle size={16} /> Not Available
                    </div>
                  )}
                  <div>Attempts used: {myAttempts.length}</div>
                  <div>Max attempts: {t.maxAttempts}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /** ====== Initial seed if empty ====== */
  useEffect(() => {
    if (tests.length === 0) {
      setTests([{ ...seedTest, totalMarks: calcTotalMarks(seedTest.questions) }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ====== Layout ====== */
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("tests")}
          className={`px-4 py-2 rounded ${
            activeTab === "tests" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Tests
        </button>
        <button
          onClick={() => {
            resetForms();
            setActiveTab("create");
          }}
          className={`px-4 py-2 rounded ${
            activeTab === "create" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Create / Edit
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`px-4 py-2 rounded ${
            activeTab === "results" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Results
        </button>
        <button
          onClick={() => setActiveTab("student-view")}
          className={`px-4 py-2 rounded ${
            activeTab === "student-view" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Student View
        </button>
      </div>

      {/* Body */}
      {activeTab === "tests" && <TestsList />}
      {activeTab === "create" && <CreateEdit />}
      {activeTab === "results" && <Results />}
      {activeTab === "student-view" && <StudentView />}
    </div>
  );
};

export default OnlineTestSystem;
