import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar, FileText, Image, Download, Eye, Bell, AlertCircle, ChevronRight, RefreshCw, Clock, Tag } from 'lucide-react';
import { API_BASE } from '../api';

type Notice = {
  _id?: string;
  title: string;
  content: string;
  file?: string;
  fileType?: 'image' | 'pdf' | 'document' | 'none';
  createdAt?: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  isUrgent?: boolean;
};

export default function Notice() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    setLoading(true);
    fetch(`${API_BASE}/notices`)
      .then(res => res.json())
      .then(data => {
        console.log('Raw notices data from API:', data);
        // Sort notices by date (newest first) 
        const enhancedNotices = data.map((notice: Notice, index: number) => {
          console.log(`Notice ${index} raw category:`, notice.category);
          return {
            ...notice,
            createdAt: notice.createdAt || new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
            priority: notice.priority || 'medium',
            category: notice.category || 'General', // Provide fallback for undefined categories
            isUrgent: notice.isUrgent || false
          };
        });
        console.log('Enhanced notices:', enhancedNotices);
        enhancedNotices.sort((a: Notice, b: Notice) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
        setNotices(enhancedNotices);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      })
      .finally(() => setLoading(false));
  };

  // Get unique categories for filtering
  const categories = Array.from(new Set(notices.map(n => n.category))).filter(Boolean);
  const priorities = ['high', 'medium', 'low'];

  // Filter notices based on search and filters
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = !searchTerm || 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || notice.category === selectedCategory;
    const matchesPriority = !selectedPriority || notice.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Statistics
  const stats = {
    total: notices.length,
    urgent: notices.filter(n => n.isUrgent).length,
    high: notices.filter(n => n.priority === 'high').length,
    categories: categories.length
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return Image;
      case 'pdf':
        return FileText;
      default:
        return Download;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return formatDate(dateString);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-herocream via-white to-heroorange">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-navblue via-navblue/90 to-navorange text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-navorange rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-heroorange rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-navorange/60 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Bell className="h-5 w-5 mr-2 text-navorange" />
              <span className="text-sm font-medium">Official Announcements</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              School 
              <span className="bg-gradient-to-r from-navorange via-navorange to-heroorange bg-clip-text text-transparent"> Notices</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-white/90">
              Stay informed with the latest announcements, updates, and important information from our school administration.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: stats.total.toString(), label: 'Total Notices', icon: Bell },
                { number: stats.urgent.toString(), label: 'Urgent', icon: AlertCircle },
                { number: stats.high.toString(), label: 'High Priority', icon: Tag },
                { number: stats.categories.toString(), label: 'Categories', icon: Filter }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-2">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-red-400">{stat.number}</div>
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
                placeholder="Search notices by title or content..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600/60 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-3 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm appearance-none min-w-[150px]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600/60 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-3 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm appearance-none min-w-[150px]"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority} className="capitalize">{priority} Priority</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchNotices}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-slate-700 hover:to-blue-800"
              disabled={loading}
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notices Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {filteredNotices.length > 0 ? `${filteredNotices.length} Notice${filteredNotices.length !== 1 ? 's' : ''} Found` : 'No Notices Found'}
              </h2>
              <p className="text-slate-600/70">
                {selectedCategory && `Category: ${selectedCategory}`}
                {selectedPriority && ` • Priority: ${selectedPriority}`}
                {searchTerm && ` • Matching "${searchTerm}"`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 text-slate-700 animate-spin mx-auto mb-4" />
                <p className="text-slate-600/70 text-lg">Loading notices...</p>
              </div>
            </div>
          ) : filteredNotices.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-12 max-w-md mx-auto">
                <Bell className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No Notices Available</h3>
                <p className="text-slate-600/70 mb-6">
                  {searchTerm || selectedCategory || selectedPriority 
                    ? "No notices match your current filters. Try adjusting your search criteria."
                    : "No notices have been posted yet. Check back later for updates."
                  }
                </p>
                {(searchTerm || selectedCategory || selectedPriority) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setSelectedPriority('');
                    }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Clear Filters
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Notices List */
            <div className="space-y-6">
              {filteredNotices.map((notice, index) => {
                const FileIcon = getFileIcon(notice.fileType || 'none');
                return (
                  <div 
                    key={notice._id || index} 
                    className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden hover:border-red-200/50"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                    }}
                  >
                    {/* Notice Header */}
                    <div className="p-6 border-b border-slate-200/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {notice.isUrgent && (
                              <div className="inline-flex items-center bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                URGENT
                              </div>
                            )}
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(notice.priority || 'medium')}`}></div>
                            <span className="text-sm font-medium text-slate-600 capitalize">{notice.priority} Priority</span>
                            {notice.category && (
                              <div className="inline-flex items-center bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
                                <Tag className="h-3 w-3 mr-1" />
                                {notice.category}
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-red-600 transition-colors duration-300 mb-2">
                            {notice.title}
                          </h3>
                          <div className="flex items-center text-sm text-slate-500/70 gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {formatDate(notice.createdAt || new Date().toISOString())}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {getTimeAgo(notice.createdAt || new Date().toISOString())}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notice Content */}
                    <div className="p-6">
                      <div 
                        className="text-slate-700 leading-relaxed mb-6 prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: notice.content }}
                      />

                      {/* File Attachment */}
                      {notice.file && (
                        <div className="mt-6 border border-slate-200/50 rounded-xl overflow-hidden">
                          {notice.fileType === 'image' ? (
                            <div className="relative cursor-pointer" onClick={() => notice.file && handleImageClick(notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`)}>
                              <img 
                                src={notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`} 
                                alt="Notice attachment" 
                                className="w-full h-auto max-h-96 object-cover hover:opacity-90 transition-all duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                                  <Eye className="h-8 w-8 text-slate-700" />
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-slate-900/70 text-white px-2 py-1 rounded-lg text-sm">
                                Click to view full size
                              </div>
                            </div>
                          ) : notice.fileType === 'pdf' ? (
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-800">PDF Document</h4>
                                    <p className="text-sm text-slate-600">Click to view the attached document</p>
                                  </div>
                                </div>
                                <a 
                                  href={notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-4 py-2 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all duration-300"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View PDF
                                </a>
                              </div>
                            </div>
                          ) : notice.file ? (
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                                    <FileIcon className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-800">Attachment</h4>
                                    <p className="text-sm text-slate-600">Click to download the attachment</p>
                                  </div>
                                </div>
                                <a 
                                  href={notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-4 py-2 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-800 transition-all duration-300"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Need Help?</h3>
          <p className="text-slate-600/70 mb-6">
            Have questions about a notice or need assistance? Our support team is here to help you.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-slate-700 hover:to-blue-800">
            Contact Support
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button 
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 rounded-full p-2 z-10 transition-all duration-300"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Notice attachment - full size" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
