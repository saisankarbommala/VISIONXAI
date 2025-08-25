'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'events', label: 'Technical Events' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Shadow/glass on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = original || '';
    return () => {
      document.body.style.overflow = original || '';
    };
  }, [isMobileMenuOpen]);

  // Close on ESC & click outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto ${
        isScrolled ? 'glassmorphism backdrop-blur-lg' : 'bg-transparent'
      }`}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            type="button"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            aria-label="Go to Home"
          >
            <span className="relative inline-flex">
              <Brain className="w-7 h-7 text-cyan-400" />
              <span className="absolute inset-0 bg-cyan-400 blur-lg opacity-30 animate-pulse" />
            </span>
            <span className="hidden md:block text-left">
              <span className="text-lg font-bold orbitron gradient-text leading-none">VISIONX AI</span>
              <span className="block text-[10px] text-cyan-300 -mt-0.5">2025</span>
            </span>
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <motion.button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-300'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  />
                )}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
                  whileHover={{ width: '100%' }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring focus:ring-cyan-500/30"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu + Backdrop (fixed so it floats above everything) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Panel */}
            <motion.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              className="fixed top-16 left-0 right-0 z-50 md:hidden mx-3 rounded-xl glassmorphism backdrop-blur-lg overflow-hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              role="menu"
            >
              <div className="py-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-200 hover:text-cyan-300 hover:bg-cyan-400/5'
                    }`}
                    role="menuitem"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
