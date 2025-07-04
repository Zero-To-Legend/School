import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import ELibrary from './pages/ELibrary';
import Admissions from './pages/Admissions';
import StudentLife from './pages/StudentLife';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Notice from './pages/Notice';
import NoticePopup from './components/NoticePopup';
import Secret from './pages/Secret';
import Contact from './pages/Contact';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Only show Navbar if not on /secret */}
        {window.location.pathname !== '/secret' && <Navbar />}
        {/* Only show NoticePopup if not on /secret */}
        {window.location.pathname !== '/secret' && <NoticePopup />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/*" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/elibrary" element={<ELibrary />} />
            <Route path="/admissions" element={<Admissions />} />
            {/* Faculty is now under About subsections */}
            <Route path="/student-life" element={<StudentLife />} />
            <Route path="/news" element={<News />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/results" element={<Results />} />
            <Route path="/secret" element={<Secret />} />
          </Routes>
        </main>
        {/* Only show Footer if not on /secret */}
        {window.location.pathname !== '/secret' && <Footer />}
      </div>
    </Router>
  );
}

export default App;