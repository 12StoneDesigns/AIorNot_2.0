import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home'; // Import Home page
import About from './pages/About'; // Import About page
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import Privacy Policy page
import TermsOfService from './pages/TermsOfService'; // Import Terms of Service page

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
