import { useState, useEffect } from 'react';
import { Calendar, Clock, Download, Filter, AlertCircle, CalendarDays, User, RefreshCw, Search, X } from 'lucide-react';
import { fetchWithFallback, getImageUrl } from '../../api';

type Assignment = {
  _id: string;
  title: string;
  description: string;
  className: string;
  subject: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
  deadline: string;
  createdAt: string;
  uploadedBy?: string;
};

const AssignmentsTab = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique classes and subjects for filtering
  const classes = [...new Set(assignments.map(a => a.className))].sort();
  const subjects = [...new Set(assignments.map(a => a.subject))].sort();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await fetchWithFallback(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'}/assignments`, 'assignments');
      
      // Filter out expired assignments
      const now = new Date();
      const activeAssignments = (Array.isArray(data) ? data : []).filter((assignment: Assignment) => {
        const deadline = new Date(assignment.deadline);
        return deadline > now;
      });
      
      setAssignments(activeAssignments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesClass = !selectedClass || assignment.className === selectedClass;
    const matchesSubject = !selectedSubject || assignment.subject === selectedSubject;
    const matchesSearch = !searchTerm || 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - now.getTime();
    
    if (timeDiff <= 0) return 'Expired';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} left`;
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'image':
        return '🖼️';
      default:
        return '📎';
    }
  };

  const handleDownload = (assignment: Assignment) => {
    const link = document.createElement('a');
    
    // Use the safe image URL helper
    const fileUrl = getImageUrl(assignment.fileUrl) || assignment.fileUrl;
    
    link.href = fileUrl;
    link.download = `${assignment.title.replace(/[^a-zA-Z0-9]/g, '_')}.${assignment.fileType === 'pdf' ? 'pdf' : 'jpg'}`;
    link.target = '_blank'; // Open in new tab as fallback
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchAssignments}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats with original white backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Now</p>
              <p className="text-2xl font-bold text-gray-900">{filteredAssignments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-md">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent (≤24h)</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredAssignments.filter(a => {
                  const timeRemaining = getTimeRemaining(a.deadline);
                  return timeRemaining.includes('hour') || timeRemaining.includes('minute');
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters with original white background */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Filter Assignments</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('');
                setSelectedSubject('');
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
            <button
              onClick={fetchAssignments}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Assignments
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Classes</option>
              {classes.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assignments Grid */}
      {filteredAssignments.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-4 w-24 h-24 mx-auto mb-4">
            <AlertCircle className="mx-auto h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Assignments</h3>
          <p className="text-gray-600">
            {assignments.length === 0 
              ? 'No assignments available at the moment.'
              : 'No assignments match your current filters.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((assignment) => {
            const timeRemaining = getTimeRemaining(assignment.deadline);
            const isUrgent = timeRemaining.includes('hour') || timeRemaining.includes('minute');
            
            return (
              <div
                key={assignment._id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  isUrgent ? 'border-l-4 border-red-500' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {assignment.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {assignment.description}
                      </p>
                    </div>
                    <span className="text-2xl ml-2">
                      {getFileIcon(assignment.fileType)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Class:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {assignment.className}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Subject:</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {assignment.subject}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Posted:</span>
                      <span>{new Date(assignment.createdAt || '').toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Deadline:</span>
                      <span>{new Date(assignment.deadline).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Time Remaining:</span>
                      <span className={`font-medium ${
                        isUrgent ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {timeRemaining}
                      </span>
                    </div>

                    {assignment.uploadedBy && (
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span className="font-medium mr-2">Uploaded by:</span>
                        <span>{assignment.uploadedBy}</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDownload(assignment)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Assignment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignmentsTab;
