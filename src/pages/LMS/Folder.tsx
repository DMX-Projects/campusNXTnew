import React, { useState, useEffect } from 'react';
import { FolderIcon, PlusIcon, TrashIcon, EditIcon, SearchIcon, SortAscIcon, SortDescIcon, DownloadIcon, UploadIcon } from 'lucide-react';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  createdAt: string;
  updatedAt: string;
  department: string;
  semester: string;
  description?: string;
  fileCount?: number;
  isPrivate: boolean;
}

const Folder: React.FC = () => {
  const [folders, setFolders] = useState<FolderItem[]>([
    {
      id: '1',
      name: 'Data Structures Notes',
      type: 'folder',
      createdAt: '2025-08-15T10:00:00Z',
      updatedAt: '2025-09-01T14:30:00Z',
      department: 'CSE',
      semester: '3',
      description: 'Complete notes for Data Structures course',
      fileCount: 15,
      isPrivate: false
    },
    {
      id: '2',
      name: 'Database Lab Files',
      type: 'folder',
      createdAt: '2025-08-20T09:15:00Z',
      updatedAt: '2025-08-25T16:45:00Z',
      department: 'CSE',
      semester: '4',
      description: 'Lab assignments and solutions',
      fileCount: 8,
      isPrivate: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFolders, setFilteredFolders] = useState<FolderItem[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Form states
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDepartment, setNewFolderDepartment] = useState('CSE');
  const [newFolderSemester, setNewFolderSemester] = useState('1');
  const [newFolderDescription, setNewFolderDescription] = useState('');
  const [newFolderPrivate, setNewFolderPrivate] = useState(false);
  
  const [editingFolder, setEditingFolder] = useState<FolderItem | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<FolderItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  // Filter and sort folders
  useEffect(() => {
    let filtered = [...folders];

    // Apply filters
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(folder => folder.department === selectedDepartment);
    }
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(folder => folder.semester === selectedSemester);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(folder => 
        folder.name.toLowerCase().includes(term) ||
        folder.description?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'size':
          comparison = (a.fileCount || 0) - (b.fileCount || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredFolders(filtered);
    setCurrentPage(1);
  }, [folders, searchTerm, selectedDepartment, selectedSemester, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredFolders.length / itemsPerPage);
  const displayedFolders = filteredFolders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      alert('Folder name cannot be empty');
      return;
    }

    const existingFolder = folders.find(
      f => f.name.toLowerCase() === newFolderName.toLowerCase() && 
           f.department === newFolderDepartment &&
           f.semester === newFolderSemester
    );

    if (existingFolder) {
      alert('A folder with this name already exists in the selected department and semester');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newFolder: FolderItem = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        type: 'folder',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        department: newFolderDepartment,
        semester: newFolderSemester,
        description: newFolderDescription.trim() || undefined,
        fileCount: 0,
        isPrivate: newFolderPrivate
      };

      setFolders([...folders, newFolder]);
      resetForm();
      setIsCreateModalOpen(false);
      setLoading(false);
      alert('Folder created successfully!');
    }, 500);
  };

  const handleEditFolder = () => {
    if (!editingFolder || !newFolderName.trim()) {
      alert('Folder name cannot be empty');
      return;
    }

    const existingFolder = folders.find(
      f => f.id !== editingFolder.id &&
           f.name.toLowerCase() === newFolderName.toLowerCase() && 
           f.department === newFolderDepartment &&
           f.semester === newFolderSemester
    );

    if (existingFolder) {
      alert('A folder with this name already exists in the selected department and semester');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setFolders(folders.map(folder =>
        folder.id === editingFolder.id
          ? {
              ...folder,
              name: newFolderName.trim(),
              department: newFolderDepartment,
              semester: newFolderSemester,
              description: newFolderDescription.trim() || undefined,
              isPrivate: newFolderPrivate,
              updatedAt: new Date().toISOString()
            }
          : folder
      ));

      resetForm();
      setIsEditModalOpen(false);
      setEditingFolder(null);
      setLoading(false);
      alert('Folder updated successfully!');
    }, 500);
  };

  const handleDeleteFolder = () => {
    if (!deletingFolder) return;

    setLoading(true);

    setTimeout(() => {
      setFolders(folders.filter(folder => folder.id !== deletingFolder.id));
      setIsDeleteModalOpen(false);
      setDeletingFolder(null);
      setLoading(false);
      alert('Folder deleted successfully!');
    }, 500);
  };

  const handleBulkDelete = () => {
    if (selectedFolders.length === 0) {
      alert('Please select folders to delete');
      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete ${selectedFolders.length} folder(s)?`);
    if (!confirmDelete) return;

    setLoading(true);

    setTimeout(() => {
      setFolders(folders.filter(folder => !selectedFolders.includes(folder.id)));
      setSelectedFolders([]);
      setLoading(false);
      alert(`${selectedFolders.length} folder(s) deleted successfully!`);
    }, 500);
  };

  const resetForm = () => {
    setNewFolderName('');
    setNewFolderDepartment('CSE');
    setNewFolderSemester('1');
    setNewFolderDescription('');
    setNewFolderPrivate(false);
  };

  const openEditModal = (folder: FolderItem) => {
    setEditingFolder(folder);
    setNewFolderName(folder.name);
    setNewFolderDepartment(folder.department);
    setNewFolderSemester(folder.semester);
    setNewFolderDescription(folder.description || '');
    setNewFolderPrivate(folder.isPrivate);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (folder: FolderItem) => {
    setDeletingFolder(folder);
    setIsDeleteModalOpen(true);
  };

  const toggleSort = (field: 'name' | 'date' | 'size') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleSelectFolder = (folderId: string) => {
    setSelectedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFolders.length === displayedFolders.length) {
      setSelectedFolders([]);
    } else {
      setSelectedFolders(displayedFolders.map(f => f.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportFolders = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Department,Semester,Description,Files,Created,Updated,Private\n" +
      filteredFolders.map(folder => 
        `"${folder.name}","${folder.department}","${folder.semester}","${folder.description || ''}","${folder.fileCount || 0}","${formatDate(folder.createdAt)}","${formatDate(folder.updatedAt)}","${folder.isPrivate}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "folders_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
              <p className="text-gray-600 mt-1">
                Organize and manage academic folders and documents ({filteredFolders.length} folders)
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedFolders.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <TrashIcon size={20} />
                  Delete Selected ({selectedFolders.length})
                </button>
              )}
              
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <UploadIcon size={20} />
                Upload Files
              </button>
              
              <button
                onClick={exportFolders}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Folder
              </button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search folders by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>

              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
              </select>
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <button
                onClick={() => toggleSort('name')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === 'name' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />)}
              </button>
              <button
                onClick={() => toggleSort('date')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === 'date' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />)}
              </button>
              <button
                onClick={() => toggleSort('size')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === 'size' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Files {sortBy === 'size' && (sortOrder === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />)}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Bulk Selection Controls */}
          {displayedFolders.length > 0 && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFolders.length === displayedFolders.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Select All ({displayedFolders.length})
                </span>
              </label>
              {selectedFolders.length > 0 && (
                <span className="text-sm text-blue-600 font-medium">
                  {selectedFolders.length} selected
                </span>
              )}
            </div>
          )}
        </div>

        {/* Folders Display */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : displayedFolders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FolderIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No folders found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedDepartment !== 'all' || selectedSemester !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Create your first folder to get started'
              }
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Folder
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedFolders.map((folder) => (
              <div
                key={folder.id}
                className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-all cursor-pointer ${
                  selectedFolders.includes(folder.id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FolderIcon className="text-blue-500" size={32} />
                    {folder.isPrivate && (
                      <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        Private
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFolders.includes(folder.id)}
                      onChange={() => toggleSelectFolder(folder.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(folder);
                        }}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(folder);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 truncate" title={folder.name}>
                  {folder.name}
                </h3>
                
                {folder.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={folder.description}>
                    {folder.description}
                  </p>
                )}
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Department:</span>
                    <span className="font-medium text-blue-600">{folder.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Semester:</span>
                    <span className="font-medium">{folder.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Files:</span>
                    <span className="font-medium">{folder.fileCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span className="font-medium">{formatDate(folder.updatedAt).split(',')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedFolders.length === displayedFolders.length}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Files
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedFolders.map((folder) => (
                    <tr key={folder.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedFolders.includes(folder.id)}
                          onChange={() => toggleSelectFolder(folder.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FolderIcon className="text-blue-500 mr-3" size={24} />
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {folder.name}
                              {folder.isPrivate && (
                                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                  Private
                                </span>
                              )}
                            </div>
                            {folder.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {folder.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{folder.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{folder.semester}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{folder.fileCount || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(folder.updatedAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(folder)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(folder)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredFolders.length)} of {filteredFolders.length} results
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    Math.abs(page - currentPage) <= 2
                  )
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-3 py-2 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        {/* Create Folder Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Folder</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Folder Name *
                  </label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter folder name"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newFolderDescription}
                    onChange={(e) => setNewFolderDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter folder description (optional)"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      value={newFolderDepartment}
                      onChange={(e) => setNewFolderDepartment(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester
                    </label>
                    <select
                      value={newFolderSemester}
                      onChange={(e) => setNewFolderSemester(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="private"
                    checked={newFolderPrivate}
                    onChange={(e) => setNewFolderPrivate(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="private" className="ml-2 text-sm text-gray-700">
                    Make this folder private
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFolder}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={loading || !newFolderName.trim()}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Folder Modal */}
        {isEditModalOpen && editingFolder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Folder</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Folder Name *
                  </label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter folder name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newFolderDescription}
                    onChange={(e) => setNewFolderDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter folder description (optional)"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      value={newFolderDepartment}
                      onChange={(e) => setNewFolderDepartment(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester
                    </label>
                    <select
                      value={newFolderSemester}
                      onChange={(e) => setNewFolderSemester(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="editPrivate"
                    checked={newFolderPrivate}
                    onChange={(e) => setNewFolderPrivate(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="editPrivate" className="ml-2 text-sm text-gray-700">
                    Make this folder private
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingFolder(null);
                    resetForm();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditFolder}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={loading || !newFolderName.trim()}
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && deletingFolder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Folder</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "<strong>{deletingFolder.name}</strong>"? 
                This action cannot be undone and will remove all files in this folder.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingFolder(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteFolder}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Files Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Files</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadIcon className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-4">
                  Drag and drop files here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose Files
                </label>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    alert('File upload functionality would be implemented here!');
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
