import React, { useState } from 'react';
import { BookOpen, Microscope, Palette, Calculator, Globe, Music, Users, Heart, Award, TrendingUp, Target, Star, ChevronRight, GraduationCap } from 'lucide-react';

const Academics = () => {
  const [activeTab, setActiveTab] = useState('departments');

  const departments = [
    {
      icon: BookOpen,
      name: 'English & Literature',
      description: 'Develop critical thinking and communication skills through comprehensive study of literature, writing, and language arts.',
      courses: ['Creative Writing', 'World Literature', 'Advanced Composition', 'Public Speaking'],
      highlights: 'Award-winning debate team',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Calculator,
      name: 'Mathematics',
      description: 'Build strong mathematical foundations from algebra through calculus, with emphasis on problem-solving and logical reasoning.',
      courses: ['Algebra II', 'Geometry', 'Pre-Calculus', 'AP Calculus', 'Statistics'],
      highlights: '98% AP pass rate',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Microscope,
      name: 'Science',
      description: 'Explore the natural world through hands-on laboratory experiences and cutting-edge scientific inquiry.',
      courses: ['Biology', 'Chemistry', 'Physics', 'Environmental Science', 'AP Sciences'],
      highlights: 'State-of-the-art labs',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Globe,
      name: 'Social Studies',
      description: 'Understand historical contexts, cultural perspectives, and contemporary global issues to become informed citizens.',
      courses: ['World History', 'US History', 'Government', 'Economics', 'Psychology'],
      highlights: 'Model UN champions',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Palette,
      name: 'Arts',
      description: 'Express creativity and develop artistic skills through visual arts, performing arts, and digital media programs.',
      courses: ['Studio Art', 'Digital Design', 'Photography', 'Ceramics', 'Art History'],
      highlights: 'Professional gallery exhibitions',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Music,
      name: 'Music & Performing Arts',
      description: 'Cultivate musical talents and performance skills through individual instruction and ensemble participation.',
      courses: ['Concert Band', 'Jazz Ensemble', 'Choir', 'Music Theory', 'Musical Theater'],
      highlights: 'Regional competition winners',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const programs = [
    {
      title: 'Advanced Placement (AP)',
      description: 'Rigorous college-level courses that prepare students for AP examinations and college success.',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg',
      features: ['25+ AP courses offered', 'Experienced AP instructors', 'College credit opportunities', '90% pass rate on AP exams'],
      badge: 'College Prep',
      color: 'bg-blue-500'
    },
    {
      title: 'International Baccalaureate (IB)',
      description: 'Globally recognized program that develops internationally minded students with critical thinking skills.',
      image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
      features: ['Full IB Diploma Programme', 'Theory of Knowledge (TOK)', 'Extended Essay project', 'Creativity, Activity, Service (CAS)'],
      badge: 'Global Standard',
      color: 'bg-green-500'
    },
    {
      title: 'STEM Innovation Lab',
      description: 'State-of-the-art facilities for hands-on learning in science, technology, engineering, and mathematics.',
      image: 'https://images.pexels.com/photos/8471780/pexels-photo-8471780.jpeg',
      features: ['3D printing and robotics', 'Computer programming', 'Engineering design', 'Scientific research projects'],
      badge: 'Innovation Hub',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-herocream via-white to-heroorange">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-navblue via-navblue/90 to-navorange text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-navorange rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <GraduationCap className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Academic Excellence Since 1985</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Academic 
              <span className="bg-gradient-to-r from-kecorange to-yellow-400 bg-clip-text text-transparent"> Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-white/90">
              Challenging curriculum, innovative programs, and dedicated faculty create an 
              environment where students thrive academically and develop a lifelong love of learning.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '25+', label: 'AP Courses' },
                { number: '3.7', label: 'Avg GPA' },
                { number: '98%', label: 'College Rate' },
                { number: '1,485', label: 'Avg SAT' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
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
          <div className="flex justify-center space-x-8">
            {[
              { id: 'departments', label: 'Departments', icon: BookOpen },
              { id: 'programs', label: 'Special Programs', icon: Star },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'support', label: 'Support', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
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

      {/* Academic Departments */}
      {activeTab === 'departments' && (
        <section className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-kecorange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-kecblue/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">Academic Departments</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-kecblue/80 max-w-4xl mx-auto leading-relaxed">
                Our comprehensive curriculum covers all essential subjects with depth and rigor, 
                preparing students for success in higher education and beyond.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <dept.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="bg-kecorange/20 text-kecorange text-xs px-3 py-1 rounded-full font-medium">
                        {dept.highlights}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-kecblue mb-4 group-hover:text-kecorange transition-colors duration-300">
                      {dept.name}
                    </h3>
                    <p className="text-kecblue/70 mb-6 leading-relaxed">{dept.description}</p>
                    
                    {/* Courses */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-kecblue text-sm uppercase tracking-wide">Sample Courses:</h4>
                      <div className="space-y-2">
                        {dept.courses.map((course, courseIndex) => (
                          <div key={courseIndex} className="flex items-center group-hover:translate-x-2 transition-transform duration-300">
                            <div className={`w-2 h-2 bg-gradient-to-r ${dept.color} rounded-full mr-3`}></div>
                            <span className="text-sm text-kecblue/80 font-medium">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Explore Button */}
                    <div className="mt-6 pt-6 border-t border-kecblue/10">
                      <button className="inline-flex items-center text-kecblue hover:text-kecorange font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
                        Explore Curriculum
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Programs */}
      {activeTab === 'programs' && (
        <section className="py-24 bg-gradient-to-br from-keccream via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-40 left-10 w-72 h-72 bg-kecorange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-kecblue/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">Special Programs</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-kecblue/80 max-w-4xl mx-auto leading-relaxed">
                Unique opportunities that challenge students to excel and prepare them for 
                college and career success in the 21st century.
              </p>
            </div>

            <div className="space-y-20">
              {programs.map((program, index) => (
                <div 
                  key={index} 
                  className={`group flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.2 + 0.3}s both`
                  }}
                >
                  <div className="lg:w-1/2">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className={`absolute top-4 left-4 ${program.color} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                        {program.badge}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-500">
                      <h3 className="text-3xl md:text-4xl font-bold text-kecblue mb-6 group-hover:text-kecorange transition-colors duration-300">
                        {program.title}
                      </h3>
                      <p className="text-lg text-kecblue/80 mb-8 leading-relaxed">{program.description}</p>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-kecblue text-sm uppercase tracking-wide">Program Highlights:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {program.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center group-hover:translate-x-2 transition-transform duration-300">
                              <div className="w-3 h-3 bg-gradient-to-r from-kecorange to-kecblue rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-sm text-kecblue/80 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-kecblue/10">
                        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-kecblue to-kecorange text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                          Learn More
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Academic Achievements */}
      {activeTab === 'achievements' && (
        <section className="py-24 bg-gradient-to-br from-kecblue via-kecblue/90 to-kecorange text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-kecorange rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Academic Achievements</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-yellow-400 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Our commitment to excellence is reflected in our students' outstanding academic performance and recognition.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { stat: '3.7', label: 'Average GPA', description: 'Class of 2024', icon: TrendingUp },
                { stat: '1,485', label: 'Average SAT Score', description: 'Above national average', icon: Target },
                { stat: '98%', label: 'College Acceptance', description: 'Four-year universities', icon: GraduationCap },
                { stat: '87%', label: 'Honor Roll', description: 'High achieving students', icon: Award }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-kecorange rounded-2xl mb-4">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-kecorange mb-2">{item.stat}</div>
                  <div className="text-lg font-semibold text-white mb-1">{item.label}</div>
                  <div className="text-sm text-white/80">{item.description}</div>
                </div>
              ))}
            </div>

            {/* Awards and Recognition */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'National Merit Scholars',
                  count: '12',
                  year: '2024',
                  description: 'Students recognized for academic excellence'
                },
                {
                  title: 'AP Scholar Awards',
                  count: '45',
                  year: '2024',
                  description: 'Students achieving high AP exam scores'
                },
                {
                  title: 'Science Fair Winners',
                  count: '8',
                  year: '2024',
                  description: 'State and regional competition winners'
                },
                {
                  title: 'Academic All-State',
                  count: '15',
                  year: '2024',
                  description: 'Student-athletes excelling academically'
                },
                {
                  title: 'Math Competition',
                  count: '3rd',
                  year: '2024',
                  description: 'Regional mathematics competition ranking'
                },
                {
                  title: 'Debate Championships',
                  count: '1st',
                  year: '2024',
                  description: 'State debate tournament champions'
                }
              ].map((award, index) => (
                <div 
                  key={index} 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.4}s both`
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-kecorange">{award.count}</div>
                    <div className="text-sm text-white/80">{award.year}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                  <p className="text-white/80">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Academic Support */}
      {activeTab === 'support' && (
        <section className="py-24 bg-gradient-to-br from-keccream via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-kecorange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-kecblue/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">Academic Support</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-kecblue/80 max-w-4xl mx-auto leading-relaxed">
                We provide comprehensive support services to ensure every student can achieve their academic potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Tutoring Center',
                  description: 'Free peer and teacher tutoring available in all subjects during and after school hours.',
                  icon: BookOpen,
                  features: ['One-on-one tutoring', 'Group study sessions', 'Homework help', 'Test preparation'],
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Academic Counseling',
                  description: 'Personalized guidance for course selection, college planning, and academic goal setting.',
                  icon: Users,
                  features: ['Course planning', 'College prep', 'Career guidance', 'Study skills training'],
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: 'Learning Support',
                  description: 'Specialized programs for students with diverse learning needs and accommodations.',
                  icon: Heart,
                  features: ['IEP support', 'Accommodations', 'Learning strategies', 'Assistive technology'],
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  title: 'Writing Center',
                  description: 'Dedicated support for improving writing skills across all subjects and grade levels.',
                  icon: BookOpen,
                  features: ['Essay writing', 'Research papers', 'Creative writing', 'Grammar support'],
                  color: 'from-orange-500 to-orange-600'
                },
                {
                  title: 'Study Skills Workshop',
                  description: 'Interactive workshops teaching effective study techniques and time management.',
                  icon: Target,
                  features: ['Note-taking strategies', 'Time management', 'Test strategies', 'Organization skills'],
                  color: 'from-pink-500 to-pink-600'
                },
                {
                  title: 'Peer Mentoring',
                  description: 'Upper-class students provide guidance and support to younger peers.',
                  icon: Users,
                  features: ['Academic mentoring', 'Social support', 'Leadership development', 'Peer tutoring'],
                  color: 'from-indigo-500 to-indigo-600'
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-kecblue mb-4 group-hover:text-kecorange transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-kecblue/70 mb-6 leading-relaxed">{service.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-kecblue text-sm uppercase tracking-wide">Key Features:</h4>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center group-hover:translate-x-2 transition-transform duration-300">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                            <span className="text-sm text-kecblue/80 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-kecblue to-kecorange text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Excel?</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Join our academic community and discover the possibilities that await you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-kecblue font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View Course Catalog
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-kecblue transition-all duration-300 transform hover:scale-105">
              Schedule a Tour
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;