import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoWhite from '../assets/logoWhite.png';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCategories } from '../data/mockData'; // Import mockCategories

const Navbar = ({ forceDarkIcons = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
    // These ensure dropdowns close when navigating to a new path
    setInsightsDropdownOpen(false);
    setBlogDropdownOpen(false);
    setMobileInsightsOpen(false);
    setMobileBlogOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [insightsDropdownOpen, setInsightsDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  const navLinks = [
    { href: '/ServiceHome', label: 'Services' },
    { href: '/Company', label: 'Company' },
    {
      label: 'Insights',
      href: '/insights',
      // dropdown: [
      //   {
      //     heading: 'INSIGHTS SECTIONS',
      //     items: [
      //       { href: '/insights#case-studies', label: 'Case Studies', sectionId: 'case-studies' },
      //       { href: '/insights#clients-details', label: 'Client Details', sectionId: 'clients-details' },
      //       { href: '/insights#faq', label: 'FAQ', sectionId: 'faq' },
      //     ],
      //     type: 'insights-group'
      //   }
      // ],
      // isMegaMenu: true
    },
    {
      label: 'Blogs',
      href: '/blog',
      dropdown: [
        { href: '/blog?topic=trending', label: 'Trending Posts', type: 'blog-topic' },
        { href: '/blog', label: 'All Posts', type: 'blog-topic' },
        { divider: true }, // Add divider
        ...mockCategories.map(cat => ({
          href: `/blog?filter=${cat.slug}`,
          label: cat.name,
          type: 'blog-category'
        }))
      ],
      isMegaMenu: false
    },
    { href: '/careers', label: 'Careers' },
  ];

  const getLinkClass = (linkItem, isDropdownItem = false) => {
    const isActive = activePath === linkItem.href;
    if (isDropdownItem) {
      const currentQueryParams = new URLSearchParams(location.search);
      const linkQueryParams = new URLSearchParams(linkItem.href.split('?')[1] || '');

      let paramsMatch = true;
      for (let [key, value] of linkQueryParams.entries()) {
        if (currentQueryParams.get(key) !== value) {
          paramsMatch = false;
          break;
        }
      }

      const isCurrentDropdownItemActive = location.pathname === linkItem.href.split('?')[0] && paramsMatch;

      return `block px-4 py-2 text-sm rounded-md whitespace-nowrap ${(isActive || isCurrentDropdownItemActive) ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700'
        } hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200`;
    }

    const isBlogActive = activePath.startsWith('/blog');
    const isInsightsActive = activePath.startsWith('/insights');

    return `${isActive || (linkItem.label === 'Blogs' && isBlogActive) || (linkItem.label === 'Insights' && isInsightsActive) ? 'text-purple-700 font-semibold' : scrolled ? 'text-gray-700' : 'text-white'} font-sans font-semibold text-xl hover:text-purple-700`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true)
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e, link, isMobile = false) => {
    e.preventDefault(); // Prevent default Link navigation for dropdown items
    setInsightsDropdownOpen(false);
    setBlogDropdownOpen(false);
    if (isMobile) {
      setMobileInsightsOpen(false);
      setMobileBlogOpen(false);
      setMenuOpen(false);
    }

    if (link.sectionId && location.pathname === link.href.split('#')[0]) {
      const element = document.getElementById(link.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      navigate(link.href);
      // Scroll to top for blog-related navigation
      if (link.href.includes('/blog')) {
        setTimeout(() => window.scrollTo(0, 0), 100);
      }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scaleY: 0, originY: 0 },
    visible: { opacity: 1, y: 0, scaleY: 1, originY: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scaleY: 0, originY: 0, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="h-[70px] flex items-center px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img src={scrolled ? logo : logoWhite} alt="Logo" className="h-[48px] sm:h-[60px] mr-2 sm:mr-4" />
          </Link>
        </div>

        {/* Hamburger */}
        <div className="flex-1 flex items-center justify-end sm:hidden">
          <button
            className={`p-2 focus:outline-none`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none"
              stroke={forceDarkIcons || scrolled ? "#222" : "#fff"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex flex-1 items-center justify-center">
          <div className="flex items-center space-x-6 md:space-x-12">
            {navLinks.map(link => (
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.label === 'Insights') setInsightsDropdownOpen(true);
                    if (link.label === 'Blogs') setBlogDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (link.label === 'Insights') setInsightsDropdownOpen(false);
                    if (link.label === 'Blogs') setBlogDropdownOpen(false);
                  }}
                >
                  <Link
                    to={link.href}
                    className={`${getLinkClass(link)} flex items-center gap-1`}
                    onClick={() => {
                      if (link.label === 'Insights') setInsightsDropdownOpen(false);
                      if (link.label === 'Blogs') setBlogDropdownOpen(false);
                    }}
                  >
                    {link.label}
                    {/* Chevron icon for dropdown */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ml-1 transition-transform duration-200 ${(link.label === 'Insights' && insightsDropdownOpen) ||
                        (link.label === 'Blogs' && blogDropdownOpen)
                        ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {/*  Dropdown content */}
                  <AnimatePresence>
                    {((link.label === 'Insights' && insightsDropdownOpen) ||
                      (link.label === 'Blogs' && blogDropdownOpen)) && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                        >
                          {link.label === 'Blogs' ? (
                            <div className="py-1">
                              {link.dropdown.map((dropdownItem, index) => (
                                dropdownItem.divider ? (
                                  <div key={index} className="border-t border-gray-200 my-2"></div>
                                ) : (
                                  <Link
                                    key={dropdownItem.label}
                                    to={dropdownItem.href}
                                    onClick={(e) => handleNavLinkClick(e, dropdownItem)}
                                    className={`${getLinkClass(dropdownItem, true)} ${dropdownItem.type === 'blog-topic' ? 'font-medium' : ''
                                      }`}
                                  >
                                    {dropdownItem.type === 'blog-topic' && (
                                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    )}
                                    {dropdownItem.label}
                                  </Link>
                                )
                              ))}
                            </div>
                          ) : (
                            // Insights dropdown rendering 
                            <div className="py-2">
                              {link.dropdown.filter(group => group.type === 'insights-group').map(group => (
                                <div key={group.heading}>
                                  <h4 className="text-lg font-bold text-gray-900 px-4 py-2 border-b mb-2">{group.heading}</h4>
                                  {group.items.map(dropdownItem => (
                                    <Link
                                      key={dropdownItem.label}
                                      to={dropdownItem.href}
                                      onClick={(e) => handleNavLinkClick(e, dropdownItem)}
                                      className={getLinkClass(dropdownItem, true)}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={getLinkClass(link)}
                  onClick={() => {
                    // Scroll to top when navigating to blog or careers
                    if (link.href === '/blog' || link.href === '/careers') {
                      setTimeout(() => window.scrollTo(0, 0), 100);
                    }
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <div className="hidden sm:block">
          <Link to="/contact-us" className={`px-4 sm:px-5 py-2 rounded-full font-sans transition justify-end ${scrolled ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-transparent text-white border border-white hover:bg-white hover:text-purple-700'}`}>
            Contact us
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`sm:hidden bg-black shadow-md w-full absolute top-[70px] left-0 z-40`}
          >
            <div className="flex flex-col items-center py-4 space-y-2">
              {navLinks.map(link => (
                link.dropdown ? (
                  <div key={link.label} className="w-full">
                    <button
                      className={`w-full text-center py-2 text-xl flex items-center justify-center gap-1 ${activePath.includes(link.href) ? 'text-purple-400 font-bold underline' : 'text-white font-semibold'} hover:bg-gray-900`}
                      onClick={() => {
                        if (link.label === 'Insights') setMobileInsightsOpen(!mobileInsightsOpen);
                        if (link.label === 'Blogs') setMobileBlogOpen(!mobileBlogOpen);
                      }}
                    >
                      {link.label}
                      {/* Chevron icon for mobile submenu */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${(link.label === 'Insights' && mobileInsightsOpen) ||
                          (link.label === 'Blogs' && mobileBlogOpen)
                          ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Mobile submenu content */}
                    <AnimatePresence>
                      {((link.label === 'Insights' && mobileInsightsOpen) ||
                        (link.label === 'Blogs' && mobileBlogOpen)) && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="flex flex-col items-center bg-gray-900 py-2 space-y-1"
                          >
                            {link.label === 'Blogs' ? (
                              <>
                                {/*  mobile blog dropdown */}
                                {link.dropdown.map((dropdownItem, index) => (
                                  dropdownItem.divider ? (
                                    <div key={index} className="w-full border-t border-gray-600 my-2"></div>
                                  ) : (
                                    <Link
                                      key={dropdownItem.label}
                                      to={dropdownItem.href}
                                      onClick={(e) => handleNavLinkClick(e, dropdownItem, true)}
                                      className={`w-full text-center py-2 text-sm transition-colors duration-200 ${dropdownItem.type === 'blog-topic'
                                          ? 'text-purple-300 font-medium hover:bg-gray-700 hover:text-purple-200'
                                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  )
                                ))}
                              </>
                            ) : (
                              // Insights dropdown rendering for mobile 
                              link.dropdown.filter(group => group.type === 'insights-group').map(group => (
                                <div key={group.heading} className="w-full flex flex-col">
                                  <p className="text-sm font-bold text-gray-300 mt-2 text-center">{group.heading}</p>
                                  {group.items.map(dropdownItem => (
                                    <Link
                                      key={dropdownItem.label}
                                      to={dropdownItem.href}
                                      onClick={(e) => handleNavLinkClick(e, dropdownItem, true)}
                                      className="w-full text-center py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white block"
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ))}
                                </div>
                              ))
                            )}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={getLinkClass(link)}
                    onClick={() => {
                      setMenuOpen(false);
                      // Scroll to top when navigating to blog or careers
                      if (link.href === '/blog' || link.href === '/careers') {
                        setTimeout(() => window.scrollTo(0, 0), 100);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Link
                to="/contact-us"
                className="w-full text-center py-2 mt-2 rounded-full bg-purple-700 text-white font-semibold hover:bg-purple-800"
                onClick={() => setMenuOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;


