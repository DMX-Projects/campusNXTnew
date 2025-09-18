import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import Modal from '../components/Modal';
import ExamEvaluationForm from '../components/ExamEvaluationForm';
import { useExamEvaluations } from '../hooks/useExamEvaluations';

const ExamEvaluations: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: '',
    examType: '',
    dateRange: ''
  });

const { evaluations = [], deleteEvaluation } = useExamEvaluations();


  // Apply search filter
  const filteredEvaluations = evaluations.filter(evaluation =>
    evaluation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.examType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);
  const paginatedEvaluations = filteredEvaluations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (evaluation: any) => {
    setEditingEvaluation(evaluation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      await deleteEvaluation(id);
    }
  };

  const handleAddNew = () => {
    setEditingEvaluation(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">EXAM EVALUATIONS</h1>
          <p className="text-gray-600">Manage and analyze examination performance data</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Exam Evaluation</span>
        </button>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search & Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search evaluations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    value={filters.subject}
                    onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Subjects</option>
                    <option value="CN">Computer Networks</option>
                    <option value="DBMS">Database Management</option>
                    <option value="OS">Operating Systems</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                  <select
                    value={filters.examType}
                    onChange={(e) => setFilters({ ...filters, examType: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="mid">Mid Semester</option>
                    <option value="final">Final Exam</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <input
                    type="date"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Exam ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Exam Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Questions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Average Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Highest Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Lowest Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">% Above 80%</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">% 60-79%</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">% Below 60%</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvaluations.map((evaluation) => (
                <tr key={evaluation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{evaluation.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{evaluation.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{evaluation.subject}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                      evaluation.examType === 'mid'
                        ? 'bg-blue-100 text-blue-800'
                        : evaluation.examType === 'final'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {evaluation.examType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{evaluation.totalQuestions}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{evaluation.averageScore}</td>
                  <td className="py-3 px-4 text-sm text-green-600 font-medium">{evaluation.highestScore}</td>
                  <td className="py-3 px-4 text-sm text-red-600 font-medium">{evaluation.lowestScore}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{evaluation.percentAbove80}%</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{evaluation.percent60to79}%</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{evaluation.percentBelow60}%</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleEdit(evaluation)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(evaluation.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEvaluations.length)} of {filteredEvaluations.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvaluation ? 'Edit Exam Evaluation' : 'Add Exam Evaluation'}
      >
        <ExamEvaluationForm
          evaluation={editingEvaluation}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ExamEvaluations;
