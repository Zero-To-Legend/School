import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, Users, Globe } from 'lucide-react';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Education Boulevard', 'Academic City, AC 12345', 'United States'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['Main Office: (555) 123-4567', 'Admissions: (555) 123-4568', 'Athletics: (555) 123-4569'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: ['info@excellenceacademy.edu', 'admissions@excellenceacademy.edu', 'athletics@excellenceacademy.edu'],
      color: 'from-teal-600 to-teal-700'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 7:30 AM - 4:00 PM', 'Saturday: 8:00 AM - 12:00 PM', 'Sunday: Closed'],
      color: 'from-blue-600 to-blue-700'
    }
  ];

  const departments = [
    {
      name: 'Admissions Office',
      phone: '(555) 123-4568',
      email: 'admissions@excellenceacademy.edu',
      contact: 'Maria Rodriguez, Director',
      icon: Users
    },
    {
      name: 'Academic Affairs',
      phone: '(555) 123-4570',
      email: 'academics@excellenceacademy.edu',
      contact: 'Dr. Michael Chen, Academic Director',
      icon: Globe
    },
    {
      name: 'Student Services',
      phone: '(555) 123-4571',
      email: 'students@excellenceacademy.edu',
      contact: 'Dr. Emily Johnson, Director',
      icon: MessageCircle
    },
    {
      name: 'Athletics Department',
      phone: '(555) 123-4569',
      email: 'athletics@excellenceacademy.edu',
      contact: 'Coach David Thompson, Athletic Director',
      icon: CheckCircle
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-navblue via-navblue/90 to-navorange text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-navorange to-heroorange rounded-full flex items-center justify-center shadow-2xl">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-navorange/20 to-heroorange/20 rounded-full blur-xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-navorange to-white bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 leading-relaxed">
              We're here to answer your questions and help you discover all that Excellence Academy has to offer. 
              Connect with us today and become part of our thriving educational community.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="flex items-center space-x-6 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-200">Available 24/7</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-teal-400" />
                  <span className="text-sm font-medium text-gray-200">(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Connect With Us
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're a prospective family, current parent, or community member, 
              we're here to provide the support and information you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-200 hover:border-teal-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500"></div>
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-200">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Send us a Message</h3>
                <p className="text-slate-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-800 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-800 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-800 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-800 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50"
                  >
                    <option value="">Select a subject</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="academics">Academic Programs</option>
                    <option value="athletics">Athletics</option>
                    <option value="student-life">Student Life</option>
                    <option value="general">General Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 resize-none"
                    placeholder="Please tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-teal-600 hover:to-blue-600"
                >
                  Send Message
                  <Send className="ml-3 h-5 w-5" />
                </button>

                {formSubmitted && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-xl">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">Message sent successfully!</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Map */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-200">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Visit Our Campus</h3>
                <p className="text-slate-600">Come see what makes Excellence Academy special. We're located in the heart of Academic City.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-teal-100 h-72 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-blue-200/20"></div>
                <div className="text-center text-slate-700 z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Interactive Campus Map</h4>
                  <p className="text-sm">123 Education Boulevard</p>
                  <p className="text-sm">Academic City, AC 12345</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-teal-600" />
                    Campus Tours
                  </h4>
                  <p className="text-slate-600 text-sm mb-3">
                    We offer guided campus tours every weekday at 10:00 AM and 2:00 PM. 
                    Weekend tours are available by appointment.
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center">
                    Schedule a Tour
                    <Send className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Parking & Transportation
                  </h4>
                  <p className="text-slate-600 text-sm mb-2">
                    Visitor parking is available in the main lot. Please check in at the main office upon arrival.
                  </p>
                  <p className="text-slate-600 text-sm">
                    <strong>Public Transit:</strong> Metro Bus Routes 15 and 23 - Academic Center Station
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Department Contacts</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect directly with specific departments for specialized assistance and personalized support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-teal-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 to-blue-500"></div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <dept.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">{dept.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-teal-600 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 font-medium">{dept.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-blue-600 mr-3 flex-shrink-0" />
                          <a href={`mailto:${dept.email}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            {dept.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-teal-600 mr-3 flex-shrink-0" />
                          <span className="text-slate-600 text-sm">{dept.contact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find quick answers to common questions about Excellence Academy and our programs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: 'What are your admission requirements?',
                answer: 'We require completed application forms, transcripts, recommendation letters, and an interview. Specific requirements vary by grade level and we provide personalized guidance throughout the process.'
              },
              {
                question: 'Do you offer financial aid?',
                answer: 'Yes, we offer comprehensive need-based financial aid and merit scholarships. Approximately 40% of our students receive some form of financial assistance, ensuring our programs are accessible to families from all backgrounds.'
              },
              {
                question: 'What is your student-teacher ratio?',
                answer: 'Our average student-teacher ratio is 12:1, ensuring personalized attention and support for each student. This allows for individualized learning plans and meaningful mentor relationships.'
              },
              {
                question: 'Do you offer before and after school care?',
                answer: 'Yes, we provide supervised care from 7:00 AM to 6:00 PM for families who need extended hours. Our extended care program includes homework support, enrichment activities, and healthy snacks.'
              }
            ].map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-teal-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Still Have Questions?</h3>
              <p className="text-slate-600 mb-6">
                Our admissions team is here to help you every step of the way. 
                Don't hesitate to reach out for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us Now
                </button>
                <button className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-slate-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;