'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Briefcase, Mail, Info, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '/#about', icon: Info },
    { name: 'Works', href: '/#works', icon: Briefcase },
    { name: 'Contact', href: '/#contact', icon: Mail },
  ];

  // Desktop Navigation
  const DesktopNav = () => (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'py-2 bg-light-bgPrimary/80 dark:bg-dark-bgPrimary/80 backdrop-blur-lg border-b border-light-border dark:border-dark-border shadow-sm' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold text-light-textAccent dark:text-dark-textAccent font-heading transition-colors duration-300"
          >
            PORTFOLIO
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-light-textPrimary dark:text-dark-textPrimary font-medium transition-all duration-300 ease-in-out hover:text-light-textAccent dark:hover:text-dark-textAccent ${
                    isActive ? 'text-light-textAccent dark:text-dark-textAccent' : ''
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-light-textAccent dark:bg-dark-textAccent transition-all duration-300 ease-in-out group-hover:w-full" />
                  {isActive && (
                    <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-light-textAccent dark:bg-dark-textAccent" />
                  )}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-light-bgPrimary/90 dark:bg-dark-bgPrimary/90 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/');
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out ${
                      isActive 
                        ? 'text-light-textAccent dark:text-dark-textAccent bg-light-buttonPrimary/10 dark:bg-dark-buttonPrimary/10' 
                        : 'text-light-textPrimary dark:text-dark-textPrimary hover:text-light-textAccent dark:hover:text-dark-textAccent'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="text-xl font-medium">{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  // Mobile Navigation (Floating Bottom Bar) - Only shown on small screens when menu is closed
  const MobileNav = () => (
    <div className={`md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-1rem)] max-w-xs will-change-transform transition-opacity duration-300 ${
      mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="bg-light-bgPrimary/80 dark:bg-dark-bgPrimary/80 backdrop-blur-md shadow-md rounded-lg px-1 py-1 border border-light-border dark:border-dark-border">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center p-1 rounded-md transition-all duration-300 ease-in-out ${
                  isActive 
                    ? 'text-light-textAccent dark:text-dark-textAccent' 
                    : 'text-light-textPrimary dark:text-dark-textPrimary hover:text-light-textAccent dark:hover:text-dark-textAccent'
                }`}
                scroll={false} // Prevent default scroll behavior
              >
                <div className="flex flex-col items-center">
                  <Icon size={16} />
                  <span className="text-[0.6rem] mt-0.5">{item.name}</span>
                  {isActive && (
                    <div className="mt-0.5 w-1 h-1 rounded-full bg-light-textAccent dark:bg-dark-textAccent" />
                  )}
                </div>
              </Link>
            );
          })}
          <div 
            className="flex flex-col items-center justify-center p-1 rounded-md transition-all duration-300 ease-in-out"
          >
            <ThemeToggle />
            <span className="text-[0.6rem] mt-0.5">Theme</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};

export default Navbar;