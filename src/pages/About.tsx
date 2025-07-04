import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AboutSchool from './AboutSchool';
import AboutFaculty from './AboutFaculty';

const About = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/school" element={<AboutSchool />} />
      <Route path="/faculty" element={<AboutFaculty />} />
      {/* Default to About School if no subpath is given */}
      <Route path="*" element={<Navigate to="/about/school" replace />} />
    </Routes>
  );
};

export default About;