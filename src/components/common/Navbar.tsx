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

          {/* Remove mobile menu button */}
        </div>
      </div>
    </nav>
  );

  // Mobile Navigation (Full Width Bottom Bar)
  const MobileNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 will-change-transform">
      <div className="bg-light-bgPrimary/80 dark:bg-dark-bgPrimary/80 backdrop-blur-md border-t border-light-border dark:border-dark-border">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-300 ease-in-out flex-1 ${
                  isActive 
                    ? 'text-light-textAccent dark:text-dark-textAccent' 
                    : 'text-light-textPrimary dark:text-dark-textPrimary hover:text-light-textAccent dark:hover:text-dark-textAccent'
                }`}
                scroll={false}
              >
                <div className="flex flex-col items-center">
                  <Icon size={18} />
                  <span className="text-[0.65rem] mt-1">{item.name}</span>
                  {isActive && (
                    <div className="mt-0.5 w-1 h-1 rounded-full bg-light-textAccent dark:bg-dark-textAccent" />
                  )}
                </div>
              </Link>
            );
          })}
          <div 
            className="flex flex-col items-center justify-center p-2 rounded-md transition-all duration-300 ease-in-out flex-1"
          >
            <ThemeToggle />
            <span className="text-[0.65rem] mt-1">Theme</span>
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