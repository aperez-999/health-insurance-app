import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import QuoteRequest from './pages/QuoteRequest';
import InsuranceQuotes from './pages/InsuranceQuotes';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Enrollment from './pages/Enrollment';
import EnrollmentConfirmation from './pages/EnrollmentConfirmation';

function App() {
  return (
    <ChakraProvider>
      <Router basename="/health-insurance-app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quote-request" element={<QuoteRequest />} />
          <Route path="/insurance-quotes" element={<InsuranceQuotes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/enrollment-confirmation" element={<EnrollmentConfirmation />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
