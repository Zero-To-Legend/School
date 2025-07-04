import { useState } from 'react';
import { BookOpen, FileText, HelpCircle, FolderOpen } from 'lucide-react';
import AssignmentsTab from '../pages/eLibrary/AssignmentsTab';
import NotesTab from '../pages/eLibrary/NotesTab';
import QuestionBankTab from '../pages/eLibrary/QuestionBankTab';
import DocumentsTab from '../pages/eLibrary/DocumentsTab';

const ELibrary = () => {
  const [activeTab, setActiveTab] = useState('assignments');

  const tabs = [
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'questions', label: 'Question Bank', icon: HelpCircle },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'assignments':
        return <AssignmentsTab />;
      case 'notes':
        return <NotesTab />;
      case 'questions':
        return <QuestionBankTab />;
      case 'documents':
        return <DocumentsTab />;
      default:
        return <AssignmentsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      {/* Header with subtle gradient background */}
      <div className="bg-gradient-to-r from-slate-700 via-gray-700 to-stone-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                <BookOpen className="h-12 w-12 text-slate-200" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-sm">
              eLibrary
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Access academic resources, assignments, and study materials
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-slate-200 text-sm">
                  📚 Your gateway to academic excellence
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="relative">
          <svg className="absolute bottom-0 left-0 w-full h-6 text-gradient-to-br from-slate-50 via-gray-50 to-stone-50 fill-current" viewBox="0 0 1440 54">
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,32C1248,32,1344,32,1392,32L1440,32L1440,54L1392,54C1344,54,1248,54,1152,54C1056,54,960,54,864,54C768,54,672,54,576,54C480,54,384,54,288,54C192,54,96,54,48,54L0,54Z"/>
          </svg>
        </div>
      </div>

      {/* Navigation Tabs with subtle styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-2">
          <nav className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-6 rounded-xl font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/80 hover:shadow-sm'
                  }`}
                >
                  <Icon className={`mr-2 h-5 w-5`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content with subtle container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 min-h-[600px]">
          {renderContent()}
        </div>
      </div>
      
      {/* Subtle decorative elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-slate-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed top-40 right-20 w-32 h-32 bg-gray-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="fixed bottom-20 left-1/4 w-24 h-24 bg-stone-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>
    </div>
  );
};

export default ELibrary;
