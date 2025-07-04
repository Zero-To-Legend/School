
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

import { API_BASE } from '../api';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [logo, setLogo] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/logo`)
      .then(res => res.json())
      .then(data => {
        let image = data.image || '';
        if (image && !/^https?:\/\//.test(image)) {
          const base = API_BASE.replace(/\/api$/, '');
          image = base + image;
        }
        setLogo(image);
      });
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
      dropdown: [
        { name: 'About School', href: '/about/school' },
        { name: 'Faculty', href: '/about/faculty' },
      ],
    },
    { name: 'Academics', href: '/academics' },
    { name: 'eLibrary', href: '/elibrary' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Student Life', href: '/student-life' },
    { name: 'Gallery', href: '/gallery' },
    {
      name: 'Announcements',
      dropdown: [
        { name: 'News', href: '/news' },
        { name: 'Notice', href: '/notice' },
        { name: 'Results', href: '/results' },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ];

  // Split navigation for left and right of logo
  // Place logo on the left, all nav items to the right
  // If you want some nav items on the left, adjust leftNav/rightNav as needed
  const leftNav = [];
  const rightNav = navigation;

  return (
    <nav className="bg-gradient-to-r from-herocream to-white shadow-lg sticky top-0 z-50 border-b border-heroorange/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo on the left */}
          <div className="flex flex-shrink-0 items-center mr-8">
            <Link to="/" className="flex items-center group">
              <div className="relative bg-gradient-to-br from-white to-herocream rounded-xl shadow-md border border-navblue/20 p-2 hover:shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-navorange/30">
                {logo ? (
                  <img
                    src={logo}
                    alt="School Logo"
                    className="h-12 w-20 object-contain rounded-lg"
                    style={{ maxHeight: 48, maxWidth: 80 }}
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                ) : (
                  <GraduationCap className="h-8 w-8 text-navblue transition-transform duration-300 group-hover:scale-110 group-hover:text-navorange" />
                )}
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {rightNav.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-navorange/10 border border-transparent hover:border-navorange/30 relative ${
                    item.dropdown.some(opt => location.pathname === opt.href)
                      ? 'text-navorange bg-navorange/10 border-navorange/30'
                      : 'text-navblue hover:text-navorange'
                  }`}>
                    <span>{item.name}</span>
                    <svg className="w-4 h-4 ml-1 inline transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    {/* Hover underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navorange rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-navorange/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 transform scale-95 group-hover:scale-100">
                    <div className="py-2">
                      {item.dropdown.map((opt) => (
                        <Link
                          key={opt.name}
                          to={opt.href}
                          className={`block px-4 py-3 text-sm transition-all duration-150 hover:bg-navorange/10 hover:text-navorange border-l-3 hover:border-navorange ${
                            location.pathname === opt.href 
                              ? 'font-semibold text-navorange bg-navorange/10 border-navorange' 
                              : 'text-navblue border-transparent'
                          }`}
                        >
                          {opt.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-navorange/10 border border-transparent hover:border-navorange/30 group ${
                    location.pathname === item.href
                      ? 'text-navorange bg-navorange/10 border-navorange/30'
                      : 'text-navblue hover:text-navorange'
                  }`}
                >
                  {item.name}
                  {/* Active state underline */}
                  {location.pathname === item.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navorange rounded-full"></div>
                  )}
                  {/* Hover underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navorange rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-navblue hover:text-navorange hover:bg-navorange/10 focus:outline-none focus:ring-2 focus:ring-navorange transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-heroorange/20">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-r from-herocream to-white backdrop-blur-lg">
            {navigation.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="space-y-2">
                  <div className="px-3 py-2 text-sm font-semibold text-navblue bg-navorange/10 rounded-lg">
                    {item.name}
                  </div>
                  <div className="ml-4 space-y-1">
                    {item.dropdown.map((opt) => (
                      <Link
                        key={opt.name}
                        to={opt.href}
                        className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-navorange/10 hover:text-navorange ${
                          location.pathname === opt.href
                            ? 'text-navorange bg-navorange/10 font-semibold'
                            : 'text-navblue'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {opt.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-navorange/10 hover:text-navorange ${
                    location.pathname === item.href
                      ? 'text-navorange bg-navorange/10 font-semibold'
                      : 'text-navblue'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;