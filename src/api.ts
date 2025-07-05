// API configuration
export const API_BASE = import.meta.env.PROD 
  ? null // No backend in production for now
  : (import.meta.env.VITE_API_BASE || 'http://localhost:5000/api');

export const API_ENDPOINTS = {
  LOGO: API_BASE ? `${API_BASE}/logo` : null,
  NOTICES: API_BASE ? `${API_BASE}/notices` : null,
  SETTINGS: API_BASE ? `${API_BASE}/settings` : null,
  GALLERY: API_BASE ? `${API_BASE}/gallery` : null,
  NEWS: API_BASE ? `${API_BASE}/news` : null,
  UPLOAD: API_BASE ? `${API_BASE}/upload` : null,
  HERO: API_BASE ? `${API_BASE}/hero` : null,
  FEATURES: API_BASE ? `${API_BASE}/features` : null,
  TESTIMONIALS: API_BASE ? `${API_BASE}/testimonials` : null,
  ASSIGNMENTS: API_BASE ? `${API_BASE}/assignments` : null,
};

// Fallback data for production
export const FALLBACK_DATA = {
  hero: {
    title: "Excellence Academy",
    subtitle: "Inspiring Tomorrow's Leaders;Empowering Future Innovators;Building Character & Excellence",
    subtitles: ["Inspiring Tomorrow's Leaders", "Empowering Future Innovators", "Building Character & Excellence"],
    description: "A premier educational institution dedicated to academic excellence and holistic development.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
    welcome: "Welcome to Excellence Academy"
  },
  features: [
    {
      _id: "1",
      title: "Academic Excellence",
      description: "Comprehensive curriculum designed to foster critical thinking and academic achievement with modern teaching methodologies.",
      icon: "📚",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
    },
    {
      _id: "2", 
      title: "Experienced Faculty",
      description: "Dedicated teachers with years of experience in their respective fields, committed to student success.",
      icon: "👨‍🏫",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      _id: "3",
      title: "Modern Facilities",
      description: "State-of-the-art infrastructure supporting innovative learning methods and extracurricular activities.",
      icon: "🏫",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop"
    },
    {
      _id: "4",
      title: "Holistic Development",
      description: "Focus on overall personality development including sports, arts, and leadership skills.",
      icon: "🌟",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop"
    }
  ],
  notices: [
    {
      id: 1,
      title: "Welcome to Excellence Academy",
      content: "We are committed to providing quality education and fostering student growth. Join us in our mission to create future leaders.",
      message: "We are committed to providing quality education and fostering student growth. Join us in our mission to create future leaders.",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      priority: "high",
      category: "General",
      isUrgent: false,
      showPopup: true
    },
    {
      id: 2,
      title: "Admission Open for 2025-26",
      content: "Applications are now open for the academic year 2025-26. Visit our admissions page for more details about eligibility, fees, and important dates.",
      message: "Applications are now open for the academic year 2025-26. Visit our admissions page for more details.",
      date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      priority: "medium",
      category: "Admissions",
      isUrgent: false,
      showPopup: false
    }
  ],
  news: [
    {
      id: 1,
      title: "Annual Sports Day 2025",
      summary: "Join us for our annual sports day celebration featuring various competitive events and activities for all age groups.",
      content: "Our annual sports day will be held on March 15, 2025, featuring track and field events, team sports, and cultural performances.",
      date: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      category: "Events"
    },
    {
      id: 2,
      title: "Science Fair Winners Announced",
      summary: "Congratulations to our students who excelled in the district science fair with innovative projects and presentations.",
      content: "Our students won multiple awards at the district science fair, showcasing their creativity and scientific knowledge.",
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
      category: "Academic"
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Alumni - Class of 2023",
      content: "Excellence Academy provided me with the foundation I needed to succeed in university. The teachers were incredibly supportive and the curriculum was challenging yet engaging.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c69fcb85?w=100&h=100&fit=crop&crop=face",
      featured: true
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Parent",
      content: "As a parent, I'm impressed with the holistic approach to education. My child has grown not just academically but also personally and socially.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      featured: true
    }
  ],
  gallery: [
    {
      _id: "1",
      event: "Annual Sports Day 2024",
      images: [
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop"
      ],
      createdAt: new Date().toISOString()
    },
    {
      _id: "2", 
      event: "Science Exhibition",
      images: [
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  assignments: [
    {
      _id: "1",
      title: "Mathematics Assignment - Algebra",
      description: "Complete the algebra problems from Chapter 5. Show all working steps clearly.",
      className: "Grade 10",
      subject: "Mathematics",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileType: "pdf" as const,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      createdAt: new Date().toISOString(),
      uploadedBy: "Mr. Smith"
    },
    {
      _id: "2",
      title: "English Essay - Creative Writing",
      description: "Write a 500-word creative essay on the topic 'A Day in the Future'.",
      className: "Grade 9",
      subject: "English",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileType: "pdf" as const,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      uploadedBy: "Ms. Johnson"
    }
  ]
};

// Helper function to fetch data with fallback
export const fetchWithFallback = async (endpoint: string | null, fallbackKey: keyof typeof FALLBACK_DATA) => {
  if (!endpoint || import.meta.env.PROD) {
    return FALLBACK_DATA[fallbackKey] || null;
  }
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}, using fallback data:`, error);
    return FALLBACK_DATA[fallbackKey] || null;
  }
};

// Helper function to get image URL safely
export const getImageUrl = (path: string | null | undefined) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return API_BASE ? `${API_BASE.replace(/\/api$/, '')}${path}` : path;
};
