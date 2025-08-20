import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ServiceHome from './pages/Services Pages/ServiceHome';
import Company from './pages/Company page/Company';
import LoadingScreen from './components/LoadingScreen';
import Careers from './pages/Career/Careers';
import OpportunityDetail from './components/OpportunityDetailModal';
import MicrofinancePage from './pages/Services Pages/MicrofinancePage';
import ErpServicePage from './pages/Services Pages/ErpServicePage';
import BlogList from './pages/Blog/BlogList';
import BlogPostDetail from './pages/Blog/BlogPostDetail';
import PawningServicePage from './pages/Services Pages/PawningServicePage';
import DigitalMarketingServicePage from './pages/Services Pages/DigitalMarketingServicePage';
import ContactUs from './pages/ContactUs/ContactUs';
import InvoiceSystemPage from './pages/Services Pages/InvoiceSystemPage';
import LeasingSystem from './pages/Services Pages/LeasingSystem';
import InsightsPage from './pages/Insights/InsightsPage';
import RealstatePage from './pages/Services Pages/RealstatePage';
import GreenLankaCaseStudy from './pages/CaseStudies/GreenLankaCaseStudy';
import PrivacyPolicy from './pages/privacy and legacy/PrivacyPolicy';
import SecurityPolicy from './pages/privacy and legacy/SecurityPolicy';
import TermsOfService from './pages/privacy and legacy/TermsOfService';
import LegalPolicy from './pages/privacy and legacy/LegalPolicy';
import MinvensCaseStudy from './pages/CaseStudies/MinvensCaseStudy';
import FinWinCaseStudy from './pages/CaseStudies/FinWinCaseStudy';
import CBCCapitalCaseStudy from './pages/CaseStudies/CBCCapitalCaseStudy';
import DandNInvestmentCaseStudy from './pages/CaseStudies/DandNInvestmentCaseStudy';
import NSKBusinessSolutionsCaseStudy from './pages/CaseStudies/NSKBusinessSolutionsCaseStudy';
import OrientTrustInvestmentCaseStudy from './pages/CaseStudies/OrientTrustInvestmentCaseStudy';
import RightWayCreditInvestmentCaseStudy from './pages/CaseStudies/RightWayCreditInvestmentCaseStudy';
import FutureHopeInvestmentCaseStudy from './pages/CaseStudies/FutureHopeInvestmentCaseStudy';

import AdminSignin from './pages/Admin/Signin'
import AdminSignup from './pages/Admin/Signup';
import AdminHome from './pages/Admin/Home/AdminHome'
import ClientLogo from './pages/Admin/Client/ClientLogo';
import ClientReview from './pages/Admin/Client/ClientReview';
import BlogManager from './pages/Admin/Blog/Blog';
import CreateBlog from './pages/Admin/Blog/CreateBlog';
import EditBlog from './pages/Admin/Blog/EditBlog';
import AddCareer from './pages/Admin/Career/AddCareer';
import AdminCareerManager from './pages/Admin/Career/AdminCareerManager';
import EditCareer from './pages/Admin/Career/EditCareer';
import CommentsManager from './pages/Admin/Comments/CommentsManager';
import AdminApplications from './pages/Admin/Career/AdminApplications';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin/signin" replace />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ServiceHome" element={<ServiceHome />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />
        <Route path="/opportunities/:id" element={<OpportunityDetail />} />
        <Route path="/Company" element={<Company />} />
        <Route path="/services/microfinance" element={<MicrofinancePage />} />
        <Route path="/services/erp" element={<ErpServicePage />} />
        <Route path="/services/pawning" element={<PawningServicePage />} />
        <Route path="/services/marketing" element={<DigitalMarketingServicePage />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path="/services/invoice" element={<InvoiceSystemPage />} />
        <Route path="/services/leasing" element={<LeasingSystem />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/services/realestate" element={<RealstatePage />} />
        <Route path="/case-studies/green-lanka" element={<GreenLankaCaseStudy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/legal-policy" element={<LegalPolicy />} />
        <Route path="/case-studies/minvens" element={<MinvensCaseStudy />} />
        <Route path="/case-studies/finwin" element={<FinWinCaseStudy />} />
        <Route path="/case-studies/cbc-capital" element={<CBCCapitalCaseStudy />} />
        <Route path="/case-studies/d-n-investment" element={<DandNInvestmentCaseStudy />} />
        <Route path="/case-studies/nsk-business-solutions" element={<NSKBusinessSolutionsCaseStudy />} />
        <Route path="/case-studies/orient-trust-investment" element={<OrientTrustInvestmentCaseStudy />} />
        <Route path="/case-studies/rightway-credit-investment" element={<RightWayCreditInvestmentCaseStudy />} />
        <Route path="/case-studies/future-hope-investment" element={<FutureHopeInvestmentCaseStudy />} />

        {/* Admin Public Routes */}
        <Route path="/admin/signin" element={<AdminSignin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* Admin Protected Routes */}
        <Route path="/admin/home" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
        <Route path="/admin/client-logo" element={<PrivateRoute><ClientLogo /></PrivateRoute>} />
        <Route path="/admin/client-review" element={<PrivateRoute><ClientReview /></PrivateRoute>} />
        <Route path="/admin/blog" element={<PrivateRoute><BlogManager /></PrivateRoute>} />
        <Route path="/admin/create-blog" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
        <Route path="/admin/edit-blog/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
        <Route path="/admin/careers" element={<PrivateRoute><AdminCareerManager /></PrivateRoute>} />
        <Route path="/admin/add-career" element={<PrivateRoute><AddCareer /></PrivateRoute>} />
        <Route path="/admin/edit-career/:id" element={<PrivateRoute><EditCareer /></PrivateRoute>} />
        <Route path="/admin/comments" element={<PrivateRoute><CommentsManager /></PrivateRoute>} />
        <Route path="/admin/applications" element={<PrivateRoute><AdminApplications /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
