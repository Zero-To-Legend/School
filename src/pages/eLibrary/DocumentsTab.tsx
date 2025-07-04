import { useState, useEffect } from 'react';
import { Download, Filter, AlertCircle, CalendarDays, User, RefreshCw, Search, X, FolderOpen, Tag } from 'lucide-react';
import { API_BASE } from '../../api';

type Document = {
  _id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'document';
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  uploadedBy?: string;
};

const DocumentsTab = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories for filtering
  const categories = [...new Set(documents.map(d => d.category))].sort();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/documents`);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter(document => {
    const matchesCategory = !selectedCategory || document.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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

  const getCategoryColor = (category: string) => {
    const colors = {
      'Forms': 'bg-blue-100 text-blue-800',
      'Policies': 'bg-green-100 text-green-800',
      'Announcements': 'bg-purple-100 text-purple-800',
      'Guidelines': 'bg-orange-100 text-orange-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const handleDownload = (doc: Document) => {
    const link = document.createElement('a');
    
    // Construct the full URL
    let fileUrl = doc.fileUrl;
    if (!fileUrl.startsWith('http')) {
      // Remove /api from API_BASE and add the file path
      const baseUrl = API_BASE.replace('/api', '');
      fileUrl = `${baseUrl}${doc.fileUrl}`;
    }
    
    link.href = fileUrl;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.${doc.fileType === 'pdf' ? 'pdf' : doc.fileType === 'image' ? 'jpg' : 'doc'}`;
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
          onClick={fetchDocuments}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <FolderOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{filteredDocuments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-md">
              <Tag className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Filter Documents</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
            <button
              onClick={fetchDocuments}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Documents
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents</h3>
          <p className="text-gray-600">
            {documents.length === 0 
              ? 'No documents available at the moment.'
              : 'No documents match your current filters.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {doc.description}
                    </p>
                  </div>
                  <span className="text-2xl ml-2">
                    {getFileIcon(doc.fileType)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Category:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span className="font-medium mr-2">Updated:</span>
                    <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                  </div>

                  {doc.uploadedBy && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Uploaded by:</span>
                      <span>{doc.uploadedBy}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleDownload(doc)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Document
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;
