import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Bell, Download, Eye, Calendar, FileText, Image, File } from 'lucide-react';
import { API_BASE } from '../api';

type Notice = {
  _id?: string;
  title: string;
  content: string;
  showPopup?: boolean;
  file?: string;
  fileType?: 'image' | 'pdf' | 'document' | 'none';
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  isUrgent?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const NoticePopup = ({ notice, onClose }: { notice: Notice; onClose: () => void }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-red-600';
      case 'medium':
        return 'from-navorange to-yellow-500';
      case 'low':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-navblue to-blue-600';
    }
  };

  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'document':
        return <File className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative mx-4 border border-navorange/20 transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-navblue to-navorange p-6 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-navblue/90 to-navorange/90"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-lg rounded-full p-3">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-1">
                    {notice.isUrgent ? '🚨 Urgent Notice' : 'Notice'}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    {notice.createdAt && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(notice.createdAt)}</span>
                      </div>
                    )}
                    {notice.category && (
                      <div className="bg-white/20 px-2 py-1 rounded-full text-xs">
                        {notice.category}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Priority Badge - alternative position in top-right */}
                {notice.priority && (
                  <div className={`bg-gradient-to-r ${getPriorityColor(notice.priority)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                    {notice.priority.toUpperCase()} PRIORITY
                  </div>
                )}
                <button
                  onClick={handleClose}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {notice ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-navblue mb-4 leading-tight">
                  {notice.title}
                </h3>
                <div 
                  className="text-navblue/80 leading-relaxed prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: notice.content }} 
                />
              </div>

              {/* File Attachment */}
              {notice.file && (
                <div className="bg-gradient-to-r from-herocream/50 to-white rounded-2xl p-6 border border-navorange/20">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-gradient-to-r from-navorange to-yellow-400 text-white rounded-full p-2">
                      {getFileIcon(notice.fileType)}
                    </div>
                    <h4 className="font-heading font-bold text-navblue">Attachment</h4>
                  </div>
                  
                  {notice.fileType === 'image' ? (
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src={notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`} 
                        alt="Notice attachment" 
                        className="w-full h-auto max-h-96 object-cover"
                      />
                    </div>
                  ) : notice.fileType === 'pdf' ? (
                    <div className="relative">
                      <iframe
                        src={notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`}
                        className="w-full h-96 rounded-xl border border-navorange/20"
                        title="PDF Preview"
                      />
                      <div className="absolute top-2 right-2">
                        <a 
                          href={notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/90 backdrop-blur-lg text-navblue px-3 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Full</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-navorange/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-navblue to-navorange text-white rounded-full p-2">
                            <Download className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-navblue">Document Available</div>
                            <div className="text-sm text-navblue/70">Click to download</div>
                          </div>
                        </div>
                        <a 
                          href={notice.file.startsWith('http') ? notice.file : `http://localhost:5001${notice.file}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-navorange to-yellow-400 text-white px-4 py-2 rounded-full font-medium hover:from-navorange/90 hover:to-yellow-400/90 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-navblue/20 to-navorange/20 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Bell className="h-12 w-12 text-navblue/60" />
              </div>
              <div className="text-navblue/60 text-lg">No notice available</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-herocream/50 to-white border-t border-navorange/20 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <Link 
              to="/notice" 
              className="text-navblue hover:text-navorange transition-colors duration-200 flex items-center space-x-2 font-medium"
            >
              <Eye className="h-4 w-4" />
              <span>View all notices</span>
            </Link>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-navblue to-navorange text-white px-6 py-3 rounded-full font-medium hover:from-navblue/90 hover:to-navorange/90 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NoticePopupWrapper() {
  const [show, setShow] = useState(true);
  const [popupNotice, setPopupNotice] = useState<Notice | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/notices`)
      .then(res => res.json())
      .then((notices: Notice[]) => {
        // Find the notice with showPopup true, or the latest notice
        const popup = notices.find(n => n.showPopup) || (notices.length > 0 ? notices[notices.length - 1] : null);
        setPopupNotice(popup);
      });
  }, []);

  return show && popupNotice ? <NoticePopup notice={popupNotice} onClose={() => setShow(false)} /> : null;
}
