import React, { useState, useEffect, FormEvent } from 'react';
import { API_BASE } from '../api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Subtitle Preview Component
const SubtitlePreview: React.FC<{ subtitles: string[] }> = ({ subtitles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (subtitles.length > 1) {
      const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % subtitles.length);
          setIsVisible(true);
        }, 300);
      }, 2000); // Faster for preview

      return () => clearInterval(interval);
    }
  }, [subtitles.length]);

  if (subtitles.length === 0) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <h3 
        className={`text-lg md:text-xl font-semibold text-white text-center transition-all duration-300 px-4 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
        }`}
      >
        {subtitles[currentIndex]}
      </h3>
      
      {subtitles.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {subtitles.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-navorange' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- TYPES ---
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

type GalleryEvent = {
  _id?: string;
  event: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
};

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

type Event = {
  _id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
};

type News = {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  author?: string;
  category?: string;
};

type Result = {
  _id?: string;
  className: string;
  fileUrl: string;
  fileType: 'image' | 'pdf' | 'other';
  date: string;
};

type Testimonial = {
  _id?: string;
  quote: string;
  name: string;
  designation: string;
  image?: string;
  featured?: boolean;
};

type Assignment = {
  _id?: string;
  title: string;
  description: string;
  className: string;
  subject: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
  deadline: string;
  createdAt?: string;
  uploadedBy?: string;
};

type Note = {
  _id?: string;
  title: string;
  description: string;
  className: string;
  subject: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'document';
  createdAt?: string;
  updatedAt?: string;
  uploadedBy?: string;
};

type QuestionBank = {
  _id?: string;
  title: string;
  description: string;
  className: string;
  subject: string;
  examType: string;
  year: number;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'document';
  createdAt?: string;
  updatedAt?: string;
  uploadedBy?: string;
};

type Document = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'document';
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
  uploadedBy?: string;
};

// --- LOGIN COMPONENT ---
function SecretLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('secret_token', data.token);
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-keccream">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-xs flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 rounded"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="kec-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </div>
  );
}

// --- DASHBOARD COMPONENT ---
function DashboardContent({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your CMS dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Pages</h3>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">News Articles</h3>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">📢</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Notices</h3>
              <p className="text-2xl font-bold text-yellow-600">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">🖼️</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Gallery Items</h3>
              <p className="text-2xl font-bold text-purple-600">25</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveSection('gallery')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
          >
            <span className="text-2xl mb-2 block">�️</span>
            <p className="font-medium text-gray-700 group-hover:text-purple-700">Add Gallery</p>
          </button>
          <button 
            onClick={() => setActiveSection('notices')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors group"
          >
            <span className="text-2xl mb-2 block">📢</span>
            <p className="font-medium text-gray-700 group-hover:text-yellow-700">Add Notice</p>
          </button>
          <button 
            onClick={() => setActiveSection('results')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <span className="text-2xl mb-2 block">📊</span>
            <p className="font-medium text-gray-700 group-hover:text-blue-700">Upload Result</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- HOME PAGE CONTENT COMPONENT ---
function HomePageContent() {
  const [hero, setHero] = useState({
    image: '',
    welcome: '',
    title: '',
    subtitle: '',
    description: ''
  });
  const [logo, setLogo] = useState({ image: '' });
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [logoSuccess, setLogoSuccess] = useState(false);

  // Fetch hero data
  const fetchHero = async () => {
    setHeroLoading(true);
    try {
      const res = await fetch(`${API_BASE}/hero`);
      const data = await res.json();
      setHero({
        image: data.image || '',
        welcome: data.welcome || '',
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || ''
      });
    } catch (error) {
      console.error('Failed to fetch hero:', error);
    } finally {
      setHeroLoading(false);
    }
  };

  // Fetch logo data
  const fetchLogo = async () => {
    setLogoLoading(true);
    try {
      const res = await fetch(`${API_BASE}/logo`);
      if (res.ok) {
        const data = await res.json();
        let image = data.image || '';
        if (image && !/^https?:\/\//.test(image)) {
          const base = API_BASE.replace(/\/api$/, '');
          image = base + image;
        }
        setLogo({ image });
      }
    } catch (error) {
      console.error('Failed to fetch logo:', error);
    } finally {
      setLogoLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
    fetchLogo();
  }, []);

  const handleHeroChange = (field: string, value: string) => {
    setHero({ ...hero, [field]: value });
  };

  const submitHero = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('welcome', hero.welcome);
    formData.append('title', hero.title);
    formData.append('subtitle', hero.subtitle);
    formData.append('description', hero.description);
    if (heroImageFile) {
      formData.append('image', heroImageFile);
    }
    
    try {
      await fetch(`${API_BASE}/hero`, {
        method: 'PUT',
        body: formData
      });
      setHeroImageFile(null);
      setHeroSuccess(true);
      fetchHero();
      setTimeout(() => setHeroSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update hero:', error);
    }
  };

  const submitLogo = async (e: FormEvent) => {
    e.preventDefault();
    if (!logoFile) {
      alert('Please select a logo file to upload.');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', logoFile);
    
    try {
      await fetch(`${API_BASE}/logo`, {
        method: 'PUT',
        body: formData
      });
      setLogoFile(null);
      setLogoSuccess(true);
      fetchLogo();
      setTimeout(() => setLogoSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update logo:', error);
    }
  };

  const deleteLogo = async () => {
    try {
      await fetch(`${API_BASE}/logo`, { method: 'DELETE' });
      setLogo({ image: '' });
      fetchLogo();
    } catch (error) {
      console.error('Failed to delete logo:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Home Page Management</h1>
        <p className="text-gray-600 mt-2">Manage your homepage content including hero section and logo</p>
        
        {/* Subtitle Help Section */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Multiple Subtitles Guide</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Add multiple subtitles that will rotate automatically on your homepage</p>
            <p>• Separate each subtitle with a semicolon (;) or put each on a new line</p>
            <p>• Each subtitle displays for 4 seconds with smooth transitions</p>
            <p>• Perfect for highlighting different aspects of your school</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* School Logo Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">School Logo</h2>
          <form className="space-y-4" onSubmit={submitLogo}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
              <input 
                type="file" 
                accept="image/*" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setLogoFile(e.target.files?.[0] || null)} 
              />
            </div>
            
            {logo.image && (
              <div className="flex flex-col items-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Logo</label>
                <img 
                  src={logo.image} 
                  alt="School Logo" 
                  className="w-32 h-32 object-contain rounded border bg-white mb-4" 
                  onError={e => (e.currentTarget.style.display='none')} 
                />
                <button 
                  type="button" 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" 
                  onClick={deleteLogo}
                >
                  Delete Logo
                </button>
              </div>
            )}
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
              type="submit"
            >
              {logo.image ? 'Update Logo' : 'Upload Logo'}
            </button>
            
            {logoSuccess && (
              <div className="text-green-600 font-semibold">Logo updated successfully!</div>
            )}
          </form>
          {logoLoading && <div className="text-gray-500">Loading logo...</div>}
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hero Section</h2>
          
          {/* Live Preview Section */}
          {hero.subtitle && hero.subtitle.split(/[;\|\n\r]+/).filter((s: string) => s.trim().length > 0).length > 1 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-navblue to-navorange rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-3">Live Preview - Subtitle Carousel</h3>
              <div className="relative h-16 overflow-hidden bg-black/20 rounded-lg flex items-center justify-center">
                <SubtitlePreview subtitles={hero.subtitle.split(/[;\|\n\r]+/).filter((s: string) => s.trim().length > 0)} />
              </div>
              <p className="text-sm mt-2 text-white/80">This preview shows how subtitles will rotate on your homepage</p>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={submitHero}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <input 
                type="file" 
                accept="image/*" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setHeroImageFile(e.target.files?.[0] || null)} 
              />
              {hero.image && (
                <img 
                  src={hero.image} 
                  alt="Current Hero" 
                  className="w-full max-w-md h-40 object-cover rounded border mt-2" 
                  onError={e => (e.currentTarget.style.display='none')} 
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
              <input 
                type="text" 
                className="border border-gray-300 p-2 rounded-lg w-full" 
                placeholder="Welcome message (e.g. Welcome to)" 
                value={hero.welcome} 
                onChange={e => handleHeroChange('welcome', e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                type="text" 
                className="border border-gray-300 p-2 rounded-lg w-full" 
                placeholder="Title (e.g. KEC)" 
                value={hero.title} 
                onChange={e => handleHeroChange('title', e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitles
                <span className="text-xs text-gray-500 block mt-1">
                  Add multiple subtitles separated by semicolons (;) or new lines. They will rotate automatically on the homepage.
                </span>
              </label>
              <textarea 
                className="border border-gray-300 p-3 rounded-lg w-full min-h-[120px] font-mono text-sm" 
                placeholder="Example:&#10;Excellence in Education;&#10;Empowering Future Leaders;&#10;Building Tomorrow Today&#10;&#10;Or use new lines:&#10;Excellence in Education&#10;Empowering Future Leaders&#10;Building Tomorrow Today" 
                value={hero.subtitle} 
                onChange={e => handleHeroChange('subtitle', e.target.value)} 
              />
              
              {/* Subtitle Preview */}
              {hero.subtitle && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Preview (Subtitles that will rotate):</label>
                  <div className="space-y-1">
                    {hero.subtitle
                      .split(/[;\|\n\r]+/)
                      .map((subtitle: string) => subtitle.trim())
                      .filter((subtitle: string) => subtitle.length > 0)
                      .map((subtitle: string, index: number) => (
                        <div key={index} className="flex items-center text-sm">
                          <span className="w-6 h-6 bg-navorange text-white rounded-full flex items-center justify-center text-xs mr-2">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{subtitle}</span>
                        </div>
                      ))
                    }
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Total: {hero.subtitle.split(/[;\|\n\r]+/).filter((s: string) => s.trim().length > 0).length} subtitle(s) • 
                    Each displays for 4 seconds • Continuous rotation
                  </div>
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="mt-2 flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleHeroChange('subtitle', 'Excellence in Education;\nEmpowering Future Leaders;\nBuilding Tomorrow Today')}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Load Sample
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const lines = hero.subtitle.split('\n').filter(line => line.trim());
                    handleHeroChange('subtitle', lines.join(';\n'));
                  }}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                >
                  Convert to Semicolons
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const lines = hero.subtitle.split(/[;\|]+/).filter(line => line.trim());
                    handleHeroChange('subtitle', lines.join('\n'));
                  }}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                >
                  Convert to Lines
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroChange('subtitle', '')}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[100px]" 
                placeholder="Description / Welcome Content" 
                value={hero.description} 
                onChange={e => handleHeroChange('description', e.target.value)} 
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                type="submit"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" 
                onClick={fetchHero}
              >
                Reset
              </button>
            </div>
            
            {heroSuccess && (
              <div className="text-green-600 font-semibold">Hero section updated successfully!</div>
            )}
          </form>
          {heroLoading && <div className="text-gray-500">Loading hero section...</div>}
        </div>
      </div>
    </div>
  );
}

// --- FACULTY CONTENT COMPONENT ---
function FacultyContent() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [facultyLoading, setFacultyLoading] = useState<boolean>(true);
  const [facultyItem, setFacultyItem] = useState<Faculty>({
    name: '', position: '', education: '', experience: '', specialties: [], image: '', bio: '', featured: false
  });
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [facultyImageFile, setFacultyImageFile] = useState<File | null>(null);
  const [facultySuccess, setFacultySuccess] = useState(false);

  // Fetch faculty data
  const fetchFaculty = async () => {
    setFacultyLoading(true);
    try {
      const res = await fetch(`${API_BASE}/faculty`);
      const data = await res.json();
      setFaculty(data);
    } catch (error) {
      console.error('Failed to fetch faculty:', error);
    } finally {
      setFacultyLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleFacultyChange = (field: keyof Faculty, value: any) => {
    setFacultyItem({ ...facultyItem, [field]: value });
  };

  const submitFaculty = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', facultyItem.name);
    formData.append('position', facultyItem.position);
    formData.append('education', facultyItem.education);
    formData.append('experience', facultyItem.experience);
    formData.append('specialties', facultyItem.specialties.join(','));
    formData.append('bio', facultyItem.bio);
    formData.append('featured', facultyItem.featured ? 'true' : '');
    if (facultyImageFile) {
      formData.append('image', facultyImageFile);
    }

    let url = `${API_BASE}/faculty`;
    let method = 'POST';
    if (editingFacultyId) {
      url = `${API_BASE}/faculty/${editingFacultyId}`;
      method = 'PUT';
    }

    try {
      await fetch(url, { method, body: formData });
      await fetchFaculty();
      setFacultyItem({ name: '', position: '', education: '', experience: '', specialties: [], image: '', bio: '', featured: false });
      setEditingFacultyId(null);
      setFacultyImageFile(null);
      setFacultySuccess(true);
      setTimeout(() => setFacultySuccess(false), 3000);
    } catch (error) {
      console.error('Failed to submit faculty:', error);
    }
  };

  const editFaculty = (f: Faculty) => {
    setFacultyItem({
      name: f.name,
      position: f.position,
      education: f.education,
      experience: f.experience,
      specialties: f.specialties || [],
      image: f.image || '',
      bio: f.bio,
      featured: !!f.featured,
    });
    setEditingFacultyId(f._id || null);
    setFacultyImageFile(null);
  };

  const deleteFaculty = async (id: string) => {
    try {
      await fetch(`${API_BASE}/faculty/${id}`, { method: 'DELETE' });
      await fetchFaculty();
      setFacultySuccess(true);
      setTimeout(() => setFacultySuccess(false), 3000);
    } catch (error) {
      console.error('Failed to delete faculty:', error);
    }
  };



  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Faculty Management</h1>
        <p className="text-gray-600 mt-2">Manage faculty members</p>
      </div>

      <div className="space-y-8">
        {/* Faculty Management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add/Edit Faculty</h2>
          <form className="space-y-4" onSubmit={submitFaculty}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Faculty Name" 
                  value={facultyItem.name} 
                  onChange={e => handleFacultyChange('name', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Position/Title" 
                  value={facultyItem.position} 
                  onChange={e => handleFacultyChange('position', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Educational Background" 
                  value={facultyItem.education} 
                  onChange={e => handleFacultyChange('education', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Years of Experience" 
                  value={facultyItem.experience} 
                  onChange={e => handleFacultyChange('experience', e.target.value)} 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
              <input 
                type="text" 
                className="border border-gray-300 p-2 rounded-lg w-full" 
                placeholder="Specialties (comma separated)" 
                value={facultyItem.specialties.join(',')} 
                onChange={e => handleFacultyChange('specialties', e.target.value.split(','))} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[80px]" 
                placeholder="Biography" 
                value={facultyItem.bio} 
                onChange={e => handleFacultyChange('bio', e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <input 
                type="file" 
                accept="image/*" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setFacultyImageFile(e.target.files?.[0] || null)} 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={facultyItem.featured} 
                onChange={e => handleFacultyChange('featured', e.target.checked)} 
              />
              <label className="text-sm font-medium text-gray-700">Mark as Leadership</label>
            </div>
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
              type="submit"
            >
              {editingFacultyId ? 'Update Faculty' : 'Add Faculty'}
            </button>
            
            {facultySuccess && (
              <div className="text-green-600 font-semibold">Faculty {editingFacultyId ? 'updated' : 'added'} successfully!</div>
            )}
          </form>
        </div>

        {/* Faculty List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Faculty Members</h2>
          {facultyLoading ? (
            <div className="text-gray-500">Loading faculty...</div>
          ) : (
            <div className="space-y-4">
              {faculty.map((f) => (
                <div key={f._id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {f.image && (
                      <img src={f.image} alt="Faculty" className="w-12 h-12 object-cover rounded border" onError={e => (e.currentTarget.style.display='none')} />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-800">{f.name}</h3>
                      <p className="text-sm text-gray-600">{f.position}</p>
                      {f.featured && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Leadership</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => editFaculty(f)}>Edit</button>
                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors" onClick={() => deleteFaculty(f._id!)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// --- NEWS & EVENTS CONTENT COMPONENT ---
function NewsEventsContent() {
  // News state
  const [news, setNews] = useState<News[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(true);
  const [newsItem, setNewsItem] = useState<News>({ title: '', excerpt: '', content: '', image: '', date: '', author: '', category: '' });
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Events state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);
  const [eventItem, setEventItem] = useState<Event>({ title: '', date: '', time: '', location: '' });
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventsSuccess, setEventsSuccess] = useState(false);

  // Fetch news
  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/news`);
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setNewsLoading(false);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    setEventsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/events`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchEvents();
  }, []);

  // News handlers
  const handleNewsChange = (field: keyof News, value: string) => {
    setNewsItem({ ...newsItem, [field]: value });
  };

  const submitNews = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newsItem.title);
    formData.append('excerpt', newsItem.excerpt);
    formData.append('content', newsItem.content);
    formData.append('category', newsItem.category || '');
    formData.append('author', newsItem.author || '');
    formData.append('date', newsItem.date || '');
    if (newsImageFile) {
      formData.append('image', newsImageFile);
    }

    let url = `${API_BASE}/news`;
    let method = 'POST';
    if (editingNewsId) {
      url = `${API_BASE}/news/${editingNewsId}`;
      method = 'PUT';
    }

    try {
      await fetch(url, { method, body: formData });
      setNewsItem({ title: '', excerpt: '', content: '', image: '', date: '', author: '', category: '' });
      setEditingNewsId(null);
      setNewsImageFile(null);
      setNewsSuccess(true);
      setTimeout(() => setNewsSuccess(false), 3000);
      await fetchNews();
    } catch (error) {
      console.error('Failed to submit news:', error);
    }
  };

  const editNews = (n: News) => {
    setNewsItem({
      title: n.title,
      excerpt: n.excerpt,
      content: n.content,
      image: n.image || '',
      date: n.date || '',
      author: n.author || '',
      category: n.category || '',
    });
    setEditingNewsId(n._id || null);
    setNewsImageFile(null);
  };

  const deleteNews = async (id: string) => {
    try {
      await fetch(`${API_BASE}/news/${id}`, { method: 'DELETE' });
      await fetchNews();
      setNewsSuccess(true);
      setTimeout(() => setNewsSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to delete news:', error);
    }
  };

  // Event handlers
  const handleEventChange = (field: keyof Event, value: string) => {
    setEventItem({ ...eventItem, [field]: value });
  };

  const submitEvent = async (e: FormEvent) => {
    e.preventDefault();
    let response;
    if (editingEventId) {
      response = await fetch(`${API_BASE}/events/${editingEventId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(eventItem)
      });
    } else {
      response = await fetch(`${API_BASE}/events`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(eventItem)
      });
    }

    if (response && response.ok) {
      await fetchEvents();
      setEventItem({ title: '', date: '', time: '', location: '' });
      setEditingEventId(null);
      setEventsSuccess(true);
      setTimeout(() => setEventsSuccess(false), 3000);
    } else {
      alert('Failed to save event.');
    }
  };

  const editEvent = (ev: Event) => {
    setEventItem({ title: ev.title, date: ev.date, time: ev.time, location: ev.location });
    setEditingEventId(ev._id || null);
  };

  const deleteEvent = async (id: string) => {
    try {
      await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });
      await fetchEvents();
      setEventsSuccess(true);
      setTimeout(() => setEventsSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">News & Events Management</h1>
        <p className="text-gray-600 mt-2">Manage news articles and upcoming events</p>
      </div>

      <div className="space-y-8">
        {/* News Management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add/Edit News</h2>
          <form className="space-y-4" onSubmit={submitNews}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                type="text" 
                className="border border-gray-300 p-2 rounded-lg w-full" 
                placeholder="News Title" 
                value={newsItem.title} 
                onChange={e => handleNewsChange('title', e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <input 
                type="text" 
                className="border border-gray-300 p-2 rounded-lg w-full" 
                placeholder="Brief description" 
                value={newsItem.excerpt} 
                onChange={e => handleNewsChange('excerpt', e.target.value)} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Category" 
                  value={newsItem.category} 
                  onChange={e => handleNewsChange('category', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Author" 
                  value={newsItem.author} 
                  onChange={e => handleNewsChange('author', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  value={newsItem.date} 
                  onChange={e => handleNewsChange('date', e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <input 
                type="file" 
                accept="image/*" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setNewsImageFile(e.target.files?.[0] || null)} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <ReactQuill 
                value={newsItem.content} 
                onChange={val => handleNewsChange('content', val)} 
                className="bg-white" 
              />
            </div>
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
              type="submit"
            >
              {editingNewsId ? 'Update News' : 'Add News'}
            </button>
            
            {newsSuccess && (
              <div className="text-green-600 font-semibold">News {editingNewsId ? 'updated' : 'created'} successfully!</div>
            )}
          </form>
        </div>

        {/* News List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Published News</h2>
          {newsLoading ? (
            <div className="text-gray-500">Loading news...</div>
          ) : (
            <div className="space-y-4">
              {news.map((n) => (
                <div key={n._id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {n.image && (
                      <img src={n.image} alt="News" className="w-12 h-12 object-cover rounded border" onError={e => (e.currentTarget.style.display='none')} />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-800">{n.title}</h3>
                      <p className="text-sm text-gray-600">{n.category} • {n.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => editNews(n)}>Edit</button>
                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors" onClick={() => deleteNews(n._id!)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Events Management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add/Edit Events</h2>
          <form className="space-y-4" onSubmit={submitEvent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Event Title" 
                  value={eventItem.title} 
                  onChange={e => handleEventChange('title', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  placeholder="Event Location" 
                  value={eventItem.location} 
                  onChange={e => handleEventChange('location', e.target.value)} 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  value={eventItem.date} 
                  onChange={e => handleEventChange('date', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input 
                  type="time" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  value={eventItem.time} 
                  onChange={e => handleEventChange('time', e.target.value)} 
                />
              </div>
            </div>
            
            <button 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" 
              type="submit"
            >
              {editingEventId ? 'Update Event' : 'Add Event'}
            </button>
            
            {eventsSuccess && (
              <div className="text-green-600 font-semibold">Event {editingEventId ? 'updated' : 'created'} successfully!</div>
            )}
          </form>
        </div>

        {/* Events List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          {eventsLoading ? (
            <div className="text-gray-500">Loading events...</div>
          ) : (
            <div className="space-y-4">
              {events.map((e) => (
                <div key={e._id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{e.title}</h3>
                    <p className="text-sm text-gray-600">{e.date} at {e.time} • {e.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => editEvent(e)}>Edit</button>
                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors" onClick={() => deleteEvent(e._id!)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- NOTICES CONTENT COMPONENT ---
function NoticesContent() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticesLoading, setNoticesLoading] = useState<boolean>(true);
  const [notice, setNotice] = useState<Notice>({ 
    title: '', 
    content: '', 
    showPopup: false, 
    priority: 'medium', 
    category: 'General', 
    isUrgent: false 
  });
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeFile, setNoticeFile] = useState<File | null>(null);
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  const fetchNotices = async () => {
    setNoticesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/notices`);
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setNoticesLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleNoticeChange = (field: keyof Notice, value: any) => {
    console.log(`Changing notice ${field} to:`, value);
    const updatedNotice = { ...notice, [field]: value };
    console.log('Updated notice:', updatedNotice);
    setNotice(updatedNotice);
  };

  const submitNotice = async (e: FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', notice.title);
    formData.append('content', notice.content);
    formData.append('showPopup', notice.showPopup ? 'true' : 'false');
    formData.append('priority', notice.priority || 'medium');
    formData.append('category', notice.category || 'General');
    formData.append('isUrgent', notice.isUrgent ? 'true' : 'false');
    
    console.log('Submitting notice with category:', notice.category);
    console.log('FormData category:', formData.get('category'));
    
    if (noticeFile) {
      formData.append('file', noticeFile);
    }
    
    let url = `${API_BASE}/notices`;
    let method = 'POST';
    if (editingNoticeId) {
      url = `${API_BASE}/notices/${editingNoticeId}`;
      method = 'PUT';
    }
    
    try {
      const response = await fetch(url, { method, body: formData });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await fetchNotices();
      setNotice({ 
        title: '', 
        content: '', 
        showPopup: false, 
        priority: 'medium', 
        category: 'General', 
        isUrgent: false 
      });
      setEditingNoticeId(null);
      setNoticeFile(null);
      setNoticeSuccess(true);
      setTimeout(() => setNoticeSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting notice:', error);
      alert('Failed to save notice. Please try again.');
    }
  };

  const editNotice = (n: Notice) => {
    setNotice({ 
      title: n.title, 
      content: n.content, 
      showPopup: !!n.showPopup,
      file: n.file,
      fileType: n.fileType,
      priority: n.priority || 'medium',
      category: n.category || 'General',
      isUrgent: !!n.isUrgent
    });
    setEditingNoticeId(n._id || null);
    setNoticeFile(null);
  };

  const deleteNotice = async (id: string) => {
    try {
      await fetch(`${API_BASE}/notices/${id}`, { method: 'DELETE' });
      await fetchNotices();
      setNoticeSuccess(true);
      setTimeout(() => setNoticeSuccess(false), 3000);
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Failed to delete notice. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notices Management</h1>
        <p className="text-gray-600 mt-2">Manage important notices and announcements</p>
      </div>

      <div className="space-y-8">
        {/* Add/Edit Notice */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add/Edit Notice</h2>
          <form className="space-y-4" onSubmit={submitNotice}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder="Notice Title"
                value={notice.title}
                onChange={e => handleNoticeChange('title', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <ReactQuill 
                value={notice.content} 
                onChange={val => handleNoticeChange('content', val)} 
                className="bg-white" 
                placeholder="Notice content"
              />
            </div>
            
            {/* Priority and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  className="border border-gray-300 p-2 rounded-lg w-full"
                  value={notice.priority}
                  onChange={e => handleNoticeChange('priority', e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  className="border border-gray-300 p-2 rounded-lg w-full"
                  value={notice.category}
                  onChange={e => handleNoticeChange('category', e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Events">Events</option>
                  <option value="Examination">Examination</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            {/* Checkboxes and File Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={notice.showPopup}
                    onChange={e => handleNoticeChange('showPopup', e.target.checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">Show as Popup</label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={notice.isUrgent}
                    onChange={e => handleNoticeChange('isUrgent', e.target.checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">Mark as Urgent</label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf,.doc,.docx" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  onChange={e => setNoticeFile(e.target.files?.[0] || null)} 
                />
              </div>
            </div>
            
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
              type="submit"
            >
              {editingNoticeId ? 'Update Notice' : 'Add Notice'}
            </button>
            
            {noticeSuccess && (
              <div className="text-green-600 font-semibold">Notice {editingNoticeId ? 'updated' : 'created'} successfully!</div>
            )}
          </form>
        </div>

        {/* Notices List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Published Notices</h2>
          {noticesLoading ? (
            <div className="text-gray-500">Loading notices...</div>
          ) : (
            <div className="space-y-4">
              {notices.map(n => (
                <div key={n._id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                        {n.file && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {n.fileType === 'image' ? '📷' : n.fileType === 'pdf' ? '📄' : '📎'}
                          </span>
                        )}
                        {n.title}
                        {n.showPopup && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Popup</span>
                        )}
                        {n.isUrgent && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">URGENT</span>
                        )}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${
                          n.priority === 'high' ? 'bg-red-500' : 
                          n.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></span>
                        <span className="text-xs text-gray-600 capitalize">{n.priority} Priority</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{n.category}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: n.content.substring(0, 100) + '...' }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => editNotice(n)}>Edit</button>
                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors" onClick={() => deleteNotice(n._id!)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- GALLERY CONTENT COMPONENT ---
function GalleryContent() {
  const [gallery, setGallery] = useState<GalleryEvent[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [gallerySuccess, setGallerySuccess] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventImages, setEventImages] = useState<FileList | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch(`${API_BASE}/gallery`);
      const data = await res.json();
      console.log('Gallery API Response:', data); // Debug log
      
      let galleryEvents: GalleryEvent[] = [];
      
      // Handle different possible response formats
      if (Array.isArray(data)) {
        galleryEvents = data;
      } else if (data.events && Array.isArray(data.events)) {
        galleryEvents = data.events;
      } else if (data.gallery && Array.isArray(data.gallery)) {
        galleryEvents = data.gallery;
      } else {
        console.warn('Unexpected gallery data format:', data);
        galleryEvents = [];
      }
      
      // Sort by creation date (newest first)
      galleryEvents.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || '').getTime();
        const dateB = new Date(b.createdAt || b.updatedAt || '').getTime();
        return dateB - dateA; // Newest first
      });
      
      setGallery(galleryEvents);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setGallery([]);
    } finally {
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleGallerySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) return;
    
    const formData = new FormData();
    formData.append('event', eventName);
    
    if (eventImages) {
      Array.from(eventImages).forEach((img) => {
        formData.append(`images`, img);
      });
    }

    try {
      const url = editingEventId 
        ? `${API_BASE}/gallery/${editingEventId}`
        : `${API_BASE}/gallery`;
      const method = editingEventId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('secret_token')}`
        }
      });
      
      if (res.ok) {
        setGallerySuccess(true);
        setTimeout(() => setGallerySuccess(false), 3000);
        setEventName('');
        setEventImages(null);
        setEditingEventId(null);
        fetchGallery();
      }
    } catch (err) {
      console.error('Error saving gallery event:', err);
    }
  };

  const editEvent = (event: GalleryEvent) => {
    setEventName(event.event);
    setEditingEventId(event._id || null);
    setEventImages(null);
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery event?')) return;
    try {
      const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('secret_token')}`
        }
      });
      if (res.ok) {
        fetchGallery();
      }
    } catch (err) {
      console.error('Error deleting gallery event:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gallery Management</h1>
        <p className="text-gray-600 mt-2">Manage school gallery events and photos</p>
      </div>
      
      <div className="space-y-8">
        {/* Add/Edit Gallery Event Form - At Top */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingEventId ? 'Edit Gallery Event' : 'Add Gallery Event'}
          </h2>
          <form onSubmit={handleGallerySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input 
                  type="text" 
                  value={eventName} 
                  onChange={e => setEventName(e.target.value)} 
                  className="w-full border border-gray-300 p-2 rounded-lg" 
                  placeholder="Enter event name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={e => setEventImages(e.target.files)} 
                  className="w-full border border-gray-300 p-2 rounded-lg" 
                />
                <p className="text-sm text-gray-500 mt-1">Select multiple images for this event</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingEventId ? 'Update Event' : 'Add Event'}
              </button>
              {editingEventId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingEventId(null);
                    setEventName('');
                    setEventImages(null);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {gallerySuccess && (
              <div className="text-green-600 font-semibold">
                Gallery event {editingEventId ? 'updated' : 'created'} successfully!
              </div>
            )}
          </form>
        </div>

        {/* Gallery Events List - Below Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Gallery Events</h2>
            <button 
              onClick={fetchGallery}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
              disabled={galleryLoading}
            >
              {galleryLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          {galleryLoading ? (
            <div className="text-gray-500 text-center py-8">Loading gallery events...</div>
          ) : gallery.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              <p>No gallery events found.</p>
              <p className="text-sm">Create your first gallery event using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map(event => (
                <div key={event._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-800 truncate">{event.event}</h3>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => editEvent(event)} 
                        className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteEvent(event._id!)} 
                        className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {event.images.length} image(s)
                    {event.createdAt && (
                      <span className="ml-2 text-gray-500">
                        • {new Date(event.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {event.images.slice(0, 4).map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`${event.event} ${idx + 1}`} 
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                    {event.images.length > 4 && (
                      <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                        +{event.images.length - 4} more
                      </div>
                    )}
                  </div>
                  {event.images.length > 4 && (
                    <button 
                      onClick={() => {
                        alert(`This event has ${event.images.length} images total.`);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm w-full text-center"
                    >
                      View all {event.images.length} images →
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- RESULTS CONTENT COMPONENT ---
function ResultsContent() {
  const [results, setResults] = useState<Result[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [resultsSuccess, setResultsSuccess] = useState(false);
  const [className, setClassName] = useState('');
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [editingResultId, setEditingResultId] = useState<string | null>(null);

  const fetchResults = async () => {
    setResultsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/results`);
      const data = await res.json();
      console.log('Results API Response:', data); // Debug log
      
      // Backend returns results directly, not wrapped in a results object
      let resultsList = Array.isArray(data) ? data : (data.results || []);
      console.log('Processed results list:', resultsList); // Debug log
      
      // Sort by date (newest first)
      resultsList.sort((a: Result, b: Result) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // Newest first
      });
      
      setResults(resultsList);
    } catch (err) {
      console.error('Error fetching results:', err);
      setResults([]);
    } finally {
      setResultsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleResultSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!className.trim()) return;
    
    const formData = new FormData();
    formData.append('className', className);
    
    // Only append file if one is selected (for edits, file is optional)
    if (resultFile) {
      formData.append('file', resultFile);
    } else if (!editingResultId) {
      // For new results, file is required
      alert('Please select a file to upload.');
      return;
    }

    try {
      const url = editingResultId 
        ? `${API_BASE}/results/${editingResultId}`
        : `${API_BASE}/results`;
      const method = editingResultId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('secret_token')}`
        }
      });
      
      if (res.ok) {
        setResultsSuccess(true);
        setTimeout(() => setResultsSuccess(false), 3000);
        setClassName('');
        setResultFile(null);
        setEditingResultId(null);
        fetchResults();
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Error response:', errorData);
        alert(`Failed to ${editingResultId ? 'update' : 'create'} result: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving result:', err);
    }
  };

  const editResult = (result: Result) => {
    setClassName(result.className);
    setEditingResultId(result._id || null);
    setResultFile(null);
    // Clear any previous success message
    setResultsSuccess(false);
  };

  const deleteResult = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    try {
      const res = await fetch(`${API_BASE}/results/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('secret_token')}`
        }
      });
      if (res.ok) {
        fetchResults();
      }
    } catch (err) {
      console.error('Error deleting result:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Results Management</h1>
        <p className="text-gray-600 mt-2">Manage school examination results</p>
      </div>
      
      <div className="space-y-8">
        {/* Add/Edit Result Form - At Top */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingResultId ? 'Edit Result' : 'Add Result'}
          </h2>
          <form onSubmit={handleResultSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class/Standard</label>
                <input 
                  type="text" 
                  value={className} 
                  onChange={e => setClassName(e.target.value)} 
                  className="w-full border border-gray-300 p-2 rounded-lg" 
                  placeholder="Enter class name (e.g., Class 10, Class 12)"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Result File</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf" 
                  onChange={e => setResultFile(e.target.files?.[0] || null)} 
                  className="w-full border border-gray-300 p-2 rounded-lg" 
                />
                <p className="text-sm text-gray-500 mt-1">
                  {editingResultId 
                    ? 'Upload new file to replace current file (optional)' 
                    : 'Upload result file (PDF or image) - Required'
                  }
                </p>
                {editingResultId && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600">
                      Current file will be kept if no new file is uploaded
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingResultId ? 'Update Result' : 'Add Result'}
              </button>
              {editingResultId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingResultId(null);
                    setClassName('');
                    setResultFile(null);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {resultsSuccess && (
              <div className="text-green-600 font-semibold">
                Result {editingResultId ? 'updated' : 'created'} successfully!
              </div>
            )}
          </form>
        </div>

        {/* Published Results List - Below Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Published Results</h2>
          {resultsLoading ? (
            <div className="text-gray-500 text-center py-8">Loading results...</div>
          ) : results.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              <p>No results found.</p>
              <p className="text-sm">Create your first result using the form above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map(result => (
                <div key={result._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-800">{result.className}</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => editResult(result)} 
                        className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteResult(result._id!)} 
                        className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {result.fileType === 'pdf' ? '📄 PDF' : '📷 Image'}
                      </span>
                      <span>Published: {new Date(result.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <a 
                      href={`${API_BASE.replace('/api', '')}${result.fileUrl}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Result File →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- STUDENTS CONTENT COMPONENT ---
function StudentsContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState<Testimonial>({
    quote: '', name: '', designation: '', image: '', featured: false
  });
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialImageFile, setTestimonialImageFile] = useState<File | null>(null);
  const [testimonialError, setTestimonialError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      const data = await res.json();
      
      // Handle both array response and object with testimonials property
      let testimonialsList = [];
      if (Array.isArray(data)) {
        testimonialsList = data;
      } else if (data.testimonials && Array.isArray(data.testimonials)) {
        testimonialsList = data.testimonials;
      } else {
        testimonialsList = [];
      }
      
      setTestimonials(testimonialsList);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTestimonialForm({ ...testimonialForm, [e.target.name]: e.target.value });
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestimonialForm({ ...testimonialForm, featured: e.target.checked });
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonialsLoading(true);
    setTestimonialError(null);
    
    const method = editingTestimonialId ? 'PUT' : 'POST';
    const url = editingTestimonialId ? `${API_BASE}/testimonials/${editingTestimonialId}` : `${API_BASE}/testimonials`;
    const formData = new FormData();
    formData.append('quote', testimonialForm.quote);
    formData.append('name', testimonialForm.name);
    formData.append('designation', testimonialForm.designation);
    formData.append('featured', testimonialForm.featured ? 'true' : 'false');
    if (testimonialImageFile) {
      formData.append('image', testimonialImageFile);
    }

    try {
      await fetch(url, { method, body: formData });
      await fetchTestimonials();
      setTestimonialForm({ quote: '', name: '', designation: '', image: '', featured: false });
      setTestimonialImageFile(null);
      setEditingTestimonialId(null);
    } catch (error) {
      setTestimonialError('Failed to save testimonial');
    } finally {
      setTestimonialsLoading(false);
    }
  };

  const handleTestimonialEdit = (t: Testimonial) => {
    setTestimonialForm(t);
    setEditingTestimonialId(t._id || null);
  };

  const handleTestimonialDelete = async ( id: string) => {
    setTestimonialsLoading(true);
    try {
      await fetch(`${API_BASE}/testimonials/${id}`, { method: 'DELETE' });
      await fetchTestimonials();
    } catch (error) {
      setTestimonialError('Failed to delete testimonial');
    } finally {
      setTestimonialsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
        <p className="text-gray-600 mt-2">Manage student testimonials and feedback</p>
      </div>

      <div className="space-y-8">
        {/* Student Testimonials */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Testimonials</h2>
          <form onSubmit={handleTestimonialSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
              <textarea 
                name="quote" 
                value={testimonialForm.quote} 
                onChange={handleTestimonialChange} 
                placeholder="Student testimonial quote" 
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[80px]" 
                required 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  name="name" 
                  value={testimonialForm.name} 
                  onChange={handleTestimonialChange} 
                  placeholder="Student Name" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                <input 
                  name="designation" 
                  value={testimonialForm.designation} 
                  onChange={handleTestimonialChange} 
                  placeholder="Class/Year/Program" 
                  className="border border-gray-300 p-2 rounded-lg w-full" 
                  required 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <input 
                type="file" 
                accept="image/*" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setTestimonialImageFile(e.target.files?.[0] || null)} 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={testimonialForm.featured || false}
                onChange={handleFeaturedChange}
              />
              <label className="text-sm font-medium text-gray-700">Featured on Home Page</label>
              <span className="text-xs text-gray-500">(Only 3 testimonials can be featured)</span>
            </div>
            
            <button 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" 
              type="submit" 
              disabled={testimonialsLoading}
            >
              {editingTestimonialId ? 'Update' : 'Add'} Testimonial
            </button>
            {testimonialError && <div className="text-red-600">{testimonialError}</div>}
          </form>

          {/* Testimonials List */}
          {testimonialsLoading && <div className="text-gray-500">Loading testimonials...</div>}
          {!testimonialsLoading && testimonials.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              <p>No testimonials found.</p>
              <p className="text-sm mt-2">Add your first student testimonial above.</p>
            </div>
          )}
          <div className="space-y-4">
            {testimonials.map(t => (
              <div key={t._id} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      t.image
                        ? t.image.startsWith('http')
                          ? t.image
                          : `${API_BASE.replace(/\/api$/, '')}${t.image}`
                        : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name || 'Student')
                    }
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name || 'Student');
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{t.name}</h3>
                    <p className="text-sm text-gray-600">{t.designation}</p>
                    <p className="text-sm italic text-gray-700 mt-1">"{t.quote}"</p>
                    {t.featured && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-1 inline-block">Featured on Home</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleTestimonialEdit(t)} className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">Edit</button>
                  <button onClick={() => handleTestimonialDelete(t._id!)} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ASSIGNMENTS CONTENT COMPONENT ---
function AssignmentsContent() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState<Assignment>({
    title: '', description: '', className: '', subject: '', fileUrl: '', fileType: 'pdf', deadline: ''
  });
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null);
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentError, setAssignmentError] = useState<string | null>(null);
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);

  const fetchAssignments = async () => {
    setAssignmentsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/assignments/admin`);
      const data = await res.json();
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setAssignmentError('Failed to fetch assignments');
    } finally {
      setAssignmentsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAssignmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAssignmentForm({ ...assignmentForm, [e.target.name]: e.target.value });
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentForm.title.trim() || !assignmentForm.className.trim() || !assignmentForm.subject.trim() || !assignmentForm.deadline) {
      setAssignmentError('Please fill in all required fields');
      return;
    }

    if (!editingAssignmentId && !assignmentFile) {
      setAssignmentError('Please select a file to upload');
      return;
    }

    setAssignmentsLoading(true);
    setAssignmentError(null);
    
    const method = editingAssignmentId ? 'PUT' : 'POST';
    const url = editingAssignmentId ? `${API_BASE}/assignments/${editingAssignmentId}` : `${API_BASE}/assignments`;
    const formData = new FormData();
    
    formData.append('title', assignmentForm.title);
    formData.append('description', assignmentForm.description);
    formData.append('className', assignmentForm.className);
    formData.append('subject', assignmentForm.subject);
    formData.append('deadline', assignmentForm.deadline);
    
    if (assignmentFile) {
      formData.append('file', assignmentFile);
    }

    try {
      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save assignment');
      }
      
      await fetchAssignments();
      setAssignmentForm({ title: '', description: '', className: '', subject: '', fileUrl: '', fileType: 'pdf', deadline: '' });
      setAssignmentFile(null);
      setEditingAssignmentId(null);
      setAssignmentSuccess(true);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    } catch (error: any) {
      setAssignmentError(error.message || 'Failed to save assignment');
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const handleAssignmentEdit = (assignment: Assignment) => {
    // Convert deadline to proper datetime-local format
    const deadlineDate = new Date(assignment.deadline);
    const year = deadlineDate.getFullYear();
    const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
    const day = String(deadlineDate.getDate()).padStart(2, '0');
    const hours = String(deadlineDate.getHours()).padStart(2, '0');
    const minutes = String(deadlineDate.getMinutes()).padStart(2, '0');
    const formattedDeadline = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    setAssignmentForm({
      title: assignment.title,
      description: assignment.description,
      className: assignment.className,
      subject: assignment.subject,
      fileUrl: assignment.fileUrl,
      fileType: assignment.fileType,
      deadline: formattedDeadline
    });
    setEditingAssignmentId(assignment._id || null);
    setAssignmentFile(null);
  };

  const handleAssignmentDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return;
    
    setAssignmentsLoading(true);
    try {
      await fetch(`${API_BASE}/assignments/${id}`, { method: 'DELETE' });
      await fetchAssignments();
      setAssignmentSuccess(true);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    } catch (error) {
      setAssignmentError('Failed to delete assignment');
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const cleanupExpiredAssignments = async () => {
    if (!confirm('Are you sure you want to clean up all expired assignments? This action cannot be undone.')) return;
    
    setAssignmentsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/assignments/cleanup/expired`, { method: 'DELETE' });
      const data = await response.json();
      alert(data.message);
      await fetchAssignments();
    } catch (error) {
      setAssignmentError('Failed to cleanup expired assignments');
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffTime < 0) {
      return 'Expired';
    } else if (diffDays === 0) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return `${diffHours} hours left`;
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `${diffDays} days left`;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Assignment Management</h1>
        <p className="text-gray-600 mt-2">Manage assignments for students with deadlines</p>
      </div>

      <div className="space-y-8">
        {/* Add/Edit Assignment Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingAssignmentId ? 'Edit Assignment' : 'Add Assignment'}
          </h2>
          <form onSubmit={handleAssignmentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input 
                  name="title" 
                  value={assignmentForm.title} 
                  onChange={handleAssignmentChange} 
                  placeholder="Assignment Title" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input 
                  name="subject" 
                  value={assignmentForm.subject} 
                  onChange={handleAssignmentChange} 
                  placeholder="e.g., Mathematics, English" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={50}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                <input 
                  name="className" 
                  value={assignmentForm.className} 
                  onChange={handleAssignmentChange} 
                  placeholder="e.g., Grade 9, Class 10A, Form 5" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">Enter the class name (e.g., Grade 9, Class 10A, Form 5)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
                <input 
                  name="deadline" 
                  type="datetime-local"
                  value={assignmentForm.deadline} 
                  onChange={handleAssignmentChange} 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  min={new Date().toISOString().slice(0, 16)} // Prevent past dates
                  onKeyDown={(e) => {
                    // Close calendar on Escape key
                    if (e.key === 'Escape') {
                      e.currentTarget.blur();
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Click to select date and time, press ESC or click away to close</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                name="description" 
                value={assignmentForm.description} 
                onChange={handleAssignmentChange} 
                placeholder="Assignment description (optional)" 
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">Optional description (max 500 characters)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment File {!editingAssignmentId && '*'}
              </label>
              <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setAssignmentFile(e.target.files?.[0] || null)} 
              />
              <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG (Max 50MB)</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                type="submit" 
                disabled={assignmentsLoading}
              >
                {editingAssignmentId ? 'Update' : 'Add'} Assignment
              </button>
              {editingAssignmentId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingAssignmentId(null);
                    setAssignmentForm({ title: '', description: '', className: '', subject: '', fileUrl: '', fileType: 'pdf', deadline: '' });
                    setAssignmentFile(null);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {assignmentError && <div className="text-red-600">{assignmentError}</div>}
            {assignmentSuccess && (
              <div className="text-green-600 font-semibold">
                Assignment {editingAssignmentId ? 'updated' : 'added'} successfully!
              </div>
            )}
          </form>
        </div>

        {/* Assignments List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">All Assignments</h2>
            <button 
              onClick={cleanupExpiredAssignments}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Cleanup Expired
            </button>
          </div>
          
          {assignmentsLoading && <div className="text-gray-500">Loading assignments...</div>}
          {!assignmentsLoading && assignments.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              <p>No assignments found.</p>
              <p className="text-sm mt-2">Create your first assignment above.</p>
            </div>
          )}
          
          <div className="space-y-4">
            {assignments.map(assignment => {
              const isExpired = new Date(assignment.deadline) < new Date();
              return (
                <div key={assignment._id} className={`border rounded-lg p-4 ${isExpired ? 'bg-red-50 border-red-200' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{assignment.className}</span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{assignment.subject}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          Due: {new Date(assignment.deadline).toLocaleString()}
                        </span>
                        <span className={`font-medium ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                          {formatDeadline(assignment.deadline)}
                        </span>
                        <a 
                          href={`${API_BASE.replace('/api', '')}${assignment.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View File ({assignment.fileType.toUpperCase()})
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAssignmentEdit(assignment)} 
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleAssignmentDelete(assignment._id!)} 
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN SECRET COMPONENT ---
function Secret() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState<string[]>(['website']); // Start with website management expanded

  useEffect(() => {
    const token = localStorage.getItem('secret_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('secret_token');
    setIsLoggedIn(false);
    setActiveSection('dashboard');
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSubSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Auto-expand the parent section if not already expanded
    if (!expandedSections.includes('website')) {
      setExpandedSections(prev => [...prev, 'website']);
    }
  };

  if (!isLoggedIn) {
    return <SecretLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent setActiveSection={setActiveSection} />;
      case 'home':
        return <HomePageContent />;
      case 'faculty':
        return <FacultyContent />;
      case 'students':
        return <StudentsContent />;
      case 'news':
        return <NewsEventsContent />;
      case 'notices':
        return <NoticesContent />;
      case 'gallery':
        return <GalleryContent />;
      case 'results':
        return <ResultsContent />;
      case 'academics':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Academics Management</h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">Academics content management will be implemented here.</p>
            </div>
          </div>
        );
      case 'assignments':
        return <AssignmentsContent />;
      case 'notes':
        return <NotesContent />;
      case 'questions':
        return <QuestionsContent />;
      case 'documents':
        return <DocumentsContent />;
      default:
        return <DashboardContent setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">CMS Admin</h1>
          <p className="text-sm text-gray-600">Content Management System</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <div className="px-6 py-2 mt-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dashboard</h2>
          </div>
          <ul className="mt-2">
            <li>
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'dashboard' 
                    ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                📊 Dashboard
              </button>
            </li>
          </ul>
          
          <div className="px-6 py-2 mt-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h2>
          </div>
          <ul className="mt-2 pb-6">
            {/* Website Management - Collapsible Section */}
            <li>
              <button
                onClick={() => toggleSection('website')}
                className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors flex items-center justify-between ${
                  expandedSections.includes('website')
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>Website Management</span>
                </span>
                <span className={`transform transition-transform duration-200 ${
                  expandedSections.includes('website') ? 'rotate-90' : ''
                }`}>
                  ▶
                </span>
              </button>
              
              {/* Website Management Subsections */}
              {expandedSections.includes('website') && (
                <ul className="bg-gray-50 border-l-2 border-blue-200 ml-6">
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('home')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'home' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      🏠 Home Page
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('academics')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'academics' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📚 Academics
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('faculty')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'faculty' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      👨‍🏫 Faculty
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('students')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'students' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      👨‍🎓 Students
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('news')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'news' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📰 News & Events
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('notices')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'notices' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📢 Notices
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('gallery')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'gallery' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📸 Gallery
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('results')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'results' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📊 Results
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('assignments')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'assignments' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📋 Assignments
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('notes')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'notes' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📚 Notes
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('questions')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'questions' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      ❓ Question Bank
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSubSectionClick('documents')}
                      className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                        activeSection === 'documents' 
                          ? 'text-blue-600 bg-blue-100 border-r-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      📁 Documents
                    </button>
                  </li>
                </ul>
              )}
            </li>
            
            {/* Future sections can be added here */}
            {/* Example: User Management, System Settings, etc. */}
          </ul>
        </nav>
        
        <div className="p-6 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

// Notes Content Component
function NotesContent() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteForm, setNoteForm] = useState<Note>({
    title: '', description: '', className: '', subject: '', fileUrl: '', fileType: 'pdf'
  });
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [noteError, setNoteError] = useState<string | null>(null);
  const [noteSuccess, setNoteSuccess] = useState(false);

  const fetchNotes = async () => {
    setNotesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/notes/admin`);
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setNoteError('Failed to fetch notes');
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNoteForm({ ...noteForm, [e.target.name]: e.target.value });
  };

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteForm.title.trim() || !noteForm.className.trim() || !noteForm.subject.trim()) {
      setNoteError('Please fill in all required fields');
      return;
    }

    if (!editingNoteId && !noteFile) {
      setNoteError('Please select a file to upload');
      return;
    }

    setNotesLoading(true);
    setNoteError(null);
    
    const method = editingNoteId ? 'PUT' : 'POST';
    const url = editingNoteId ? `${API_BASE}/notes/${editingNoteId}` : `${API_BASE}/notes`;
    const formData = new FormData();
    
    formData.append('title', noteForm.title);
    formData.append('description', noteForm.description);
    formData.append('className', noteForm.className);
    formData.append('subject', noteForm.subject);
    
    if (noteFile) {
      formData.append('file', noteFile);
    }

    try {
      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save note');
      }
      
      await fetchNotes();
      setNoteForm({ title: '', description: '', className: '', subject: '', fileUrl: '', fileType: 'pdf' });
      setNoteFile(null);
      setEditingNoteId(null);
      setNoteSuccess(true);
      setTimeout(() => setNoteSuccess(false), 3000);
    } catch (error: any) {
      setNoteError(error.message || 'Failed to save note');
    } finally {
      setNotesLoading(false);
    }
  };

  const handleNoteEdit = (note: Note) => {
    setNoteForm({
      title: note.title,
      description: note.description,
      className: note.className,
      subject: note.subject,
      fileUrl: note.fileUrl,
      fileType: note.fileType
    });
    setEditingNoteId(note._id || null);
    setNoteFile(null);
  };

  const handleNoteDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    setNotesLoading(true);
    try {
      await fetch(`${API_BASE}/notes/${id}`, { method: 'DELETE' });
      await fetchNotes();
      setNoteSuccess(true);
      setTimeout(() => setNoteSuccess(false), 3000);
    } catch (error) {
      setNoteError('Failed to delete note');
    } finally {
      setNotesLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notes Management</h1>
        <p className="text-gray-600 mt-2">Manage study notes and materials for students</p>
      </div>

      <div className="space-y-8">
        {/* Add/Edit Note Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingNoteId ? 'Edit Note' : 'Add Note'}
          </h2>
          <form onSubmit={handleNoteSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input 
                  name="title" 
                  value={noteForm.title} 
                  onChange={handleNoteChange} 
                  placeholder="Note Title" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input 
                  name="subject" 
                  value={noteForm.subject} 
                  onChange={handleNoteChange} 
                  placeholder="e.g., Mathematics, English" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={50}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
              <input 
                name="className" 
                value={noteForm.className} 
                onChange={handleNoteChange} 
                placeholder="e.g., Grade 9, Class 10A, Form 5" 
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">Enter the class name (e.g., Grade 9, Class 10A, Form 5)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                name="description" 
                value={noteForm.description} 
                onChange={handleNoteChange} 
                placeholder="Note description (optional)" 
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">Optional description (max 500 characters)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note File {!editingNoteId && '*'}
              </label>
              <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setNoteFile(e.target.files?.[0] || null)} 
              />
              <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 50MB)</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                type="submit" 
                disabled={notesLoading}
              >
                {editingNoteId ? 'Update' : 'Add'} Note
              </button>
              {editingNoteId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingNoteId(null);
                    setNoteForm({ title: '', description: '', className: '', subject: '', fileUrl: '', fileType: 'pdf' });
                    setNoteFile(null);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {noteError && <div className="text-red-600">{noteError}</div>}
            {noteSuccess && (
              <div className="text-green-600 font-semibold">
                Note {editingNoteId ? 'updated' : 'added'} successfully!
              </div>
            )}
          </form>
        </div>

        {/* Notes List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">All Notes</h2>
          </div>
          
          {notesLoading && <div className="text-gray-500">Loading notes...</div>}
          {!notesLoading && notes.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              <p>No notes found.</p>
              <p className="text-sm mt-2">Create your first note above.</p>
            </div>
          )}
          
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{note.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{note.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {note.className}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {note.subject}
                      </span>
                      <span>Updated: {new Date(note.updatedAt || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleNoteEdit(note)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleNoteDelete(note._id || '')}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Questions Content Component
function QuestionsContent() {
  const [questions, setQuestions] = useState<QuestionBank[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionForm, setQuestionForm] = useState<QuestionBank>({
    title: '', description: '', className: '', subject: '', examType: '', year: new Date().getFullYear(), fileUrl: '', fileType: 'pdf'
  });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionFile, setQuestionFile] = useState<File | null>(null);
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [questionSuccess, setQuestionSuccess] = useState(false);

  const fetchQuestions = async () => {
    setQuestionsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/questions/admin`);
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setQuestionError('Failed to fetch questions');
    } finally {
      setQuestionsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuestionForm({ 
      ...questionForm, 
      [name]: name === 'year' ? parseInt(value) || new Date().getFullYear() : value 
    });
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.title.trim() || !questionForm.className.trim() || !questionForm.subject.trim() || !questionForm.examType.trim()) {
      setQuestionError('Please fill in all required fields');
      return;
    }

    if (!editingQuestionId && !questionFile) {
      setQuestionError('Please select a file to upload');
      return;
    }

    setQuestionsLoading(true);
    setQuestionError(null);
    
    const method = editingQuestionId ? 'PUT' : 'POST';
    const url = editingQuestionId ? `${API_BASE}/questions/${editingQuestionId}` : `${API_BASE}/questions`;
    const formData = new FormData();
    
    formData.append('title', questionForm.title);
    formData.append('description', questionForm.description);
    formData.append('className', questionForm.className);
    formData.append('subject', questionForm.subject);
    formData.append('examType', questionForm.examType);
    formData.append('year', questionForm.year.toString());
    
    if (questionFile) {
      formData.append('file', questionFile);
    }

    try {
      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save question');
      }
      
      await fetchQuestions();
      setQuestionForm({ title: '', description: '', className: '', subject: '', examType: '', year: new Date().getFullYear(), fileUrl: '', fileType: 'pdf' });
      setQuestionFile(null);
      setEditingQuestionId(null);
      setQuestionSuccess(true);
      setTimeout(() => setQuestionSuccess(false), 3000);
    } catch (error: any) {
      setQuestionError(error.message || 'Failed to save question');
    } finally {
      setQuestionsLoading(false);
    }
  };

  const handleQuestionEdit = (question: QuestionBank) => {
    setQuestionForm({
      title: question.title,
      description: question.description,
      className: question.className,
      subject: question.subject,
      examType: question.examType,
      year: question.year,
      fileUrl: question.fileUrl,
      fileType: question.fileType
    });
    setEditingQuestionId(question._id || null);
    setQuestionFile(null);
  };

  const handleQuestionDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    setQuestionsLoading(true);
    try {
      await fetch(`${API_BASE}/questions/${id}`, { method: 'DELETE' });
      await fetchQuestions();
      setQuestionSuccess(true);
      setTimeout(() => setQuestionSuccess(false), 3000);
    } catch (error) {
      setQuestionError('Failed to delete question');
    } finally {
      setQuestionsLoading(false);
    }
  };

  const examTypes = ['Mid Term', 'Final Exam', 'Unit Test', 'Practice Test', 'Mock Exam', 'Previous Year', 'Sample Paper'];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Question Bank Management</h1>
        <p className="text-gray-600 mt-2">Manage question papers and practice materials</p>
      </div>

      <div className="space-y-8">
        {/* Add/Edit Question Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingQuestionId ? 'Edit Question' : 'Add Question'}
          </h2>
          <form onSubmit={handleQuestionSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input 
                  name="title" 
                  value={questionForm.title} 
                  onChange={handleQuestionChange} 
                  placeholder="Question Paper Title" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input 
                  name="subject" 
                  value={questionForm.subject} 
                  onChange={handleQuestionChange} 
                  placeholder="e.g., Mathematics, English" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={50}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                <input 
                  name="className" 
                  value={questionForm.className} 
                  onChange={handleQuestionChange} 
                  placeholder="e.g., Grade 9, Class 10A, Form 5" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                <select 
                  name="examType" 
                  value={questionForm.examType} 
                  onChange={handleQuestionChange} 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required
                >
                  <option value="">Select Exam Type</option>
                  {examTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
              <input 
                name="year" 
                type="number" 
                value={questionForm.year} 
                onChange={handleQuestionChange} 
                min="2000" 
                max="2030"
                className="border border-gray-300 p-2 rounded-lg w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                name="description" 
                value={questionForm.description} 
                onChange={handleQuestionChange} 
                placeholder="Question paper description (optional)" 
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                maxLength={500}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question File {!editingQuestionId && '*'}
              </label>
              <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setQuestionFile(e.target.files?.[0] || null)} 
              />
              <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 50MB)</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                type="submit" 
                disabled={questionsLoading}
              >
                {editingQuestionId ? 'Update' : 'Add'} Question
              </button>
              {editingQuestionId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingQuestionId(null);
                    setQuestionForm({ title: '', description: '', className: '', subject: '', examType: '', year: new Date().getFullYear(), fileUrl: '', fileType: 'pdf' });
                    setQuestionFile(null);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {questionError && <div className="text-red-600">{questionError}</div>}
            {questionSuccess && (
              <div className="text-green-600 font-semibold">
                Question {editingQuestionId ? 'updated' : 'added'} successfully!
              </div>
            )}
          </form>
        </div>

        {/* Questions List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">All Questions</h2>
          </div>
          
          {questionsLoading && <div className="text-gray-500">Loading questions...</div>}
          {!questionsLoading && questions.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              <p>No questions found.</p>
              <p className="text-sm mt-2">Create your first question paper above.</p>
            </div>
          )}
          
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{question.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{question.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {question.className}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {question.subject}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {question.examType}
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        {question.year}
                      </span>
                      <span>Updated: {new Date(question.updatedAt || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleQuestionEdit(question)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleQuestionDelete(question._id || '')}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Documents Content Component
function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentForm, setDocumentForm] = useState<Document>({
    title: '', description: '', category: '', fileUrl: '', fileType: 'pdf', isPublic: true
  });
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [documentSuccess, setDocumentSuccess] = useState(false);

  const fetchDocuments = async () => {
    setDocumentsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/documents/admin`);
      const data = await res.json();
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setDocumentError('Failed to fetch documents');
    } finally {
      setDocumentsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setDocumentForm({ ...documentForm, [name]: checked });
    } else {
      setDocumentForm({ ...documentForm, [name]: value });
    }
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentForm.title.trim() || !documentForm.category.trim()) {
      setDocumentError('Please fill in all required fields');
      return;
    }

    if (!editingDocumentId && !documentFile) {
      setDocumentError('Please select a file to upload');
      return;
    }

    setDocumentsLoading(true);
    setDocumentError(null);
    
    const method = editingDocumentId ? 'PUT' : 'POST';
    const url = editingDocumentId ? `${API_BASE}/documents/${editingDocumentId}` : `${API_BASE}/documents`;
    const formData = new FormData();
    
    formData.append('title', documentForm.title);
    formData.append('description', documentForm.description);
    formData.append('category', documentForm.category);
    formData.append('isPublic', documentForm.isPublic?.toString() || 'true');
    
    if (documentFile) {
      formData.append('file', documentFile);
    }

    try {
      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save document');
      }
      
      await fetchDocuments();
      setDocumentForm({ title: '', description: '', category: '', fileUrl: '', fileType: 'pdf', isPublic: true });
      setDocumentFile(null);
      setEditingDocumentId(null);
      setDocumentSuccess(true);
      setTimeout(() => setDocumentSuccess(false), 3000);
    } catch (error: any) {
      setDocumentError(error.message || 'Failed to save document');
    } finally {
      setDocumentsLoading(false);
    }
  };

  const handleDocumentEdit = (document: Document) => {
    setDocumentForm({
      title: document.title,
      description: document.description,
      category: document.category,
      fileUrl: document.fileUrl,
      fileType: document.fileType,
      isPublic: document.isPublic
    });
    setEditingDocumentId(document._id || null);
    setDocumentFile(null);
  };

  const handleDocumentDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    setDocumentsLoading(true);
    try {
      await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
      await fetchDocuments();
      setDocumentSuccess(true);
      setTimeout(() => setDocumentSuccess(false), 3000);
    } catch (error) {
      setDocumentError('Failed to delete document');
    } finally {
      setDocumentsLoading(false);
    }
  };

  const categories = [
    'Application Forms',
    'Admission Forms', 
    'Policies',
    'Regulations',
    'Certificates',
    'Circulars',
    'Handbooks',
    'Brochures',
    'Guidelines',
    'Templates',
    'Reports',
    'Other'
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Documents Management</h1>
        <p className="text-gray-600 mt-2">Manage forms, policies, and other important documents</p>
      </div>

      <div className="space-y-8">
        {/* Add/Edit Document Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingDocumentId ? 'Edit Document' : 'Add Document'}
          </h2>
          <form onSubmit={handleDocumentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input 
                  name="title" 
                  value={documentForm.title} 
                  onChange={handleDocumentChange} 
                  placeholder="Document Title" 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select 
                  name="category" 
                  value={documentForm.category} 
                  onChange={handleDocumentChange} 
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                name="description" 
                value={documentForm.description} 
                onChange={handleDocumentChange} 
                placeholder="Document description (optional)" 
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                maxLength={500}
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input 
                  type="checkbox" 
                  name="isPublic" 
                  checked={documentForm.isPublic || false}
                  onChange={handleDocumentChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Make this document publicly accessible
              </label>
              <p className="text-xs text-gray-500 mt-1">If unchecked, document will be private and only visible to admins</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document File {!editingDocumentId && '*'}
              </label>
              <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                className="border border-gray-300 p-2 rounded-lg w-full max-w-md" 
                onChange={e => setDocumentFile(e.target.files?.[0] || null)} 
              />
              <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 50MB)</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                type="submit" 
                disabled={documentsLoading}
              >
                {editingDocumentId ? 'Update' : 'Add'} Document
              </button>
              {editingDocumentId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingDocumentId(null);
                    setDocumentForm({ title: '', description: '', category: '', fileUrl: '', fileType: 'pdf', isPublic: true });
                    setDocumentFile(null);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {documentError && <div className="text-red-600">{documentError}</div>}
            {documentSuccess && (
              <div className="text-green-600 font-semibold">
                Document {editingDocumentId ? 'updated' : 'added'} successfully!
              </div>
            )}
          </form>
        </div>

        {/* Documents List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">All Documents</h2>
          </div>
          
          {documentsLoading && <div className="text-gray-500">Loading documents...</div>}
          {!documentsLoading && documents.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              <p>No documents found.</p>
              <p className="text-sm mt-2">Create your first document above.</p>
            </div>
          )}
          
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{document.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{document.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {document.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        document.isPublic 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {document.isPublic ? 'Public' : 'Private'}
                      </span>
                      <span>Updated: {new Date(document.updatedAt || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleDocumentEdit(document)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDocumentDelete(document._id || '')}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Secret;
