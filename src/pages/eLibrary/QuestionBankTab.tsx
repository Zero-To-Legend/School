import { useState, useEffect } from 'react';
import { Download, Filter, AlertCircle, CalendarDays, User, RefreshCw, Search, X, HelpCircle, Calendar } from 'lucide-react';
import { API_BASE } from '../../api';

type QuestionBank = {
  _id: string;
  title: string;
  description: string;
  className: string;
  subject: string;
  examType: string;
  year: number;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'document';
  createdAt: string;
  updatedAt: string;
  uploadedBy?: string;
};

const QuestionBankTab = () => {
  const [questions, setQuestions] = useState<QuestionBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique values for filtering
  const classes = [...new Set(questions.map(q => q.className))].sort();
  const subjects = [...new Set(questions.map(q => q.subject))].sort();
  const examTypes = [...new Set(questions.map(q => q.examType))].sort();
  const years = [...new Set(questions.map(q => q.year))].sort((a, b) => b - a);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/questions`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesClass = !selectedClass || question.className === selectedClass;
    const matchesSubject = !selectedSubject || question.subject === selectedSubject;
    const matchesExamType = !selectedExamType || question.examType === selectedExamType;
    const matchesYear = !selectedYear || question.year.toString() === selectedYear;
    const matchesSearch = !searchTerm || 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSubject && matchesExamType && matchesYear && matchesSearch;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'image':
        return '🖼️';
      case 'document':
        return '📝';
      default:
        return '📎';
    }
  };

  const handleDownload = (question: QuestionBank) => {
    const link = document.createElement('a');
    
    // Construct the full URL
    let fileUrl = question.fileUrl;
    if (!fileUrl.startsWith('http')) {
      // Remove /api from API_BASE and add the file path
      const baseUrl = API_BASE.replace('/api', '');
      fileUrl = `${baseUrl}${question.fileUrl}`;
    }
    
    link.href = fileUrl;
    link.download = `${question.title.replace(/[^a-zA-Z0-9]/g, '_')}.${question.fileType === 'pdf' ? 'pdf' : question.fileType === 'image' ? 'jpg' : 'doc'}`;
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
          onClick={fetchQuestions}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <Filter className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Filtered</p>
              <p className="text-2xl font-bold text-gray-900">{filteredQuestions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-md">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Years Available</p>
              <p className="text-2xl font-bold text-gray-900">{years.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-md">
              <Download className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Exam Types</p>
              <p className="text-2xl font-bold text-gray-900">{examTypes.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Filter Questions</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('');
                setSelectedSubject('');
                setSelectedExamType('');
                setSelectedYear('');
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
            <button
              onClick={fetchQuestions}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Questions
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exam Type
            </label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              {examTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-12">
          <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions</h3>
          <p className="text-gray-600">
            {questions.length === 0 
              ? 'No questions available at the moment.'
              : 'No questions match your current filters.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuestions.map((question) => (
            <div
              key={question._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {question.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {question.description}
                    </p>
                  </div>
                  <span className="text-2xl ml-2">
                    {getFileIcon(question.fileType)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Class:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {question.className}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Subject:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {question.subject}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Exam Type:</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {question.examType}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Year:</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      {question.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span className="font-medium mr-2">Updated:</span>
                    <span>{new Date(question.updatedAt).toLocaleDateString()}</span>
                  </div>

                  {question.uploadedBy && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Uploaded by:</span>
                      <span>{question.uploadedBy}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleDownload(question)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Questions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionBankTab;
