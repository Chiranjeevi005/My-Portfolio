'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-lightBg/90 dark:bg-darkBg/90 backdrop-blur-sm py-2 border-b border-accent1Light/20 dark:border-accent1Dark/20' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-accent1Light dark:text-accent1Dark font-heading transition-colors duration-300">
            PORTFOLIO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link href="/#features" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300 font-medium">
              Features
            </Link>
            <Link href="/#projects" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300 font-medium">
              Projects
            </Link>
            <Link href="/#about" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300 font-medium">
              About
            </Link>
            <Link href="/#contact" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300 font-medium">
              Contact
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              className="text-textPrimaryLight dark:text-textPrimaryDark focus:outline-none transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-accent1Light/20 dark:border-accent1Dark/20 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/#features" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                Features
              </Link>
              <Link href="/#projects" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                Projects
              </Link>
              <Link href="/#about" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/#contact" className="text-textPrimaryLight dark:text-textPrimaryDark hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;