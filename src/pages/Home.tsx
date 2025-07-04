import React, { useEffect, useState } from 'react';
import { ArrowRight, Users, BookOpen, Award, Globe, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../api';

// Animated count-up hook
function useCountUp(to: number, duration = 1200, start = 0) {
  const [value, setValue] = React.useState(start);
  React.useEffect(() => {
    let startTimestamp: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * (to - start) + start));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(to);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, start]);
  return value;
}

// Types
type Feature = {
  _id?: string;
  title: string;
  description: string;
  image: string;
};

type NewsItem = {
  _id?: string;
  title: string;
  excerpt?: string;
  content: string;
  image?: string;
  date?: string;
  author?: string;
  category?: string;
};
// --- Student Testimonials Types ---
type Testimonial = {
  _id?: string;
  quote: string;
  name: string;
  designation: string;
  image?: string;
};

const Home = () => {
  // Back to top button state
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Modal state for news articles
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Open article modal
  const openArticleModal = (article: NewsItem) => {
    console.log('Opening article:', article); // Debug log
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  // Close article modal
  const closeArticleModal = () => {
    console.log('Closing modal'); // Debug log
    setIsModalOpen(false);
    setSelectedArticle(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeArticleModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // --- Student Testimonials State (Featured only for home page) ---
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    fetch(`${API_BASE}/testimonials/featured`)
      .then(res => res.json())
      .then(setTestimonials);
  }, []);
  const stats = [
    { icon: Users, value: '2,500+', label: 'Students' },
    { icon: BookOpen, value: '150+', label: 'Courses' },
    { icon: Award, value: '95%', label: 'Success Rate' },
    { icon: Globe, value: '40+', label: 'Countries' },
  ];

  // Features (Why Choose Our School?) from backend
  const [features, setFeatures] = useState<Feature[]>([]);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  useEffect(() => {
    setFeaturesLoading(true);
    fetch(`${API_BASE}/features`)
      .then(res => res.json())
      .then(data => setFeatures(Array.isArray(data) ? data : []))
      .finally(() => setFeaturesLoading(false));
  }, []);

  // --- Latest News from Backend ---
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  useEffect(() => {
    setNewsLoading(true);
    fetch(`${API_BASE}/news?limit=3`)
      .then(res => res.json())
      .then((data) => setNews(Array.isArray(data) ? data : []))
      .finally(() => setNewsLoading(false));
  }, []);


  // --- HOMEPAGE HERO DATA ---
  const [hero, setHero] = useState({
    image: '',
    welcome: '',
    title: '',
    subtitle: '',
    subtitles: [] as string[], // Array of subtitles
    description: ''
  });
  const [heroLoading, setHeroLoading] = useState(true);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Subtitle carousel effect - continuous without pause
  useEffect(() => {
    if (hero.subtitles.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSubtitleIndex((prevIndex) => 
            (prevIndex + 1) % hero.subtitles.length
          );
          setIsTransitioning(false);
        }, 400); // Transition duration
      }, 4000); // Change subtitle every 4 seconds

      return () => clearInterval(interval);
    }
  }, [hero.subtitles.length]);

  useEffect(() => {
    setHeroLoading(true);
    fetch(`${API_BASE}/hero`)
      .then(res => res.json())
      .then(data => {
        // Enhanced subtitle parsing - handles multiple formats
        let subtitlesArray: string[] = [];
        if (data.subtitle) {
          // Split by semicolon, pipe, or line breaks and clean up
          subtitlesArray = data.subtitle
            .split(/[;\|\n\r]+/)
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0);
        }
        
        setHero({
          image: data.image || '',
          welcome: data.welcome || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          subtitles: subtitlesArray,
          description: data.description || ''
        });
      })
      .catch(error => {
        console.error('Error fetching hero data:', error);
        // Fallback subtitles for demo
        setHero(prev => ({
          ...prev,
          subtitles: ['Excellence in Education', 'Empowering Future Leaders', 'Building Tomorrow Today']
        }));
      })
      .finally(() => setHeroLoading(false));
  }, []);

  // Features Section Settings
  const [featuresSection, setFeaturesSection] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [featuresSectionLoading, setFeaturesSectionLoading] = useState(true);
  useEffect(() => {
    setFeaturesSectionLoading(true);
    fetch(`${API_BASE}/features-section`)
      .then(res => res.json())
      .then(data => {
        setFeaturesSection({
          title: data.title || '',
          description: data.description || '',
          image: data.image || ''
        });
      })
      .finally(() => setFeaturesSectionLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-herocream to-heroorange">
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-herocream to-heroorange text-navblue overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-navorange/5 via-transparent to-heroorange/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-navorange/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-navblue/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-navorange rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-navblue rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-navorange rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        </div>
        
        <div
          className="relative min-h-screen flex items-center bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: (hero.image && hero.image.trim())
              ? `url(${hero.image.startsWith('http') ? hero.image : API_BASE.replace(/\/api$/, '') + hero.image})`
              : 'url(https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navblue/90 via-navblue/70 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-20">
            <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h1 className="text-4xl md:text-7xl font-heading font-extrabold mb-6 leading-tight drop-shadow-2xl">
                {heroLoading ? (
                  <div className="space-y-4">
                    <div className="h-12 bg-white/20 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-white/20 rounded-lg animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    {hero.welcome && (
                      <span className="text-white block mb-4 text-xl md:text-3xl font-medium">
                        {hero.welcome}
                      </span>
                    )}
                    <span className="text-navorange bg-gradient-to-r from-navorange to-yellow-400 bg-clip-text text-transparent">
                      {hero.title || 'Welcome to Excellence'}
                    </span>
                  </>
                )}
              </h1>
              {/* Dynamic Subtitle Carousel */}
              {hero.subtitles.length > 0 && (
                <div className="relative h-16 md:h-20 mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {hero.subtitles.map((subtitle, index) => (
                      <h2
                        key={index}
                        className={`absolute text-2xl md:text-4xl font-semibold text-white/90 text-center transition-all duration-700 ease-in-out transform px-4 max-w-4xl ${
                          index === currentSubtitleIndex
                            ? isTransitioning
                              ? 'opacity-0 translate-y-6 scale-95'
                              : 'opacity-100 translate-y-0 scale-100'
                            : index === (currentSubtitleIndex - 1 + hero.subtitles.length) % hero.subtitles.length
                            ? 'opacity-0 -translate-y-6 scale-105'
                            : 'opacity-0 translate-y-8 scale-90'
                        }`}
                        style={{
                          transitionDelay: isTransitioning ? '0ms' : '200ms'
                        }}
                      >
                        {subtitle.trim()}
                      </h2>
                    ))}
                  </div>
                  
                  {/* Animated Subtitle Indicators */}
                  {hero.subtitles.length > 1 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      {hero.subtitles.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            index === currentSubtitleIndex
                              ? 'w-8 bg-navorange'
                              : 'w-2 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Continuous Progress Bar */}
                  {hero.subtitles.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-navorange to-yellow-400 rounded-full transition-all duration-100 ease-linear"
                        style={{
                          width: `${((Date.now() % 4000) / 4000) * 100}%`,
                          animation: 'progressBarContinuous 4s linear infinite',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Fallback for single subtitle or loading */}
              {hero.subtitles.length === 0 && hero.subtitle && (
                <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white/90">
                  {hero.subtitle}
                </h2>
              )}
              <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed text-white/90">
                {heroLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded animate-pulse w-3/4 mx-auto"></div>
                  </div>
                ) : (
                  hero.description || 'Inspired by KEC, we offer a modern, beautiful, and animated experience for students and staff.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/admissions"
                  className="group relative inline-flex items-center bg-navorange hover:bg-navorange/90 text-white border-2 border-navorange px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
                <Link
                  to="/about"
                  className="group inline-flex items-center bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-white/70 text-sm mt-2 text-center">Scroll to explore</p>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-gradient-to-br from-keccream via-white to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-20 h-20 bg-kecorange/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-kecblue/20 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-kecblue mb-4">
              Our Achievement in Numbers
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const num = parseInt((stat.value + '').replace(/[^\d]/g, ''));
              const isPercent = (stat.value + '').includes('%');
              const count = useCountUp(num, 1500 + index * 200);
              
              return (
                <div 
                  key={index} 
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-500"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.2 + 0.3}s both`
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-kecorange/20 to-kecblue/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-kecorange/20 to-kecblue/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-kecblue group-hover:text-kecorange transition-colors duration-300" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-kecblue mb-2 group-hover:text-kecorange transition-colors duration-300">
                      {count.toLocaleString()}{isPercent ? '%' : '+'}
                    </div>
                    <div className="text-kecblue/70 font-medium text-lg">{stat.label}</div>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-kecorange/30 transition-all duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - KEC Inspired, with static highlights and CMS features */}
      <section id="features" className="relative py-24 bg-gradient-to-br from-blue-50 via-keccream to-purple-50 overflow-hidden">
        {/* Decorative Accent Circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-kecorange/10 rounded-full blur-3xl animate-pulse z-0"></div>
        <div className="absolute -bottom-24 right-0 w-96 h-96 bg-kecblue/10 rounded-full blur-3xl animate-pulse z-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 animate__animated animate__fadeInDown tracking-tight">
              <span className="text-kecblue">WHY to choose our </span>
              <span className="text-kecorange">School?</span>
            </h2>
            <div className="flex justify-center mb-6">
              <span className="inline-block w-24 h-1 rounded-full bg-kecorange/80 animate__animated animate__fadeInLeft"></span>
            </div>
            <p className="text-xl md:text-2xl text-kecblue/70 max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
              {featuresSectionLoading ? '' : featuresSection.description || 'We provide an exceptional educational experience that prepares students for success in college, career, and life.'}
            </p>
          </div>
          {/* 6 Highlight Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            <div className="bg-white/95 rounded-3xl shadow-xl border border-kecblue/10 p-8 flex flex-col items-center text-center animate__animated animate__fadeInUp">
              <span className="text-kecorange text-3xl font-bold mb-2">Qualified Faculty & Staff</span>
              <p className="text-kecblue/80">Our school provides services through full time faculty and staff. Most have 10+ years experience and many have international exposure.</p>
            </div>
            <div className="bg-white/95 rounded-3xl shadow-xl border border-kecblue/10 p-8 flex flex-col items-center text-center animate__animated animate__fadeInUp animate__delay-1s">
              <span className="text-kecorange text-3xl font-bold mb-2">Strong Alumni Network</span>
              <p className="text-kecblue/80">Outstanding graduates with a strong alumni network excelling in Nepal and abroad.</p>
            </div>
            <div className="bg-white/95 rounded-3xl shadow-xl border border-kecblue/10 p-8 flex flex-col items-center text-center animate__animated animate__fadeInUp animate__delay-2s">
              <span className="text-kecorange text-3xl font-bold mb-2">International Linkage</span>
              <p className="text-kecblue/80">Collaborations with 50+ Asian/European universities, scholarships, and active international projects and conferences.</p>
            </div>
            <div className="bg-white/95 rounded-3xl shadow-xl border border-kecblue/10 p-8 flex flex-col items-center text-center animate__animated animate__fadeInUp animate__delay-3s">
              <span className="text-kecorange text-3xl font-bold mb-2">Safe Campus & Infrastructure</span>
              <p className="text-kecblue/80">Located in a peaceful, green environment with dedicated academic buildings and high safety standards.</p>
            </div>
            <div className="bg-white/95 rounded-3xl shadow-xl border border-kecblue/10 p-8 flex flex-col items-center text-center animate__animated animate__fadeInUp animate__delay-4s">
              <span className="text-kecorange text-3xl font-bold mb-2">Labs & Library</span>
              <p className="text-kecblue/80">Well-equipped labs, 50,000+ books, eLibrary, and free textbooks each semester for students.</p>
            </div>
            <div className="bg-white/95 rounded-3xl shadow-xl border border-kecblue/10 p-8 flex flex-col items-center text-center animate__animated animate__fadeInUp animate__delay-5s">
              <span className="text-kecorange text-3xl font-bold mb-2">Student Support</span>
              <p className="text-kecblue/80">Professional training, research, project support, clubs, insurance, and a vibrant student council for all-round growth.</p>
            </div>
          </div>
          {/* CMS Features (editable) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {featuresLoading ? (
              <div className="col-span-3 text-center text-kecblue animate-pulse">Loading features...</div>
            ) : features.length === 0 ? (
              null
            ) : (
              features.map((feature, index) => (
                <div
                  key={feature._id || index}
                  className="group bg-white/95 rounded-3xl shadow-2xl border border-kecblue/10 hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate__animated animate__fadeInUp flex flex-col items-center text-center p-8 relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.2 + 1.5}s` }}
                >
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-kecorange/10 border-4 border-kecorange/20 shadow-lg overflow-hidden">
                    <img
                      src={feature.image && feature.image.startsWith('http') ? feature.image : feature.image ? `${API_BASE.replace(/\/api$/, '')}${feature.image}` : 'https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg'}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-kecblue mb-3 drop-shadow-sm">{feature.title}</h3>
                  <p className="text-kecblue/70 leading-relaxed text-base md:text-lg">{feature.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-gradient-to-br from-slate-50 via-keccream to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-40 h-40 bg-kecorange/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-kecblue/10 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-kecblue mb-6">
              Latest News & Updates
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-kecorange to-kecblue mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-kecblue/70 max-w-2xl mx-auto">
              Stay informed with the latest happenings and announcements from our academy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsLoading ? (
              // Enhanced loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  </div>
                </div>
              ))
            ) : news.length === 0 ? (
              <div className="col-span-3 text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No news articles available yet.</p>
              </div>
            ) : (
              news.slice(0, 3).map((article: NewsItem, index) => (
                <article 
                  key={article._id || index} 
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.2 + 0.3}s both`
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image && article.image.startsWith('http') ? article.image : article.image ? `${API_BASE.replace(/\/api$/, '')}${article.image}` : 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg'}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-kecorange/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                      {article.category || 'News'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-kecblue/60 mb-3">
                      <time>{article.date || 'Recent'}</time>
                      {article.author && (
                        <>
                          <span className="mx-2">•</span>
                          <span>By {article.author}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-kecblue mb-3 group-hover:text-kecblue/80 transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-kecblue/70 mb-4 line-clamp-3">
                      {article.excerpt || article.content?.substring(0, 150) + '...'}
                    </p>
                    
                    <button
                      onClick={() => openArticleModal(article)}
                      className="inline-flex items-center text-kecblue hover:bg-kecorange hover:text-white px-4 py-2 rounded-full font-semibold group-hover:translate-x-1 transition-all duration-300 cursor-pointer relative z-10 border border-kecblue/20 hover:border-kecorange focus:outline-none focus:ring-2 focus:ring-kecorange/30"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-kecorange/30 transition-all duration-300 pointer-events-none"></div>
                </article>
              ))
            )}
          </div>
          
          {/* View all news button */}
          {news.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/news"
                className="inline-flex items-center kec-btn text-lg px-8 py-4"
              >
                View All News
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>


      {/* Student Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-orange-50 via-blue-50 to-keccream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Our STUDENTS</h2>
          <h3 className="text-2xl text-center mb-4 text-kecblue">Student’s POV on KEC</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length === 0 ? (
              <div className="col-span-3 text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No testimonials available yet.</p>
              </div>
            ) : (
              testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial._id || index} 
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:scale-105 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.2 + 0.3}s both`
                  }}
                >
                  {/* Quote decoration */}
                  <div className="absolute top-4 right-4 text-6xl text-kecorange/10 font-serif">"</div>
                  
                  {/* Testimonial content */}
                  <div className="relative z-10">
                    <p className="text-kecblue/80 italic mb-6 text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={
                            testimonial.image
                              ? testimonial.image.startsWith('http')
                                ? testimonial.image
                                : `${API_BASE.replace(/\/api$/, '')}${testimonial.image}`
                              : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name || 'Student')
                          }
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-3 border-kecorange/30 shadow-lg group-hover:scale-110 transition-transform duration-300"
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name || 'Student');
                          }}
                        />
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      
                      <div className="ml-4">
                        <div className="font-bold text-kecblue text-lg group-hover:text-kecorange transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-kecblue/60 font-medium">
                          {testimonial.designation}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-kecorange/30 transition-all duration-300 pointer-events-none"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-kecorange/10 to-kecblue/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-kecblue to-kecblue/90 text-kecwhite relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-kecorange rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-keccream rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-kecorange rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-keccream rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-keccream bg-clip-text text-transparent">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-keccream/90 leading-relaxed">
              Take the first step towards an exceptional education. Apply today and become part of our legacy of excellence.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/admissions"
                className="group relative kec-btn-glow text-lg px-10 py-5 rounded-full flex items-center justify-center gap-3 font-bold shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-kecorange to-yellow-400 text-kecblue"
              >
                <span className="relative z-10">Start Your Application</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50 px-10 py-5 rounded-full font-bold shadow-lg transition-all duration-300"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="text-keccream/80">
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm">Happy Students</div>
              </div>
              <div className="text-keccream/80">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
              <div className="text-keccream/80">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm">Courses</div>
              </div>
              <div className="text-keccream/80">
                <div className="text-2xl font-bold">40+</div>
                <div className="text-sm">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-kecorange hover:bg-kecblue text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* News Article Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeArticleModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedArticle ? (
              <>
                {/* Close button */}
                <button
                  onClick={closeArticleModal}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300 z-10"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Article image */}
                {selectedArticle.image && (
                  <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                    <img
                      src={
                        selectedArticle.image.startsWith('http')
                          ? selectedArticle.image
                          : `${API_BASE.replace(/\/api$/, '')}${selectedArticle.image}`
                      }
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Category badge */}
                    <div className="absolute bottom-4 left-4 bg-kecorange/90 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium">
                      {selectedArticle.category || 'News'}
                    </div>
                  </div>
                )}

                {/* Article content */}
                <div className="p-8">
                  <div className="flex items-center text-sm text-kecblue/60 mb-4">
                    <time>{selectedArticle.date || 'Recent'}</time>
                    {selectedArticle.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>By {selectedArticle.author}</span>
                      </>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-kecblue mb-6 leading-tight">
                    {selectedArticle.title}
                  </h1>              <div className="prose prose-lg max-w-none text-kecblue/80 leading-relaxed">
                {selectedArticle.content ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
                ) : selectedArticle.excerpt ? (
                  <p className="text-lg">{selectedArticle.excerpt}</p>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg text-gray-500 mb-4">Content not available for this article.</p>
                    <p className="text-sm text-gray-400">This article may be a preview or the full content hasn't been loaded yet.</p>
                  </div>
                )}
              </div>

                  {/* Action buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/news"
                      className="kec-btn text-center"
                      onClick={closeArticleModal}
                    >
                      View All News
                    </Link>
                    <button
                      onClick={closeArticleModal}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-kecblue mb-4">Loading Article...</h2>
                <p className="text-gray-600 mb-6">Please wait while we load the article content.</p>
                <button
                  onClick={closeArticleModal}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;