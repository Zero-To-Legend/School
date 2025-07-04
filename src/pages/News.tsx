import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, X, Star, TrendingUp, Clock } from 'lucide-react';
import { API_BASE } from '../api';
import UpcomingEvents from './UpcomingEvents';

type NewsItem = {
  _id?: string;
  title: string;
  excerpt?: string;
  content: string;
  image?: string;
  date?: string;
  author?: string;
  category?: string;
  createdAt?: string;
};

const categories = ['All', 'General', 'Events', 'Academics', 'Sports', 'Achievements', 'Other'];

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalNews, setModalNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/news`)
      .then(res => res.json())
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter(n => n.category === selectedCategory);

  // Featured news: first item (most recent)
  const featuredNews = news.length > 0 ? news[0] : null;

  const openModal = (item: NewsItem) => {
    setModalNews(item);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalNews(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-navblue via-navblue/90 to-navorange text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-navorange to-heroorange rounded-full flex items-center justify-center shadow-2xl">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-navorange/20 to-heroorange/20 rounded-full blur-xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-navorange to-white bg-clip-text text-transparent">
              School News
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
              Stay informed with the latest news, achievements, and events from our Excellence Academy community
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-4 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-300">Live Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News (most recent) */}
      {featuredNews && (
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Featured Story
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stay up to date with our most important news and announcements
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500 group">
              <div className="lg:flex">
                <div className="lg:w-1/2 relative overflow-hidden">
                  <img
                    src={featuredNews.image && featuredNews.image.startsWith('http') ? featuredNews.image : featuredNews.image ? `${API_BASE.replace(/\/api$/, '')}${featuredNews.image}` : ''}
                    alt={featuredNews.title}
                    className="w-full h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      <Star className="h-4 w-4 mr-1" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center mr-6">
                      <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                      <span>{featuredNews.date || (featuredNews.createdAt && new Date(featuredNews.createdAt).toLocaleDateString())}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-orange-500" />
                      <span>{featuredNews.author}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                    {featuredNews.title}
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  <button 
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group-hover:from-orange-600 group-hover:to-orange-700" 
                    onClick={() => openModal(featuredNews)}
                  >
                    Read Full Story
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Browse by Category</h3>
            <p className="text-gray-600">Filter news by topic to find what interests you most</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-200 shadow-sm'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Latest News
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most recent updates, achievements, and stories from our school community
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg text-gray-600">Loading news...</span>
              </div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No news available</h3>
              <p className="text-gray-600">There are no news articles in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article, index) => (
                <article 
                  key={article._id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:border-orange-200"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {article.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image.startsWith('http') ? article.image : `${API_BASE.replace(/\/api$/, '')}${article.image}`}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {article.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1 text-orange-500" />
                        <span>{article.date || (article.createdAt && new Date(article.createdAt).toLocaleDateString())}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1 text-orange-500" />
                        <span className="font-medium">{article.author}</span>
                      </div>
                      <button 
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm group-hover:from-orange-600 group-hover:to-orange-700" 
                        onClick={() => openModal(article)}
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News Modal for full story */}
      {showModal && modalNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Article</span>
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors" 
                onClick={closeModal}
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {modalNews.image && (
                <div className="relative">
                  <img 
                    src={modalNews.image.startsWith('http') ? modalNews.image : `${API_BASE.replace(/\/api$/, '')}${modalNews.image}`} 
                    alt={modalNews.title} 
                    className="w-full h-64 md:h-80 object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <div className="flex items-center space-x-6 mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                    <span>{modalNews.date || (modalNews.createdAt && new Date(modalNews.createdAt).toLocaleDateString())}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-orange-500" />
                    <span>{modalNews.author}</span>
                  </div>
                  <span className="inline-block bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {modalNews.category}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  {modalNews.title}
                </h2>
                
                {modalNews.excerpt && (
                  <div className="text-xl text-gray-700 mb-6 p-4 bg-gray-50 rounded-xl border-l-4 border-orange-500">
                    {modalNews.excerpt}
                  </div>
                )}
                
                <div 
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: modalNews.content }} 
                />
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Published by <span className="font-semibold text-slate-900">{modalNews.author}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {modalNews.date || (modalNews.createdAt && new Date(modalNews.createdAt).toLocaleDateString())}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay In The Loop
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Subscribe to our newsletter to receive the latest news, events, and updates from Excellence Academy delivered directly to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                We respect your privacy and will never share your email address with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mark your calendars for these exciting upcoming events and activities from our school community.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <UpcomingEvents />
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;