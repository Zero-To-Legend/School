import React, { useState } from 'react';
import { FileText, Calendar, DollarSign, CheckCircle, Users, Clock, Phone, Mail, MapPin, Award, GraduationCap, Star, ChevronRight, Heart, TrendingUp, Target, BookOpen } from 'lucide-react';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('process');

  const steps = [
    {
      icon: FileText,
      title: 'Submit Application',
      description: 'Complete our online application form with student information and academic history.',
      details: ['Personal information', 'Academic history', 'Extracurricular activities', 'Essays and statements']
    },
    {
      icon: BookOpen,
      title: 'Submit Documents',
      description: 'Provide transcripts, recommendation letters, and standardized test scores.',
      details: ['Official transcripts', 'Recommendation letters', 'Test scores', 'Portfolio (if applicable)']
    },
    {
      icon: Users,
      title: 'Interview & Visit',
      description: 'Schedule a campus visit and student interview with our admissions team.',
      details: ['Campus tour', 'Student interview', 'Parent meeting', 'Shadow day option']
    },
    {
      icon: CheckCircle,
      title: 'Admission Decision',
      description: 'Receive your admission decision and enrollment information.',
      details: ['Decision notification', 'Enrollment packet', 'Financial aid award', 'Deposit deadline']
    }
  ];

  const requirements = [
    {
      category: 'Academic',
      items: [
        'Completed application form',
        'Official transcripts from current/previous schools',
        'Standardized test scores (SSAT, PSAT, SAT, or ACT)',
        'Two letters of recommendation (academic and personal)'
      ]
    },
    {
      category: 'Personal',
      items: [
        'Personal essay or statement',
        'Extracurricular activities resume',
        'Interview with admissions committee',
        'Character reference'
      ]
    },
    {
      category: 'Administrative',
      items: [
        'Application fee ($100, waived for qualifying families)',
        'Immunization records',
        'Birth certificate or passport',
        'Photo for student ID'
      ]
    }
  ];

  const dates = [
    { event: 'Application Opens', date: 'September 1, 2024', status: 'completed' },
    { event: 'Campus Tours Begin', date: 'October 15, 2024', status: 'completed' },
    { event: 'Early Decision Deadline', date: 'December 1, 2024', status: 'upcoming' },
    { event: 'Regular Decision Deadline', date: 'February 1, 2025', status: 'upcoming' },
    { event: 'Admission Decisions Released', date: 'March 15, 2025', status: 'future' },
    { event: 'Enrollment Deposit Due', date: 'April 15, 2025', status: 'future' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-keccream via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-kecblue via-kecblue/90 to-kecorange text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-kecorange rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <GraduationCap className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Join Our Community</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Start Your 
              <span className="bg-gradient-to-r from-kecorange to-yellow-400 bg-clip-text text-transparent"> Journey</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-white/90">
              Join our community of learners and embark on a journey of academic excellence, 
              personal growth, and lifelong friendships.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '95%', label: 'Acceptance Rate', icon: TrendingUp },
                { number: '18:1', label: 'Student-Teacher Ratio', icon: Users },
                { number: '$2.8M', label: 'Financial Aid', icon: DollarSign },
                { number: '98%', label: 'College Bound', icon: Target }
              ].map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-kecorange rounded-full mb-2">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-kecorange">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-kecblue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 overflow-x-auto">
            {[
              { id: 'process', label: 'Application Process', icon: FileText },
              { id: 'requirements', label: 'Requirements', icon: CheckCircle },
              { id: 'dates', label: 'Important Dates', icon: Calendar },
              { id: 'tuition', label: 'Tuition & Aid', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-kecblue text-white shadow-lg'
                    : 'text-kecblue hover:bg-kecblue/10'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      {activeTab === 'process' && (
        <section className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-kecorange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-kecblue/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">Application Process</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-kecblue/80 max-w-4xl mx-auto leading-relaxed">
                Our straightforward application process is designed to help us get to know you 
                and your academic goals while making the experience as smooth as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-kecblue to-kecorange text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="relative p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kecblue to-kecorange rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-kecblue mb-4 group-hover:text-kecorange transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-kecblue/70 mb-6 leading-relaxed">{step.description}</p>
                    
                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-sm text-kecblue/80">
                          <div className="w-2 h-2 bg-gradient-to-r from-kecorange to-kecblue rounded-full mr-3"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-16">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-kecblue to-kecorange text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Start Your Application
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
      {activeTab === 'requirements' && (
        <section className="py-24 bg-gradient-to-br from-keccream via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-40 left-10 w-72 h-72 bg-kecorange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-kecblue/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">Admission Requirements</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-kecblue/80 max-w-4xl mx-auto leading-relaxed">
                We seek students who demonstrate academic potential, character, and a commitment 
                to contributing positively to our school community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {requirements.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-4 h-4 bg-gradient-to-r from-kecorange to-kecblue rounded-full mr-3"></div>
                      <h3 className="text-2xl font-bold text-kecblue">{category.category}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-kecorange mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-kecblue/80 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Calendar, title: 'Application Deadline', value: 'February 1, 2025' },
                  { icon: DollarSign, title: 'Application Fee', value: '$100 (waivers available)' },
                  { icon: Users, title: 'Class Size', value: 'Average 18 students' },
                  { icon: Clock, title: 'Decision Timeline', value: 'March 15, 2025' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kecblue to-kecorange rounded-2xl shadow-lg mb-4">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-kecblue mb-2">{item.title}</h4>
                    <p className="text-kecblue/70">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Important Dates */}
      {activeTab === 'dates' && (
        <section className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-kecorange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-kecblue/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">Important Dates</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-kecblue/80 max-w-4xl mx-auto leading-relaxed">
                Stay on track with key deadlines and milestones in the admission process.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {dates.map((item, index) => (
                  <div 
                    key={index} 
                    className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden ${
                      item.status === 'upcoming' ? 'ring-2 ring-kecorange' : ''
                    }`}
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                    }}
                  >
                    <div className="p-8 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-4 ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'upcoming' ? 'bg-kecorange animate-pulse' :
                          'bg-gray-300'
                        }`}></div>
                        <div>
                          <h3 className="text-xl font-bold text-kecblue group-hover:text-kecorange transition-colors duration-300">
                            {item.event}
                          </h3>
                          <p className="text-kecblue/70 capitalize">{item.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-kecblue">{item.date}</div>
                        {item.status === 'upcoming' && (
                          <div className="inline-flex items-center bg-kecorange/20 text-kecorange text-xs px-3 py-1 rounded-full font-medium mt-1">
                            Action Required
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tuition & Financial Aid */}
      {activeTab === 'tuition' && (
        <section className="py-24 bg-gradient-to-br from-keccream via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-40 left-10 w-72 h-72 bg-kecorange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-kecblue/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">Tuition & Financial Aid</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-kecblue/80 max-w-4xl mx-auto leading-relaxed">
                We believe that a quality education should be accessible to qualified students 
                regardless of their family's financial circumstances.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Tuition */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-kecblue to-kecorange rounded-2xl flex items-center justify-center mr-4">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-kecblue">2024-2025 Tuition</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { grade: 'Grades K-5', amount: '$18,500' },
                      { grade: 'Grades 6-8', amount: '$22,500' },
                      { grade: 'Grades 9-12', amount: '$28,500' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-4 border-b border-kecblue/10">
                        <span className="text-lg font-semibold text-kecblue">{item.grade}</span>
                        <span className="text-2xl font-bold text-kecorange">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-kecblue/10 rounded-xl">
                    <p className="text-sm text-kecblue/80">
                      Tuition includes textbooks, technology, and most activities. Additional fees may apply for some programs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Aid */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-kecorange to-kecblue rounded-2xl flex items-center justify-center mr-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-kecblue">Financial Aid</h3>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-kecorange mb-2">$2.8M</div>
                    <p className="text-kecblue/70">Annual financial aid awarded to families</p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      'Need-based financial aid available',
                      'Merit scholarships for exceptional students',
                      'Flexible payment plans available',
                      '40% of students receive financial assistance'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-kecorange mr-3 flex-shrink-0" />
                        <span className="text-kecblue/80">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-kecblue/10">
                    <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-kecorange to-kecblue text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      Apply for Financial Aid
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact & Support */}
      <section className="py-24 bg-gradient-to-br from-kecblue via-kecblue/90 to-kecorange text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-kecorange rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our admissions team is here to support you throughout the application process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Phone, title: 'Call Us', value: '(555) 123-4567', action: 'Call Now' },
              { icon: Mail, title: 'Email Us', value: 'admissions@kecschool.edu', action: 'Send Email' },
              { icon: MapPin, title: 'Visit Us', value: '123 Education Drive, Learning City', action: 'Get Directions' }
            ].map((contact, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kecorange rounded-2xl mb-4">
                  <contact.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                <p className="text-white/80 mb-4">{contact.value}</p>
                <button className="text-kecorange font-semibold hover:text-white transition-colors duration-300">
                  {contact.action}
                </button>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Begin?</h3>
            <p className="text-xl mb-8 text-white/90">
              Take the first step towards joining our exceptional community of learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-white text-kecblue font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Application
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-kecblue transition-all duration-300 transform hover:scale-105">
                Schedule Visit
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;