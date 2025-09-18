import React, { useMemo, useState } from "react";

type Faculty = {
  id: string;
  name: string;
  department: string;
  designation: string;
  specialization: string[];
  qualifications: string[];
  experienceYears: number;
  coursesTaught: string[];
  research: { title: string; year: number; journal?: string }[];
  email: string;
  phone: string;
  photoUrl?: string;
};

const HARD_CODED_FACULTY: Faculty[] = [
  {
    id: "FAC001",
    name: "Dr. Ananya Sharma",
    department: "Computer Science",
    designation: "Professor",
    specialization: ["AI", "ML", "NLP"],
    qualifications: ["Ph.D. (CSE)", "M.Tech (AI)", "B.Tech (IT)"],
    experienceYears: 14,
    coursesTaught: ["Machine Learning", "Natural Language Processing", "AI Lab"],
    research: [
      { title: "Contextual Embeddings in Indic Languages", year: 2023, journal: "ACL" },
      { title: "Efficient Transformers for Edge", year: 2022, journal: "NeurIPS" },
    ],
    email: "ananya.sharma@bestcollege.edu",
    phone: "+91-98765-43210",
  },
  {
    id: "FAC002",
    name: "Prof. Rahul Verma",
    department: "Computer Science",
    designation: "Associate Professor",
    specialization: ["Systems", "Cloud", "DevOps"],
    qualifications: ["M.Tech (CSE)", "B.Tech (CSE)"],
    experienceYears: 10,
    coursesTaught: ["Operating Systems", "Cloud Computing", "DevOps"],
    research: [{ title: "Observability in Cloud-Native Systems", year: 2021 }],
    email: "rahul.verma@bestcollege.edu",
    phone: "+91-98765-40010",
  },
  {
    id: "FAC003",
    name: "Dr. Neha Iyer",
    department: "Electronics",
    designation: "Assistant Professor",
    specialization: ["VLSI", "Signal Processing"],
    qualifications: ["Ph.D. (ECE)", "M.E (VLSI)"],
    experienceYears: 7,
    coursesTaught: ["Digital Signal Processing", "VLSI Design"],
    research: [{ title: "Low-Power VLSI Techniques", year: 2020 }],
    email: "neha.iyer@bestcollege.edu",
    phone: "+91-90000-10001",
  },
  {
    id: "FAC004",
    name: "Dr. Karthik Rao",
    department: "Computer Science",
    designation: "Assistant Professor",
    specialization: ["Data Science", "Databases"],
    qualifications: ["Ph.D. (Data Science)"],
    experienceYears: 5,
    coursesTaught: ["Database Systems", "Data Mining"],
    research: [{ title: "Auto-Indexing with RL", year: 2024, journal: "VLDB" }],
    email: "karthik.rao@bestcollege.edu",
    phone: "+91-98111-22233",
  },
];

// Hardcoded HOD department
const HOD_DEPARTMENT = "Computer Science";

const styles = {
  page: "w-full max-w-7xl mx-auto p-4 md:p-6 text-sm md:text-base",
  header: "flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4",
  title: "text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100",
  sub: "text-gray-600 dark:text-gray-300",
  filtersWrap: "grid grid-cols-1 md:grid-cols-4 gap-3",
  input:
    "w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none",
  tag:
    "inline-block rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 mr-1 mb-1",
  card:
    "rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm p-4 flex gap-4 hover:shadow-md transition",
  avatar:
    "h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold",
  grid: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
  chip:
    "px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mr-1",
  sectionTitle: "text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1",
  empty:
    "text-center text-gray-600 dark:text-gray-300 py-8 border border-dashed rounded-lg dark:border-gray-800",
};

export default function FacultyDetails() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [minExp, setMinExp] = useState<number | "">("");
  const [maxExp, setMaxExp] = useState<number | "">("");

  const allSpecs = useMemo(() => {
    const set = new Set<string>();
    HARD_CODED_FACULTY.filter(f => f.department === HOD_DEPARTMENT).forEach(f =>
      f.specialization.forEach(s => set.add(s))
    );
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return HARD_CODED_FACULTY.filter(f => f.department === HOD_DEPARTMENT)
      .filter(f =>
        search
          ? f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.coursesTaught.join(" ").toLowerCase().includes(search.toLowerCase()) ||
            f.specialization.join(" ").toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter(f => (specialization ? f.specialization.includes(specialization) : true))
      .filter(f => (minExp !== "" ? f.experienceYears >= Number(minExp) : true))
      .filter(f => (maxExp !== "" ? f.experienceYears <= Number(maxExp) : true));
  }, [search, specialization, minExp, maxExp]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Faculty Directory</div>
          <div className={styles.sub}>Department: {HOD_DEPARTMENT}</div>
        </div>
      </div>

      <div className={styles.filtersWrap}>
        <input
          className={styles.input}
          placeholder="Search by name, course, specialization"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className={styles.input}
          value={specialization}
          onChange={e => setSpecialization(e.target.value)}
        >
          <option value="">All specializations</option>
          {allSpecs.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          className={styles.input}
          type="number"
          min={0}
          placeholder="Min experience (years)"
          value={minExp}
          onChange={e => setMinExp(e.target.value === "" ? "" : Number(e.target.value))}
        />
        <input
          className={styles.input}
          type="number"
          min={0}
          placeholder="Max experience (years)"
          value={maxExp}
          onChange={e => setMaxExp(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div className="h-3" />

      {filtered.length === 0 ? (
        <div className={styles.empty}>No faculty found for current filters.</div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(f => (
            <article key={f.id} className={styles.card}>
              {f.photoUrl ? (
                <img src={f.photoUrl} alt={f.name} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className={styles.avatar}>{f.name.split(" ").map(n => n[0]).join("")}</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-gray-900 dark:text-gray-100">
                      {f.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {f.designation} • {f.department}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    Exp: {f.experienceYears} yrs
                  </div>
                </div>

                <div className="mt-2">
                  <div className={styles.sectionTitle}>Specializations</div>
                  <div className="flex flex-wrap">
                    {f.specialization.map(s => (
                      <span key={s} className={styles.chip}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <div className={styles.sectionTitle}>Qualifications</div>
                  <div className="flex flex-wrap">
                    {f.qualifications.map(q => (
                      <span key={q} className={styles.chip}>
                        {q}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <div className={styles.sectionTitle}>Courses Taught</div>
                  <div className="flex flex-wrap">
                    {f.coursesTaught.map(c => (
                      <span key={c} className={styles.tag}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <div className={styles.sectionTitle}>Research</div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                    {f.research.map((r, idx) => (
                      <li key={idx}>
                        {r.title} ({r.year}
                        {r.journal ? `, ${r.journal}` : ""})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-2 text-sm">
                  <div className="text-gray-700 dark:text-gray-300">Email: {f.email}</div>
                  <div className="text-gray-700 dark:text-gray-300">Phone: {f.phone}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
