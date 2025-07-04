
import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';

import { API_BASE } from '../api';

type Faculty = {
  _id?: string;
  name: string;
  position: string;
  education: string;
  experience: string;
  specialties: string[];
  image?: string;
  bio: string;
  featured?: boolean;
};

const FacultyPage = () => {
  const stats = [
    { icon: Users, value: '85+', label: 'Faculty Members' },
    { icon: GraduationCap, value: '78%', label: 'Advanced Degrees' },
    { icon: Award, value: '15', label: 'Years Average Experience' },
    { icon: BookOpen, value: '12:1', label: 'Student-Teacher Ratio' }
  ];

  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/faculty`)
      .then(res => res.json())
      .then(setFaculty)
      .finally(() => setLoading(false));
  }, []);

  const departments = [
    {
      name: 'English & Literature',
      faculty: 12,
      description: 'Expert educators fostering critical thinking, communication skills, and love for literature.',
      highlight: 'Published authors and literary scholars'
    },
    {
      name: 'Mathematics',
      faculty: 10,
      description: 'Dedicated teachers building strong mathematical foundations and problem-solving abilities.',
      highlight: 'Competition coaches and STEM leaders'
    },
    {
      name: 'Science',
      faculty: 14,
      description: 'Research-experienced faculty inspiring scientific inquiry and discovery.',
      highlight: 'Research published in peer-reviewed journals'
    },
    {
      name: 'Social Studies',
      faculty: 9,
      description: 'Passionate historians and social scientists developing informed global citizens.',
      highlight: 'International experience and cultural expertise'
    },
    {
      name: 'World Languages',
      faculty: 8,
      description: 'Native and fluent speakers promoting multilingual competency and cultural awareness.',
      highlight: 'Native speakers from 6 different countries'
    },
    {
      name: 'Arts & Music',
      faculty: 11,
      description: 'Creative professionals nurturing artistic expression and aesthetic appreciation.',
      highlight: 'Professional artists and performers'
    },
    {
      name: 'Physical Education',
      faculty: 6,
      description: 'Certified coaches promoting fitness, teamwork, and healthy lifestyle habits.',
      highlight: 'Former athletes and certified trainers'
    },
    {
      name: 'Support Staff',
      faculty: 15,
      description: 'Counselors, librarians, and specialists supporting student success and wellbeing.',
      highlight: 'Licensed professionals with advanced degrees'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-herocream to-heroorange">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-herocream to-heroorange overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-navorange/5 via-transparent to-heroorange/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-navorange/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-navblue/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg)'
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-navblue/90 via-navblue/70 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight drop-shadow-2xl">
              <span className="text-white block mb-2">Meet Our</span>
              <span className="text-navorange bg-gradient-to-r from-navorange to-yellow-400 bg-clip-text text-transparent">
                Exceptional Faculty
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90 leading-relaxed">
              Our dedicated educators bring passion, expertise, and innovation to inspire 
              the next generation of leaders, thinkers, and changemakers.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Statistics */}
      <section className="py-16 bg-gradient-to-br from-white/50 to-herocream/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navblue mb-4">
              Faculty Excellence in Numbers
            </h2>
            <p className="text-lg text-navblue/80 max-w-2xl mx-auto">
              Our commitment to educational excellence is reflected in our outstanding faculty statistics
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-navorange/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:border-navorange/40">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-navorange to-yellow-400 rounded-full mb-4 group-hover:animate-pulse">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-navblue mb-2">{stat.value}</div>
                  <div className="text-navblue/80 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Faculty */}
      <section className="py-20 bg-gradient-to-br from-herocream to-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navblue mb-4">
              Featured Faculty
            </h2>
            <p className="text-xl text-navblue/80 max-w-3xl mx-auto">
              Meet our distinguished department heads and exemplary educators who lead 
              our academic programs with passion, innovation, and unwavering dedication.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navorange"></div>
            </div>
          ) : faculty.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-navblue/60 text-lg">No faculty members found.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faculty
                .filter(f => f.featured)
                .map((f, index) => {
                  const src = f.image && f.image.startsWith('http') ? f.image : f.image ? `${API_BASE.replace(/\/api$/, '')}${f.image}` : '';
                  return (
                    <div key={f._id || index} className="group relative">
                      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-navorange/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:border-navorange/40">
                        <div className="relative">
                          {src ? (
                            <img
                              src={src}
                              alt={f.name}
                              className="w-full h-64 object-cover"
                            />
                          ) : (
                            <div className="w-full h-64 bg-gradient-to-br from-navorange/20 to-navblue/20 flex items-center justify-center">
                              <Users className="h-20 w-20 text-navblue/40" />
                            </div>
                          )}
                          
                          {f.featured && (
                            <div className="absolute top-4 right-4">
                              <div className="bg-navorange text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                <Award className="h-3 w-3 mr-1" />
                                Featured
                              </div>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-navblue/20 to-transparent"></div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-heading font-bold text-navblue mb-2">
                            {f.name}
                          </h3>
                          <p className="text-navorange font-semibold mb-3">{f.position}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="text-sm text-navblue/70">
                              <span className="font-medium">Education:</span> {f.education}
                            </div>
                            <div className="text-sm text-navblue/70">
                              <span className="font-medium">Experience:</span> {f.experience}
                            </div>
                          </div>
                          
                          {f.specialties && f.specialties.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-navblue text-sm mb-2">Specialties:</h4>
                              <div className="flex flex-wrap gap-2">
                                {f.specialties.map((specialty, specialtyIndex) => (
                                  <span
                                    key={specialtyIndex}
                                    className="px-3 py-1 bg-gradient-to-r from-navorange/20 to-yellow-400/20 text-navblue text-xs rounded-full border border-navorange/30"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <p className="text-navblue/80 text-sm leading-relaxed">{f.bio}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      {/* Academic Departments */}
      <section className="py-20 bg-gradient-to-br from-white/80 to-herocream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navblue mb-4">
              Academic Departments
            </h2>
            <p className="text-xl text-navblue/80 max-w-3xl mx-auto">
              Explore our diverse academic departments, each led by experienced faculty 
              committed to excellence in their respective fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="group">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-navorange/20 p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:border-navorange/40">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-heading font-bold text-navblue">{dept.name}</h3>
                    <div className="bg-gradient-to-r from-navorange to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {dept.faculty} Faculty
                    </div>
                  </div>
                  
                  <p className="text-navblue/80 mb-4 leading-relaxed">{dept.description}</p>
                  
                  <div className="border-t border-navorange/20 pt-4">
                    <p className="text-sm text-navorange font-semibold">
                      ✨ {dept.highlight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="py-20 bg-gradient-to-br from-herocream to-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navblue mb-6">
                Professional Development
              </h2>
              <p className="text-lg text-navblue/80 mb-6">
                We invest in our faculty's continuous growth and development to ensure they 
                remain at the forefront of educational best practices and subject matter expertise.
              </p>
              <ul className="space-y-4">
                {[
                  'Annual professional development stipend for each faculty member',
                  'Regular workshops on innovative teaching methodologies',
                  'Collaboration with universities and research institutions',
                  'Mentorship programs for new and veteran teachers',
                  'Support for advanced degree and certification programs',
                  'Regular sabbatical opportunities for research and renewal'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-3 h-3 bg-gradient-to-r from-navorange to-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-navblue/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg"
                  alt="Professional Development"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navblue/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-lg p-4 rounded-xl">
                    <h3 className="font-heading font-bold text-navblue mb-2">Continuous Learning</h3>
                    <p className="text-sm text-navblue/80">
                      Our faculty engage in ongoing professional development to stay current with educational innovations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-20 bg-gradient-to-br from-white/50 to-herocream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navblue mb-4">
              Faculty Recognition & Achievement
            </h2>
            <p className="text-xl text-navblue/80 max-w-3xl mx-auto">
              Our faculty members are recognized leaders in their fields, regularly receiving 
              awards and honors for their teaching excellence and contributions to education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Teaching Excellence Awards',
                description: '12 faculty members recognized in the past 3 years',
                icon: Award,
                color: 'from-navorange to-yellow-400'
              },
              {
                title: 'Published Researchers',
                description: '25+ publications in academic journals and books',
                icon: BookOpen,
                color: 'from-navblue to-blue-600'
              },
              {
                title: 'National Board Certified',
                description: '45% of faculty hold National Board Certification',
                icon: GraduationCap,
                color: 'from-green-500 to-emerald-600'
              }
            ].map((achievement, index) => (
              <div key={index} className="group">
                <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-navorange/20 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:border-navorange/40">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-full mb-6 group-hover:animate-pulse`}>
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-navblue mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-navblue/80 leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-navblue to-navorange p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-heading font-bold mb-4">
                Join Our Teaching Excellence Community
              </h3>
              <p className="text-lg mb-6 text-white/90">
                We're always looking for passionate educators who share our commitment to student success and academic excellence.
              </p>
              <button className="bg-white text-navblue px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors duration-300">
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;