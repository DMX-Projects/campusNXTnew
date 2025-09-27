import React, { useState } from "react";
import { CheckCircle, Circle, XCircle, User } from "lucide-react";

interface Topic {
id: number;
name: string;
completed: boolean;
}

interface Subject {
id: number;
code: string;
name: string;
faculty: string;
topics: Topic[];
}

const SyllabusTracker: React.FC = () => {
const [subjects, setSubjects] = useState<Subject[]>([
{
id: 1,
code: "CSE101",
name: "Introduction to Programming",
faculty: "Dr. Ramesh Kumar",
topics: [
{ id: 1, name: "Basics of C Programming", completed: true },
{ id: 2, name: "Variables, Loops & Functions", completed: true },
{ id: 3, name: "Arrays & Strings", completed: false },
{ id: 4, name: "Pointers & Memory Management", completed: false },
{ id: 5, name: "File Handling", completed: false },
],
},
{
id: 2,
code: "CSE202",
name: "Data Structures",
faculty: "Prof. Anitha Sharma",
topics: [
{ id: 1, name: "Stacks & Queues", completed: true },
{ id: 2, name: "Linked Lists", completed: true },
{ id: 3, name: "Trees & Binary Search Trees", completed: false },
{ id: 4, name: "Graphs & Traversal", completed: false },
{ id: 5, name: "Hashing Techniques", completed: false },
],
},
{
id: 3,
code: "CSE303",
name: "Operating Systems",
faculty: "Dr. Neha Verma",
topics: [
{ id: 1, name: "Process Management", completed: true },
{ id: 2, name: "Scheduling Algorithms", completed: false },
{ id: 3, name: "Deadlocks", completed: false },
{ id: 4, name: "Memory Management", completed: false },
{ id: 5, name: "File System", completed: false },
],
},
]);

const toggleTopicCompletion = (subjectId: number, topicId: number) => {
setSubjects((prev) =>
prev.map((subj) =>
subj.id === subjectId
? {
...subj,
topics: subj.topics.map((topic) =>
topic.id === topicId
? { ...topic, completed: !topic.completed }
: topic
),
}
: subj
)
);
};

const markAllCompleted = (subjectId: number) => {
setSubjects((prev) =>
prev.map((subj) =>
subj.id === subjectId
? {
...subj,
topics: subj.topics.map((topic) => ({
...topic,
completed: true,
})),
}
: subj
)
);
};

const calculateProgress = (topics: Topic[]) => {
const completed = topics.filter((t) => t.completed).length;
return Math.round((completed / topics.length) * 100);
};

return ( <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition"> <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400"> Syllabus Tracker </h2>


  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {subjects.map((subject) => {
      const progress = calculateProgress(subject.topics);
      return (
        <div
          key={subject.id}
          className="border dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition"
        >
          {/* Subject Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {subject.code} - {subject.name}
              </h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                <User size={14} className="mr-1" />
                {subject.faculty}
              </div>
            </div>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${
                progress === 100
                  ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200"
                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-200"
              }`}
            >
              {progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Mark All Completed Button */}
          <button
            onClick={() => markAllCompleted(subject.id)}
            className="mb-4 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1.5 rounded-lg transition"
          >
            ✅ Mark All Topics Completed
          </button>

          {/* Topics List */}
          <ul className="space-y-2">
            {subject.topics.map((topic) => (
              <li
                key={topic.id}
                className="flex justify-between items-center p-2 border rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-2">
                  {topic.completed ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}
                  <span
                    className={`${
                      topic.completed
                        ? "text-green-600 dark:text-green-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300 font-medium"
                    }`}
                  >
                    {topic.name}
                  </span>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() =>
                    toggleTopicCompletion(subject.id, topic.id)
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    topic.completed
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {topic.completed ? "Undo" : "Mark Done"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
</div>


);
};

export default SyllabusTracker;
