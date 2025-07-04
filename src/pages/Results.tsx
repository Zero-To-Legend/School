import React, { useEffect, useState } from 'react';
import { Search, Filter, Download, Calendar, FileText, Image, BookOpen, TrendingUp, Users, Award, ChevronRight, Eye, RefreshCw } from 'lucide-react';
import { API_BASE } from '../api';

type Result = {
  _id?: string;
  className: string;
  fileUrl: string;
  fileType: 'image' | 'pdf' | 'other';
  date: string;
  title?: string;
  description?: string;
  subject?: string;
  uploadedBy?: string;
};

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
    setLoading(true);
    fetch(`${API_BASE}/results`)
      .then(res => res.json())
      .then(data => {
        // Backend returns results directly, not wrapped in a results object
        let resultsList = Array.isArray(data) ? data : (data.results || []);
        
        // Sort by date (newest first)
        resultsList.sort((a: Result, b: Result) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA; // Newest first
        });
        
        setResults(resultsList);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      })
      .finally(() => setLoading(false));
  };

  // Get unique class names and file types
  const classList = Array.from(new Set(results.map(r => r.className))).sort();
  const fileTypes = Array.from(new Set(results.map(r => r.fileType))).sort();

  // Filter results based on search, class, and file type
  const filteredResults = results.filter(result => {
    const matchesSearch = !searchTerm || 
      result.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (result.title && result.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (result.subject && result.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesClass = !selectedClass || result.className === selectedClass;
    const matchesFileType = !selectedFileType || result.fileType === selectedFileType;
    
    return matchesSearch && matchesClass && matchesFileType;
  });

  // Statistics
  const stats = {
    total: results.length,
    classes: classList.length,
    images: results.filter(r => r.fileType === 'image').length,
    pdfs: results.filter(r => r.fileType === 'pdf').length
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return Image;
      case 'pdf':
        return FileText;
      default:
        return BookOpen;
    }
  };

  const handleDownload = (fileUrl: string, className: string) => {
    const link = document.createElement('a');
    link.href = API_BASE.replace(/\/api$/, '') + fileUrl;
    link.download = `${className}_result`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Academic Results Portal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Exam 
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent"> Results</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-white/90">
              Access your academic results, view performance reports, and track your educational progress all in one place.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: stats.total.toString(), label: 'Total Results', icon: TrendingUp },
                { number: stats.classes.toString(), label: 'Classes', icon: Users },
                { number: stats.images.toString(), label: 'Image Results', icon: Image },
                { number: stats.pdfs.toString(), label: 'PDF Reports', icon: FileText }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-2">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-amber-300">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white/95 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600/60 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by class, subject, or title..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Class Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600/60 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-3 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm appearance-none min-w-[150px]"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>
                {classList.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* File Type Filter */}
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600/60 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-3 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm appearance-none min-w-[150px]"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
              >
                <option value="">All Types</option>
                {fileTypes.map(type => (
                  <option key={type} value={type} className="capitalize">{type}</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchResults}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-slate-700 hover:to-blue-800"
              disabled={loading}
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {filteredResults.length > 0 ? `${filteredResults.length} Result${filteredResults.length !== 1 ? 's' : ''} Found` : 'No Results Found'}
              </h2>
              <p className="text-slate-600/70">
                {selectedClass && `Showing results for ${selectedClass}`}
                {selectedFileType && ` • ${selectedFileType.toUpperCase()} files only`}
                {searchTerm && ` • Matching "${searchTerm}"`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 text-slate-700 animate-spin mx-auto mb-4" />
                <p className="text-slate-600/70 text-lg">Loading results...</p>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-12 max-w-md mx-auto">
                <Award className="h-16 w-16 text-amber-500/60 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No Results Available</h3>
                <p className="text-slate-600/70 mb-6">
                  {searchTerm || selectedClass || selectedFileType 
                    ? "No results match your current filters. Try adjusting your search criteria."
                    : "No exam results have been uploaded yet. Check back later for updates."
                  }
                </p>
                {(searchTerm || selectedClass || selectedFileType) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedClass('');
                      setSelectedFileType('');
                    }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-slate-700 hover:to-blue-800"
                  >
                    Clear Filters
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((result, index) => {
                const FileIcon = getFileIcon(result.fileType);
                return (
                  <div 
                    key={result._id || index} 
                    className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden hover:border-amber-200/50"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                    }}
                  >
                    {/* Card Header */}
                    <div className="p-6 border-b border-slate-200/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-slate-800 to-blue-900 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <FileIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors duration-300">
                              {result.className}
                            </h3>
                            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium mt-1">
                              {result.fileType.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {result.subject && (
                        <p className="text-slate-600/70 mb-2">
                          <span className="font-medium">Subject:</span> {result.subject}
                        </p>
                      )}
                      
                      <div className="flex items-center text-sm text-slate-500/70">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(result.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {result.fileType === 'image' ? (
                        <div className="relative mb-4">
                          <img 
                            src={API_BASE.replace(/\/api$/, '') + result.fileUrl} 
                            alt={`${result.className} result`} 
                            className="w-full h-48 object-cover rounded-xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Eye className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-slate-50 to-amber-50 rounded-xl p-8 mb-4 text-center">
                          <FileIcon className="h-12 w-12 text-slate-700 mx-auto mb-3" />
                          <p className="text-slate-600/70 font-medium">
                            {result.fileType === 'pdf' ? 'PDF Document' : 'Document File'}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            if (result.fileType === 'image') {
                              window.open(API_BASE.replace(/\/api$/, '') + result.fileUrl, '_blank');
                            } else {
                              window.open(API_BASE.replace(/\/api$/, '') + result.fileUrl, '_blank');
                            }
                          }}
                          className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(result.fileUrl, result.className)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Need Help?</h3>
          <p className="text-slate-600/70 mb-6">
            Can't find your results or having trouble accessing files? Our support team is here to help.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-slate-700 hover:to-blue-800">
            Contact Support
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
}
