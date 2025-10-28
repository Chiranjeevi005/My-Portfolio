'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Briefcase, Mail, Info } from 'lucide-react';
import ThemeToggle from '@/components/home/ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '/about', icon: Info },
    { name: 'Works', href: '/works', icon: Briefcase },
    { name: 'Contact', href: '/contact', icon: Mail },
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

          {/* Remove mobile menu button */}
        </div>
      </div>
    </nav>
  );

  // Mobile Navigation (Glassmorphic Capsule Bar)
  const MobileNav = () => (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw]">
      <div 
        className="flex justify-around items-center h-[70px] rounded-full p-4 backdrop-blur-md border"
        style={{ 
          backgroundColor: 'rgba(var(--color-bg-primary), 0.7)',
          borderColor: 'rgba(var(--color-border), 0.5)',
          boxShadow: '4px 4px 12px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.6)'
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-full transition-all duration-300 ease-in-out flex-1 h-full max-w-[60px] ${
                isActive 
                  ? 'text-light-textAccent dark:text-dark-textAccent scale-105' 
                  : 'text-light-textPrimary dark:text-dark-textPrimary hover:text-light-textAccent dark:hover:text-dark-textAccent'
              }`}
              scroll={false}
            >
              <div className="flex flex-col items-center">
                <Icon size={24} />
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
        <div 
          className="flex flex-col items-center justify-center rounded-full transition-all duration-300 ease-in-out flex-1 h-full max-w-[60px] hover:text-light-textAccent dark:hover:text-dark-textAccent"
        >
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <ThemeToggle />
            </div>
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