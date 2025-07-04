import { useState, useEffect } from 'react';
import { Trophy, Music, Palette, Globe, Heart, Users } from 'lucide-react';
import { API_BASE } from '../api';

// Student Testimonials Type
type Testimonial = {
  _id?: string;
  quote: string;
  name: string;
  designation: string;
  image?: string;
  featured?: boolean;
};

const StudentLife = () => {
  // Fetch all testimonials for Student Voices section
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_BASE}/testimonials`);
        const data = await response.json();
        
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
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setTestimonialsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const activities = [
    {
      category: 'Athletics',
      icon: Trophy,
      color: 'bg-kecorange/10 text-kecorange',
      activities: [
        'Varsity Basketball', 'Soccer', 'Tennis', 'Swimming', 'Track & Field',
        'Cross Country', 'Volleyball', 'Baseball', 'Golf', 'Wrestling'
      ]
    },
    {
      category: 'Arts & Culture',
      icon: Palette,
      color: 'bg-kecblue/10 text-kecblue',
      activities: [
        'Drama Club', 'Art Society', 'Photography Club', 'Dance Team',
        'Creative Writing', 'Film Club', 'Ceramics Club', 'Digital Media'
      ]
    },
    {
      category: 'Music & Performance',
      icon: Music,
      color: 'bg-kecblue/10 text-kecblue',
      activities: [
        'Concert Band', 'Jazz Ensemble', 'Chamber Orchestra', 'Choir',
        'Musical Theater', 'Rock Band', 'Piano Club', 'Music Production'
      ]
    },
    {
      category: 'Academic Clubs',
      icon: Globe,
      color: 'bg-kecblue/10 text-kecblue',
      activities: [
        'Model UN', 'Debate Team', 'Math Olympiad', 'Science Bowl',
        'Robotics Club', 'Quiz Bowl', 'Mock Trial', 'National Honor Society'
      ]
    },
    {
      category: 'Service & Leadership',
      icon: Heart,
      color: 'bg-kecorange/10 text-kecorange',
      activities: [
        'Student Government', 'Community Service', 'Peer Tutoring', 'Environmental Club',
        'Habitat for Humanity', 'Key Club', 'Red Cross Club', 'Yearbook Committee'
      ]
    },
    {
      category: 'Special Interest',
      icon: Users,
      color: 'bg-kecorange/10 text-kecorange',
      activities: [
        'Chess Club', 'Gaming Club', 'Cooking Club', 'Gardening Club',
        'Book Club', 'Investment Club', 'Language Clubs', 'Cultural Clubs'
      ]
    }
  ];

  const events = [
    {
      title: 'Homecoming Week',
      date: 'October 2024',
      description: 'Spirit week culminating in the homecoming dance and football game.',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg'
    },
    {
      title: 'Winter Arts Festival',
      date: 'December 2024',
      description: 'Showcase of student artwork, musical performances, and theatrical productions.',
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg'
    },
    {
      title: 'Science & Innovation Fair',
      date: 'March 2025',
      description: 'Students present research projects and innovative solutions to real-world problems.',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg'
    },
    {
      title: 'Spring Cultural Celebration',
      date: 'April 2025',
      description: 'Celebrating our diverse community with food, music, and traditions from around the world.',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-kecblue to-kecorange text-kecwhite">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Life</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Beyond academics, our vibrant campus community offers countless opportunities 
            for students to explore their passions, develop leadership skills, and create lasting friendships.
          </p>
        </div>
      </section>

      {/* Campus Life Stats */}
      <section className="py-16 bg-keccream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">75+</div>
              <div className="text-gray-600">Clubs & Activities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">18</div>
              <div className="text-gray-600">Varsity Sports</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">85%</div>
              <div className="text-gray-600">Student Participation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">25+</div>
              <div className="text-gray-600">Annual Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Clubs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Clubs & Activities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your passions and develop new skills through our extensive range of 
              extracurricular activities designed to complement your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((category, index) => (
              <div key={index} className="bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-kecblue/10">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-kecblue/40 rounded-full mr-3"></span>
                        <span className="text-gray-600 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="py-20 bg-keccream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campus Facilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art facilities provide the perfect environment for learning, 
              creativity, and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Athletic Complex',
                description: 'Full gymnasium, fitness center, tennis courts, and outdoor sports fields.',
                image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg'
              },
              {
                title: 'Performing Arts Center',
                description: '500-seat auditorium with professional lighting and sound systems.',
                image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg'
              },
              {
                title: 'Innovation Lab',
                description: 'Maker space with 3D printers, robotics equipment, and design tools.',
                image: 'https://images.pexels.com/photos/8471780/pexels-photo-8471780.jpeg'
              },
              {
                title: 'Art Studios',
                description: 'Dedicated spaces for painting, sculpture, ceramics, and digital art.',
                image: 'https://images.pexels.com/photos/1070968/pexels-photo-1070968.jpeg'
              },
              {
                title: 'Library & Media Center',
                description: 'Modern library with collaborative spaces and digital resources.',
                image: 'https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg'
              },
              {
                title: 'Student Commons',
                description: 'Central gathering space for dining, socializing, and events.',
                image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
              }
            ].map((facility, index) => (
              <div key={index} className="bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-kecblue/10">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Annual Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Throughout the year, we host special events that bring our community together 
              and create memorable experiences for students, families, and staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-kecblue/10">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <span className="text-blue-700 font-medium text-sm">{event.date}</span>
                  </div>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Support Services */}
      <section className="py-20 bg-keccream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Support Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support services to ensure every student thrives 
              academically, socially, and emotionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Academic Counseling',
                description: 'Personalized guidance for course selection and college planning.',
                icon: Users
              },
              {
                title: 'Mental Health Support',
                description: 'Professional counselors available for student wellbeing.',
                icon: Heart
              },
              {
                title: 'Peer Mentoring',
                description: 'Upperclassmen mentors support new and younger students.',
                icon: Users
              },
              {
                title: 'Learning Support',
                description: 'Specialized assistance for diverse learning needs.',
                icon: Heart
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/90 p-6 rounded-2xl shadow-xl text-center border border-kecblue/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kecblue/10 rounded-full mb-4">
                  <service.icon className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Voices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what our students have to say about their experiences at Excellence Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">Loading testimonials...</div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">No testimonials available at the moment.</div>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white/90 p-6 rounded-2xl shadow-xl border border-kecblue/10">
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={
                      testimonial.image
                        ? testimonial.image.startsWith('http')
                          ? testimonial.image
                          : `${API_BASE.replace(/\/api$/, '')}${testimonial.image}`
                        : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name || 'Student')
                    }
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name || 'Student');
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-blue-700 text-sm">{testimonial.designation}</div>
                    {testimonial.featured && (
                      <div className="text-xs text-green-600 font-medium">Featured on Home</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLife;